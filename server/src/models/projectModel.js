import mongoose from 'mongoose';

// TODO: Implement coumpound index after implementing auth -> Auth user cannot have duplicate project names
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
