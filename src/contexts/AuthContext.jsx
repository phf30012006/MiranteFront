import React, { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadUser = async (token) => {
    try {
      if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const resp = await api.get('/me')
      setUser(resp.data)
    } catch (err) {
      console.error('Erro ao buscar /me', err)
      setUser(null)
      delete api.defaults.headers.common['Authorization']
    }
  }

  const login = async (token) => {
    localStorage.setItem('access_token', token)
    await loadUser(token)
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
  }

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      loadUser(token).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export default AuthContext
