import { config as dotenvConfig } from 'dotenv';
dotenvConfig(); // Load .env file (nếu có)

// Định nghĩa type cho config
interface DBConfig {
    host: string;
    port: number;
    name: string;
}

interface AppConfig {
    port: number;
}

interface Config {
    app: AppConfig;
    db: DBConfig;
}

// Cấu hình cho môi trường dev và pro
const dev: Config = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT || '3052', 10),
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT || '27017', 10),
        name: process.env.DEV_DB_NAME || 'shopDEV',
    },
};

const pro: Config = {
    app: {
        port: parseInt(process.env.PRO_APP_PORT || '3053', 10),
    },
    db: {
        host: process.env.PRO_DB_HOST || 'localhost',
        port: parseInt(process.env.PRO_DB_PORT || '27017', 10),
        name: process.env.PRO_DB_NAME || 'shopPRO',
    },
};

// Tạo config chung với dev và pro
const config = { dev, pro };

// Lấy môi trường hiện tại, mặc định là "dev"
const env: 'dev' | 'pro' = (process.env.NODE_ENV as 'dev' | 'pro') || 'dev';


// Export config cho môi trường hiện tại
export default config[env];
