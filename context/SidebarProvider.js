"use client"
import React, { createContext, useContext} from "react";
import { useLocalStorage } from "@/hooks/useLocalSotrage";
export const SidebarContext = createContext();

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    let messageError = 'useSidebar debería estar siendo usado dentro de un provider';
    if (!context) throw new Error(messageError);
    return context;
}

export const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useLocalStorage('sidebarOpen', true);

    const toggleSideBar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <SidebarContext.Provider
            value={{
                isOpen,
                toggleSideBar
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

