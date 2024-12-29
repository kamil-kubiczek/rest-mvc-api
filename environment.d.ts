declare global {
   namespace NodeJS {
      interface ProcessEnv {
         NODE_ENV: "development" | "production"
         JSON_ACCESS_TOKEN_SECRET: string
         JSON_REFRESH_TOKEN_SECRET: string
         API_PORT: string
      }
   }

   namespace Express {
      interface Request {
         context: {
            [key: string]: any
            user: {
               id: string
               name: string
               email: string
            }
         }
      }
      interface Response {
         context: {
            [key: string]: any
            user: {
               id: string
               name: string
               email: string
            }
         }
      }
   }
}

export {}
