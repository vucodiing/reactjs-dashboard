import { create } from 'zustand';
import mushroom from '@/service/api/mushroom-api';
import { LogoutMode } from 'mushroomjs-auth';

interface UserInfo {
  name?: string;
  account: string;
  roles: string[];
  avatarSrc?: string;
}

interface UserState extends UserInfo {
  loading: boolean;
  setUser: (info: UserInfo) => void;
  setLoading: (val: boolean) => void;
  logout: () => Promise<void>;
}
export const useUserStore = create<UserState>()((set) => ({
  name: '',
  account: '',
  roles: [],
  avatarSrc: '',
  loading: true,

  setUser: (info) => {
    set(info);
  },
  setLoading: (val) => set({ loading: val }),
  logout: async () => {
    await mushroom.$auth.logoutAsync({ mode: LogoutMode.InvalidClientSession });
  },
}));
