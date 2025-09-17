import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';
import { Button } from '@mui/material';
import styles from './NotFound.module.scss';
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <p>Page Not Found</p>
      <Button
        variant="contained"
        startIcon={<Home />}
        onClick={() => navigate('/', { replace: true })}
      >
        HOME
      </Button>
    </div>
  );
}
