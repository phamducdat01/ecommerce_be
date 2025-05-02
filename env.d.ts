// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
        JWT_SECRET: string;
        JWT_ACCESS_EXPIRES_IN?: string;
        JWT_REFRESH_EXPIRES_IN?: string;
        [key: string]: string | undefined;
    }
}