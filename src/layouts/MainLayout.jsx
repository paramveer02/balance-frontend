import { Outlet } from 'react-router';
import { Navbar } from '../components';
import { Footer } from '../components';
import { AuthContextProvider } from '../context/AuthContext';
const MainLayout = () => {
  return (
    <AuthContextProvider>
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </AuthContextProvider>
  );
};

export default MainLayout;
