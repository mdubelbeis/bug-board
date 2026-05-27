import mongoose from 'mongoose';

const bugSchema = new mongoose.Schema(
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
    status: {
      type: String,
      default: 'OPEN',
      uppercase: true,
      trim: true,
      enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
    },
    priority: {
      type: String,
      uppercase: true,
      trim: true,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      required: [true, 'Bug priority is required'],
    },
    severity: {
      type: String,
      uppercase: true,
      trim: true,
      enum: ['MINOR', 'MAJOR', 'BLOCKING'],
      required: [true, 'Bug severity is required'],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    // TODO: FOR DEV PURPOSES: owner is currently accepted from request body until auth is implemented.
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Bug = mongoose.model('Bug', bugSchema);

export default Bug;
