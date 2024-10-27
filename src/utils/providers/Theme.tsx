"use client";
import { createContext, useState } from "react";

export const ThemeContext = createContext<null|{theme: string, toggle: ()=> void}>(null);

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {

    const [theme, setTheme] = useState("dark");
    const toggle = () => {
        setTheme(prev => prev === 'light' ? "dark": "light");
    } 

    return (
        <ThemeContext.Provider value={{theme, toggle}}>
            <html lang="en" className={theme === 'dark'? "dark": ""}>
                {children}
            </html>
        </ThemeContext.Provider>
    )
}