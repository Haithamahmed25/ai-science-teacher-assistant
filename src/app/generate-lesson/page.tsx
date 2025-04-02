'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type GradeLevel = '6' | '7' | '8' | '9' | '10' | '11' | '12';
type ToneOption = 'Formal' | 'Conversational' | 'Enthusiastic' | 'Simple';

export default function GenerateLesson() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    topic: '',
    gradeLevel: '9' as GradeLevel,
    duration: 45,
    tone: 'Conversational' as ToneOption,
    includeArabic: false,
    file: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        file: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real implementation, this would send data to an API endpoint
      console.log('Submitting form data:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to results page (this would be implemented differently in a real app)
      // For now, we'll just simulate success and redirect to a placeholder
      router.push('/generate-lesson/results');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while generating the lesson plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Generate Lesson Plan
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topic */}
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., Newton's Laws of Motion"
            />
          </div>
          
          {/* Grade Level */}
          <div>
            <label htmlFor="gradeLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Grade Level
            </label>
            <select
              id="gradeLevel"
              name="gradeLevel"
              value={formData.gradeLevel}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="6">Grade 6</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
          </div>
          
          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
              min="10"
              max="180"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          {/* File Upload */}
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              File Upload (optional)
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Upload any reference materials or curriculum guidelines.
            </p>
          </div>
          
          {/* Tone Selector */}
          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tone
            </label>
            <select
              id="tone"
              name="tone"
              value={formData.tone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="Formal">Formal</option>
              <option value="Conversational">Conversational</option>
              <option value="Enthusiastic">Enthusiastic</option>
              <option value="Simple">Simple</option>
            </select>
          </div>
          
          {/* Arabic Translation Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="includeArabic"
              name="includeArabic"
              checked={formData.includeArabic}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="includeArabic" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Also generate in Arabic
            </label>
          </div>
          
          {/* Generate Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 disabled:bg-blue-400"
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
