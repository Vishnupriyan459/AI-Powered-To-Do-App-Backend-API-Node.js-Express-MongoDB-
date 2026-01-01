import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function suggestSubtasks(title, description) {
  const prompt = `
User added a task:
Title: ${title}
Description: ${description}

Suggest exactly 3 short actionable subtasks ONLY.
Return response strictly as ONE valid JSON array, nothing else.
Example:
["task1", "task2", "task3"]
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",   // 🆕 correct supported model
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
    max_completion_tokens: 100,
  });

  const text = completion.choices[0]?.message?.content?.trim() || "[]";

  try {
    return JSON.parse(text);
  } catch (error) {
    console.warn("⚠️ Groq returned non-JSON — using fallback", text);
    return ["Plan next step", "Prepare materials", "Track progress"];
  }
}

export default suggestSubtasks;
