'use client';

interface TabProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

export const Tab: React.FC<TabProps> = ({ active, onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 ${
        active
          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
      }`}
    >
      {label}
    </button>
  );
};
