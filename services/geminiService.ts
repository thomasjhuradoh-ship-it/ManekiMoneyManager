
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, Forecast } from "../types";

// Always initialize with the direct process.env.API_KEY reference
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getFinancialForecast(transactions: Transaction[]): Promise<Forecast> {
  if (transactions.length === 0) {
    return {
      nextWeekEstimate: 0,
      nextMonthEstimate: 0,
      insights: "¡Hola! Empieza a registrar tus gastos para que el Maneki Neko pueda ayudarte a predecir tu futuro financiero.",
      riskLevel: 'low'
    };
  }

  const prompt = `Analiza los siguientes movimientos financieros y predice el gasto aproximado para la próxima semana y el próximo mes. 
  Genera también un consejo financiero corto y divertido al estilo japonés.
  
  Movimientos: ${JSON.stringify(transactions)}
  
  Responde estrictamente en formato JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nextWeekEstimate: { type: Type.NUMBER, description: 'Estimación de gastos para la próxima semana.' },
            nextMonthEstimate: { type: Type.NUMBER, description: 'Estimación de gastos para el próximo mes.' },
            insights: { type: Type.STRING, description: 'Consejo financiero corto y motivacional.' },
            riskLevel: { type: Type.STRING, enum: ['low', 'medium', 'high'], description: 'Nivel de riesgo financiero actual.' }
          },
          required: ["nextWeekEstimate", "nextMonthEstimate", "insights", "riskLevel"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from AI");
    }

    return JSON.parse(resultText.trim()) as Forecast;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      nextWeekEstimate: 0,
      nextMonthEstimate: 0,
      insights: "El Maneki Neko está meditando. Intenta consultar tu futuro en un momento.",
      riskLevel: 'low'
    };
  }
}

export async function getGoalAdvice(transactions: Transaction[]): Promise<string> {
  const prompt = `Actúa como un sabio Maneki Neko (gato de la fortuna). Basado en estos gastos: ${JSON.stringify(transactions.slice(0, 10))}, da un único consejo financiero corto (máximo 12 palabras), divertido y motivador para alcanzar metas de ahorro. Sé muy directo y usa un tono de sabiduría japonesa moderna. No uses introducciones, solo el consejo.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text?.replace(/"/g, '').trim() || "La disciplina de hoy es la fortuna del mañana.";
  } catch (error) {
    return "Tu determinación es el imán más fuerte para la riqueza.";
  }
}
