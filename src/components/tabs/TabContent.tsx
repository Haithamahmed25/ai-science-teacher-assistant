'use client';

interface TabContentProps {
  active: boolean;
  children: React.ReactNode;
}

export const TabContent: React.FC<TabContentProps> = ({ active, children }) => {
  if (!active) return null;
  
  return (
    <div className="py-4">
      {children}
    </div>
  );
};
