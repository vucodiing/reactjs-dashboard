import { create } from 'zustand';

interface SettingState {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  sidebarWidth: string;
  openSidebar: () => void;
  closeSidebar: () => void;
  setSidebarWidth: (width: string) => void;
}

export const useSettingStore = create<SettingState>((set) => ({
  isSidebarOpen: true, // mặc định mở
  setSidebarOpen: (open) => {
    document.documentElement.style.setProperty('--sidebar-width', open ? '240px' : '60px');
    set({ isSidebarOpen: open });
  },
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  openSidebar: () => set({ isSidebarOpen: true }),
  sidebarWidth: '240px',
  closeSidebar: () => set({ isSidebarOpen: false }),
  setSidebarWidth: (width) => {
    document.documentElement.style.setProperty('--sidebar-width', width);
    set({ sidebarWidth: width });
  }
}));
