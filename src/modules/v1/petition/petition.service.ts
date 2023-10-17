import db from "../../../databases";
import { IAsset, IPetition } from "../../../types";
import ErrorCodes from "../../common/errorCodes";
import { assetsUpload } from "../../common/uploadImage";
import { catchError } from "../../common/utils";

interface CreatPetition {
  title: string;
  category: string;
  assets: IAsset[];
  aim: string;
  author: string;
  target: string;
  body: string;
  excerpt: string;
  slug: string;
  numberOfPaidEndorsementCount: number;
  numberOfPaidViewsCount: number;
  region: string;
}
class PetitionService {
  private model = db.Petition
  
  private id: string
  private filter: string

  constructor(id = '', filter = ''){
    this.filter = filter
    this.id = id
  }

  public async create (params: CreatPetition) {
    const asset = await assetsUpload(params.assets)
    const petition = await this.model.create(params)

    await petition.addAsset(asset)

    return petition
  }


  public async findAll(limit?: number, page?: number, author?: any) {
    const count = await this.model
    .find(
      {
        ...(author && { author })
      }
    ).count()


    const petitons = await this.model
    .find({
      ...(author && { author: author })
    })
    .sort("-createdAt")
    .populate('updates')
    .populate('endorsements')
    .limit(limit)
    .skip(limit * (page - 1))
    .catch(e => { throw e; });

    // const pets = await this.model.find()
    const totalPages = Math.ceil(count / limit);
    return {petitons, totalPages}
  }

  public async findOne(): Promise<IPetition> {
    const petition = await this.model
      .findOne({
        ...(this.id && { _id: this.id })
      })
      .populate('updates')
      .populate('endorsements')
      .catch((e) => {
        throw e;
      });

    return petition;
  }

  public async updateOne(params: Partial<IPetition>): Promise<IPetition> {
    const petiton = await this.findOne().catch((e) => {
      throw e;
    });

    if (!petiton)
      throw catchError(ErrorCodes.NotFound("not found", "Petiton").code);

    const newPetition = await this.model
      .findOneAndUpdate({ _id: petiton._id }, { ...params }, { new: true })
      .catch((e) => {
        throw e;
      });

    return newPetition;
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
    const petition = await this.model.findByIdAndDelete(this.id)

    return petition
  }


}

export default PetitionService