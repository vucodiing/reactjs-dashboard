import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

export default function Layout() {
  return (
    <div className={styles.appLayout}>
      <Sidebar />
      <div className={styles.appMain}>
        <Navbar />
        <div className={styles.appContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
