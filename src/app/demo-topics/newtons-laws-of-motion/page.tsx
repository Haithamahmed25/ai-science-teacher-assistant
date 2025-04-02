'use client';

import { useState } from 'react';
import { Tab } from '@/components/tabs/Tab';
import { TabContent } from '@/components/tabs/TabContent';
import { ArabicToggle, ArabicContent } from '@/components/arabic/ArabicToggle';

// Pre-generated data for Newton's Laws of Motion
const demoData = {
  topic: "Newton's Laws of Motion",
  gradeLevel: "9",
  duration: 45,
  lessonPlan: {
    objectives: "Students will be able to describe and apply Newton's three laws of motion to real-world scenarios.",
    warmUp: "Ask students to push against a wall and describe what they feel. Discuss why they can't move the wall despite applying force.",
    explanation: "Introduce Newton's three laws of motion with examples and demonstrations for each law.",
    studentActivity: "In small groups, students will design and conduct simple experiments to demonstrate each of Newton's laws.",
    closure: "Class discussion on how Newton's laws apply to everyday situations like driving a car or playing sports.",
    homework: "Research and write about three real-world applications of Newton's laws not discussed in class.",
    estimatedTime: 45,
    ngssAlignment: "MS-PS2-1: Apply Newton's Third Law to design a solution to a problem involving the motion of two colliding objects."
  },
  assessment: {
    conceptual: [
      { question: "How does Newton's First Law explain why you feel pushed back when a car accelerates quickly?", answer: "Newton's First Law states that an object at rest tends to stay at rest. When a car accelerates, your body wants to remain at rest, creating the feeling of being pushed back against the seat.", phase: "warm-up" },
      { question: "Explain how rocket propulsion demonstrates Newton's Third Law.", answer: "Rocket propulsion works by expelling gas in one direction (action), which creates an equal and opposite force (reaction) that propels the rocket forward.", phase: "explanation" }
    ],
    multipleChoice: [
      { 
        question: "Which of Newton's laws best explains why wearing a seatbelt is important during a car crash?", 
        options: ["First Law", "Second Law", "Third Law", "None of the above"],
        answer: "First Law",
        phase: "activity"
      },
      { 
        question: "According to Newton's Second Law, what happens to acceleration when force increases but mass remains constant?", 
        options: ["Acceleration decreases", "Acceleration increases", "Acceleration remains the same", "Cannot be determined"],
        answer: "Acceleration increases",
        phase: "closure"
      }
    ]
  },
  homework: {
    basic: Array(10).fill(null).map((_, i) => ({
      question: `Basic question ${i+1} about Newton's Laws`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      answer: "Option " + String.fromCharCode(65 + (i % 4))
    })),
    core: Array(10).fill(null).map((_, i) => ({
      question: `Core question ${i+1} about Newton's Laws`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      answer: "Option " + String.fromCharCode(65 + (i % 4))
    })),
    advanced: Array(10).fill(null).map((_, i) => ({
      question: `Advanced question ${i+1} about Newton's Laws`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      answer: "Option " + String.fromCharCode(65 + (i % 4))
    }))
  },
  simulations: [
    { name: "PhET: Forces and Motion", url: "https://phet.colorado.edu/en/simulation/forces-and-motion-basics" },
    { name: "PhET: Newton's Laws", url: "https://phet.colorado.edu/en/simulation/legacy/newton" },
    { name: "Interactive Tool: Newton's Cradle", url: "https://www.physicsclassroom.com/Physics-Interactives/Newtons-Laws/Newtons-Cradle" },
    { name: "Video: Crash Course Physics - Newton's Laws", url: "https://www.youtube.com/watch?v=kKKM8Y-u7ds" }
  ],
  studentQA: [
    { question: "Why do we feel weightless during free fall?", answer: "During free fall, both you and your surroundings are accelerating at the same rate due to gravity. This creates a sensation of weightlessness because there's no normal force pushing against you." },
    { question: "How can a small person push a much larger person on ice?", answer: "On ice, friction is greatly reduced. According to Newton's Third Law, when the small person pushes, they exert a force that is equal in magnitude to what they receive. With minimal friction, both people move, with the larger person moving less due to their greater mass (as explained by Newton's Second Law)." }
  ],
  stemIntegration: {
    science: "Explore how Newton's laws apply to other areas of physics like circular motion and universal gravitation.",
    technology: "Analyze how Newton's laws are applied in the design of vehicle safety features like airbags and crumple zones.",
    engineering: "Design and build a small rocket or car that demonstrates Newton's Third Law.",
    math: "Create and analyze force diagrams, calculate acceleration using F=ma, and graph relationships between force, mass, and acceleration.",
    strengthMeter: {
      science: 5,
      technology: 3,
      engineering: 4,
      math: 2
    },
    advice: "Add a graphing activity to strengthen Math integration"
  },
  arabic: {
    lessonPlan: {
      objectives: "سيتمكن الطلاب من وصف وتطبيق قوانين نيوتن الثلاثة للحركة على سيناريوهات العالم الحقيقي.",
      warmUp: "اطلب من الطلاب الدفع ضد الحائط ووصف ما يشعرون به. ناقش لماذا لا يمكنهم تحريك الحائط رغم تطبيق القوة.",
      explanation: "قدم قوانين نيوتن الثلاثة للحركة مع أمثلة وعروض توضيحية لكل قانون.",
      studentActivity: "في مجموعات صغيرة، سيقوم الطلاب بتصميم وإجراء تجارب بسيطة لإظهار كل من قوانين نيوتن.",
      closure: "مناقشة صفية حول كيفية تطبيق قوانين نيوتن على المواقف اليومية مثل قيادة السيارة أو ممارسة الرياضة.",
      homework: "البحث والكتابة عن ثلاثة تطبيقات واقعية لقوانين نيوتن لم تتم مناقشتها في الفصل."
    }
  }
};

export default function NewtonsLawsDemo() {
  const [activeTab, setActiveTab] = useState('lessonPlan');
  const [showArabic, setShowArabic] = useState(false);
  const [data] = useState(demoData);

  const handleDownload = (type: string) => {
    // In a real implementation, this would generate and download a .docx file
    console.log(`Downloading ${type} as .docx`);
    alert(`In a real implementation, this would download a ${type} .docx file`);
  };

  const toggleArabic = () => {
    setShowArabic(!showArabic);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 pt-20">
      <div className="max-w-6xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
            {data.topic} - Grade {data.gradeLevel}
          </h1>
          <div className="text-sm bg-blue-200 dark:bg-blue-700 px-3 py-1 rounded-full">
            Demo Content
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700 mb-6">
          <Tab 
            active={activeTab === 'lessonPlan'} 
            onClick={() => setActiveTab('lessonPlan')}
            label="Lesson Plan"
          />
          <Tab 
            active={activeTab === 'assessment'} 
            onClick={() => setActiveTab('assessment')}
            label="Assessment Questions"
          />
          <Tab 
            active={activeTab === 'homework'} 
            onClick={() => setActiveTab('homework')}
            label="Homework"
          />
          <Tab 
            active={activeTab === 'simulations'} 
            onClick={() => setActiveTab('simulations')}
            label="Simulations & Resources"
          />
          <Tab 
            active={activeTab === 'studentQA'} 
            onClick={() => setActiveTab('studentQA')}
            label="Student Q&A"
          />
          <Tab 
            active={activeTab === 'stemIntegration'} 
            onClick={() => setActiveTab('stemIntegration')}
            label="STEM Integration"
          />
        </div>
        
        {/* Tab Content */}
        <TabContent active={activeTab === 'lessonPlan'}>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Objectives</h2>
              <p>{data.lessonPlan.objectives}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                ⏳ Estimated Time: {data.lessonPlan.estimatedTime} minutes
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                NGSS: {data.lessonPlan.ngssAlignment}
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">🟡 Warm-Up</h2>
              <p>{data.lessonPlan.warmUp}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">🟢 Explanation</h2>
              <p>{data.lessonPlan.explanation}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">🔵 Student Activity</h2>
              <p>{data.lessonPlan.studentActivity}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">🔴 Closure</h2>
              <p>{data.lessonPlan.closure}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Homework</h2>
              <p>{data.lessonPlan.homework}</p>
            </div>
            
            {data.arabic && (
              <ArabicToggle showArabic={showArabic} toggleArabic={toggleArabic} />
            )}
            
            {data.arabic && (
              <ArabicContent show={showArabic}>
                <div>
                  <h2 className="text-xl font-semibold mb-2">الأهداف</h2>
                  <p>{data.arabic.lessonPlan.objectives}</p>
                </div>
                
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-2">التهيئة 🟡</h2>
                  <p>{data.arabic.lessonPlan.warmUp}</p>
                </div>
                
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-2">الشرح 🟢</h2>
                  <p>{data.arabic.lessonPlan.explanation}</p>
                </div>
                
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-2">نشاط الطلاب 🔵</h2>
                  <p>{data.arabic.lessonPlan.studentActivity}</p>
                </div>
                
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-2">الخاتمة 🔴</h2>
                  <p>{data.arabic.lessonPlan.closure}</p>
                </div>
                
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-2">الواجب المنزلي</h2>
                  <p>{data.arabic.lessonPlan.homework}</p>
                </div>
              </ArabicContent>
            )}
            
            <div className="mt-6">
              <button
                onClick={() => handleDownload('lessonPlan')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
              >
                Download as .docx
              </button>
            </div>
          </div>
        </TabContent>
        
        <TabContent active={activeTab === 'assessment'}>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Conceptual Questions</h2>
              <div className="space-y-4">
                {data.assessment.conceptual.map((item, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center mb-1">
                      {item.phase === 'warm-up' && <span className="mr-2 text-yellow-500">🟡</span>}
                      {item.phase === 'explanation' && <span className="mr-2 text-green-500">🟢</span>}
                      {item.phase === 'activity' && <span className="mr-2 text-blue-500">🔵</span>}
                      {item.phase === 'closure' && <span className="mr-2 text-red-500">🔴</span>}
                      <p className="font-medium">{item.question}</p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Multiple-Choice Questions</h2>
              <div className="space-y-4">
                {data.assessment.multipleChoice.map((item, index) => (
                  <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
                    <div className="flex items-center mb-1">
                      {item.phase === 'warm-up' && <span className="mr-2 text-yellow-500">🟡</span>}
                      {item.phase === 'explanation' && <span className="mr-2 text-green-500">🟢</span>}
                      {item.phase === 'activity' && <span className="mr-2 text-blue-500">🔵</span>}
                      {item.phase === 'closure' && <span className="mr-2 text-red-500">🔴</span>}
                      <p className="font-medium">{item.question}</p>
                    </div>
                    <div className="ml-6 space-y-1 mt-2">
                      {item.options.map((option, optIndex) => (
                        <p 
                          key={optIndex} 
                          className={option === item.answer ? "font-medium text-green-600 dark:text-green-400" : ""}
                        >
                          {String.fromCharCode(65 + optIndex)}. {option} {option === item.answer && '✓'}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={() => handleDownload('assessment')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
              >
                Download as .docx
              </button>
            </div>
          </div>
        </TabContent>
        
        <TabContent active={activeTab === 'homework'}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic Column */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">🌱</span> Basic
              </h2>
              <div className="space-y-3">
                {data.homework.basic.slice(0, 3).map((item, index) => (
                  <div key={index} className="border-l-4 border-green-300 pl-3 py-1">
                    <p className="font-medium">{index + 1}. {item.question}</p>
                  </div>
                ))}
                <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                  + {data.homework.basic.length - 3} more questions
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleDownload('homework-basic')}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 w-full"
                >
                  Download Basic
                </button>
              </div>
            </div>
            
            {/* Core Column */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">🌿</span> Core
              </h2>
              <div className="space-y-3">
                {data.homework.core.slice(0, 3).map((item, index) => (
                  <div key={index} className="border-l-4 border-blue-300 pl-3 py-1">
                    <p className="font-medium">{index + 1}. {item.question}</p>
                  </div>
                ))}
                <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                  + {data.homework.core.length - 3} more questions
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleDownload('homework-core')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 w-full"
                >
                  Download Core
                </button>
              </div>
            </div>
            
            {/* Advanced Column */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">🌳</span> Advanced
              </h2>
              <div className="space-y-3">
                {data.homework.advanced.slice(0, 3).map((item, index) => (
                  <div key={index} className="border-l-4 border-purple-300 pl-3 py-1">
                    <p className="font-medium">{index + 1}. {item.question}</p>
                  </div>
                ))}
                <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                  + {data.homework.advanced.length - 3} more questions
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleDownload('homework-advanced')}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 w-full"
                >
                  Download Advanced
                </button>
              </div>
            </div>
          </div>
        </TabContent>
        
        <TabContent active={activeTab === 'simulations'}>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Simulations & Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.simulations.map((item, index) => (
                <a 
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="mr-4 text-2xl">
                    {index % 4 === 0 && '🧪'}
                    {index % 4 === 1 && '💻'}
                    {index % 4 === 2 && '🔍'}
                    {index % 4 === 3 && '🎬'}
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400">{item.url}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </TabContent>
        
        <TabContent active={activeTab === 'studentQA'}>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Common Student Questions</h2>
            <div className="space-y-6">
              {data.studentQA.map((item, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">❓ {item.question}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </TabContent>
        
        <TabContent active={activeTab === 'stemIntegration'}>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">STEM Integration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2 flex items-center">
                  <span className="mr-2">🧬</span> Science
                </h3>
                <p>{data.stemIntegration.science}</p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2 flex items-center">
                  <span className="mr-2">💻</span> Technology
                </h3>
                <p>{data.stemIntegration.technology}</p>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2 flex items-center">
                  <span className="mr-2">🛠️</span> Engineering
                </h3>
                <p>{data.stemIntegration.engineering}</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2 flex items-center">
                  <span className="mr-2">➗</span> Math
                </h3>
                <p>{data.stemIntegration.math}</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-medium text-lg mb-2">STEM Strength Meter</h3>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <p className="text-sm mb-1">Science</p>
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className={`h-4 w-4 rounded-full mr-1 ${i < data.stemIntegration.strengthMeter.science ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}></span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm mb-1">Technology</p>
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className={`h-4 w-4 rounded-full mr-1 ${i < data.stemIntegration.strengthMeter.technology ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'}`}></span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm mb-1">Engineering</p>
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className={`h-4 w-4 rounded-full mr-1 ${i < data.stemIntegration.strengthMeter.engineering ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`}></span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm mb-1">Math</p>
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className={`h-4 w-4 rounded-full mr-1 ${i < data.stemIntegration.strengthMeter.math ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></span>
                    ))}
                  </div>
                </div>
              </div>
              
              {data.stemIntegration.advice && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 rounded">
                  <p className="text-sm">💡 <strong>Suggestion:</strong> {data.stemIntegration.advice}</p>
                </div>
              )}
            </div>
          </div>
        </TabContent>
      </div>
    </main>
  );
}
