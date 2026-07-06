import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey || apiKey.startsWith("AQ.")) {
      return NextResponse.json({
        reply: null,
        message: "Invalid or missing GEMINI_API_KEY. Google AI Studio keys start with 'AIzaSy'."
      });
    }

    const systemInstruction = 
      "You are Arup AI Tutor, an expert AI mentor for West Bengal competitive exams: WBP Constable, SSC GD Constable, Agniveer Army, and WB Panchayat. " +
      "Answer clearly in Bengali or English. Keep answers concise, highly accurate, with key points and formulas.";

    // Try available Gemini API model endpoints
    const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `${systemInstruction}\n\nStudent Question: ${prompt}` }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800,
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            return NextResponse.json({ reply: candidateText, modelUsed: model });
          }
        }
      } catch (err) {
        console.error(`Error requesting model ${model}:`, err);
      }
    }

    return NextResponse.json({ reply: null, message: "Gemini API call failed." });
  } catch (error) {
    console.error("AI Tutor Route error:", error);
    return NextResponse.json({ reply: null, error: "Internal error" }, { status: 500 });
  }
}
