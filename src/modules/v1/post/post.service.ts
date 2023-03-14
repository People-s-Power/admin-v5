import db from "../../../databases";
import { IPost } from "../../../types";
import ErrorCodes from "../../common/errorCodes";
import { catchError } from "../../common/utils";


class PostService {
  private model = db.Post
  
  private id: string
  private filter: string

  constructor(id = '', filter = ''){
    this.filter = filter
    this.id = id
  }


  public async findAll(limit?: number, page?: number) {
    const posts = await this.model
    .find()
    .sort("-createdAt")
    .limit(limit)
    .skip(limit * (page - 1))
    .catch(e => { throw e; });

    // const pets = await this.model.find()
    console.log(posts)
    return posts
  }

  public async findOne() {
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


  public async delete(){
    const post = await this.model.findByIdAndDelete(this.id)

    return post
  }


}

export default PostService