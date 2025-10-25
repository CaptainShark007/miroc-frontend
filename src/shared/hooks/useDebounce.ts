import { useState, useEffect } from 'react';

/**
 * Hook que debounce un valor, esperando un delay antes de actualizarlo
 * @param value - El valor a debounce
 * @param delay - El tiempo de espera en milisegundos (default: 500ms)
 * @returns El valor debounced
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Crear un timeout para actualizar el valor debounced después del delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar el timeout si el valor cambia antes de que el delay termine
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
