const database = require("better-sqlite3");

const db = new database("requests.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    note TEXT NOT NULL,
    timestamp TEXT NOT NULL
  )
`).run();

module.exports = {
  getAllRequests: () => {
    const stmt = db.prepare("SELECT * FROM requests ORDER BY id DESC");
    return stmt.all();
  },

  insertRequest: (user_name, note) => {
    const timestamp = new Date().toISOString();
    const stmt = db.prepare(`
      INSERT INTO requests (user_name, note, timestamp)
      VALUES (?, ?, ?)
    `);
    const info = stmt.run(user_name, note, timestamp);
    return {
      id: info.lastInsertRowid,
      user_name,
      note,
      timestamp,
    };
  }, 

  clearAllRequests: () => {
    const stmt = db.prepare("DELETE FROM requests");
    stmt.run();
  }
};
