declare module '*.svg'

declare namespace NodeJS {
  export interface ProcessEnv {
    FIREBASE_ADMIN_CONFIG: string
    FIREBASE_CONFIG: string
  }
}
