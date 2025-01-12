import { getRequestError, getRequestResult } from './indexedDBUtil'

export const dbName = 'gameDB'
export const storeName = 'players'

export const openDB = (version = 1): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version)

    request.onupgradeneeded = (event) => {
      const db = getRequestResult<IDBDatabase>(event)
      // players 스토어 추가
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, {
          keyPath: 'id',
          autoIncrement: true,
        })
        store.createIndex('users', 'users') // 이름으로 검색할 수 있도록 인덱스 추가
      }

      // users 저장소 추가
      if (!db.objectStoreNames.contains('users')) {
        const usersStore = db.createObjectStore('users', {
          keyPath: 'id',
          autoIncrement: true,
        })
        usersStore.createIndex('username', 'username') // username으로 검색할 수 있도록 인덱스 추가
        usersStore.createIndex('password', 'password') // password를 기준으로 인덱스를 추가
      }
    }

    request.onsuccess = (event) => {
      const db = getRequestResult<IDBDatabase>(event)
      resolve(db)
    }

    request.onerror = (event) => {
      const error = getRequestError(event)
      reject(error)
    }
  })
}
