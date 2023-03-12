import db from "../../../databases";
import { IAdmin } from "../../../types";
import { catchError } from "../../common/utils";
import ErrorCodes from "../../common/errorCodes";
import { hashPassword } from "../../common/hashing";
import { endOfDay, startOfDay, subDays } from "date-fns";

class AdminService {
  private adminModel = db.admin;

  private id: string;

  private email: string;

  private phoneNumber: string;

  constructor(email = "", phoneNumber = "", id = '') {
    this.id = id;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

  public async create(params: Partial<IAdmin>): Promise<IAdmin> {
    const admin = await this.findOne().catch(e => { throw e; });
    if(admin) throw catchError(ErrorCodes.UserExists());
    const password = hashPassword(params.password);
    const newAdmin = this.adminModel.create({ ...params, password }).catch((e) => {
      throw e;
    });

    return newAdmin;
  }

  public async findOne(): Promise<IAdmin> {
    const admin = this.adminModel
      .findOne({
        ...(this.id && { _id: this.id }),
        ...(this.email && { email: this.email }),
        ...(this.phoneNumber && { phoneNumber: this.phoneNumber }),
      })
      .catch((e) => {
        throw e;
      });

    return admin;
  }

  public async updateOne(params: Partial<IAdmin>) {
    const admin = await this.findOne().catch((e) => {
      throw e;
    });
    if (!admin || !admin.isActive) throw catchError(ErrorCodes.NotFound().code);

    const newAdmin = await this.adminModel
      .findOneAndUpdate({ _id: admin?._id }, { ...params }, { new: true })
      .catch((e) => {
        throw e;
      });
    return newAdmin;
  }

  public async count(category?: string) {
    const docsCount = await this.adminModel.countDocuments({}).catch(e => { throw e; });

     return docsCount;
  }

  public async getPercent() {
    const [start, end] = await Promise.all([
      this.adminModel.countDocuments({ createdAt: { $gte: startOfDay(subDays(new Date(), 1)), $lt: startOfDay(new Date()) } }),
      this.adminModel.countDocuments({ createdAt: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) } }),
    ]);

    const diff = start - end;
    const avg = (start + end) / 2;
    const abs = (diff === 0 && avg === 0) ? 0 : Math.abs(diff) / avg;
    const perc = abs * 100;
    return perc;
  }

  public getAdmin(u: IAdmin) {
    return {
      id: u._id,
      // city: u.city,
      // state: u.state,
      email: u.email,
      // country: u.country,
      lastName: u.lastName,
      firstName: u.firstName,
      // postalCode: u.postalCode,
    }
  }
}

export default AdminService;
