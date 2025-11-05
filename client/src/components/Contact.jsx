import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Contact = () => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const iframe = document.getElementById('map-iframe');
          if (iframe) {
            const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
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
      toast.error("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div style={{ padding: "9rem 0 5rem 0", textAlign: "center" }}>
      <iframe
        id="map-iframe"
        src="https://www.google.com/maps?q=0,0&z=1&output=embed"
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
        <div className="contact-form" style={{ maxWidth: "50rem", margin: "auto", marginLeft: "250px" }}>
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
