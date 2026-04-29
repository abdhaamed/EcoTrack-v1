// ASSIGNED TO: Raja
import React from 'react';

export const MissionVisionSection = () => {
  return (
    <section data-component="MissionVisionSection" className="bg-bone text-charcoal py-20 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="bg-parchment p-8 rounded-card">
          <h2 className="text-3xl font-bold mb-4 text-deep-forest">Our Mission</h2>
          <p className="text-lg">
            To create a cleaner environment by incentivizing responsible waste disposal and recycling practices.
          </p>
        </div>
        <div className="bg-parchment p-8 rounded-card">
          <h2 className="text-3xl font-bold mb-4 text-deep-forest">Our Vision</h2>
          <p className="text-lg">
            A world where waste is viewed as a resource, and every individual actively participates in environmental conservation.
          </p>
        </div>
      </div>
    </section>
  );
};
