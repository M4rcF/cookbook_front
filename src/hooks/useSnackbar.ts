import { useContext } from "react";
import { SnackbarContext } from "../context/SnackbarContext.tsx";

export default function useSnackbar() {
  return useContext(SnackbarContext);
}
