import { createContext, useEffect, useState } from 'react';
import { me } from '../data/auth';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await me();
        setUser(userData);
      } catch (error) {
        console.log('Invalid Token');
      }
    };

    getUser();
  }, []);

  const values = {
    user,
    setUser,
  };

  return <AuthContext value={values}>{children}</AuthContext>; //to do value instead of 'values'
};

export { AuthContextProvider, AuthContext };
