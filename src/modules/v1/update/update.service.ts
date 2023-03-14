import db from "../../../databases";
import { IUpdate } from "../../../types";
import ErrorCodes from "../../common/errorCodes";
import { catchError } from "../../common/utils";


class UpdateService {
  private model = db.Update
  
  private id: string
  private filter: string

  constructor(id = '', filter = ''){
    this.filter = filter
    this.id = id
  }


  public async findAll(limit?: number, page?: number) {
    const updates = await this.model
    .find()
    .populate('petition')
    .sort("-createdAt")
    .limit(limit)
    .skip(limit * (page - 1))
    .catch(e => { throw e; });

    
    return updates
  }

  public async findOne() {
    const Update = await this.model
      .findOne({
        ...(this.id && { _id: this.id })
      }).populate('petition')
      .catch((e) => {
        throw e;
      });

    return Update;
  }

  public async updateOne(params: Partial<IUpdate>): Promise<IUpdate> {
    const update = await this.findOne().catch((e) => {
      throw e;
    });

    if (!update)
      throw catchError(ErrorCodes.NotFound("not found", "update").code);

    const newUpdate = await this.model
      .findOneAndUpdate({ _id: update._id }, { ...params }, { new: true })
      .catch((e) => {
        throw e;
      });

    return newUpdate;
  }


  public async delete(){
    const update = await this.model.findByIdAndDelete(this.id)

    return update
  }


}

export default UpdateService