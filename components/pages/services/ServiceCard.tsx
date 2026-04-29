import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <div data-component="ServiceCard" className="bg-bone rounded-card p-6 flex flex-col items-start transition-transform hover:-translate-y-1">
      <div className="bg-sapling-green p-4 rounded-full mb-6">
        <Icon className="w-8 h-8 text-veridian-leaf" />
      </div>
      <h3 className="text-xl font-bold text-charcoal mb-3 font-article">{title}</h3>
      <p className="text-mist text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
}
