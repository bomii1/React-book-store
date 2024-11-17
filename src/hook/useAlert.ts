import { useCallback } from "react";

const useAlert = () => {

  const showAlert = useCallback((message: string) => {
    window.alert(message);
  }, []);
  
  return showAlert;
};

export default useAlert
