// src/helpers/checkConnect.ts

import mongoose from "mongoose";
import os from "os";
import process from "process";

const _SECONDS = 5000;

// Count current connections
export const countConnect = (): void => {
    const newConnection = mongoose.connections.length;
    console.log(`Number of connections: ${newConnection}`);
};

// Check if connection overload
export const checkOverload = (): void => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        const maxConnections = numCores * 5;

        console.log(`Active connections: ${numConnection}`);
        console.log(`Memory usage: ${(memoryUsage / 1024 / 1024).toFixed(2)} MB`);

        if (numConnection > maxConnections) {
            console.warn("Connection overload detected 🚨");
        }
    }, _SECONDS);
};
