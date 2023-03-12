import { endOfDay, startOfDay, subDays } from "date-fns";
import { ObjectId } from "mongoose";
import db from "../../../databases";
import { IView } from "../../../types";
import ErrorCodes from "../../common/errorCodes";
import { catchError } from "../../common/utils";

class ViewService {
  private model = db.view;

  private id: string;

  private author: ObjectId;

  constructor(id = "", author?: ObjectId) {
    this.id = id;
    this.author = author;
  }

  public async create(params: Partial<IView>): Promise<IView> {
    const view = await this.model.create(params).catch((e) => {
      throw e;
    });
    return view;
  }

  public async findOne(): Promise<IView> {
    const view = await this.model
      .findOne({
        ...(this.id && { _id: this.id }),
        ...(this.author && { author: this.author }),
      })
      .catch((e) => {
        throw e;
      });

    return view;
  }

  public async findAll(
    page: number,
    limit: number,
    filter?: string
  ): Promise<IView[]> {
    const Views = await this.model
      .find({
        isActive: true,
        ...(filter && {
            $or: [{ title: filter }, { summary: filter }, { description: filter }, { category: filter }, { tags: filter }],
        }),
        ...(this.author && { author: this.author }),
      })
      .sort("-createdAt")
      .populate({
        path: "author",
        select: "firstName lastName email phoneNumber",
      })
      .limit(limit)
      .skip(limit * (page - 1))
      .catch(e => { throw e; });

    return Views;
  }

  public async findAllBySorter(
    limit: number,
    sorter?: string
  ) {
    const sortedData = await this.model
    .find({})
    .sort(sorter)
    .populate({
      path: "author",
      select: "firstName lastName email phoneNumber",
    })
    .limit(limit)
    .catch(e => { throw e; });

    return sortedData
  }

  public async count(type?: 'listing' | 'event' | 'product') {
    const docsCount = await this.model.countDocuments({
        ...(type && type === "event" && { eventId: { $exists: true } }),
        ...(type && type === "product" && { productId: { $exists: true } }),
        ...(type && type === "listing" && { listingId: { $exists: true } }),
        ...(this.author && { author: this.author }),
     }).catch(e => { throw e; });

     return docsCount;
  }

  public async retrieveByCategory()  {
    const Views = await this.model.aggregate().sortByCount('category').catch(e => { throw e; });
    return Views;
  }

  public async updateOne(params: Partial<IView>): Promise<IView> {
    const view = await this.findOne().catch((e) => {
      throw e;
    });

    if (!view) throw catchError(ErrorCodes.NotFound().code);

    const newview = await this.model
      .findOneAndUpdate({ _id: view._id }, { ...params }, { new: true })
      .catch((e) => {
        throw e;
      });

    return newview;
  }

  public async deleteOne() {
    const view = await this.findOne().catch((e) => {
      throw e;
    });

    if (!view) throw catchError(ErrorCodes.NotFound().code);

    await this.model
      .deleteOne({
        ...(this.id && { _id: this.id }),
        ...(this.author && { author: this.author }),
      })
      .catch((e) => {
        throw e;
      });

    return view;
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
}

export default ViewService;
