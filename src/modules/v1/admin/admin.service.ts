import { endOfDay, startOfDay, subDays } from "date-fns";
import { ObjectId } from "mongoose";
import db from "../../../databases";
import { IAdmin } from "../../../types";
import ErrorCodes from "../../common/errorCodes";
import { hashPassword } from "../../common/hashing";
import { catchError } from "../../common/utils";
import UserService from "../user/user.service";

enum MessageType {
  TEXT = 'text',
  FILE = 'file',
}

interface ISendDM {
  category: string;
  subCategory: string;
  country: string;
  city: string;
  userId: string;
  message: string;
}
class AdminService {
  private model = db.admin;
  private userModel = db.user;
  private orgModel = db.Organization;
  private subModel = db.Subscriptionprof
  private oneToOneMessageModel = db.Message;

  private id: string;

  private email: string;

  private phoneNumber: string;

  constructor(email = "", phoneNumber = "", id = '') {
    this.id = id;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

  async sendMessage(payload: ISendDM) {
    // Filter users and orgs then get socketIds and send to client

    const [users, orgs] = await Promise.all([
      this.userModel.find({
        interests: { $in: [payload.subCategory] },
        country: payload.country,
        city: payload.city,
      }),
      this.orgModel.find({
        category: { $in: [payload.category] },
        subCategory: { $in: [payload.subCategory] },
        country: payload.country,
        city: payload.city,
      })
    ])

    const message = `${payload.message} Send a message ${payload.userId}`
    const foundUsers = [
      ...users, ...orgs
    ]

    // Return message and user socketIds then map through them and send to client

    await Promise.all(foundUsers.map(async (user) => {
      if(user.socketId){
        const participants = [user._id, 'bot']

        const users = [
          {
            _id: user._id,
            name: user.name ,
            email: user.email,
            image: user.image,
            description: user.description
          },
          {
            _id: 'bot',
            name: 'Peoples Power',
            email: '',
            image: '',
          }
        ]

        const dm = await this.getDm(participants);
        if(dm){
          dm.messages.push({
            from: 'bot',
            to: user._id,
            text: message,
            type: MessageType.TEXT,
            createdAt: `${(new Date()).toJSON()}`
        })
          await dm.save()
          // console.log(dm)
          return dm
          }

        const newDm = await this.oneToOneMessageModel.create({
          participants,
          messages: [{
              from: 'bot',
              to: user._id,
              text: message,
              type: 'text',
              createdAt: `${(new Date()).toJSON()}`
          }],
          users,
          type: 'support-to-consumer',
        })
        // console.log(newDm)
        return newDm
      }
    }))

    return {
      message,
      foundUsers
    }
  }


  async getDm(participants: string[]) {
    const dm = await this.oneToOneMessageModel.findOne({
      participants: { $size: 2, $all: participants },
    });

    return dm;
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


  public async assign(userId, orgId, subId) {
    const user = await this.userModel.findById(userId)
    if(!user) throw catchError('User not found', 404);
    if(user.accountType === 'Campaigner') throw catchError('Not allowed user is a Campaigner', 400);
    const org = await this.orgModel.findById(orgId)

    if (!org) throw catchError('Org not found', 404);

    user.orgOperating.push(orgId)
    await user.save()
    org.operators.push({
      userId,
      role: user.accountType      
    })

    await org.save()

    await this.subModel.findOneAndUpdate({ _id: subId }, { assignedProf: userId }, { new: true })
    .catch((e) => {
      throw e;
    });

    const result = new UserService('', '', '').getUser(user)
    return result;
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
