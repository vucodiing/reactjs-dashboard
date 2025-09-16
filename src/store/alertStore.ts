import { create } from "zustand";
type AlertType = "success" | "error" | "warning" | "info";
interface AlertStage {
  open: boolean;
  message: string;
  severity: AlertType;
  close: () => void;
  alertSuccess: (message: string) => void;
  alertError: (message: string) => void;
  alertWarning: (message: string) => void;
}
export const useAlertStore = create<AlertStage>((set) => ({
  open: false,
  message: "",
  severity: "info",
  close: () => set({ open: false }),
  alertSuccess: (message) => set({ open: true, message, severity: "success" }),
  alertError: (message) => set({ open: true, message, severity: "error" }),
  alertWarning: (message) => set({ open: true, message, severity: "warning" }),
}));
