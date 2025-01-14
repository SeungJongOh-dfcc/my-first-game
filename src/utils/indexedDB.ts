import { User } from '@/hooks/useIndexedDB'
import { openDB } from './idb'
import { sha512 } from 'js-sha512'

// indexedDB 연결 및 테이블 생성
export const openDBConnection = async () => {
  // openDB 함수 호출
  const db = await openDB(1) // 데이터베이스 버전 1로 설정 (버전은 필요에 따라 변경 가능)
  return db
}

// 유저 데이터 추가
export const addUser = async (
  db: IDBDatabase,
  data: { username: string; password: string }
) => {
  const tx = db.transaction('users', 'readwrite')
  const store = tx.objectStore('users')

  // 비밀번호 해싱
  const hashedPassword = sha512(data.password) // SHA-512로 비밀번호 해싱
  const user = { username: data.username, password: hashedPassword }

  const request = store.add(user)

  request.onsuccess = () => {
    console.log('User added successfully')
  }

  request.onerror = () => {
    console.error('Error adding user')
  }

  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

// 로그인 체크
export const loginCheck = async (
  db: IDBDatabase,
  username: string,
  password: string
): Promise<any> => {
  const tx = db.transaction('users', 'readonly')
  const store = tx.objectStore('users')
  const index = store.index('username') // username을 기준으로 조회할 인덱스 사용

  const request = index.get(username) // username을 기준으로 데이터 조회

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const user = request.result

      // 비밀번호 해싱 후 비교
      if (user && sha512(password) === user?.password) {
        resolve(user) // 비밀번호 일치 시 사용자 정보 반환
      } else {
        resolve(null) // 비밀번호 불일치 시 null 반환
      }
    }

    request.onerror = () => {
      reject('An error occurred during login')
    }
  })
}

// 유저 데이터 조회 (사용자명으로)
export const getUserByUsername = async (
  db: IDBDatabase,
  username: string
): Promise<User | any> => {
  const tx = db.transaction('users', 'readonly')
  const store = tx.objectStore('users')
  return await store.get(username) // 'username'을 keyPath로 사용
}

// 모든 유저 데이터 조회
export const getAllUsers = async (db: IDBDatabase) => {
  const tx = db.transaction('users', 'readonly')
  const store = tx.objectStore('users')
  return await store.getAll()
}

// 플레이어 데이터 추가
export const addData = async (db: IDBDatabase, data: any) => {
  const tx = db.transaction('players', 'readwrite')
  const store = tx.objectStore('players')
  await store.add(data)

  // 트랜잭션이 완료될 때까지 기다리기 위해 oncomplete 이벤트 사용
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

// 플레이어 데이터 조회 (키 값으로)
export const getData = async (db: IDBDatabase, key: number | string) => {
  const tx = db.transaction('players', 'readonly')
  const store = tx.objectStore('players')
  return await store.get(key)
}

// 모든 플레이어 데이터 조회
export const getAllData = async (db: IDBDatabase) => {
  const tx = db.transaction('players', 'readonly')
  const store = tx.objectStore('players')
  return await store.getAll()
}

// 플레이어 데이터 수정
export const updateData = async (db: IDBDatabase, data: any) => {
  const tx = db.transaction('players', 'readwrite')
  const store = tx.objectStore('players')
  await store.put(data)

  // 트랜잭션이 완료될 때까지 기다리기 위해 oncomplete 이벤트 사용
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}
