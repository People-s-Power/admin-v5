import db from "../../../databases";
import { IAdvert, IAsset } from "../../../types";
import ErrorCodes from "../../common/errorCodes";
import { assetsUpload } from "../../common/uploadImage";
import { catchError } from "../../common/utils";

interface CreateAdvert {
  caption: string;
  message: string;
  action: string;
  audience: string;
  duration: string;
  email: string;
  link: string;
  assets: IAsset[],
  state:string;
  country: string;
  author: string;
}

class AdvertService {
  private model = db.Advert
  
  private id: string
  private filter: string
  private authorId: string

  constructor(id = '', filter = '', authorId = ''){
    this.filter = filter
    this.id = id
    this.authorId = authorId
  }

  public async create (params: CreateAdvert) {
    const asset = await assetsUpload(params.assets)
    const advert = await this.model.create(params)

    await advert.addAsset(asset)

    return advert
  }

  public async findAll(limit: number, page: number, authorId?: any ) {
    const count = await this.model
    .find(
      {
        ...(authorId && { author: authorId })
      }
    ).count()
    const advert = await this.model
    .find(
      {
        ...(this.authorId && { author: this.authorId })
      }
    )
    .sort("-createdAt")
    .limit(limit)
    .skip(limit * (page - 1))
    .catch(e => { throw e; });

    const totalPages = Math.ceil(count / limit);

    return {
      advert,
      totalPages
    }
  }

  public async findOne(): Promise<IAdvert> {
    const advert = await this.model
      .findOne({
        ...(this.id && { _id: this.id })
      })
      .catch((e) => {
        throw e;
      });

    return advert;
  }

  public async updateOne(params: Partial<IAdvert>): Promise<IAdvert> {
    const advert = await this.findOne().catch((e) => {
      throw e;
    });

    if (!advert)
      throw catchError(ErrorCodes.NotFound("not found", "advert").code);

    const newAdvert = await this.model
      .findOneAndUpdate({ _id: advert._id }, { ...params }, { new: true })
      .catch((e) => {
        throw e;
      });

    return newAdvert;
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
    const advert = await this.model.findByIdAndDelete(this.id)

    return advert
  }


}

export default AdvertService