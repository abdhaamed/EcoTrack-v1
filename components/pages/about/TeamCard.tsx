"use client";

import React, { useState } from 'react';
import { User, RefreshCw } from 'lucide-react';

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export interface TeamMember {
  name: string;
  role: string;
  photoUrl?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
}

export const TeamCard = ({ member }: { member: TeamMember }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full h-[320px] perspective-1000 group">
      <div 
        className={`w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-surface-container rounded-2xl p-6 shadow-md border border-border flex flex-col items-center justify-between">
          <div className="flex flex-col items-center w-full">
            <div className="w-28 h-28 bg-primary-100 rounded-full mb-4 overflow-hidden border-4 border-surface flex items-center justify-center">
              {member.photoUrl ? (
                <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <User size={48} className="text-primary-500" />
              )}
            </div>
            <h3 className="text-xl font-bold text-on-surface text-center mb-1">{member.name}</h3>
            <p className="text-primary-500 font-medium text-sm text-center">{member.role}</p>
          </div>
          <button 
            onClick={() => setIsFlipped(true)}
            className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-full text-sm font-semibold hover:bg-primary-600 transition flex items-center gap-2"
          >
            Connect
          </button>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden bg-surface-container rounded-2xl p-6 shadow-md border border-border flex flex-col items-center justify-center rotate-y-180">
          <h3 className="text-lg font-bold text-on-surface mb-8">Social Profiles</h3>
          <div className="flex gap-4 mb-8">
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-surface rounded-full text-primary-500 hover:bg-primary-500 hover:text-white transition shadow-sm">
                <LinkedinIcon size={24} />
              </a>
            )}
            {member.instagram && (
              <a href={member.instagram} target="_blank" rel="noreferrer" className="p-3 bg-surface rounded-full text-primary-500 hover:bg-primary-500 hover:text-white transition shadow-sm">
                <InstagramIcon size={24} />
              </a>
            )}
            {member.github && (
              <a href={member.github} target="_blank" rel="noreferrer" className="p-3 bg-surface rounded-full text-primary-500 hover:bg-primary-500 hover:text-white transition shadow-sm">
                <GithubIcon size={24} />
              </a>
            )}
          </div>
          <button 
            onClick={() => setIsFlipped(false)}
            className="px-4 py-2 text-neutral-500 hover:text-primary-500 transition flex items-center gap-2 text-sm font-medium"
          >
            <RefreshCw size={16} /> Back
          </button>
        </div>
      </div>
    </div>
  );
};
