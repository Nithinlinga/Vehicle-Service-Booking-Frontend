import { useSelector } from 'react-redux';

export const WelcomeUser = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div>
      {isAuthenticated ? `Welcome, ${user.username}` : 'Please log in'}
    </div>
  );
};