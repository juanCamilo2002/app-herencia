import { useEffect, useState } from 'react';

function useLocalStorage(key, initialValue) {
  // Estado para almacenar el valor
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Verificar si estamos en el navegador
      if (typeof window === 'undefined') {
        return initialValue;
      }
      // Obtener el valor de localStorage
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // useEffect para actualizar localStorage cuando cambia el estado
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const valueToStore = typeof storedValue === 'function' ? storedValue(storedValue) : storedValue;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
