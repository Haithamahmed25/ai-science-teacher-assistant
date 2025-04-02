'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();

  const handleDemoSelect = (topic: string) => {
    router.push(`/demo-topics/${topic.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 pt-20">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          AI Science Teacher Assistant
        </h1>

        <p className="text-lg mb-8 text-center">
          Explore pre-generated lesson plans or create your own. No API key required for demo topics.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => handleDemoSelect("Newtons Laws of Motion")}
            className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center mb-4">
              <div className="text-4xl mr-4">🔭</div>
              <h2 className="text-xl font-bold">Newton's Laws of Motion</h2>
            </div>
            <p className="mb-4">
              Explore the fundamental principles that govern motion in our physical world. Perfect for physics classes in grades 8-12.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm bg-blue-200 dark:bg-blue-700 px-3 py-1 rounded-full">Physics</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Grades 8-12</span>
            </div>
          </div>

          <div
            onClick={() => handleDemoSelect("Chemical Bonding")}
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center mb-4">
              <div className="text-4xl mr-4">⚗️</div>
              <h2 className="text-xl font-bold">Chemical Bonding</h2>
            </div>
            <p className="mb-4">
              Discover how atoms connect to form molecules through different types of chemical bonds. Ideal for chemistry classes in grades 9-12.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm bg-green-200 dark:bg-green-700 px-3 py-1 rounded-full">Chemistry</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Grades 9-12</span>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="mb-4">Want to create your own custom lesson plan?</p>
          <Link
            href="/generate-lesson"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Generate Custom Lesson
          </Link>
        </div>
      </div>
    </main>
  );
}
