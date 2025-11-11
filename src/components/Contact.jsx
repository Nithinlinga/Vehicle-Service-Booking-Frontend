import { useState } from 'react';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [mapUrl, setMapUrl] = useState("https://www.google.com/maps?q=0,0&z=1&output=embed");

  const handleLocationAccess = () => {
  if (!navigator.geolocation) {
    toast.error("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log("Your location:", latitude, longitude);

      const updatedUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
      setMapUrl(updatedUrl);
      toast.success("Location access granted! Map updated.");
    },
    (error) => {
      console.error("Geolocation error:", error);
      switch (error.code) {
        case error.PERMISSION_DENIED:
          toast.error("Permission denied. Please allow location access.");
          break;
        case error.POSITION_UNAVAILABLE:
          toast.error("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          toast.error("Location request timed out.");
          break;
        default:
          toast.error("An unknown error occurred.");
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
};


  return (
    <div style={{ padding: "9rem 0 5rem 0", textAlign: "center" }}>
      <button
        onClick={handleLocationAccess}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Show My Location on Map
      </button>

      <iframe
        id="map-iframe"
        src={mapUrl}
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
