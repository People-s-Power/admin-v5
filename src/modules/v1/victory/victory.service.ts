import db from "../../../databases";
import { IVictory } from "../../../types";
import ErrorCodes from "../../common/errorCodes";
import { catchError } from "../../common/utils";


class VictoryService {
  private model = db.Victory
  
  private id: string
  private filter: string

  constructor(id = '', filter = ''){
    this.filter = filter
    this.id = id
  }


  public async findAll(limit?: number, page?: number) {
    const victories = await this.model
    .find()
    .sort("-createdAt")
    .limit(limit)
    .skip(limit * (page - 1))
    .catch(e => { throw e; });


    return victories
  }

  public async findOne() {
    const victory = await this.model
      .findOne({
        ...(this.id && { _id: this.id })
      })
      .catch((e) => {
        throw e;
      });

    return victory;
  }

  public async updateOne(params: Partial<IVictory>): Promise<IVictory> {
    const victory = await this.findOne().catch((e) => {
      throw e;
    });

    if (!victory)
      throw catchError(ErrorCodes.NotFound("not found", "Victory").code);

    const newVictory = await this.model
      .findOneAndUpdate({ _id: victory._id }, { ...params }, { new: true })
      .catch((e) => {
        throw e;
      });

    return newVictory;
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
    const victory = await this.model.findByIdAndDelete(this.id)

    return victory
  }


}

export default VictoryService