import * as fs from 'fs/promises';
import * as path from 'path';
import * as Database from 'better-sqlite3';

export async function resetDatabase(file: string, sql: string) {
    try{
        await fs.stat(file);
        await fs.unlink(file);
    }
    finally {
        try {
            const db = new Database(file, { verbose: console.log });

            const migration = await fs.readFile(
                sql,
                'utf8'
            );
            db.exec(migration);

            db.close();
        }
        catch(error) {
            throw error;
        }
    }
}