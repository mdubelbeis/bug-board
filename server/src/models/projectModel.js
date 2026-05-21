import mongoose from 'mongoose';

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
    owner: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'User',
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
