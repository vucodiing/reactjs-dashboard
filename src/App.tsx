import { useEffect } from "react";
import AppRoutes from "./router/AppRoutes";
import { userStore } from "./store/UserStore";
import AlertGlobal from "./components/AlertGlobal/AlertGlobal";
export default function App() {
  const { setUserInfo } = userStore();
  useEffect(() => {
    setUserInfo({
      name: "Vu Coding",
      email: "vu@example.com",
      phone: "0123456789",
      roles: ["Admin"],
    });
  }, [setUserInfo]);
  return (
    <>
      <AppRoutes />
      <AlertGlobal />
    </>
  );
}
