import 'reflect-metadata';
import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import * as path from 'path';
import { resetDatabase } from '../utils/resetDatabase';

let connection: Connection | null;

async function connect() {
  try {
    if (!process.env.PRODUCTION) {
      await resetDatabase(
        path.resolve(__dirname, './gpao.sqlite'),
        path.resolve(__dirname, './GPAO.SQLite_creation.sql')
      );
    }
    connection = await createConnection();
  } catch (e) {
    console.error(e);
    throw e;
  }

  return connection;
}

export { connection, connect };
