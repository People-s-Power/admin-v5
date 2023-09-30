import db from "../../../databases";
import { IUser } from "../../../types";
import { catchError } from "../../common/utils";
import ErrorCodes from "../../common/errorCodes";
import { hashPassword } from "../../common/hashing";
import { endOfDay, startOfDay, subDays } from "date-fns";

class UserService {
  private userModel = db.user;

  private id: string;

  private email: string;

  private phoneNumber: string;

  constructor(email = "", phoneNumber = "", id = '') {
    this.id = id;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

  public async findAll(page?: number, limit?: number): Promise<IUser[]> {
    const users = await this.userModel
      .find({
        deletedAt: null,
      })
      .select('-password')
      .sort("-createdAt")
      .limit(limit)
      .skip(limit * (page - 1))
      .catch((e) => {
        throw e;
      });

    return users;
  }

  public async findOne(): Promise<IUser> {
    const user = this.userModel
      .findOne({
        ...(this.id && { _id: this.id }),
        ...(this.email && { email: this.email }),
        ...(this.phoneNumber && { phoneNumber: this.phoneNumber }),
      })
      .catch((e) => {
        throw e;
      });

    return user;
  }

  public async updateOne(params: Partial<IUser>) {
    const user = await this.findOne().catch((e) => {
      throw e;
    });
    if (!user) throw catchError(ErrorCodes.NotFound().code);

    const newUser = await this.userModel
      .findOneAndUpdate({ _id: user?._id }, { ...params }, { new: true })
      .catch((e) => {
        throw e;
      });
    return newUser;
  }

  public async count(category?: string, isActive?: boolean) {
    const docsCount = await this.userModel
      .countDocuments()
      .catch((e) => {
        throw e;
      });

    return docsCount;
  }

  public async deleteUser(){
    const user = await this.userModel.findByIdAndDelete(this.id)

    return user
  }

  public getUser(u: IUser) {
    return {
      id: u._id,
      city: u.city,
      state: u.state,
      email: u.email,
      country: u.country,
      lastName: u.lastName,
      firstName: u.firstName,
      emailToken: u.emailToken,
      isActive: u.isActive,
      role: u.role,
      reps: u.reps,
      followers: u.followers,
      following: u.following,
      orgOperating: u.orgOperating,
      createdOrg: u.createdOrg,
      lastSeen: u.lastSeen,
      createdAt: u.createdAt,
      updatedAt: u .updatedAt,
      interests: u.interests,
      image: u.image,
    }
  }
}

export default UserService;
