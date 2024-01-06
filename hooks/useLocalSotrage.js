import { useState, useEffect} from "react";

export function useLocalStorage(key, fallbackValue) {
    const [value, setValue] = useState(fallbackValue);
  
    
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    useEffect(() => {
        const stored = localStorage.getItem(key);
        setValue(stored ? JSON.parse(stored) : fallbackValue);
      }, [fallbackValue, key]);
    
  
    return [value, setValue];
  }