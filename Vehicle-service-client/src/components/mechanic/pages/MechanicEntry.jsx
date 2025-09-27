import { useEffect, useState } from 'react';
import InitialForm from './InitialForm';
import MechanicServices from '../../services/MechanicServices';
import { useSelector } from 'react-redux';
import MechanicDashboard from '../MechanicDashboard';
import Loader from '../../Loader';

const MechanicEntry = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [hasProfile, setHasProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMechanicProfile = async () => {
      if (isAuthenticated && user?.id) {
        try {
          const response = await MechanicServices.getMechanics();
          const allMechanics = response.data;
          const userHasProfile = allMechanics.some(
            (mechanic) => mechanic.mechanicId === user.id
          );
          
          setHasProfile(userHasProfile);
        } catch (error) {
          console.error("Error fetching mechanic profiles:", error);
          setHasProfile(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setHasProfile(false);
        setIsLoading(false);
      }
    };
    
    checkMechanicProfile();
  }, [isAuthenticated, user?.id]);

  if (isLoading) {
    return <Loader/>;
  }
  return hasProfile ? <MechanicDashboard /> : <InitialForm />;
};

export default MechanicEntry;
