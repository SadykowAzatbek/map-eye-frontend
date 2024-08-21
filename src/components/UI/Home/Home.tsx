import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectLoginLoading } from '../../../features/users/usersSlice';
import { appRoutes } from '../../../utils/constants.ts';

const Home = () => {
  const loading = useAppSelector(selectLoginLoading);

  if (loading) return <div>Loading...</div>;
  
  return (
    <Navigate to={appRoutes.home} />
  );
};

export default Home;
