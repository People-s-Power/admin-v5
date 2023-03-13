import { endOfDay, startOfDay, subDays } from "date-fns";
import { ObjectId } from "mongoose";
import db from "../../../databases";
import { IAdmin } from "../../../types";
import ErrorCodes from "../../common/errorCodes";
import { hashPassword } from "../../common/hashing";
import { catchError } from "../../common/utils";

class AdminService {
  private model = db.admin;

  private id: string;

  private email: string;

  private phoneNumber: string;

  constructor(email = "", phoneNumber = "", id = '') {
    this.id = id;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

  public async create(params: IAdmin): Promise<IAdmin> {
    const admin = await this.findOne().catch((e) => {
      throw e;
    });
    console.log(admin)
    if (admin) {
      throw catchError(ErrorCodes.AdminExists().message);
    }
    const newadmin = await this.model.create(params).catch((e) => {
      throw e;
    });

    return newadmin;
  }

  public async findOne() {
    const admin = await this.model
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

  public async findAll(page: number, limit: number): Promise<IAdmin[]> {
    const admins = await this.model
      .find({
        isActive: true,
        deletedAt: null,
      })
      .sort("-createdAt")
      .limit(limit)
      .skip(limit * (page - 1))
      .catch((e) => {
        throw e;
      });

    return admins;
  }

  public async count() {
    const docsCount = await this.model.countDocuments({}).catch((e) => {
      throw e;
    });

    return docsCount;
  }

  public async updateOne(params: Partial<IAdmin>): Promise<IAdmin> {
    const admin = await this.findOne().catch((e) => {
      throw e;
    });

    if (!admin)
      throw catchError(ErrorCodes.NotFound("not found", "admin").code);

    const newadmin = await this.model
      .findOneAndUpdate({ _id: admin._id }, { ...params }, { new: true })
      .catch((e) => {
        throw e;
      });

    return newadmin;
  }

  public async deleteOne() {
    const admin = await this.findOne().catch((e) => {
      throw e;
    });

    if (!admin)
      throw catchError(ErrorCodes.NotFound("not found", "admin").code);

    await admin.deleteOne().catch((e: any) => {
      throw e;
    });

    return admin;
  }

  public async getPercent() {
    const [start, end] = await Promise.all([
      this.model.countDocuments({ createdAt: { $gte: startOfDay(subDays(new Date(), 1)), $lt: startOfDay(new Date()) } }),
      this.model.countDocuments({ createdAt: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) } }),
    ]);

    const diff = start - end;
    const avg = (start + end) / 2;
    const abs = (diff === 0 && avg === 0) ? 0 : Math.abs(diff) / avg;
    const perc = abs * 100;
    return perc;
  }

  public async deleteAdmin(){
    const admin = await this.model.findByIdAndDelete(this.id)

    return admin
  }

  public getAdmin(u: IAdmin) {
    return {
      id: u._id,
      email: u.email,
      lastName: u.lastName,
      firstName: u.firstName,
    };
  }
}

export default AdminService;
