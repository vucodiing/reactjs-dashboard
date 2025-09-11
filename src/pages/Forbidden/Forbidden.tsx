import { useNavigate } from "react-router-dom";
import { Home } from "@mui/icons-material";
import { Button } from "@mui/material";
import styles from "./Forbidden.module.scss";
export default function Forbidden() {
  const navigate = useNavigate();
  return (
    <div className={styles.forbidden}>
      <h1>403</h1>
      <p>Forbidden</p>
      <Button
        variant="contained"
        startIcon={<Home />}
        onClick={() => navigate("/", { replace: true })}
      >
        HOME
      </Button>
    </div>
  );
}
