import { createContext, useEffect, useState } from 'react';
import { me } from '../data/auth';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await me();
        setUser(userData);
        setIsAuth(true);
      } catch (error) {
        console.log('Invalid Token');
      }
    };

    getUser();
  }, []);

  const values = {
    user,
    setUser,
    isAuth,
    setIsAuth,
  };

  return <AuthContext value={values}>{children}</AuthContext>; //to do value instead of 'values'
};

export { AuthContextProvider, AuthContext };
