const SignupPage = () => {
  return (
    <form>
      <div>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' />
      </div>
      <div>
        <button type='submit'>Signup</button>
      </div>
    </form>
  );
};

export default SignupPage;
