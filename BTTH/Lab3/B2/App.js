import React, { useEffect, useContext } from "react";
import BotNav from './BotNav';
import { createTable } from "./db";
import { SettingProvider } from './SettingContext'; // Đảm bảo import chính xác


export default function App() {
  useEffect(() => {
    createTable(); // Khởi tạo bảng khi ứng dụng được khởi động
  }, []);


  return (
    <SettingProvider>
      <BotNav />
    </SettingProvider>
  );
}
