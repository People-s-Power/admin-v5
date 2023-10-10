import db from "../../../databases";
import { IPaymentStatus } from "../../../databases/models/WalletTx";
// import { IAsset, IVictory } from "../../../types";
import ErrorCodes from "../../common/errorCodes";
import { transferRecipient, transferBalance } from "../../common/paystack";
import { catchError, errorHandler } from "../../common/utils";

class WithdrawService {
  private model = db.Withdraws
  private userModel = db.user
  private orgModel = db.Organization
  private walletModel = db.Wallet
  private walletTxModel = db.WalletTransaction

  private id: string
  private filter: string

  constructor(id = '', filter = ''){
    this.filter = filter
    this.id = id
  }

  public async find(page:number, limit: number, filter: string, searchParams?: any) {
    if (filter === 'undefined') {
      filter = null
    }
    const count = await this.model.find({
      ...(filter && {
          $or: [{ account_name: filter }, { account_bank: filter }, { account_number: filter }],
      }),
      ...(searchParams.status && { ...searchParams }),
    }).count()

    const withdraws = await this.model.find({
      ...(filter && {
          $or: [{ account_name: filter }, { account_bank: filter }, { account_number: filter }],
      }),
      ...(searchParams.status && { ...searchParams }),
    })
    .sort('-createdAt')
    .skip((page - 1) * limit)
    .limit(limit)
    
    const totalPages = Math.ceil(count / limit);

    return {
      withdraws,
      totalPages
    }
  }

  public async transfer(withdrawId: string) {
    const withdraw = await this.model.findById(withdrawId)
    if (!withdraw) catchError('Request not found', 404)
    if(withdraw.status === IPaymentStatus.success) catchError('Withdraw request already approved', 400)
    const user = await Promise.all([
      this.userModel.findById(withdraw.userId),
      this.orgModel.findById(withdraw.userId),
    ]).catch((e) => {
       catchError('User or org not found', 404);
    });

    let recipient_code


    const createRecipiet = await transferRecipient(withdraw.account_name, withdraw.account_number, withdraw.bank_code)
    
    recipient_code = createRecipiet.recipient_code


    const data = await transferBalance(Number(withdraw.amount), recipient_code)
    
    const wallet = await this.walletModel.findOne({ userId: withdraw.userId })
    const balance = wallet.balance - Number(withdraw.amount)
    await this.walletModel.findOneAndUpdate({ userId: withdraw.userId }, { balance }, { new: true })
    await this.walletTxModel.create({
      amount: Number(withdraw.amount),
      currency: 'NGN',
      isInflow: false,
      paymentMethod: 'WITHDRAW',
      status: 'success',
      userId: withdraw.userId,
      userType: user[0] ? 'user' : 'org',
      walletId: wallet._id
    })
    withdraw.status = IPaymentStatus.success
    await withdraw.save()
    return data
  }
}

export default WithdrawService;