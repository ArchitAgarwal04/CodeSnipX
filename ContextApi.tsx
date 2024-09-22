'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import { FaBorderAll } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { DarkModeType, SideBarMenu, SingleNoteType } from "./types";





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

    openSideBarObject: {
        openSideBar: boolean;
        setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    };

    openContentNoteObject : {
        openContentNote: boolean;
        setOpenContentNote: React.Dispatch<React.SetStateAction<boolean>>;
    };

    isMobileObject : {
        isMobile: boolean;
        setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
    };

    allNotesObject : {
        allNotes: SingleNoteType[];
        setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>;
    }

    selectedNoteObject : {
        selectedNote: SingleNoteType | null;
        setSelectedNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>; 
    }
    isNewNoteObject: {
        isNewNote: boolean;
        setIsNewNote: React.Dispatch<React.SetStateAction<boolean>>;
    }
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
    openSideBarObject: {
        openSideBar: false,
        setOpenSideBar: () => {},
    },
    openContentNoteObject:{
        openContentNote: false,
        setOpenContentNote: ()=> {}
    },
    isMobileObject: {
        isMobile: false,
        setIsMobile: ()=> {}
    },
    allNotesObject: {
        allNotes: [],
        setAllNotes: ()=>{},
    },
    selectedNoteObject: {
        selectedNote: null,
        setSelectedNote: ()=> {},
    },    
    isNewNoteObject : {
        isNewNote: false,
        setIsNewNote: () => {},
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

    const [openSideBar , setOpenSideBar ] = useState(false);
    const [openContentNote , setOpenContentNote] = useState(false);
    const [isMobile , setIsMobile] =useState(false);
    const [ allNotes, setAllNotes] = useState<SingleNoteType[]>([]);
    const [ selectedNote , setSelectedNote] = useState<SingleNoteType | null >(null);
    const [isNewNote, setIsNewNote] = useState(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 640 );
    }

    useEffect(() => {
        handleResize();

        window.addEventListener("resize",handleResize);

        return () => {
            window.removeEventListener("resize",handleResize);
        }
    } , []);

    useEffect(() =>{
        function updateAllNotes () {
            const allNotes = [
                {
                    _id: "1",
                    title: "This is a note",
                    isFavourite: false,
                    tags: ["tag1","tag2"],
                    description: "This is a note",
                    code: ` import React from 'react';
function HelloWorld(){
return <h1>Hello World!</h1>
}
                            
export default HelloWorld;                 
                    `,
                    language: "javascript",
                    creationDate: "2022-01-01",
                },
                {
                    _id: "2",
                    title: "Another note",
                    isFavourite: true,
                    tags: ["tag3","tag4"],
                    description: "This is another note",
                    code: ` import React from 'react';
function HelloWorld2(){
return <h1>Hello World2!</h1>
}
                            
export default HelloWorld2;                 
                    `,
                    language: "javascript",
                    creationDate: "2022-02-15",
                },

                {
                    _id: "2",
                    title: "Another note",
                    isFavourite: true,
                    tags: ["tag3","tag4"],
                    description: "This is another note",
                    code: ` import React from 'react';
function HelloWorld2(){
return <h1>Hello World2!</h1>
}
                            
export default HelloWorld2;                 
                    `,
                    language: "javascript",
                    creationDate: "2022-02-15",
                },
            ];

            setTimeout(()=>{
                setAllNotes(allNotes);
            } , 1200);
        }
        updateAllNotes();
    } , [])

    return (
        <ContextProvider.Provider value={{ 
            sideBarMenuObject: { sideBarMenu, setSideBarMenu } ,
            darkModeObject: { darkMode, setDarkMode },
            openSideBarObject : {openSideBar,setOpenSideBar},
            openContentNoteObject : { openContentNote , setOpenContentNote },
            isMobileObject: {isMobile , setIsMobile},
            allNotesObject: { allNotes, setAllNotes},
            selectedNoteObject : { selectedNote , setSelectedNote},
            isNewNoteObject: { isNewNote, setIsNewNote},
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
