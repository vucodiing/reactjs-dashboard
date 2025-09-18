import mushroom from '@/service/api/mushroom-api';
import type { MushroomError } from '@/service/api/mushroom-api';

import { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
export default function UsersList() {
  const getSessionAsync = async () => {
    try {
      const response = await mushroom.service.listAsync();
      console.log('Các service: %o', response);
    } catch (e) {
      const { message } = e as MushroomError;
      enqueueSnackbar(message, { variant: 'error' });
    }
  };
  useEffect(() => {
    getSessionAsync();
  }, []);
  return <div>sdfds</div>;
}
