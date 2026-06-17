const LandingPage = () => {
  return (
    <main>
      <section>
        <p>Bug-Board</p>
        <h1>Track bugs, manage projects, and keep development work organized.</h1>
        <p>
          Bug-Board helps developers and teams manage software projects, track issues, assign
          priorities, update statuses, and keep conversations connected to the work that matters.
        </p>

        <div>
          <a href='/signup'>Get Started</a>
          <a href='/login'>Log In</a>
        </div>
      </section>

      <section>
        <h2>Built for simple issue tracking</h2>
        <p>Manage projects, bugs, priorities, severities, and comments from one clean dashboard.</p>

        <div>
          <article>
            <h3>Project Management</h3>
            <p>Create and organize projects so every bug is connected to the right workspace.</p>
          </article>

          <article>
            <h3>Bug Tracking</h3>
            <p>Track bugs by status, priority, severity, project, and update history.</p>
          </article>

          <article>
            <h3>Team Discussion</h3>
            <p>Keep comments attached to bugs so conversations stay tied to the issue.</p>
          </article>
        </div>
      </section>

      <section>
        <h2>Focus on what needs attention</h2>
        <p>
          See open bugs, high-priority issues, recent updates, and project activity from your
          dashboard.
        </p>

        <ul>
          <li>View all active projects</li>
          <li>Review open and in-progress bugs</li>
          <li>Identify high-priority and critical issues</li>
          <li>Open bug details and review comments</li>
        </ul>
      </section>

      <section>
        <h2>Ready to clean up your bug workflow?</h2>
        <p>Create an account, add your first project, and start tracking issues in minutes.</p>

        <a href='/signup'>Create Account</a>
      </section>
    </main>
  );
};

export default LandingPage;
