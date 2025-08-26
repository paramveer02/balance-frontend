import { Outlet } from 'react-router';
import { Navbar } from '../components';
import { Footer } from '../components';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
