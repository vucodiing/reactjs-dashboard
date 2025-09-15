import { Snackbar, Alert } from "@mui/material";
import { useAlertStore } from "../../store/alertStore";
export default function AlertGlobal() {
  const { open, message, severity, close } = useAlertStore();
  return (
    <Snackbar
      sx={{ width: "300px" }}
      open={open}
      autoHideDuration={3000}
      onClose={close}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert sx={{ width: "100%" }} variant="filled" severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}
