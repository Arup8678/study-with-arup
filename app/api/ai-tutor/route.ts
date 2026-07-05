import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply: null,
        message: "GEMINI_API_KEY not configured. Using fallback AI model."
      });
    }

    // Call Google Gemini 1.5 Flash API endpoint
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const systemInstruction = 
      "You are Arup AI Tutor, an expert AI mentor for Indian competitive exams specifically WBP Constable (West Bengal Police), SSC GD Constable, Agniveer Army, and WB Panchayat exams. " +
      "Answer clearly in Bengali or English based on the student's question. Provide bullet points, syllabus tips, short notes, or formulas. Keep answers concise, highly accurate, and helpful for students.";

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

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      return NextResponse.json({ reply: null, error: "Gemini API request failed" });
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (candidateText) {
      return NextResponse.json({ reply: candidateText });
    }

    return NextResponse.json({ reply: null });
  } catch (error) {
    console.error("AI Tutor Route error:", error);
    return NextResponse.json({ reply: null, error: "Internal error" }, { status: 500 });
  }
}
