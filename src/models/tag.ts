import {
  Schema,
  model,
  models,
  InferSchemaType,
  Document,
  Model,
} from "mongoose";

import slugify from "slugify";

const tagSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Tag name is required"],
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name must not exceed 100 characters"],
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
      maxlength: [200, "Description must not exceed 200 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field(_id: id)
tagSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Middleware: generate slug if not provided
tagSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

type TagSchemaType = InferSchemaType<typeof tagSchema>;

export interface TagDocument extends Document, TagSchemaType {}

interface TagModel extends Model<TagDocument> {}

const Tag =
  (models.Tag as TagModel) || model<TagDocument, TagModel>("Tag", tagSchema);

export default Tag;