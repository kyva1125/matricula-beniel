import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div className="space-y-1">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">{title}</h2>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
      {action && (
        <div className="self-start sm:self-auto flex items-center gap-2">
          {action}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
