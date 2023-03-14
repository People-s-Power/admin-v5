import db from "../../../databases";
import { ITransaction } from "../../../types";
import ErrorCodes from "../../common/errorCodes";
import { catchError } from "../../common/utils";


class TxService {
  private model = db.Transaction
  
  private id: string
  private filter: string

  constructor(id = '', filter = ''){
    this.filter = filter
    this.id = id
  }


  public async findAll(limit?: number, page?: number) {
    const tx = await this.model
    .find()
    .sort("-createdAt")
    .limit(limit)
    .skip(limit * (page - 1))
    .catch(e => { throw e; });

    
    
    return tx
  }

  public async findOne() {
    const tx = await this.model
      .findOne({
        ...(this.id && { _id: this.id })
      })
      .catch((e) => {
        throw e;
      });

    return tx;
  }

  public async updateOne(params: Partial<ITransaction>): Promise<ITransaction> {
    const tx = await this.findOne().catch((e) => {
      throw e;
    });

    if (!tx)
      throw catchError(ErrorCodes.NotFound("not found", "Transaction").code);

    const newTx = await this.model
      .findOneAndUpdate({ _id: tx._id }, { ...params }, { new: true })
      .catch((e) => {
        throw e;
      });

    return newTx;
  }


  public async delete(){
    const tx = await this.model.findByIdAndDelete(this.id)

    return tx
  }


}

export default TxService