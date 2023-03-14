import db from "../../../databases";
import { IReport } from "../../../types";
import ErrorCodes from "../../common/errorCodes";
import { catchError } from "../../common/utils";


class ReportService {
  private model = db.Report
  
  private id: string
  private filter: string

  constructor(id = '', filter = ''){
    this.filter = filter
    this.id = id
  }


  public async findAll(limit?: number, page?: number) {
    const reports = await this.model
    .find()
    .sort("-createdAt")
    .limit(limit)
    .skip(limit * (page - 1))
    .catch(e => { throw e; });

    
    return reports
  }

  public async findOne() {
    const report = await this.model
      .findOne({
        ...(this.id && { _id: this.id })
      })
      .catch((e) => {
        throw e;
      });

    return report;
  }

  public async updateOne(params: Partial<IReport>): Promise<IReport> {
    const report = await this.findOne().catch((e) => {
      throw e;
    });

    if (!report)
      throw catchError(ErrorCodes.NotFound("not found", "Report").code);

    const newReport = await this.model
      .findOneAndUpdate({ _id: report._id }, { ...params }, { new: true })
      .catch((e) => {
        throw e;
      });

    return newReport;
  }


  public async delete(){
    const report = await this.model.findByIdAndDelete(this.id)

    return report
  }


}

export default ReportService