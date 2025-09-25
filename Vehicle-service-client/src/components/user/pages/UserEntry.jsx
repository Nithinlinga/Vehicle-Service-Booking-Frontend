import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StartForm from './StartForm';
import UserServices from '../../services/UserServices';
import { useSelector } from 'react-redux';
import UserDashboard from './UserDashboard';

const UserEntry = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [hasProfile, setHasProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserProfile = async () => {
      // Only proceed if the user is authenticated and we have their ID
      if (isAuthenticated && user?.id) {
        try {
          const response = await UserServices.getAllUsers();
          const allUsers = response.data;
          // Check if the current user's ID exists in the list of users
          const userHasProfile = allUsers.some(
            (userItem) => userItem.userId === user.id
          );
          
          setHasProfile(userHasProfile);
        } catch (error) {
          console.error("Error fetching user profiles:", error);
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
    
    checkUserProfile();
  }, [isAuthenticated, user?.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render the appropriate component based on the profile check
  return hasProfile ? <UserDashboard /> : <InitialForm />;
};

export default UserEntry;
