import db from "../../../databases";
import { IAsset, IVictory } from "../../../types";
import ErrorCodes from "../../common/errorCodes";
import { assetsUpload } from "../../common/uploadImage";
import { catchError } from "../../common/utils";

interface CreateVictory {
  body: string, author: string, assets: IAsset[]
}

class VictoryService {
  private model = db.Victory
  
  private id: string
  private filter: string

  constructor(id = '', filter = ''){
    this.filter = filter
    this.id = id
  }


  public async create (params: CreateVictory) {
    const asset = await assetsUpload(params.assets)
    const victory = await this.model.create(params)

    await victory.addAsset(asset)

    return victory
  }


  public async findAll(limit?: number, page?: number, author?:any) {
    const count = await this.model
    .find(
      {
        ...(author && { author })
      }
    ).count()


    const victories = await this.model
    .find({
      ...(author && { author })
    })
    .sort("-createdAt")
    .limit(limit)
    .skip(limit * (page - 1))
    .catch(e => { throw e; });

    const totalPages = Math.ceil(count / limit);

    return {victories, totalPages}
  }

  public async findOne(): Promise<IVictory> {
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