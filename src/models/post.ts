import "./user";
import "./tag";
import {
  Schema,
  model,
  models,
  Model,
  Document,
  InferSchemaType,
} from "mongoose";

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },
    question: {
      title: {
        type: String,
      },
      answersCount: {
        type: Schema.Types.Number,
        default: 0,
      },
    },
    answer: {
      accepted: {
        type: Boolean,
        default: false,
      },
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    votes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        type: {
          type: Boolean,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.statics.pagination = async function (
  pageNumber: number = 1,
  sort: number = -1,
  limit: number = 6,
  tag?: string
) {
  const skip = (pageNumber - 1) * limit;
  const where = tag ? { tags: { $in: [tag] } } : {};
  const posts = await this.find({ ...where, parent: null })
    .sort({ createdAt: sort })
    .skip(skip)
    .limit(limit)
    .populate("user", "name")
    .populate("tags", "name slug");

  const noOfPosts = await this.countDocuments({ ...where, parent: null });
  const pages = Math.ceil(noOfPosts / limit);
  return { posts, pages };
};

postSchema.statics.vote = async function (
  postId: string,
  { userId, voteType }: { userId: string; voteType: boolean }
) {
  const post = await Post.findOneAndUpdate(
    {
      _id: postId,
      "votes.user": userId,
    },
    {
      $set: { "votes.$.type": voteType },
    }
  );

  if (!post) {
    await Post.updateOne(
      { _id: postId },
      {
        $push: { votes: { user: userId, type: voteType } },
      }
    );
  }
};

postSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

postSchema.virtual("votesTotal").get(function () {
  return this.votes.reduce(
    (acc: number, vote: any) => acc + (vote.type ? 1 : -1),
    0
  );
});

type PostSchemaType = InferSchemaType<typeof postSchema>;

export interface PostDocument extends Document, PostSchemaType {}
interface PostModel extends Model<PostDocument> {
  pagination(
    pageNumber: number,
    sort: number,
    limit: number,
    tag?: string
  ): Promise<{ posts: PostDocument[]; pages: number }>;

  vote(
    postId: string,
    { userId, voteType }: { userId: string; voteType: boolean }
  ): Promise<void>;
}

const Post =
  (models.Post as PostModel) ||
  model<PostModel, PostDocument>("Post", postSchema);

export default Post;
