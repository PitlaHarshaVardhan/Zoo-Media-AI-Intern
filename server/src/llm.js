const { GoogleGenerativeAI } = require("@google/generative-ai");
const { SUMMARY_PROMPT } = require('./prompt');

async function getSummary(text) {
  const apiKey = process.env.LLM_API_KEY;
  
  if (!apiKey) {
    throw new Error('LLM_API_KEY environment variable is missing.');
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelInstance = process.env.LLM_MODEL || "gemini-2.5-flash";
    const model = genAI.getGenerativeModel({ 
      model: modelInstance,
      systemInstruction: SUMMARY_PROMPT
    });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text }]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json"
      }
    });

    const content = result.response.text();
    
    // Attempt to parse JSON strictly
    try {
      return JSON.parse(content);
    } catch (parseError) {
      // Fallback: sometimes LLMs still wrap in markdown despite instructions
      const cleanContent = content.replace(/^```json/mi, '').replace(/```$/m, '').trim();
      return JSON.parse(cleanContent);
    }
  } catch (error) {
    console.error('LLM API Error:', error.message);
    throw new Error('Failed to generate summary from LLM API.');
  }
}

module.exports = { getSummary };
