import { useLocation } from "react-router-dom";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import styles from './Breadcrumb.module.scss'
export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (


    <Breadcrumbs separator="›" aria-label="breadcrumb" className={styles.breadcrumb}>
      {pathnames.map((value, index) => {
        const to = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;
        return (
          <div>
            {isLast ? (
              <Typography key="3" sx={{ color: "text.primary" }}>
                {value}
              </Typography>
            ) : (
              <Link underline="hover" color="inherit" href={to}>
                {value}
              </Link>
            )}
          </div>
        );
      })}
    </Breadcrumbs>
  );
}
