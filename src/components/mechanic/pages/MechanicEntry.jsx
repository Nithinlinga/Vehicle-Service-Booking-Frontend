import { useEffect, useState } from 'react';
import InitialForm from './InitialForm';
import MechanicServices from '../../services/MechanicServices';
import { useSelector } from 'react-redux';
import MechanicDashboard from '../MechanicDashboard';
import Loader from '../../Loader';
import { getAuthHeader } from '../../../utils/getAuthHeader';
import { useNavigate } from 'react-router-dom';

const MechanicEntry = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [hasProfile, setHasProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
  const checkMechanicProfile = async () => {
    if (!isAuthenticated || !user?.id || !user?.role) {
      navigate('/login?role=mechanic');
      return;
    }
    try {
      const response = await MechanicServices.getMechanic();
      console.log('Fetched user profile:', response.data);

      // Check if profile exists based on responseStatus
      setHasProfile(response.data?.responseStatus === 'SUCCESS');
    } catch (error) {
      console.error("Error fetching mechanic profiles:", error);
      setHasProfile(false);
    } finally {
      setIsLoading(false);
    }
  };

  checkMechanicProfile();
}, [isAuthenticated, user?.id, user?.role, navigate]);


  if (isLoading) {
    return <Loader/>;
  }
  return hasProfile ? <MechanicDashboard /> : <InitialForm />;
};

export default MechanicEntry;
