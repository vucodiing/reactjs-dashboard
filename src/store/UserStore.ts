import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface UserInfo {
  name?: string;
  account: string;
  email?: string;
  phone?: string;
  roles: string[];
  token: string;
  avatarSrc?: string;
}

interface UserState extends UserInfo {
  setUser: (info: UserInfo) => void;
  clearUser: () => void;
}

const authChannel = new BroadcastChannel('auth');

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: '',
      account: '',
      email: '',
      phone: '',
      roles: [],
      token: '',
      avatarSrc: '',

      setUser: (info) => {
        set(info);
      },

      clearUser: () => {
        localStorage.clear();
        authChannel.postMessage({ type: 'LOGOUT' });
      },
    }),
    {
      name: 'user-info', // key trong localStorage
    }
  )
);

// lắng nghe thông điệp từ tab khác
authChannel.onmessage = (event) => {
  if (event.data?.type === 'LOGOUT') {
    localStorage.clear();
    window.location.href = '/login';
  }
};
