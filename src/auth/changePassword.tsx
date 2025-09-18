import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../store/userStore';
import { useAlertStore } from '../store/alertStore';
import mushroom from '../service/api/mushroom-api';
export default function Login() {
  const { alertError } = useAlertStore();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const { infoUser } = userStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!oldPassword.trim()) newErrors.oldPassword = '⚠️ Please input old password';
    if (!newPassword.trim()) newErrors.newPassword = '⚠️ Please input new password';
    if (!confirmPassword.trim() || confirmPassword.trim() !== newPassword.trim())
      newErrors.confirmPassword = '⚠️ Password not match';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await mushroom.$auth.changePasswordAsync(
        infoUser?.account as string,
        oldPassword,
        newPassword
      );

      if (response.result?.id) navigate('/login', { replace: true });
    } catch {
      alertError('Password change failed. Please try again.');
    }
  };

  const handleFocus = (field: 'oldPassword' | 'newPassword' | 'confirmPassword') => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          CHANGE PASSWORD
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Old password"
            fullWidth
            margin="normal"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            onFocus={() => handleFocus('oldPassword')}
            error={!!errors.oldPassword}
            helperText={errors.oldPassword}
          />

          <TextField
            label="New password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onFocus={() => handleFocus('newPassword')}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
          />

          <TextField
            label="Confirm password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={() => handleFocus('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Change password
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
