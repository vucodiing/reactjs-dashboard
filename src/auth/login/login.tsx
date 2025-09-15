import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { userStore } from "../../store/UserStore";
import { useAlertStore } from "../../store/alertStore";
import mushroom from "../../service/api/mushroom-api";
import type { MushroomError } from "../../service/api/mushroom-api";

export default function Login() {
  const { error } = useAlertStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const from = location.state?.from?.pathname || "/";
  const { setUserInfo } = userStore();

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
    return `${minutes < 10 ? "0" + minutes : minutes} phút ${
      seconds < 10 ? "0" + seconds : seconds
    } giây`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!username.trim()) newErrors.username = "Vui lòng nhập tên đăng nhập";
    if (!password.trim()) newErrors.password = "Vui lòng nhập mật khẩu";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const responseLogin = await mushroom.$auth.loginAsync(username, password);
      const responseAuth = await mushroom.$auth.meAsync();
      setUserInfo({
        name: "Vu Coding",
        email: "vu@example.com",
        phone: "0123456789",
        roles: ["Admin"],
      });
      if (responseAuth.result.roles) {
        localStorage.setItem(
          "roles",
          JSON.stringify(responseAuth.result.roles)
        );
      }
      if (responseLogin.result.token) navigate(from, { replace: true });
    } catch (e) {
      const { code, meta, message } = e as MushroomError;
      if (code === 37001 || meta?.locked) {
        const releaseTime = new Date(meta?.releaseTime as Date).getTime();
        const now = new Date().getTime();
        const diff = releaseTime - now;

        if (diff > 0) {
          setTimeRemaining(diff);
          error(`Tài khoản đã bị khóa. Sẽ mở sau ${formatTime(diff)}`);
        }
      } else if (code === 37000 && !meta?.locked) {
        setTimeRemaining(null);

        error(
          `Tài khoản hoặc mật khẩu chưa chính xác, còn ${meta?.remainingCount} lần đăng nhập`
        );
      } else {
        error(message);
      }
    }
  };

  const handleFocus = (field: "username" | "password") => {
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
          Đăng nhập
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Tên đăng nhập"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => handleFocus("username")}
            error={!!errors.username}
            helperText={errors.username}
          />

          <TextField
            label="Mật khẩu"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => handleFocus("password")}
            error={!!errors.password}
            helperText={errors.password}
          />

          {timeRemaining !== null && timeRemaining > 0 && (
            <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
              ⏳ Tài khoản sẽ được mở sau {formatTime(timeRemaining)}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Đăng nhập
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
