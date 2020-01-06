declare module '*.svg'

declare namespace NodeJS {
  export interface ProcessEnv {
    FIREBASE_CONFIG: string
  }
}
