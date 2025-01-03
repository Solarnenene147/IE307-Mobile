import * as SQLite from "expo-sqlite";

// Mở cơ sở dữ liệu
const db = SQLite.openDatabaseSync("notes.db");

// Tạo bảng
export const createTable = async () => {
  try {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT
      );`
    );
    console.log("Table created");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

// Lấy tất cả ghi chú
export const getNotes = async (callback = () => {}) => {
  try {
    const result = await db.getAllAsync("SELECT * FROM notes");
    if (typeof callback === "function") {
      callback(result);
    } else {
      console.error("callback is not a function");
    }
  } catch (error) {
    console.error("Error getting notes:", error);
  }
};

// Thêm ghi chú
export const addNote = async (title, content, callback = () => {}) => {
  try {
    await db.runAsync("INSERT INTO notes (title, content) VALUES (?, ?)", [
      title,
      content,
    ]);
    if (typeof callback === "function") {
      callback();
    } else {
      console.error("callback is not a function");
    }
  } catch (error) {
    console.error("Error adding note:", error);
  }
};

// Cập nhật ghi chú
export const updateNote = async (id, title, content, callback = () => {}) => {
  try {
    await db.runAsync("UPDATE notes SET title = ?, content = ? WHERE id = ?", [
      title,
      content,
      id,
    ]);
    if (typeof callback === "function") {
      callback();
    } else {
      console.error("callback is not a function");
    }
  } catch (error) {
    console.error("Error updating note:", error);
  }
};

// Xóa ghi chú
export const deleteNote = async (id, callback = () => {}) => {
  try {
    await db.runAsync("DELETE FROM notes WHERE id = ?", [id]);
    if (typeof callback === "function") {
      callback();
    } else {
      console.error("callback is not a function");
    }
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};
