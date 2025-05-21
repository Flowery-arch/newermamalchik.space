import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Файл для хранения времени
const TIME_FILE = path.join(process.cwd(), 'coding-time.json');

// Получение времени начала кодинга
export async function GET() {
  try {
    // Проверяем существование файла
    if (!fs.existsSync(TIME_FILE)) {
      // Если файла нет, создаем его с текущим временем
      const startTime = Date.now();
      fs.writeFileSync(
        TIME_FILE,
        JSON.stringify({ startTime }),
        'utf-8'
      );
      return NextResponse.json({ startTime });
    }

    // Читаем существующий файл
    const data = JSON.parse(fs.readFileSync(TIME_FILE, 'utf-8'));
    return NextResponse.json(data);
  } catch (error) {
    console.error('Ошибка при получении времени:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при получении времени' },
      { status: 500 }
    );
  }
}

// Обновление времени (для будущих расширений функционала)
export async function POST(request: Request) {
  try {
    const { startTime } = await request.json();
    
    fs.writeFileSync(
      TIME_FILE,
      JSON.stringify({ startTime }),
      'utf-8'
    );
    
    return NextResponse.json({ success: true, startTime });
  } catch (error) {
    console.error('Ошибка при обновлении времени:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при обновлении времени' },
      { status: 500 }
    );
  }
} 