import mushroom from '@/service/api/mushroom-api';
import type { MushroomError } from '@/service/api/mushroom-api';

import { useAlertStore } from '../../store/alertStore';
import { useEffect } from 'react';

export default function UsersList() {
  const { alertError } = useAlertStore();
  const getSessionAsync = async () => {
    try {
      const response = await mushroom.service.listAsync();
      console.log('Các service: %o', response);
    } catch (e) {
      const { message } = e as MushroomError;
      alertError(message);
    }
  };
  useEffect(() => {
    getSessionAsync();
  }, []);
  return <div>sdfds</div>;
}
