import React, { createContext, useContext, useState } from 'react';

//create a context
const ModalContext = createContext();

 export const useModal = () => useContext(ModalContext);

 export const ModalProvider = ({ children }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModalHandler = () => setIsModalOpen(true);
    const closeModalHandler = () => setIsModalOpen(false);

    return (
        <ModalContext.Provider value={{ isModalOpen, openModalHandler, closeModalHandler }}>
            {children}
        </ModalContext.Provider>
    );

 }