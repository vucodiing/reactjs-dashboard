import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import mushroom from '../service/api/mushroom-api';
import type { MushroomError } from '../service/api/mushroom-api';
import { enqueueSnackbar } from 'notistack';
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const from = location.state?.from?.pathname || '/';
  const { setUser } = useUserStore();

  useEffect(() => {
    if (timeRemaining === null) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (!prev || prev <= 1000) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes} minutes ${seconds < 10 ? '0' + seconds : seconds} seconds`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!username.trim()) newErrors.username = '⚠️ Please input account';
    if (!password.trim()) newErrors.password = '⚠️ Please input password';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const responseLogin = await mushroom.$auth.loginAsync(username, password);
      const responseAuth = await mushroom.$auth.meAsync();
      if (responseAuth.result)
        setUser({
          account: responseAuth.result.account,
          name: 'Vu Codiing',
          roles: responseAuth.result.roles || ['Admin'],
          avatarSrc:
            'https://timwook.com/api/v2/file/thumb?id=6602817f71c39b0c049f117a&r=square&w=200',
        });

      if (responseLogin.result?.token) navigate(from, { replace: true });
    } catch (e) {
      const { code, meta, message } = e as MushroomError;
      if (code === 37001 || meta?.locked) {
        const releaseTime = new Date(meta?.releaseTime as Date).getTime();
        const now = new Date().getTime();
        const diff = releaseTime - now;

        if (diff > 0) {
          setTimeRemaining(diff);
          enqueueSnackbar(
            `Account locked. It will automatically unlock after ${formatTime(diff)}`,
            { variant: 'error' }
          );
        }
      } else if (code === 37000 && !meta?.locked) {
        setTimeRemaining(null);
        enqueueSnackbar(`Invalid username or password. ${meta?.remainingCount} attempts left.`, {
          variant: 'error',
        });
      } else {
        enqueueSnackbar(message, { variant: 'error' });
      }
    }
  };

  const handleFocus = (field: 'username' | 'password') => {
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
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          LOGIN
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Account"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => handleFocus('username')}
            error={!!errors.username}
            helperText={errors.username}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => handleFocus('password')}
            error={!!errors.password}
            helperText={errors.password}
          />

          {timeRemaining !== null && timeRemaining > 0 && (
            <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
              ⏳ Account will automatically unlock after {formatTime(timeRemaining)}
            </Typography>
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            LOGIN
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
