import 'reflect-metadata';
import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import * as path from 'path';
import { resetDatabase } from '../utils/resetDatabase';

let connection: Connection | null;

const options: ConnectionOptions = {
    type: 'sqlite',
    database: path.resolve(__dirname, './gpao.sqlite'),
    entities: [path.resolve(__dirname, '../models/*.ts')],
    logging: true
}

async function connect() {
    try {
        await resetDatabase(path.resolve(__dirname, './gpao.sqlite'), path.resolve(__dirname, './GPAO.SQLite_creation.sql'));
        connection = await createConnection(options);
    }
    catch(e) {
        console.error(e);
        throw e;
    }

    return connection;
}

export { connection, connect };