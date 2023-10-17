
import mongoose from "mongoose";
import db from "../../../databases";
import { IUser } from "../../../types";
import { catchError } from "../../common/utils";

class ProfService {
  private userModel = db.user;
  private orgModel = db.Organization;
  private activityModel = db.Activity;
  private taskModel = db.Task;
  private reviewModel = db.Review

  private id: string;

  constructor(id = '') {
    this.id = id;
  }

  public async findOne(): Promise<IUser> {
    const user = this.userModel
      .findOne({
        ...(this.id && { _id: this.id })
      })
      .catch((e) => {
        throw e;
      });

    return user;
  }

  public async checkUser(orgId) {
    const user = await this.findOne()
    if(!user.orgOperating.includes(orgId)) throw catchError('User not allowed to edit this org', 400)
    return
  }

  public async enterActivity(type: string, authorId: string, orgId: string, text: string, item: string) {
    const activity = await this.activityModel.create({
      orgId,
      activity_type: type,
      authorId,
      text,
      item
    })

    return activity;
  }

  public async fetchActivities(page:number, limit:number, userId?: string, orgId?: string) {
    const org = new mongoose.Types.ObjectId(orgId)
    const user = new mongoose.Types.ObjectId(userId)

    const count = await this.activityModel.find({
      ...(userId && ({ authorId: user })),
      ...(orgId && ({ orgId: org }))
    }).count()

    const activities = await this.activityModel.find({
      ...(userId && ({ authorId: user })),
      ...(orgId && ({ orgId: org }))
    })
    .sort('-createdAt')
    .skip((page - 1) * limit)
    .limit(limit)

    const totalPages = Math.ceil(count / limit);

    return {
      activities,
      totalPages
    }
  }

  public async getTasks(page:number, limit:number, orgId?: any, prof?: any, assigned?: any, status?: any) {
    const count = await this.taskModel.find({
      ...( status && { status }),
      ...( orgId && { author: orgId }),
      ...(assigned && { assigne: { $in: [assigned] } }),
      ...(prof && { prof })
    }).count()

    const taskList = await this.taskModel.find({
      ...( status && { status }),
      ...( orgId && { author: orgId }),
      ...(assigned && { assigne: { $in: [assigned] } }),
      ...(prof && { prof })
    })
    .sort("-createdAt")
    .limit(limit)
    .skip(limit * (page - 1))
    .catch(e => { throw e; });

    const totalPages = Math.ceil(count / limit);

    const tasks = await Promise.all(
      taskList.map(async task => {
        return {
          ...task._doc,
          author: await this.populateAuthor(task.author),
          prof: await this.populateAuthor(task.prof)
        }
      })
    )

    return {
      tasks,
      totalPages
    }
  }

  public async updateTask(id: string, status:any, prof: any) {
    return await this.taskModel.findOneAndUpdate({ _id: id }, { status, prof }, { new: true })
    .catch((e) => {
      throw e;
    });
  }

  async getReviews(page: number, limit: number, userId?: any, author?: any) {
    const count = await this.reviewModel.find({
      ...( author && { author }),
      ...( userId && { author: userId })
    }).count()

    const reviewList = await this.reviewModel.find({
      ...( author && { author }),
      ...( userId && { author: userId }),
    })
    .sort("-createdAt")
    .limit(limit)
    .skip(limit * (page - 1))
    .catch(e => { throw e; });

    const totalPages = Math.ceil(count / limit);

    const reviews = await Promise.all(
      reviewList.map(async review => {
        return {
          ...review._doc,
          author: await this.populateAuthor(review.author),
          userId: await this.populateAuthor(review.userId)
        }
      })
    )

    return {
      reviews,
      totalPages
    }
  }

  async createReview(body:string, rating: number, userId: string, author: string) {
    const review = await this.reviewModel.create({
      body,
      rating,
      userId,
      author
    })

    return review
  }

  async deleteReview (id:string) {
    return await this.reviewModel.findByIdAndDelete(id)
  }

  async populateAuthor(authorId: string) {
    const [user, org] = await Promise.all([
      this.userModel.findById(authorId),
      this.orgModel.findById(authorId),
    ])

    if (user) {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        description: user.description
      };
    }
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
      _id: 'User deleted',
      name: 'User deleted',
      email: 'User deleted',
      image: 'User deleted',
      description: 'User deleted'
    };
  }

}

export default ProfService;