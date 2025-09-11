import { Home } from "@mui/icons-material";
import styles from "./NotFound.module.scss";
import { Button } from "@mui/material";
export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <p>Page Not Found</p>
      <Button variant="contained" startIcon={<Home />}>
        HOME
      </Button>
    </div>
  );
}
