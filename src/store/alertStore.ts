import { create } from "zustand";
type AlertType = "success" | "error" | "warning" | "info";
interface AlertStage {
  open: boolean;
  message: string;
  severity: AlertType;
  close: () => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
}
export const useAlertStore = create<AlertStage>((set) => ({
  open: false,
  message: "",
  severity: "info",
  close: () => set({ open: false }),
  success: (message) => set({ open: true, message, severity: "success" }),
  error: (message) => set({ open: true, message, severity: "error" }),
  warning: (message) => set({ open: true, message, severity: "warning" }),
}));
