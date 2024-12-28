declare global {
   namespace NodeJS {
      interface ProcessEnv {
         NODE_ENV: "development" | "production"
         JSON_ACCESS_TOKEN_SECRET: string
         JSON_REFRESH_TOKEN_SECRET: string
      }
   }
}

export {}
