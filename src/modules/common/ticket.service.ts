import { ObjectId } from "mongoose";
import db from "../../databases";
import { ITicket } from "../../types";
import ErrorCodes from "./errorCodes";
import { catchError } from "./utils";

class TicketService {
  private model = db.ticket;

  private id: string;

  private name: string;

  private author: ObjectId;

  private eventId: ObjectId;

  constructor(id = "", name = "", author?: ObjectId, eventId?: ObjectId) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.eventId = eventId;
  }

  public async create(params: ITicket): Promise<ITicket> {
    const newTicket = await this.model.create(params).catch((e) => {
      throw e;
    });

    return newTicket;
  }

  public async findOne(isActive?: boolean): Promise<ITicket> {
    const ticket = await this.model
      .findOne({
        ...(isActive && { isActive }),
        ...(this.id && { _id: this.id }),
        ...(this.name && { title: this.name }),
        ...(this.author && { author: this.author }),
        ...(this.eventId && { eventId: this.eventId }),
      })
      .catch((e) => {
        throw e;
      });

    return ticket;
  }

  public async findAll(
    page: number,
    limit: number,
    searchParams?: object
  ): Promise<ITicket[]> {
    const tickets = await this.model
      .find({
        isActive: true,
        deletedAt: null,
        ...(searchParams && { ...searchParams }),
        ...(this.author && { author: this.author }),
        ...(this.eventId && { eventId: this.eventId }),
      })
      .sort("-createdAt")
      .populate({
        path: "author",
        select: "firstName lastName email phoneNumber",
      })
      .limit(limit)
      .skip(limit * (page - 1))
      .catch(e => { throw e; });

    return tickets;
  }

  public async count() {
    const docsCount = await this.model.countDocuments({
      ...(this.author && { author: this.author }),
     }).catch(e => { throw e; });

     return docsCount;
  }

  public async updateOne(params: Partial<ITicket>): Promise<ITicket> {
    const ticket = await this.findOne().catch((e) => {
      throw e;
    });

    if (!ticket) throw catchError(ErrorCodes.NotFound('not found', 'ticket').code);

    const newTicket = await this.model
      .findOneAndUpdate({ _id: ticket._id }, { ...params }, { new: true })
      .catch((e) => {
        throw e;
      });

    return newTicket;
  }

  public async deleteOne() {
    const ticket = await this.findOne().catch((e) => {
      throw e;
    });

    if (!ticket) throw catchError(ErrorCodes.NotFound('not found', 'ticket').code);

    await this.model
      .deleteOne({
        ...(this.id && { _id: this.id }),
        ...(this.author && { author: this.author }),
      })
      .catch((e) => {
        throw e;
      });

    return ticket;
  }
}

export default TicketService;
