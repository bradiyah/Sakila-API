"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const connectToDatabase = async (req, res) => {
    const { host, port, database, user, password } = req.body;
    try {
        const connection = await promise_1.default.createConnection({
            host,
            port: Number(port),
            user,
            password,
            database,
        });
        await connection.ping();
        await connection.end();
        res.json({ success: true });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};
exports.connectToDatabase = connectToDatabase;
