import db from "../../../databases";
import { catchError } from "../../common/utils";


class SubscriptionService {
  private model = db.Subscriptionprof;

  private id: string;

  constructor(id = '') {
    this.id = id;
  }


    public async find(page: number, limit: number, expired?: boolean) {
      const count = await this.model.find({
        ...(expired && ({ expired }))
      }).count()

      const subscriptions = await this.model.find({
        ...(expired && ({ expired }))
      })
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(limit)

      const totalPages = Math.ceil(count / limit);

      return {
        subscriptions,
        totalPages
      }
    }

    public async findOne(id?: string, orgId?: string) {
      console.log(orgId)
      const subscription = await this.model.findOne({
        ...(id && ({ _id: id })),
        ...(orgId && ({ author: orgId }))
      })

      console.log(subscription)

      return subscription;
    }

    public async getUnassigedSubscriptions (page: number, limit: number) {
      const count = await this.model.find({
        assignedProf: { $exists: false }
      }).count()

      const subscriptions = await this.model.find({
        assignedProf: { $exists: false }
      })
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(limit)

      const totalPages = Math.ceil(count / limit);

      return {
        subscriptions,
        totalPages
      }
    }
}

export default SubscriptionService;