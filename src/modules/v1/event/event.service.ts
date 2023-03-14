import db from "../../../databases";
import { IEvent } from "../../../types";
import ErrorCodes from "../../common/errorCodes";
import { catchError } from "../../common/utils";


class Eventservice {
  private model = db.Event
  
  private id: string
  private filter: string

  constructor(id = '', filter = ''){
    this.filter = filter
    this.id = id
  }


  public async findAll(limit?: number, page?: number) {
    const events = await this.model
    .find()
    .sort("-createdAt")
    .limit(limit)
    .skip(limit * (page - 1))
    .catch(e => { throw e; });

    // const pets = await this.model.find()
    console.log(events)
    return events
  }

  public async findOne() {
    const event = await this.model
      .findOne({
        ...(this.id && { _id: this.id })
      })
      .catch((e) => {
        throw e;
      });

    return event;
  }

  public async updateOne(params: Partial<IEvent>): Promise<IEvent> {
    const event = await this.findOne().catch((e) => {
      throw e;
    });

    if (!event)
      throw catchError(ErrorCodes.NotFound("not found", "Event").code);

    const newEvent = await this.model
      .findOneAndUpdate({ _id: event._id }, { ...params }, { new: true })
      .catch((e) => {
        throw e;
      });

    return newEvent;
  }


  public async delete(){
    const event = await this.model.findByIdAndDelete(this.id)

    return event
  }


}

export default Eventservice