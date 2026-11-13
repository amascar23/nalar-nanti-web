"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SavedQuotesContextType {
  savedIds: string[];
  savedCount: number;
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => void;
  removeSaved: (id: string) => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  isLoaded: boolean;
}

const STORAGE_KEY = "nalar_nanti_saku_hati";

const SavedQuotesContext = createContext<SavedQuotesContextType | undefined>(
  undefined
);

export function SavedQuotesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Baca dari localStorage hanya di sisi client (useEffect) agar 100% aman dari hydration mismatch
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedIds(parsed);
        }
      }
    } catch (err) {
      console.error("Gagal membaca Saku Hati dari localStorage:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.error("Gagal menyimpan Saku Hati ke localStorage:", err);
      }
      return next;
    });
  };

  const removeSaved = (id: string) => {
    setSavedIds((prev) => {
      const next = prev.filter((item) => item !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.error("Gagal menghapus dari Saku Hati:", err);
      }
      return next;
    });
  };

  const isSaved = (id: string) => {
    return savedIds.includes(id);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <SavedQuotesContext.Provider
      value={{
        savedIds,
        savedCount: savedIds.length,
        isSaved,
        toggleSave,
        removeSaved,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        isLoaded,
      }}
    >
      {children}
    </SavedQuotesContext.Provider>
  );
}

export function useSavedQuotes() {
  const context = useContext(SavedQuotesContext);
  if (!context) {
    throw new Error(
      "useSavedQuotes harus digunakan di dalam SavedQuotesProvider"
    );
  }
  return context;
}
