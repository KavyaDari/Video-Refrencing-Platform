import React from 'react';
import { Card } from '../ui/card';
import { LucideIcon } from 'lucide-react';

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  bgColor: string;
  onClick: () => void;
}

export function ActionCard({ title, description, icon: Icon, bgColor, onClick }: ActionCardProps) {
  return (
    <Card 
      onClick={onClick}
      className="cursor-pointer group hover:-translate-y-1 transition-all duration-300 border-none shadow-md hover:shadow-lg overflow-hidden relative min-h-[200px] flex flex-col justify-end p-6"
    >
      <div className={`absolute inset-0 opacity-10 ${bgColor}`} />
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${bgColor} shadow-sm group-hover:scale-105 transition-transform duration-300`}>
        <Icon className="text-white w-7 h-7" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </Card>
  );
}
