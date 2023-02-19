import {useEffect, useState} from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme') as string) || 'light')
    const darkTheme = 'https://cdn.jsdelivr.net/npm/@forevolve/bootstrap-dark@1.0.0/dist/css/bootstrap-dark.min.css'
    const lightTheme = 'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css'

    const setCurrentTheme = (theme: string) => {
        const link = document.getElementById('bootstrap_theme') as HTMLLinkElement
        link.href = theme === 'dark' ? darkTheme : lightTheme
    }
    const switchTheme = () => {
        const inverseTheme = theme === 'dark' ? 'light' : 'dark'
        localStorage.setItem('theme', JSON.stringify(inverseTheme))
        setTheme(inverseTheme)
    }

    useEffect(() => {
        setCurrentTheme(theme)
    }, [theme])

    return [ theme, switchTheme ]
}
