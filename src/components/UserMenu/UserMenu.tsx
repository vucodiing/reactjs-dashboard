import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  MenuItem,
  Menu,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
export default function BasicMenu() {
  const navigate = useNavigate();
  const { avatarSrc, logout } = useUserStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showDialogConfirmLogout, setShowDialogConfirmLogout] = React.useState<boolean>(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div>
      <IconButton onClick={handleClick} sx={{ p: 0 }}>
        <Avatar alt="VuCodiing" src={avatarSrc} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate('/change-password', { replace: true });
          }}
        >
          Change password
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setShowDialogConfirmLogout(true);
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      <Dialog open={showDialogConfirmLogout} onClose={handleClose}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningAmberIcon color="warning" />
          CONFIRM LOGOUT
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to log out?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialogConfirmLogout(false)}>Huỷ</Button>
          <Button onClick={handleLogout} color="error" variant="contained" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
