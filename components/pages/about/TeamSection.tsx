// ASSIGNED TO: Raja
import React from 'react';
import { TeamCard, TeamMember } from './TeamCard';

const dummyMembers: TeamMember[] = [
  { name: "Andi Saputra", role: "Founder & CEO", linkedin: "#", instagram: "#", github: "#" },
  { name: "Budi Santoso", role: "CTO", linkedin: "#", instagram: "#", github: "#" },
  { name: "Citra Lestari", role: "Head of Marketing", linkedin: "#", instagram: "#", github: "#" },
  { name: "Dina Mariana", role: "Lead Designer", linkedin: "#", instagram: "#", github: "#" },
];

export const TeamSection = () => {
  return (
    <section data-component="TeamSection" className="bg-surface text-on-surface py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-primary-500">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dummyMembers.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};
