import * as React from "react";
import mushroom from "../../service/api/mushroom-api";
import { LogoutMode } from "mushroomjs-auth";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useNavigate } from "react-router-dom";
export default function BasicMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showDialogConfirm, setShowDialogConfirm] =
    React.useState<boolean>(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await mushroom.$auth.logoutAsync({ mode: LogoutMode.InvalidClientSession });
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <IconButton onClick={handleClick} sx={{ p: 0 }}>
        <Avatar
          alt="VuCodiing"
          src="https://timwook.com/api/v2/file/thumb?id=6602817f71c39b0c049f117a&r=square&w=200"
        />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setShowDialogConfirm(true);
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      <Dialog open={showDialogConfirm} onClose={handleClose}>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningAmberIcon color="warning" />
          Xác nhận đăng xuất
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn đăng xuất không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialogConfirm(false)}>Huỷ</Button>
          <Button
            onClick={handleLogout}
            color="error"
            variant="contained"
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
