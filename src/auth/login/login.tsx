import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { userStore } from "../../store/UserStore";
import mushroom from "../../service/api/mushroom-api";
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const from = location.state?.from?.pathname || "/";
  const { setUserInfo } = userStore();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!username.trim()) newErrors.username = "Vui lòng nhập tên đăng nhập";
    if (!password.trim()) newErrors.password = "Vui lòng nhập mật khẩu";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    const responseLogin = await mushroom.$auth.loginAsync(username, password);
    const responseAuth = await mushroom.$auth.meAsync();
    setUserInfo({
      name: "Vu Coding",
      email: "vu@example.com",
      phone: "0123456789",
      roles: ["Admin"],
    });
    if (responseAuth.result.roles)
      localStorage.setItem("roles", JSON.stringify(responseAuth.result.roles));

    if (responseLogin.result.token) navigate(from, { replace: true });
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
            variant="outlined"
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
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => handleFocus("password")}
            error={!!errors.password}
            helperText={errors.password}
          />

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
