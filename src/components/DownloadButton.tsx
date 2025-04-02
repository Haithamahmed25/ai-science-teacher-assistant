'use client';

import { useState } from 'react';
import { 
  generateLessonPlanDoc, 
  generateAssessmentDoc, 
  generateHomeworkDoc, 
  downloadDocument 
} from '@/lib/utils/docx-generator';

export function DownloadButton({ 
  type, 
  data, 
  topic, 
  includeArabic = false, 
  homeworkLevel = null 
}) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      let doc;
      let fileName;

      // Format topic for filename (lowercase, replace spaces with underscores)
      const formattedTopic = topic.toLowerCase().replace(/\s+/g, '_');

      switch (type) {
        case 'lessonPlan':
          doc = generateLessonPlanDoc(
            data.lessonPlan, 
            includeArabic, 
            includeArabic ? data.arabic?.lessonPlan : null
          );
          fileName = `lessonplan_${formattedTopic}.docx`;
          break;
          
        case 'assessment':
          doc = generateAssessmentDoc(
            data.assessment, 
            includeArabic, 
            includeArabic ? data.arabic?.assessment : null
          );
          fileName = `assessment_${formattedTopic}.docx`;
          break;
          
        case 'homework':
          if (!homeworkLevel) {
            throw new Error('Homework level is required for homework downloads');
          }
          doc = generateHomeworkDoc(
            data.homework, 
            homeworkLevel, 
            includeArabic, 
            includeArabic ? data.arabic?.homework : null
          );
          fileName = `homework_${homeworkLevel}_${formattedTopic}.docx`;
          break;
          
        default:
          throw new Error(`Unknown download type: ${type}`);
      }

      await downloadDocument(doc, fileName);
    } catch (error) {
      console.error('Error generating document:', error);
      alert('There was an error generating the document. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className={`${
        type === 'homework' && homeworkLevel === 'basic' 
          ? 'bg-green-600 hover:bg-green-700' 
          : type === 'homework' && homeworkLevel === 'core'
          ? 'bg-blue-600 hover:bg-blue-700'
          : type === 'homework' && homeworkLevel === 'advanced'
          ? 'bg-purple-600 hover:bg-purple-700'
          : 'bg-blue-600 hover:bg-blue-700'
      } text-white font-bold py-2 px-4 rounded transition-colors duration-200 ${
        isGenerating ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {isGenerating ? 'Generating...' : 'Download as .docx'}
    </button>
  );
}
