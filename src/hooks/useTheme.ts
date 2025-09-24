import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { toggleDarkMode } from "../features/ui/uiSlice";

export const useTheme = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    // Apply theme to document
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggle = () => {
    dispatch(toggleDarkMode());
  };

  return { darkMode, toggle };
};
