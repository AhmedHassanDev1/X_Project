"use client"

import React from 'react'
import StoreProvider from './StoreProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import ThemeProvider from './ThemeProvider'
import AuthProvider from './AuthProvider'
import GraphqlProvider from './graphqlProvider'
import { ChatSocketProvider } from './ChatSocketProvider'


const queryClient = new QueryClient()

function Provider({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            <AuthProvider>
                <QueryClientProvider client={queryClient} >
                    <GraphqlProvider>
                        <ChatSocketProvider>
                            <ThemeProvider>
                                {children}
                            </ThemeProvider>
                        </ChatSocketProvider>
                    </GraphqlProvider>
                    <ReactQueryDevtools position='bottom' />
                </QueryClientProvider>
            </AuthProvider>
        </StoreProvider>
    )
}

export default Provider