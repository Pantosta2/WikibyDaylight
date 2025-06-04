// src/hooks/useModal.ts
import { useState, useCallback } from "react";

export function useModal<T = any>() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const openModal = useCallback((item?: T) => {
    setSelectedItem(item === undefined ? null : item);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    selectedItem, 
    openModal,
    closeModal,
  };
}