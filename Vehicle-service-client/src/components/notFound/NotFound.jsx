import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    // <h1 className='text-center text-red-600 mt-8'>404 Page Not Found</h1>
    <section className="bg-white dark:bg-gray-900 transition-colors duration-700">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
          <Link
            to="/"
            className="
    inline-flex items-center justify-center
    rounded-md bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white
    shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-700
    focus:outline-none focus:ring-2 focus:ring-cyan-400
    dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:focus:ring-cyan-300
    my-4
  "
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound