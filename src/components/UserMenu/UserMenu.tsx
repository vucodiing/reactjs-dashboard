import * as React from 'react';
import mushroom from '../../service/api/mushroom-api';
import { LogoutMode } from 'mushroomjs-auth';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
export default function BasicMenu() {
  const navigate = useNavigate();
  const { clearUser } = useUserStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showDialogConfirmLogout, setShowDialogConfirmLogout] = React.useState<boolean>(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    mushroom.$auth.logoutAsync({ mode: LogoutMode.InvalidClientSession });
    localStorage.clear();
    clearUser();
    navigate('/login', { replace: true });
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
