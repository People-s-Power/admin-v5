import db from "../../../databases";
import { IPetition } from "../../../types";
import ErrorCodes from "../../common/errorCodes";
import { catchError } from "../../common/utils";


class PetitionService {
  private model = db.Petition
  
  private id: string
  private filter: string

  constructor(id = '', filter = ''){
    this.filter = filter
    this.id = id
  }


  public async findAll(limit?: number, page?: number) {
    const petitons = await this.model
    .find()
    .sort("-createdAt")
    .populate('updates')
    .populate('endorsements')
    .limit(limit)
    .skip(limit * (page - 1))
    .catch(e => { throw e; });

    // const pets = await this.model.find()
    console.log(petitons)
    return petitons
  }

  public async findOne() {
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


  public async delete(){
    const petition = await this.model.findByIdAndDelete(this.id)

    return petition
  }


}

export default PetitionService