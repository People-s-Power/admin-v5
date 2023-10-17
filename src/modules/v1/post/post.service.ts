import db from "../../../databases";
import { IAsset, IPost } from "../../../types";
import ErrorCodes from "../../common/errorCodes";
import { assetsUpload } from "../../common/uploadImage";
import { catchError } from "../../common/utils";

interface CreatePost {
  author: string;
  body: string;
  assets: IAsset[];
  categories: string[]
}

class PostService {
  private model = db.Post
  
  private id: string
  private filter: string

  constructor(id = '', filter = ''){
    this.filter = filter
    this.id = id
  }

  public async create (params: CreatePost) {
    const asset = await assetsUpload(params.assets)
    const post = await this.model.create(params)

    await post.addAsset(asset)

    return post
  }

  public async findAll(limit?: number, page?: number, author?: any) {
    const count = await this.model
    .find(
      {
        ...(author && { author })
      }
    ).count()


    const posts = await this.model
    .find({
        ...(author && { author })
      })
    .sort("-createdAt")
    .limit(limit)
    .skip(limit * (page - 1))
    .catch(e => { throw e; });

    // const pets = await this.model.find()
    const totalPages = Math.ceil(count / limit);
    return {posts, totalPages}
  }

  public async findOne(): Promise<IPost> {
    const post = await this.model
      .findOne({
        ...(this.id && { _id: this.id })
      })
      .catch((e) => {
        throw e;
      });

    return post;
  }

  public async updateOne(params: Partial<IPost>): Promise<IPost> {
    const post = await this.findOne().catch((e) => {
      throw e;
    });

    if (!post)
      throw catchError(ErrorCodes.NotFound("not found", "post").code);

    const newPost = await this.model
      .findOneAndUpdate({ _id: post._id }, { ...params }, { new: true })
      .catch((e) => {
        throw e;
      });

    return newPost;
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
    const post = await this.model.findByIdAndDelete(this.id)

    return post
  }


}

export default PostService