import * as fs from 'fs';
import * as Database from 'better-sqlite3';

const db = new Database('./gpao.sqlite', { verbose: console.log });

const migration = fs.readFileSync('./GPAO.SQLite_deletion.sql', 'utf8');
db.exec(migration);

db.close();
