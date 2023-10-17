import db from "../../../databases";
import { AccountTypeEnum, IUser } from "../../../types";
import { catchError } from "../../common/utils";
import ErrorCodes from "../../common/errorCodes";
import { hashPassword } from "../../common/hashing";
import { endOfDay, startOfDay, subDays } from "date-fns";

class UserService {
  private userModel = db.user;
  private orgModel = db.Organization

  private id: string;

  private email: string;

  private phoneNumber: string;

  constructor(email = "", phoneNumber = "", id = '') {
    this.id = id;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

  public async create(name: string, email: string, password: string, accountType: AccountTypeEnum): Promise<IUser> {
    const payload = {
      email,
      name,
      password: hashPassword(password),
      emailToken: (Math.floor(Math.random() * 90000) + 10000).toString(),
      firstName: name?.split(' ')?.[0],
      lastName: name?.split(' ')?.[1],
      accountType
    }
    const user = await this.userModel.create(payload)

    return user;
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


  async populateAuthor(authorId: string) {
    const org = await this.orgModel.findById(authorId)

    if (org) {
      return {
        _id: org._id,
        name: org.name,
        email: org.email,
        image: org.image,
        description: org.description
      };
    }

    return {
      _id: 'Org deleted',
      name: 'Org deleted',
      email: 'Org deleted',
      image: 'Org deleted',
      description: 'Org deleted'
    };
  }

  public async getUser(u: IUser) {
    let org = []
    if (u.orgOperating.length) {
      org = await Promise.all(u.orgOperating.map(async org => await this.populateAuthor(org)))
    }
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
      accountType: u.accountType,
      followers: u.followers,
      following: u.following,
      orgOperating: org,
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
