// ASSIGNED TO: Raja
import React from 'react';

export interface TeamMember {
  name: string;
  role: string;
  photoUrl?: string;
}

export interface TeamSectionProps {
  members?: TeamMember[];
}

export const TeamSection = ({ members = [] }: TeamSectionProps) => {
  return (
    <section data-component="TeamSection" className="bg-parchment text-charcoal py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-deep-forest">Meet Our Team</h2>
        {members.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <div key={index} className="bg-bone p-6 rounded-card text-center">
                <div className="w-24 h-24 bg-mist rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-veridian-leaf">{member.role}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-mist">Team members will be updated soon.</p>
        )}
      </div>
    </section>
  );
};
