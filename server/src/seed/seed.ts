import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

import Bug from '../models/bugModel.js';
import Comment from '../models/commentModel.js';
import Project from '../models/projectModel.js';
import User from '../models/userModel.js';

const DEMO_EMAIL = 'demo@bugboard.dev';
const SECOND_USER_EMAIL = 'second@bugboard.dev';

const connectDatabase = async () => {
  if (!process.env.DB_CLOUD) {
    throw new Error('DATABASE_URL is not defined');
  }

  await mongoose.connect(process.env.DB_CLOUD);
  console.log('Connected to MongoDB');
};

const clearDemoData = async () => {
  const demoUsers = await User.find({
    email: {
      $in: [DEMO_EMAIL, SECOND_USER_EMAIL],
    },
  });

  const demoUserIds = demoUsers.map((user) => user._id);

  const demoProjects = await Project.find({
    owner: {
      $in: demoUserIds,
    },
  });

  const demoProjectIds = demoProjects.map((project) => project._id);

  const demoBugs = await Bug.find({
    project: {
      $in: demoProjectIds,
    },
  });

  const demoBugIds = demoBugs.map((bug) => bug._id);

  await Comment.deleteMany({
    bug: {
      $in: demoBugIds,
    },
  });

  await Bug.deleteMany({
    project: {
      $in: demoProjectIds,
    },
  });

  await Project.deleteMany({
    owner: {
      $in: demoUserIds,
    },
  });

  await User.deleteMany({
    email: {
      $in: [DEMO_EMAIL, SECOND_USER_EMAIL],
    },
  });

  console.log('Cleared existing demo data');
};

const seed = async () => {
  try {
    await connectDatabase();
    await clearDemoData();

    const demoUser = await User.create({
      name: 'Demo User',
      email: DEMO_EMAIL,
      password: 'password123',
      passwordConfirm: 'password123',
    });

    const secondUser = await User.create({
      name: 'Second User',
      email: SECOND_USER_EMAIL,
      password: 'password123',
      passwordConfirm: 'password123',
    });

    const apiProject = await Project.create({
      title: 'Bug-Board API',
      description:
        'Express and MongoDB backend for authentication, projects, bugs, and comments.',
      owner: demoUser._id,
    });

    const clientProject = await Project.create({
      title: 'Bug-Board Client',
      description:
        'Frontend dashboard for managing projects, bugs, comments, and account workflows.',
      owner: demoUser._id,
    });

    const deploymentProject = await Project.create({
      title: 'Deployment',
      description:
        'Production deployment setup for the API, database, and frontend client.',
      owner: demoUser._id,
    });

    const privateProject = await Project.create({
      title: 'Private Test Project',
      description:
        'This project belongs to the second user and should not be visible to the demo user.',
      owner: secondUser._id,
    });

    const bugs = await Bug.create([
      {
        title: 'JWT token expires but frontend does not redirect',
        description:
          'When the token expires, the client should clear auth state and redirect to login.',
        status: 'OPEN',
        priority: 'HIGH',
        severity: 'MAJOR',
        project: apiProject._id,
        createdBy: demoUser._id,
      },
      {
        title: 'User can create bug without project ownership',
        description:
          'The API should reject bug creation when the project does not belong to the authenticated user.',
        status: 'RESOLVED',
        priority: 'CRITICAL',
        severity: 'BLOCKING',
        project: apiProject._id,
        createdBy: demoUser._id,
      },
      {
        title: 'Error response missing field-level details',
        description:
          'Validation errors should return a consistent errors array for form display.',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        severity: 'MINOR',
        project: apiProject._id,
        createdBy: demoUser._id,
      },
      {
        title: 'Signup form does not show password mismatch',
        description:
          'The signup page should clearly display a validation message when password confirmation fails.',
        status: 'OPEN',
        priority: 'HIGH',
        severity: 'MAJOR',
        project: clientProject._id,
        createdBy: demoUser._id,
      },
      {
        title: 'Dashboard project count is incorrect',
        description:
          'The dashboard summary is showing the wrong number of user-owned projects.',
        status: 'OPEN',
        priority: 'MEDIUM',
        severity: 'MINOR',
        project: clientProject._id,
        createdBy: demoUser._id,
      },
      {
        title: 'Mobile sidebar overlaps content',
        description:
          'On small screens, the app navigation overlaps the main dashboard content.',
        status: 'IN_PROGRESS',
        priority: 'LOW',
        severity: 'MINOR',
        project: clientProject._id,
        createdBy: demoUser._id,
      },
      {
        title: 'CORS blocks deployed frontend',
        description:
          'The deployed frontend cannot reach the deployed API because the production origin is not allowed.',
        status: 'OPEN',
        priority: 'HIGH',
        severity: 'MAJOR',
        project: deploymentProject._id,
        createdBy: demoUser._id,
      },
      {
        title: 'Missing production environment variable',
        description:
          'The API fails during deployment when JWT_SECRET or DATABASE_URL is not configured.',
        status: 'RESOLVED',
        priority: 'CRITICAL',
        severity: 'BLOCKING',
        project: deploymentProject._id,
        createdBy: demoUser._id,
      },
      {
        title: 'Health check endpoint fails on Render',
        description:
          'The deployment platform needs a reliable health endpoint to confirm the API is running.',
        status: 'CLOSED',
        priority: 'MEDIUM',
        severity: 'MINOR',
        project: deploymentProject._id,
        createdBy: demoUser._id,
      },
      {
        title: 'This should not be visible to demo user',
        description:
          'This bug belongs to the second user and is used to test ownership boundaries.',
        status: 'OPEN',
        priority: 'HIGH',
        severity: 'MAJOR',
        project: privateProject._id,
        createdBy: secondUser._id,
      },
    ]);

    const [
      tokenBug,
      ownershipBug,
      errorBug,
      signupBug,
      dashboardBug,
      mobileBug,
      corsBug,
      envBug,
    ] = bugs;

    if (
      !tokenBug ||
      !ownershipBug ||
      !errorBug ||
      !signupBug ||
      !dashboardBug ||
      !corsBug
    ) {
      throw new Error('Seed bug creation failed');
    }

    await Comment.create([
      {
        body: 'Need to add client-side handling for expired tokens.',
        bug: tokenBug!._id,
        author: demoUser._id,
      },
      {
        body: 'Backend should return 401 so the client can redirect cleanly.',
        bug: tokenBug._id,
        author: demoUser._id,
      },
      {
        body: 'Ownership check has been added to the create bug route.',
        bug: ownershipBug._id,
        author: demoUser._id,
      },
      {
        body: 'Need to confirm User B cannot create bugs under User A projects.',
        bug: ownershipBug._id,
        author: demoUser._id,
      },
      {
        body: 'Map Mongoose validation errors into field-level messages.',
        bug: errorBug._id,
        author: demoUser._id,
      },
      {
        body: 'Signup page should display server validation errors near the form.',
        bug: signupBug._id,
        author: demoUser._id,
      },
      {
        body: 'Check whether dashboard count is based on all projects or user-owned projects.',
        bug: dashboardBug._id,
        author: demoUser._id,
      },
      {
        body: 'Add production client URL to the CORS allowlist before frontend deploy.',
        bug: corsBug._id,
        author: demoUser._id,
      },
    ]);

    console.log('Seed completed successfully');
    console.log('');
    console.log('Demo user:');
    console.log(`Email: ${DEMO_EMAIL}`);
    console.log('Password: password123');
    console.log('');
    console.log('Second user:');
    console.log(`Email: ${SECOND_USER_EMAIL}`);
    console.log('Password: password123');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Seed failed:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seed();
