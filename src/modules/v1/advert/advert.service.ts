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

  constructor(id = '', filter = ''){
    this.filter = filter
    this.id = id
  }

  public async create (params: CreateAdvert) {
    const asset = await assetsUpload(params.assets)
    const advert = await this.model.create(params)

    await advert.addAsset(asset)

    return advert
  }

  public async findAll(limit?: number, page?: number) {
    const advert = await this.model
    .find()
    .sort("-createdAt")
    .limit(limit)
    .skip(limit * (page - 1))
    .catch(e => { throw e; });

    return advert
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