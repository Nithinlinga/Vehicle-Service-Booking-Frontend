import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InitialForm from './InitialForm'; // adjust path if needed

const MechanicEntry = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const profileCompleted = localStorage.getItem('profileCompleted');
    if (profileCompleted === 'true') {
      navigate('/mechanic/dashboard', { replace: true });
    }
  }, [navigate]);

  return <InitialForm />;
};

export default MechanicEntry;
