import { create } from 'zustand';
interface UserInfo {
  name?: string;
  account: string;
  roles: string[];
  avatarSrc?: string;
}

interface UserState extends UserInfo {
  setUser: (info: UserInfo) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  name: '',
  account: '',
  roles: [],
  avatarSrc: '',

  setUser: (info) => {
    set(info);
  },
}));
