import mongoose from "mongoose";
import { countConnect } from "../helpers/check.connect";
import config from "../config/config.mongodb";

const { host, name, port } = config.db;
const connectString = `mongodb://${host}:${port}/${name}`;

class Database {
    private static instance: Database;

    private constructor() {
        this.connect();
    }

    private connect(type = "mongodb"): void {
        if (process.env.NODE_ENV !== "production") {
            mongoose.set("debug", true);
            mongoose.set("debug", { color: true } as any); // mongoose types không có `color`, nên cần ép kiểu
        }

        mongoose
            .connect(connectString, {
                maxPoolSize: 50,
            })
            .then(() => {
                countConnect()
                console.log(
                    "Connected to MongoDB successfully pro",
                    // countConnect()
                );
            })
            .catch((err: any) => console.error("Error connect", err));
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

// Tạo instance luôn
const instanceMongodb = Database.getInstance();

export default instanceMongodb;
