import { useEffect, useState } from 'react';
import StartForm from './StartForm';
import UserDashboard from './UserDashboard';
import Loader from '../../Loader';
import UserServices from '../../services/UserServices';
import { useSelector } from 'react-redux';
import { getAuthHeader } from '../../../utils/getAuthHeader';
import { useNavigate } from 'react-router-dom';

const UserEntry = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [hasProfile, setHasProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isAuthenticated || !user?.id || !user?.role) {
        navigate('/login?role=user');
        return;
      }

      try {

        const response = await UserServices.getUserProfile();
        console.log('Fetched user profile:', response.data);

        // Check if profile exists (non-null, non-empty)
        setHasProfile(response.data && Object.keys(response.data).length > 0);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setHasProfile(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, user?.id, user?.role, navigate]);

  if (isLoading) return <Loader />;

  return hasProfile ? <UserDashboard /> : <StartForm />;
};

export default UserEntry;
