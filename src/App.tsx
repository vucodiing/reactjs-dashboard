import { useEffect } from 'react';
import AppRoutes from './router/AppRoutes';
import { SnackbarProvider } from 'notistack';
import { useUserStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import mushroom from './service/api/mushroom-api';

export default function App() {
  const { setUser, setLoading } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkMeAsync = async () => {
      try {
        const resMe = await mushroom.$auth.meAsync();
        if (resMe.result) {
          setUser({
            account: resMe.result.account,
            name: 'Vu Codiing',
            roles: resMe.result.roles || ['Admin'],
            avatarSrc:
              'https://timwook.com/api/v2/file/thumb?id=6602817f71c39b0c049f117a&r=square&w=200',
          });
        } else {
          navigate('/login', { replace: true });
        }
      } catch {
        navigate('/login', { replace: true });
      } finally {
        // ✅ Quan trọng: luôn tắt loading khi check xong
        setLoading(false);
      }
    };

    checkMeAsync();
  }, []);

  return (
    <>
      <AppRoutes />
      <SnackbarProvider
        autoHideDuration={3000}
        preventDuplicate
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      />
    </>
  );
}
