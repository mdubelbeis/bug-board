import { useLoaderData } from 'react-router-dom';
import type { User } from '../../types/auth.ts';

// TODO: Edit Profile
// - update name
// - update email

// TODO: Change Password
// - current password
// - new password
// - confirm new password

const AccountPage = () => {
  const user = useLoaderData() as User;
  const { name, email, createdAt, updatedAt } = user;
  return (
    <main>
      <section>
        <h2>Account Overview</h2>
        <p>{name}</p>
        <p>{email}</p>
        <p>{new Date(createdAt).toLocaleString()}</p>
        <p>{new Date(updatedAt).toLocaleString()}</p>
      </section>
      <section>
        <h2>Profile Settings</h2>
        <button>Edit name</button>
        <button>Edit email</button>
      </section>
      <section>
        <h2>Security</h2>
        <button>Change Password</button>
      </section>
    </main>
  );
};

export default AccountPage;
