import db from "../../../databases";
import { IShare } from "../../../types";
import ErrorCodes from "../../common/errorCodes";
import { catchError } from "../../common/utils";


class ShareService {
  private model = db.Share
  
  private id: string
  private filter: string

  constructor(id = '', filter = ''){
    this.filter = filter
    this.id = id
  }


  public async findAll(limit?: number, page?: number) {
    const shares = await this.model
    .find()
    .sort("-createdAt")
    .limit(limit)
    .skip(limit * (page - 1))
    .catch(e => { throw e; });

    
    return shares
  }

  public async findOne() {
    const share = await this.model
      .findOne({
        ...(this.id && { _id: this.id })
      })
      .catch((e) => {
        throw e;
      });

    return share;
  }

  public async updateOne(params: Partial<IShare>): Promise<IShare> {
    const share = await this.findOne().catch((e) => {
      throw e;
    });

    if (!share)
      throw catchError(ErrorCodes.NotFound("not found", "share").code);

    const newShare = await this.model
      .findOneAndUpdate({ _id: share._id }, { ...params }, { new: true })
      .catch((e) => {
        throw e;
      });

    return newShare;
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
    const share = await this.model.findByIdAndDelete(this.id)

    return share
  }


}

export default ShareService