import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface UserInfo {
  name: string;
  account: string;
  email: string;
  phone: string;
  roles: string[];
}

interface UserState extends UserInfo {
  setUser: (info: UserInfo) => void;
  clearUser: () => void;
}

// tạo channel global
const authChannel = new BroadcastChannel('auth');

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: '',
      account: '',
      email: '',
      phone: '',
      roles: [],

      setUser: (info) => {
        set(info);
      },

      clearUser: () => {
        // clear local state
        set({ name: '', account: '', email: '', phone: '', roles: [] });
        // phát sự kiện để các tab khác biết
        authChannel.postMessage({ type: 'LOGOUT' });
        window.location.href = '/login';
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
    // gọi clearUser nhưng KHÔNG phát thêm broadcast nữa
    useUserStore.setState({
      name: '',
      account: '',
      email: '',
      phone: '',
      roles: [],
    });
  }
};
