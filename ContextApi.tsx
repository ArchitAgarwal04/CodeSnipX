'use client'

import React, { createContext, useContext, useState } from "react";
import { FaBorderAll } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import DarkMode from "./app/my-notes/__components/ContentArea/TopBar/DarkMode";



// Define the structure of the Sidebar Menu
interface SideBarMenu {
    id: number;
    name: string;
    isSelected: boolean;
    icons: React.ReactNode;
}


interface DarkModeType{
    id: number;
    icon: React.ReactNode;
    isSelected: boolean;
}

// Define the context type
interface GlobalContextType {
    sideBarMenuObject: {
        sideBarMenu: SideBarMenu[];
        setSideBarMenu: React.Dispatch<React.SetStateAction<SideBarMenu[]>>;
    };

    darkModeObject: {
        darkMode: DarkModeType[];
        setDarkMode: React.Dispatch<React.SetStateAction<DarkModeType[]>>;
    };
}


// Create a context with a default value (empty object, for TypeScript)
const ContextProvider = createContext<GlobalContextType>({
    sideBarMenuObject: {
        sideBarMenu: [],
        setSideBarMenu: () => {},
    },
    darkModeObject: {
        darkMode: [],
        setDarkMode: ()=>{},
    },
});

export default function GlobalContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // Correct the useState type to match the defined interface
    const [sideBarMenu, setSideBarMenu] = useState<SideBarMenu[]>([
        { id: 1, name: "All Snippets", isSelected: true, icons: <FaBorderAll className="text-[18px]"/> },
        { id: 2, name: "Favourites", isSelected: false, icons: <MdFavorite className="text-[18px]"/> },
        { id: 3, name: "Trash", isSelected: false, icons: <FaTrashAlt className="text-[18px]"/>},
        { id: 4, name: "Log Out", isSelected: false, icons: <IoIosLogOut className="text-[18px]"/>}
    ]);

    const [darkMode , setDarkMode] = useState<DarkModeType[]>([
        {
            id: 1,
            icon: <MdOutlineLightMode className="text-[18px]"/>,
            isSelected: false,
        },
        {
            id: 2,
            icon: <MdDarkMode className="text-[18px]"/>,
            isSelected: false,
        }
    ])

    return (
        <ContextProvider.Provider value={{ 
            sideBarMenuObject: { sideBarMenu, setSideBarMenu } ,
            darkModeObject: { darkMode, setDarkMode },
        }
        }>
            {children}
        </ContextProvider.Provider>
    );
}

// Custom hook for accessing the global context
export const useGlobalContext = () => {
    const context = useContext(ContextProvider);
    
    if (!context) {
        throw new Error(
            "useGlobalContext must be used within a GlobalContextProvider"
        );
    }
    
    return context;
};
