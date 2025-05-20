import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  //обработка данных заказа например сохранение в БД
  return NextResponse.json({ success: true, orderId: `ORD-${Date.now()}`, data });
}
