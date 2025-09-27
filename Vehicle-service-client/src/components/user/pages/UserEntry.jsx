import { useEffect, useState } from 'react';
import StartForm from './StartForm';
import UserServices from '../../services/UserServices';
import { useSelector } from 'react-redux';
import UserDashboard from './UserDashboard';
import Loader from '../../Loader';

const UserEntry = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [hasProfile, setHasProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserProfile = async () => {
      if (isAuthenticated && user?.id) {
        try {
          const response = await UserServices.getAllUsers();
          const allUsers = response.data;
          const userHasProfile = allUsers.some(
            (userItem) => userItem.userId === user.id
          );

          setHasProfile(userHasProfile);
        } catch (error) {
          console.error("Error fetching user profiles:", error);
          setHasProfile(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setHasProfile(false);
        setIsLoading(false);
      }
    };

    checkUserProfile();
  }, [isAuthenticated, user?.id]);

  if (isLoading) {
    return <Loader />;
  }
  return hasProfile ? <UserDashboard /> : <StartForm />;
};

export default UserEntry;
