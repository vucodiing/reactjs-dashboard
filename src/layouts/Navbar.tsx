import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import { useSettingStore } from "../store/useSettingStore";
import MenuIcon from "@mui/icons-material/Menu";
import UserMenu from "../components/UserMenu/UserMenu"
import styles from "./Navbar.module.scss";
export default function Navbar() {
  const { toggleSidebar, isSidebarOpen, setSidebarOpen } = useSettingStore();
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__breadcrumbs}>
        <MenuIcon
          className={styles.navbar__menu}
          onClick={() => {
            toggleSidebar();
            setSidebarOpen(!isSidebarOpen);
          }}
        />
        <Breadcrumb />
      </div>

      <UserMenu />
    </div>
  );
}
