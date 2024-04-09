import { ReactNode, createContext, useContext, useState } from "react";

interface ConfirmModalProviderProps {
  children: ReactNode;
}

interface ConfirmModalContextProps {
  isDeleteConfirmationModalOpen: boolean;
  handleCancelDelete: () => void;
  handleDeleteDish: () => void;
}

const ConfirmModalContext = createContext<ConfirmModalContextProps | null>(
  null
);

function ConfirmModalProvider({ children }: ConfirmModalProviderProps) {
  const [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);

  const handleDeleteDish = () => {
    setDeleteConfirmationModalOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationModalOpen(false);
  };

  return (
    <ConfirmModalContext.Provider
      value={{
        handleDeleteDish,
        handleCancelDelete,
        isDeleteConfirmationModalOpen,
      }}
    >
      {children}
    </ConfirmModalContext.Provider>
  );
}

function useConfirmModal() {
  const context = useContext(ConfirmModalContext);

  if (!context) {
    throw new Error(
      "useConfirmModal must be used within an ConfirmModalProvider"
    );
  }

  return context;
}

export { ConfirmModalProvider, useConfirmModal };
