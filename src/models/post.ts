import User from "./user";
import Tag from "./tag";
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

postSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

type PostSchemaType = InferSchemaType<typeof postSchema>;

export interface PostDocument extends Document, PostSchemaType {}
interface PostModel extends Model<PostDocument> {}

const Post =
  (models.Post as PostModel) ||
  model<PostModel, PostDocument>("Post", postSchema);

export default Post;
