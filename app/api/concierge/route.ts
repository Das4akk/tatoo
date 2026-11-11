import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Параметр запроса обязателен' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Deterministic graceful studio response if API key is not yet set
      return NextResponse.json({
        answer:
          'Студия ATELIER BOTANICA расположена по адресу: Санкт-Петербург, ул. Большая Конюшенная, 19/8 (4 минуты от м. «Невский Проспект»). Вход через кованые ворота в арку, домофон 14B, 2 этаж. Мы работаем ежедневно с 11:00 до 21:00 по предварительной записи. Рекомендуем хорошо выспаться перед сеансом и не употреблять кофеин за 3 часа.',
        grounded: false,
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `Ты консьерж премиальной камерной тату-студии "ATELIER BOTANICA" (Санкт-Петербург, ул. Большая Конюшенная, 19/8, рядом с ДЛТ и Спасом на Крови, метро Невский Проспект).
Отвечай вежливо, спокойно, в эстетике скандинавского минимализма и заботы.
Отвечай на вопросы о том, как добраться, где припарковаться (городская парковка на Большой Конюшенной/Волынском пер.), о подготовке к сеансу (не пить кофе/алкоголь, хорошо поесть, выспаться, удобная свободная одежда) и правилах ухода.
Держи ответ кратким, доброжелательным и точным (2-4 предложения). Без эмодзи, без восклицательных знаков подряд.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: query,
      config: {
        systemInstruction,
        // Google Search / maps grounding when applicable
        tools: [{ googleSearch: {} }],
      },
    });

    const answer = response.text || 'С радостью ждем вас в ATELIER BOTANICA. Если у вас возникнут вопросы при поиске арки, позвоните нашему администратору: +7 (812) 429-18-90.';

    return NextResponse.json({
      answer,
      grounded: true,
    });
  } catch (error) {
    console.error('Error in concierge API:', error);
    return NextResponse.json({
      answer:
        'Студия ATELIER BOTANICA находится по адресу ул. Большая Конюшенная, 19/8. Вход через арку, 2 этаж. Ждем вас по предварительной записи.',
      grounded: false,
    });
  }
}
