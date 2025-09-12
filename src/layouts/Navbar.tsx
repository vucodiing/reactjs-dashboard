import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import { userStore } from "../store/UserStore";
import { useSettingStore } from "../store/useSettingStore";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "./Navbar.module.scss";
export default function Navbar() {
  const { infoUser } = userStore();
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

      <div className={styles.navbar__user}>
        <AccountCircleIcon />
        <p>{infoUser?.name}</p>
      </div>
    </div>
  );
}
