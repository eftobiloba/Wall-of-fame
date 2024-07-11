import { useContext } from 'react';
import { AuthApi, TokenApi } from '../App';

const useAuth = () => {
  const { auth } = useContext(AuthApi);
  const { token } = useContext(TokenApi);

  return { auth, token };
};

export default useAuth;
