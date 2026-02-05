const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Generate notes from topic
const generateNotes = async (topic, subject, additionalContext = '') => {
  try {
    const prompt = `Create comprehensive study notes on the topic: "${topic}" for the subject: "${subject}".
    ${additionalContext ? `Additional context: ${additionalContext}` : ''}
    
    Please provide:
    1. Overview and key concepts
    2. Important definitions
    3. Main points with explanations
    4. Examples where applicable
    5. Summary
    
    Format the notes in a clear, organized manner suitable for studying.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert educational content creator who creates clear, comprehensive study notes."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('AI Notes Generation Error:', error);
    throw new Error('Failed to generate notes');
  }
};

// Generate quiz questions
const generateQuiz = async (topic, subject, numberOfQuestions = 5, difficulty = 'medium') => {
  try {
    const prompt = `Create a ${difficulty} difficulty quiz with ${numberOfQuestions} multiple-choice questions on the topic: "${topic}" for the subject: "${subject}".
    
    For each question, provide:
    1. The question text
    2. Four answer options (labeled A, B, C, D)
    3. The correct answer (just the letter)
    4. A brief explanation of why that answer is correct
    
    Format your response as a JSON array with this structure:
    [
      {
        "question": "Question text here?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": 0,
        "explanation": "Brief explanation"
      }
    ]
    
    Make sure questions are clear, educational, and appropriate for the difficulty level.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert educator who creates high-quality quiz questions. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = completion.choices[0].message.content;
    
    // Extract JSON from response (in case there's extra text)
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Failed to parse quiz questions');
    }
    
    const questions = JSON.parse(jsonMatch[0]);
    return questions;
  } catch (error) {
    console.error('AI Quiz Generation Error:', error);
    throw new Error('Failed to generate quiz');
  }
};

// Generate flashcards from content
const generateFlashcards = async (content, subject, numberOfCards = 10) => {
  try {
    const prompt = `Based on this content about ${subject}, create ${numberOfCards} flashcard pairs (question and answer).
    
    Content:
    ${content.substring(0, 2000)} // Limit content length
    
    Format your response as a JSON array with this structure:
    [
      {
        "question": "Question or term",
        "answer": "Answer or definition",
        "difficulty": "easy" | "medium" | "hard"
      }
    ]
    
    Make flashcards that test understanding of key concepts, definitions, and important facts.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert educator who creates effective flashcards for studying. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    const responseContent = completion.choices[0].message.content;
    const jsonMatch = responseContent.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Failed to parse flashcards');
    }
    
    const flashcards = JSON.parse(jsonMatch[0]);
    return flashcards;
  } catch (error) {
    console.error('AI Flashcard Generation Error:', error);
    throw new Error('Failed to generate flashcards');
  }
};

module.exports = {
  generateNotes,
  generateQuiz,
  generateFlashcards
};