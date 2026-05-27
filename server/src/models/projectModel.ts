import mongoose from 'mongoose';

// TODO: Prevent duplicate project titles per user after auth ownership is implemented.
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'A title is required'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A description is required'],
    },
    // TODO: FOR DEV PURPOSES: owner is currently accepted from request body until auth is implemented.
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A user is required'],
      cast: 'Invalid user id: {VALUE}',
    },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
