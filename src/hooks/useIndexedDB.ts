import { useState, useEffect } from 'react'
import {
  addUser,
  getUserByUsername,
  getAllUsers,
  loginCheck,
} from '../utils/indexedDB'
import { openDB } from '@/utils/idb'

// User 타입 정의
export interface User {
  username: string
  password: string
  userId: number
}

const useIndexedDB = () => {
  const [db, setDb] = useState<IDBDatabase | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const initializeDB = async () => {
      const database = await openDB()
      setDb(database)
    }

    initializeDB()
  }, [])

  const add = async (data: any) => {
    try {
      if (!db) throw new Error('Database not initialized')
      await addUser(db, data)
    } catch (error: any) {
      setError(error)
      throw error
    }
  }

  const login = async ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => {
    try {
      if (!db) throw new Error('Database not initialized') // db가 없을 경우 처리
      const user = await loginCheck(db, username, password) // 로그인 체크

      if (user) {
        console.log(user) // user 정보 출력 (디버깅용)
      }

      return user
    } catch (error: any) {
      console.error(error) // 에러 출력
    }
  }

  const get = async (key: string) => {
    if (!db) throw new Error('Database not initialized')
    return await getUserByUsername(db, key)
  }

  const getAll = async () => {
    if (!db) throw new Error('Database not initialized')
    return await getAllUsers(db)
  }

  return { add, get, getAll, error, login }
}

export default useIndexedDB
