'use client';


import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  
  const handleContinue = () => {
    router.push('/generate-lesson');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Welcome to the AI Science Teacher Assistant
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-4">
            Built with the heart of a teacher and the power of AI, this tool was created to support educators in a way that truly matters.
          </p>
          
          <p className="text-lg mb-4">
            With over 25 years of experience in physics education, I understand the challenges teachers face: time pressure, resource overload, and the constant need to engage young minds.
          </p>
          
          <p className="text-lg mb-4">
            This assistant is designed to lift that weight—offering instant, personalized lesson plans, assessments, STEM integration, and Arabic translation.
          </p>
          
          <p className="text-lg mb-4">
            It's the beginning of something bigger: a future where every teacher has intelligent support at their side.
          </p>
        </div>
        
        <div className="flex flex-col items-end mt-8">
          <p className="text-xl italic mb-4">— Haitham</p>
          
          <button
            onClick={handleContinue}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}
