import db from "../../../databases";
import { IOrgnaization } from "../../../types";
import ErrorCodes from "../../common/errorCodes";
import { catchError } from "../../common/utils";


class OrgService {
  private model = db.Organization
  
  private id: string
  private filter: string

  constructor(id = '', filter = ''){
    this.filter = filter
    this.id = id
  }


  public async findAll(limit?: number, page?: number) {
    const org = await this.model
    .find()
    .sort("-createdAt")
    .limit(limit)
    .skip(limit * (page - 1))
    .catch(e => { throw e; });

    return org
  }

  public async findOne() {
    const org = await this.model
      .findOne({
        ...(this.id && { _id: this.id })
      })
      .catch((e) => {
        throw e;
      });

    return org;
  }

  public async updateOne(params: Partial<IOrgnaization>): Promise<IOrgnaization> {
    const org = await this.findOne().catch((e) => {
      throw e;
    });

    if (!org)
      throw catchError(ErrorCodes.NotFound("not found", "org").code);

    const neworg = await this.model
      .findOneAndUpdate({ _id: org._id }, { ...params }, { new: true })
      .catch((e) => {
        throw e;
      });

    return neworg;
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
    const org = await this.model.findByIdAndDelete(this.id)

    return org
  }


}

export default OrgService