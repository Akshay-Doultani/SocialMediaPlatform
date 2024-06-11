
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'

export const QueryProvider = ({children }:{children :ReactNode}) => {

    const queryProvider =new QueryClient();

  return (
    <QueryClientProvider client={queryProvider}>
        {children}
    </QueryClientProvider>
  )
}


