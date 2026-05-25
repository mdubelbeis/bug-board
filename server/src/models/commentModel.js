import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      trim: true,
      required: [true, 'A body is required'],
    },
    bug: { type: mongoose.Schema.Types.ObjectId, ref: 'Bug', required: true },
    // TODO: FOR DEV PURPOSES: owner is currently accepted from request body until auth is implemented.

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
