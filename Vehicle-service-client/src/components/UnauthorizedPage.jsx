import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const UnauthorizedPage = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <>
      <Loader/>
      <p className="mt-4 text-lg font-semibold">
        You are not authorised to visit this page.
      </p>
      <p className="mt-2 text-sm text-gray-600">
        Redirecting to home page in <strong>{countdown}</strong> seconds...
      </p>
      </>
    </div>
  );
};

export default UnauthorizedPage;