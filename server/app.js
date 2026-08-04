import express from 'express';
import cors from 'cors';
import db from './config/db.js';
import aiRoutes from './routes/ai.openai.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/ai', aiRoutes);

async function testConnection() {
  try {
    await db.query('SELECT 1');
    console.log(' Kết nối MySQL thành công!');
  } catch (err) {
    console.error(' Lỗi kết nối MySQL:', err.message);
  }
}
testConnection();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server đang chạy tại port ${PORT}`);
});

if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv');
  dotenv.config();
}