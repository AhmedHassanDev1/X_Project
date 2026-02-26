"use client"


type themeType = {
    mode?: "dark" | "light"
    fontSize?: string
    primaryColor: string
}
function ThemeProvider({ children }: { children: React.ReactNode }) {

    const theme: themeType = {
        mode: "dark",
        // fontSize:"1rem",
        primaryColor: "blue"
    }


    return (
        <html style={{ fontSize: theme.fontSize }} className="" lang={`en `}>
            {children}
        </html>
    )
}

export default ThemeProvider