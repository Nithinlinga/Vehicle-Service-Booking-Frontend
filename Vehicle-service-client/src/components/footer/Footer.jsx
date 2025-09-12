import { Link, NavLink } from "react-router-dom";
import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      {/* Contact Short Section */}
      {/* <section className="max-w-[90vw] md:max-w-[60vw] mx-auto p-8 md:p-[5rem_10rem] rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold">Ready to get started?</h3>
            <h3 className="text-xl font-semibold">Talk to us today</h3>
          </div>
          <div className="justify-self-center md:justify-self-end self-center">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
              <NavLink to="/">Get Started</NavLink>
            </button>
          </div>
        </div>
      </section> */}

      {/* Footer Section */}
      <footer className="pt-10 md:pt-20 pb-6">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
          {/* About */}
          <div className="mb-8 sm:mb-0 text-center sm:text-left">
            <h3 className="text-xl font-extrabold mb-4">Xcelerate Auto</h3>
            <p className="text-gray-600 dark:text-gray-400 font-semibold">
              Book. Service. Drive happy
            </p>
          </div>

          {/* Subscribe */}
          <div className="mb-8 sm:mb-0 text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Subscribe to get important updates</h3>
            <form
              action="#"
              method="POST"
              className="flex flex-col gap-4 items-center sm:items-stretch"
            >
              <input
                type="email"
                name="email"
                placeholder="YOUR E-MAIL"
                className="p-3 rounded outline-1 text-black placeholder-gray-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              />
              <NavLink to="/" className="w-full sm:w-auto">
                <input
                  type="submit"
                  value="subscribe"
                  className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/30 transition hover:-translate-y-0.5 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full cursor-pointer"
                />
              </NavLink>
            </form>
          </div>

          {/* Social */}
          <div className="mb-8 sm:mb-0 text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4 justify-center sm:justify-start">
              <Link
                to="#"
                className="p-3 rounded-full border border-gray-300 hover:bg-green-300 transition dark:hover:bg-gray-600"
              >
                <FaDiscord className="text-2xl cursor-pointer" />
              </Link>
              <Link
                to="#"
                className="p-3 rounded-full border border-gray-300 hover:bg-green-300 transition dark:hover:bg-gray-600"
              >
                <FaInstagram className="text-2xl cursor-pointer" />
              </Link>
              <Link
                to="#"
                className="p-3 rounded-full border border-gray-300 hover:bg-green-300 transition dark:hover:bg-gray-600"
              >
                <FaYoutube className="text-2xl cursor-pointer" />
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="mb-8 sm:mb-0 text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-2">Call Us</h3>
            <h3 className="text-lg font-semibold">+91 12345678978</h3>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 md:pt-36 px-4">
          <hr className="mb-4 border-gray-300" />
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center text-center md:text-left">
            <p className="text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
              @{new Date().getFullYear()} Xcelerate Auto. All Rights Reserved
            </p>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center md:justify-end text-gray-600 dark:text-gray-400">
              <p className="cursor-pointer hover:underline">PRIVACY POLICY</p>
              <p className="cursor-pointer hover:underline">TERMS & CONDITIONS</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;