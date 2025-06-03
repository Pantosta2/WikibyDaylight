// src/hooks/useModal.ts
import { useState, useCallback } from "react";

export function useModal<T = any>() { // T puede ser void si no usas selectedItem para pasar data al modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const openModal = useCallback((item?: T) => { // item es opcional
    setSelectedItem(item === undefined ? null : item);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Considera si quieres resetear selectedItem aquí o no:
    // setSelectedItem(null);
  }, []);

  return {
    isModalOpen,
    selectedItem, // Útil si el modal necesita data al abrirse
    openModal,
    closeModal,
  };
}