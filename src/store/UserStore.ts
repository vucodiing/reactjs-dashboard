import { create } from 'zustand';

interface UserInfo {
  account?: string;
  name?: string;
  email?: string;
  phone?: string;
  roles?: string[];
  avatarUrl?: string;
}
interface UserState {
  infoUser?: UserInfo;
  setUserInfo: (info: UserInfo) => void;
}

export const userStore = create<UserState>((set) => ({
  infoUser: undefined,
  setUserInfo: (info) => set({ infoUser: info }),
}));
