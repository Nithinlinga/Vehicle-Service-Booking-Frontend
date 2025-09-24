import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InitialForm from './InitialForm';
import MechanicServices from '../../services/MechanicServices';
import { useSelector } from 'react-redux';

const MechanicEntry = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const mecId = user?.id; 
    if (mecId !== undefined && isAuthenticated) {
      navigate('/mechanic/dashboard');
    }
  }, [navigate]);

  return <InitialForm />;
};

export default MechanicEntry;
