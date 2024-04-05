import mongoose from 'mongoose';
import "dotenv/config"

const mongoURI = process.env.MONGODB_URI;

/**
 * Connects the MongoClient to the MongoDB service specified by MONGODB_URI
 * @returns A Promise which resolves to the client object
 */
export function connectToMongo(dbName = process.env.DB_NAME) {
    return mongoose.connect(mongoURI, {dbName});
};

// These are just used for closing the connection properly
export function signalHandler() {
    console.log("Closing MongoDB connection...");
    mongoose.disconnect();
    process.exit();
}

process.on("SIGINT", signalHandler);    
process.on("SIGTERM", signalHandler);
process.on("SIGQUIT", signalHandler);