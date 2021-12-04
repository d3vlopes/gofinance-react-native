import React, { createContext, ReactNode, useContext } from 'react'

type AuthProviderProps = {
  children: ReactNode
}

type User = {
  id: string
  name: string
  email: string
  photo?: string
}

type AuthContextData = {
  user: User
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: '1234567',
    name: 'Leandro Lopes',
    email: 'leandro@gmail.com',
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
