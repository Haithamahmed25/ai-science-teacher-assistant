'use client';

import { useState } from 'react';
import { Tab } from '@/components/tabs/Tab';
import { TabContent } from '@/components/tabs/TabContent';
import { ArabicToggle, ArabicContent } from '@/components/arabic/ArabicToggle';

// Pre-generated data for Chemical Bonding
const demoData = {
  topic: "Chemical Bonding",
  gradeLevel: "10",
  duration: 50,
  lessonPlan: {
    objectives: "Students will be able to identify different types of chemical bonds, explain how they form, and predict bond types based on electronegativity differences.",
    warmUp: "Show students various materials (salt, water, metal) and ask them to predict which ones conduct electricity and why.",
    explanation: "Introduce the concept of chemical bonding, focusing on ionic, covalent, and metallic bonds. Explain how electronegativity determines bond type.",
    studentActivity: "Students will create models of different molecules using molecular model kits to visualize various bond types.",
    closure: "Class discussion comparing and contrasting the three main types of chemical bonds and their properties.",
    homework: "Create a concept map showing the relationships between bond types, electronegativity, and physical properties.",
    estimatedTime: 50,
    ngssAlignment: "HS-PS1-1: Use the periodic table as a model to predict the relative properties of elements based on the patterns of electrons in the outermost energy level of atoms."
  },
  assessment: {
    conceptual: [
      { question: "How does electronegativity determine whether a bond will be ionic, covalent, or polar covalent?", answer: "When the electronegativity difference between atoms is greater than 1.7, the bond is typically ionic. When it's between 0.5 and 1.7, the bond is polar covalent. When it's less than 0.5, the bond is nonpolar covalent.", phase: "explanation" },
      { question: "Why do ionic compounds typically have higher melting points than covalent compounds?", answer: "Ionic compounds form crystal lattices with strong electrostatic forces between positive and negative ions in all directions. These strong forces require more energy (higher temperatures) to overcome compared to the weaker intermolecular forces in covalent compounds.", phase: "warm-up" }
    ],
    multipleChoice: [
      { 
        question: "Which of the following best describes the bond in NaCl?", 
        options: ["Nonpolar covalent", "Polar covalent", "Ionic", "Metallic"],
        answer: "Ionic",
        phase: "activity"
      },
      { 
        question: "What type of bond would form between two atoms with an electronegativity difference of 0.4?", 
        options: ["Ionic bond", "Polar covalent bond", "Nonpolar covalent bond", "Hydrogen bond"],
        answer: "Nonpolar covalent bond",
        phase: "closure"
      }
    ]
  },
  homework: {
    basic: Array(10).fill(null).map((_, i) => ({
      question: `Basic question ${i+1} about Chemical Bonding`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      answer: "Option " + String.fromCharCode(65 + (i % 4))
    })),
    core: Array(10).fill(null).map((_, i) => ({
      question: `Core question ${i+1} about Chemical Bonding`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      answer: "Option " + String.fromCharCode(65 + (i % 4))
    })),
    advanced: Array(10).fill(null).map((_, i) => ({
      question: `Advanced question ${i+1} about Chemical Bonding`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      answer: "Option " + String.fromCharCode(65 + (i % 4))
    }))
  },
  simulations: [
    { name: "PhET: Molecule Shapes", url: "https://phet.colorado.edu/en/simulation/molecule-shapes" },
    { name: "PhET: Build an Atom", url: "https://phet.colorado.edu/en/simulation/build-an-atom" },
    { name: "Interactive Tool: Bond Polarity", url: "https://www.middleschoolchemistry.com/multimedia/chapter4/lesson4" },
    { name: "Video: Crash Course Chemistry - Bonding", url: "https://www.youtube.com/watch?v=QXT4OVM4vXI" }
  ],
  studentQA: [
    { question: "Why do some atoms form bonds while others don't?", answer: "Atoms form bonds to achieve a more stable electron configuration, typically by filling their outer electron shell (octet rule). Noble gases already have full outer shells, which is why they rarely form bonds." },
    { question: "Can a molecule have both ionic and covalent bonds?", answer: "Yes, these are called polyatomic ions. For example, in sodium nitrate (NaNO₃), there's an ionic bond between Na⁺ and NO₃⁻, while within the nitrate ion, there are covalent bonds between nitrogen and oxygen atoms." }
  ],
  stemIntegration: {
    science: "Connect chemical bonding to biological systems by exploring how hydrogen bonds affect protein structure and DNA.",
    technology: "Investigate how understanding bond types has led to the development of new materials like semiconductors and polymers.",
    engineering: "Design a water filtration system that takes advantage of the polar nature of water molecules to separate contaminants.",
    math: "Calculate bond energies and use mathematical models to predict molecular geometry based on electron repulsion.",
    strengthMeter: {
      science: 5,
      technology: 4,
      engineering: 3,
      math: 4
    },
    advice: "Add more hands-on engineering activities to strengthen the Engineering integration"
  },
  arabic: {
    lessonPlan: {
      objectives: "سيتمكن الطلاب من تحديد أنواع مختلفة من الروابط الكيميائية، وشرح كيفية تكوينها، والتنبؤ بأنواع الروابط بناءً على اختلافات الكهروسلبية.",
      warmUp: "اعرض على الطلاب مواد مختلفة (ملح، ماء، معدن) واطلب منهم التنبؤ بالمواد التي توصل الكهرباء ولماذا.",
      explanation: "قدم مفهوم الترابط الكيميائي، مع التركيز على الروابط الأيونية والتساهمية والمعدنية. اشرح كيف تحدد الكهروسلبية نوع الرابطة.",
      studentActivity: "سيقوم الطلاب بإنشاء نماذج لجزيئات مختلفة باستخدام مجموعات نماذج جزيئية لتصور أنواع الروابط المختلفة.",
      closure: "مناقشة صفية لمقارنة ومقابلة الأنواع الرئيسية الثلاثة للروابط الكيميائية وخصائصها.",
      homework: "إنشاء خريطة مفاهيم توضح العلاقات بين أنواع الروابط والكهروسلبية والخصائص الفيزيائية."
    }
  }
};

export default function ChemicalBondingDemo() {
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
          <h1 className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
            {data.topic} - Grade {data.gradeLevel}
          </h1>
          <div className="text-sm bg-green-200 dark:bg-green-700 px-3 py-1 rounded-full">
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
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
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
                  <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
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
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
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
