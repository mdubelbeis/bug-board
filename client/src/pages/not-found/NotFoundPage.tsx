const NotFoundPage = () => {
  return (
    <main>
      <section>
        <h1>404 - Page not found</h1>

        <p>
          Sorry, we couldn’t find the page you were looking for. The link may be broken, the page
          may have moved, or you may not have access to it.
        </p>

        <div>
          <a href='/'>Go Home</a>
          <a href='/dashboard'>Back to Dashboard</a>
        </div>
      </section>

      <section>
        <h2>Helpful links</h2>

        <ul>
          <li>
            <a href='/projects'>View Projects</a>
          </li>
          <li>
            <a href='/bugs'>View Bugs</a>
          </li>
          <li>
            <a href='/account'>Account Settings</a>
          </li>
          <li>
            <a href='/login'>Log In</a>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default NotFoundPage;
