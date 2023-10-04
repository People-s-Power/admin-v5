
import db from "../../../databases";
import { IUser } from "../../../types";
import { catchError } from "../../common/utils";

class ProfService {
  private userModel = db.user;
  private orgModel = db.Organization;
  private activityModel = db.Activity;

  private id: string;

  constructor(id = '') {
    this.id = id;
  }

  public async findOne(): Promise<IUser> {
    const user = this.userModel
      .findOne({
        ...(this.id && { _id: this.id })
      })
      .catch((e) => {
        throw e;
      });

    return user;
  }

  public async checkUser(orgId) {
    const user = await this.findOne()
    if(!user.orgOperating.includes(orgId)) throw catchError('User not allowed to edit this org', 400)
    return
  }

  public async enterActivity(type: string, authorId: string, orgId: string, text: string, item: string) {
    const activity = await this.activityModel.create({
      orgId,
      activity_type: type,
      authorId,
      text,
      item
    })

    return activity;
  }
}

export default ProfService;