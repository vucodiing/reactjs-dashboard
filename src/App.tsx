import AppRoutes from './router/AppRoutes';
import { SnackbarProvider } from 'notistack';
export default function App() {
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
