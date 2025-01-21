import React, { useCallback, useState } from "react";
import DayInfoModal from "./DayInfoModal";

export const ModalContext = React.createContext();

const ModalProvider = ({ children }) => {
  const [contentId, setContentId] = useState(null);
  const [open, setOpen] = useState(false);
  const [contents, setContents] = useState({});

  const handleOpen = useCallback((contentId, contents) => {
    setContentId(contentId);
    setContents(contents);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  // 아래 dayInfoModal을 이후 범용성을 위해서 고차함수로 변경하고 Modal로 변경한다.
  return (
    <ModalContext.Provider
      value={{ openModal: handleOpen, closeModal: handleClose }}
    >
      {children}
      {open && (
        <DayInfoModal onClose={handleClose} contents={contents} title={contentId} />
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
