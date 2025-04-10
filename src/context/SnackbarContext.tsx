import { createContext, useState, ReactNode } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";

interface SnackbarContextType {
  showSnackbar: (message: string, severity?: AlertColor) => void;
}

export const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
});

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const showSnackbar = (msg: string, sev: AlertColor = "success") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert onClose={() => setOpen(false)} severity={severity} variant="filled">
          {message}
        </MuiAlert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
