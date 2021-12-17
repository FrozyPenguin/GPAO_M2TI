import * as fs from 'fs';
import * as path from 'path';
import * as Database from 'better-sqlite3';
import { resetDatabase } from '../utils/resetDatabase';

// const db = new Database('./gpao.sqlite', { verbose: console.log });

// const migration = fs.readFileSync('./GPAO.SQLite_creation.sql', 'utf8');
// db.exec(migration);

// db.close();

(async function () {
  await resetDatabase(
    path.resolve(__dirname, './gpao.sqlite'),
    path.resolve(__dirname, './GPAO.SQLite_creation.sql')
  );
})();
