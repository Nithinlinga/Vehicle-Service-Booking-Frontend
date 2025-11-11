import { Link } from 'react-router-dom'

const SessionExpiredPage = () => {
  return (
    <section className="bg-white dark:bg-gray-900 transition-colors duration-700">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-6xl tracking-tight font-extrabold lg:text-8xl text-cyan-600 dark:text-cyan-500">
            Session Expired
          </h1>
          <p className="mb-4 text-2xl tracking-tight font-bold text-gray-900 md:text-3xl dark:text-white">
            Your session has timed out.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            For security reasons, you’ve been logged out. Please log in again to continue.
          </p>
          <Link
            to="/login"
            className="
              inline-flex items-center justify-center
              rounded-md bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white
              shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-700
              focus:outline-none focus:ring-2 focus:ring-cyan-400
              dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:focus:ring-cyan-300
              my-4
            "
          >
            Go to Login
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SessionExpiredPage
