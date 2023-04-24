import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.MONGO_URL as string;

export const client = new MongoClient(dbUrl);
export const db = client.db('CleanApiDb');