import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InitialForm from './InitialForm';
import MechanicServices from '../../services/MechanicServices';
import { useSelector } from 'react-redux';
import MechanicDashboard from '../MechanicDashboard';
import Loader from '../../Loader';

const MechanicEntry = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [hasProfile, setHasProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMechanicProfile = async () => {
      // Only proceed if the user is authenticated and we have their ID
      if (isAuthenticated && user?.id) {
        try {
          const response = await MechanicServices.getMechanics();
          const allMechanics = response.data;
          
          // Check if the current user's ID exists in the list of mechanics
          const userHasProfile = allMechanics.some(
            (mechanic) => mechanic.mechanicId === user.id
          );
          
          setHasProfile(userHasProfile);
        } catch (error) {
          console.error("Error fetching mechanic profiles:", error);
          setHasProfile(false); // Assume no profile on error
        } finally {
          setIsLoading(false);
        }
      } else {
        // If not authenticated or no user ID, no profile can exist
        setHasProfile(false);
        setIsLoading(false);
      }
    };
    
    checkMechanicProfile();
  }, [isAuthenticated, user?.id]);

  if (isLoading) {
    return <Loader/>;
  }

  // Render the appropriate component based on the profile check
  return hasProfile ? <MechanicDashboard /> : <InitialForm />;
};

export default MechanicEntry;
