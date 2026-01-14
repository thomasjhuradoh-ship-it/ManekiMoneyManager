
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, Forecast } from "../types";

// Helper to get AI instance - strictly following direct process.env.API_KEY guidelines
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `Eres Maneki-AI, un gato de la fortuna japonés experto en finanzas. 
Tu estilo es neo-brutalista: directo, sabio y un poco místico. 
Ayuda al usuario a ahorrar mencionando conceptos como el Ikigai financiero o la disciplina del Daruma.`;

export async function getFinancialForecast(transactions: Transaction[]): Promise<Forecast> {
  if (transactions.length === 0) {
    return {
      nextWeekEstimate: 0,
      nextMonthEstimate: 0,
      insights: "¡Miau! El tablero está vacío. Registra tus monedas para ver el futuro.",
      riskLevel: 'low'
    };
  }

  // Initializing GenAI instance right before the call
  const ai = getAI();
  const prompt = `Analiza estos datos financieros: ${JSON.stringify(transactions)}. 
  Genera una predicción de gastos y un consejo místico.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nextWeekEstimate: { type: Type.NUMBER },
            nextMonthEstimate: { type: Type.NUMBER },
            insights: { type: Type.STRING },
            riskLevel: { type: Type.STRING, enum: ['low', 'medium', 'high'] }
          },
          required: ["nextWeekEstimate", "nextMonthEstimate", "insights", "riskLevel"]
        }
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text) as Forecast;
  } catch (error) {
    console.error("AI Error:", error);
    return {
      nextWeekEstimate: 0,
      nextMonthEstimate: 0,
      insights: "Las nubes ocultan tu destino financiero. Intenta de nuevo más tarde.",
      riskLevel: 'low'
    };
  }
}

export async function getQuickAdvice(transactions: Transaction[]): Promise<string> {
  // Initializing GenAI instance right before the call
  const ai = getAI();
  const prompt = `Dame un consejo financiero de 12 palabras máximo basado en estos gastos: ${JSON.stringify(transactions.slice(0, 5))}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });
    return response.text?.trim() || "La fortuna favorece a quienes vigilan sus centavos.";
  } catch (error) {
    return "La disciplina es el camino a la riqueza.";
  }
}
