import { Link, NavLink } from "react-router-dom";
import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";
import { useState } from "react";

// Reusable modal for both policies
const PolicyModal = ({ type, onClose }) => {
  if (!type) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 min-w-[320px] max-w-[90vw] max-h-[80vh] overflow-y-auto relative">
        <button
          className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        {type === "privacy" && (
          <>
            <h2 className="text-3xl font-extrabold mb-4 text-blue-700">Privacy Policy</h2>
            <p className="mb-4 text-gray-700">
              At <span className="font-extrabold text-blue-600 text-xl">Xelerate Auto</span>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our vehicle service booking system.
            </p>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">1. Information We Collect</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Personal details such as name, contact number, and email address.</li>
              <li>Vehicle information for service bookings.</li>
              <li>Usage data and cookies for improving our platform.</li>
            </ul>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">2. How We Use Your Information</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>To process and manage your service bookings.</li>
              <li>To communicate updates and confirmations.</li>
              <li>To improve our services and user experience.</li>
            </ul>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">3. Data Security</h3>
            <p className="mb-4 text-gray-700">
              We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure.
            </p>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">4. Sharing of Information</h3>
            <p className="mb-4 text-gray-700">
              We do not sell or rent your personal information. We may share data with trusted partners only to provide our services or comply with legal obligations.
            </p>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">5. Your Choices</h3>
            <p className="mb-4 text-gray-700">
              You may update or request deletion of your personal information by contacting us at <a href="mailto:support@xelerateauto.com" className="text-blue-600 underline">support@xelerateauto.com</a>.
            </p>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">6. Changes to This Policy</h3>
            <p className="mb-4 text-gray-700">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
            </p>
            <p className="text-sm text-gray-500 mt-8">Last updated: September 13, 2025</p>
          </>
        )}
        {type === "terms" && (
          <>
            <h1 className="text-3xl font-extrabold mb-6 text-blue-700">Terms & Conditions</h1>
            <p className="mb-4 text-gray-700">
              Welcome to <span className="font-extrabold text-blue-600 text-xl">Xelerate Auto</span>. By accessing or using our vehicle service booking system, you agree to be bound by the following terms and conditions. Please read them carefully.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">1. Service Overview</h2>
            <p className="mb-4 text-gray-700">
              Xelerate Auto provides an online platform for booking vehicle maintenance and repair services. All bookings are subject to availability and confirmation.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">2. User Responsibilities</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Provide accurate and complete information during booking.</li>
              <li>Arrive on time for your scheduled service appointment.</li>
              <li>Notify us promptly if you need to reschedule or cancel.</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">3. Booking & Payment</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>All bookings are subject to confirmation by Xelerate Auto.</li>
              <li>Payment terms will be communicated during the booking process.</li>
              <li>We reserve the right to cancel bookings in case of non-payment or incorrect information.</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">4. Cancellations & Refunds</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Cancellations must be made at least 24 hours before the scheduled service.</li>
              <li>Refunds, if applicable, will be processed according to our refund policy.</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">5. Limitation of Liability</h2>
            <p className="mb-4 text-gray-700">
              Xelerate Auto is not liable for any indirect, incidental, or consequential damages arising from the use of our platform or services.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">6. Changes to Terms</h2>
            <p className="mb-4 text-gray-700">
              We reserve the right to update or modify these terms at any time. Continued use of the platform constitutes acceptance of the revised terms.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">7. Contact Us</h2>
            <p className="mb-4 text-gray-700">
              If you have any questions about these Terms & Conditions, please contact us at <a href="mailto:support@xelerateauto.com" className="text-blue-600 underline">support@xelerateauto.com</a>.
            </p>
            <p className="text-sm text-gray-500 mt-8">Last updated: September 13, 2025</p>
          </>
        )}
      </div>
    </div>
  );
};

const Footer = () => {
  const [modalContent, setModalContent] = useState(null);
  const handleOpen = (type) => setModalContent(type);
  const handleClose = () => setModalContent(null);

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
            <h3 className="text-xl font-extrabold mb-4 ml-25">Xcelerate Auto</h3>
            <p className="text-gray-600 dark:text-gray-400 font-semibold ml-20">
              Book. Service. Drive happy
            </p>
          </div>

          {/* Subscribe */}
          <div className="mb-8 sm:mb-0 text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4 ml-20">Subscribe to get important updates</h3>
            <form
              action="#"
              method="POST"
              className="flex flex-col gap-4 items-center sm:items-stretch"
            >
              <input
                type="email"
                name="email"
                placeholder="YOUR E-MAIL"
                className="p-3 rounded outline-1 text-black placeholder-gray-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 w-full ml-20"
              />
              <NavLink to="/" className="w-full sm:w-auto">
                <input
                  type="submit"
                  value="subscribe"
                  className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/30 transition hover:-translate-y-0.5 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full cursor-pointer ml-20"
                />
              </NavLink>
            </form>
          </div>

          {/* Social */}
          <div className="mb-8 sm:mb-0 text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4 ml-30">Follow Us</h3>
            <div className="flex gap-4 justify-center sm:justify-start">
              <Link
                to="#"
                className="p-3 rounded-full border border-gray-300 hover:bg-green-300 transition dark:hover:bg-gray-600 ml-20"
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
            <h3 className="text-lg font-semibold mb-2 ml-15">Call Us</h3>
            <h3 className="text-lg font-semibold ml-14">+91 12345678978</h3>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 md:pt-36 px-4">
          <hr className="mb-4 border-gray-300" />
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center text-center md:text-left">
            <p className="text-gray-600 dark:text-gray-400 mb-2 md:mb-0 ml-20">
              @{new Date().getFullYear()} Xcelerate Auto. All Rights Reserved
            </p>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center md:justify-end text-gray-600 dark:text-gray-400 ">
              <p
                className="uppercase no-underline tracking-[0.06em] inline-block px-2.5 py-2 relative after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:bg-black dark:after:bg-white after:transition-all hover:after:w-full hover:after:left-0 cursor-pointer"
                onClick={() => handleOpen("privacy")}
              >
                PRIVACY POLICY
              </p>
              <p
                className="uppercase no-underline tracking-[0.06em] inline-block px-2.5 py-2 relative after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:bg-black dark:after:bg-white after:transition-all hover:after:w-full hover:after:left-0 cursor-pointer"
                onClick={() => handleOpen("terms")}
              >
                TERMS & CONDITIONS
              </p>
            </div>
            <PolicyModal type={modalContent} onClose={handleClose} />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;