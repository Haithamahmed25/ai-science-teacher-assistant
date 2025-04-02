// OpenAI API client implementation

import { Configuration, OpenAIApi } from 'openai';

// Initialize OpenAI configuration
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.warn('OpenAI API key is not set. Using mock data instead.');
    return null;
  }
  
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  
  return new OpenAIApi(configuration);
};

// Generate lesson content using OpenAI
export const generateLessonContent = async (
  topic: string,
  gradeLevel: string,
  duration: number,
  tone: string,
  includeArabic: boolean
) => {
  const openai = getOpenAIClient();
  
  if (!openai) {
    // Return mock data if API key is not available
    return generateMockData(topic, gradeLevel, duration, includeArabic);
  }
  
  try {
    // Prepare the prompt for OpenAI
    const prompt = createPrompt(topic, gradeLevel, duration, tone, includeArabic);
    
    // Call OpenAI API
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert science teacher assistant that creates comprehensive lesson plans aligned with NGSS standards."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });
    
    // Process and structure the response
    const content = response.data.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }
    
    // Parse the content into structured data
    return parseOpenAIResponse(content, topic, gradeLevel, duration, includeArabic);
    
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    // Fallback to mock data in case of error
    return generateMockData(topic, gradeLevel, duration, includeArabic);
  }
};

// Create prompt for OpenAI
const createPrompt = (
  topic: string,
  gradeLevel: string,
  duration: number,
  tone: string,
  includeArabic: boolean
) => {
  return `
    Create a comprehensive science lesson plan for "${topic}" for grade ${gradeLevel} students.
    The lesson should be designed for ${duration} minutes.
    Use a ${tone.toLowerCase()} tone throughout the content.
    
    The lesson plan should include:
    1. Clear objectives aligned with NGSS standards
    2. A warm-up activity
    3. Main explanation of the topic
    4. Student activity
    5. Closure
    6. Homework assignment
    
    Also include:
    - Assessment questions (both conceptual and multiple-choice)
    - Homework questions at three levels: basic, core, and advanced
    - Links to relevant simulations and resources
    - Common student questions with answers
    - STEM integration ideas for science, technology, engineering, and math
    
    ${includeArabic ? 'Also provide Arabic translations for all content.' : ''}
    
    Format the response as structured JSON data that can be parsed programmatically.
  `;
};

// Parse OpenAI response into structured data
const parseOpenAIResponse = (
  content: string,
  topic: string,
  gradeLevel: string,
  duration: number,
  includeArabic: boolean
) => {
  // In a real implementation, this would parse the JSON response from OpenAI
  // For now, we'll return mock data
  return generateMockData(topic, gradeLevel, duration, includeArabic);
};

// Generate mock data for testing or when API key is not available
const generateMockData = (
  topic: string,
  gradeLevel: string,
  duration: number,
  includeArabic: boolean
) => {
  return {
    success: true,
    data: {
      topic,
      gradeLevel,
      duration,
      lessonPlan: {
        objectives: `Students will be able to understand and explain key concepts related to ${topic}.`,
        warmUp: `Begin with a quick demonstration or question related to ${topic} to engage students.`,
        explanation: `Main explanation of ${topic} with key concepts and examples.`,
        studentActivity: `Students will work in groups to explore ${topic} through hands-on activities.`,
        closure: `Summarize the key points of ${topic} and check for understanding.`,
        homework: `Research and write about real-world applications of ${topic}.`,
        estimatedTime: duration,
        ngssAlignment: "MS-PS2-1" // Sample NGSS code
      },
      assessment: {
        conceptual: [
          { question: `What are the fundamental principles of ${topic}?`, answer: "Sample answer explaining the fundamental principles.", phase: "warm-up" },
          { question: `How does ${topic} relate to everyday phenomena?`, answer: "Sample answer connecting to real-world examples.", phase: "explanation" }
        ],
        multipleChoice: [
          { 
            question: `Which of the following best describes ${topic}?`, 
            options: ["Option A", "Option B", "Option C", "Option D"],
            answer: "Option B",
            phase: "activity"
          },
          { 
            question: `What is a key application of ${topic}?`, 
            options: ["Option A", "Option B", "Option C", "Option D"],
            answer: "Option C",
            phase: "closure"
          }
        ]
      },
      homework: {
        basic: Array(10).fill(null).map((_, i) => ({
          question: `Basic question ${i+1} about ${topic}?`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          answer: "Option " + String.fromCharCode(65 + (i % 4))
        })),
        core: Array(10).fill(null).map((_, i) => ({
          question: `Core question ${i+1} about ${topic}?`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          answer: "Option " + String.fromCharCode(65 + (i % 4))
        })),
        advanced: Array(10).fill(null).map((_, i) => ({
          question: `Advanced question ${i+1} about ${topic}?`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          answer: "Option " + String.fromCharCode(65 + (i % 4))
        }))
      },
      simulations: [
        { name: "PhET Simulation 1", url: "https://phet.colorado.edu/en/simulation/example1" },
        { name: "PhET Simulation 2", url: "https://phet.colorado.edu/en/simulation/example2" },
        { name: "Interactive Tool", url: "https://example.com/interactive-tool" },
        { name: "Video Explanation", url: "https://example.com/video" }
      ],
      studentQA: [
        { question: `Why is ${topic} important?`, answer: "Sample teacher response explaining the importance." },
        { question: `How is ${topic} related to other scientific concepts?`, answer: "Sample teacher response with connections to other concepts." }
      ],
      stemIntegration: {
        science: `Explore how ${topic} connects to other areas of science.`,
        technology: `Analyze how ${topic} is applied in modern technology.`,
        engineering: `Design and build a model that demonstrates ${topic}.`,
        math: `Use mathematical models to represent ${topic} quantitatively.`,
        strengthMeter: {
          science: 5,
          technology: 3,
          engineering: 4,
          math: 2
        },
        advice: "Add a graphing activity to strengthen Math integration"
      },
      arabic: includeArabic ? {
        lessonPlan: {
          objectives: `سيتمكن الطلاب من فهم وشرح المفاهيم الرئيسية المتعلقة بـ ${topic}.`,
          warmUp: `ابدأ بعرض توضيحي سريع أو سؤال متعلق بـ ${topic} لإشراك الطلاب.`,
          explanation: `شرح رئيسي لـ ${topic} مع المفاهيم والأمثلة الرئيسية.`,
          studentActivity: `سيعمل الطلاب في مجموعات لاستكشاف ${topic} من خلال أنشطة عملية.`,
          closure: `تلخيص النقاط الرئيسية لـ ${topic} والتحقق من الفهم.`,
          homework: `البحث والكتابة عن التطبيقات العملية لـ ${topic}.`
        }
      } : null
    }
  };
};
