import React from 'react'

function header({ children }: { children: React.ReactNode }) {
    return (
        <header className='header'>
            {children}
        </header>
    )
}

export default header