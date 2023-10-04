import db from "../../../databases";
import { IEvent, IAsset } from "../../../types";
import ErrorCodes from "../../common/errorCodes";
import { assetsUpload } from "../../common/uploadImage";
import { catchError } from "../../common/utils";

interface CreateEvent {
  name: string; 
  author: string;
  description: string;
  time: string;
  startDate: string;
  audience: string;
  endDate: string;
  assets: IAsset[];
  type: string;
}
class Eventservice {
  private model = db.Event
  
  private id: string
  private filter: string

  constructor(id = '', filter = ''){
    this.filter = filter
    this.id = id
  }

  public async create (params: CreateEvent) {
    const asset = await assetsUpload(params.assets)
    const advert = await this.model.create(params)

    await advert.addAsset(asset)

    return advert
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

  public async findOne(): Promise<IEvent> {
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

  public async count(category?: string, isActive?: boolean) {
    const docsCount = await this.model
      .countDocuments()
      .catch((e) => {
        throw e;
      });

    return docsCount;
  }


  public async delete(){
    const event = await this.model.findByIdAndDelete(this.id)

    return event
  }


}

export default Eventservice