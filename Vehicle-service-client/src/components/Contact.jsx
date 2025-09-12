
import { useEffect } from 'react';
import {toast} from 'react-hot-toast'
const Contact = () => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          const iframe = document.getElementById('map-iframe');
          
          if (iframe) {
            const mapUrl = `https://maps.google.com/maps?q=$${latitude},${longitude}&z=15&output=embed`;
            iframe.src = mapUrl;
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("We couldn't get your location. Please allow location access to see the map.");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div style={{ padding: "9rem 0 5rem 0", textAlign: "center" }}>
      <iframe
        id="map-iframe" // Added an ID for easy access in JavaScript
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15660.597564449428!2d76.96732189780161!3d11.102241795111619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f7ebb2ab3ee1%3A0xa5ecd0139f3f502f!2sCognizant%20Technology%20Solutions!5e0!3m2!1sen!2sin!4v1755664896984!5m2!1sen!2sin" // A default source that will be replaced
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <br />
      <br />
      <h1 className="text-4xl font-extrabold">Any Queries...</h1>
      <div className="container" style={{ marginTop: "3rem" }}>
        <div className="contact-form" style={{ maxWidth: "50rem", margin: "auto" , marginLeft : "250px" }}>
          <form
            action="#"
            method="POST"
            className="contact-inputs"
            style={{ display: "flex", flexDirection: "column", gap: "3rem" }}
          >
            <input
              type="text"
              placeholder="username"
              name="username"
              required
              autoComplete="off"
              className="p-3 rounded outline-1 text-black placeholder-gray-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              name="Email"
              placeholder="Email"
              autoComplete="off"
              required
              className="p-3 rounded outline-1 text-black placeholder-gray-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <textarea
              name="Message"
              cols="30"
              rows="10"
              required
              autoComplete="off"
              placeholder="Enter your message"
              className="p-3 rounded outline-1 text-black placeholder-gray-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
            <input
              type="submit"
              value="send"
              className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/30 transition hover:-translate-y-0.5 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;