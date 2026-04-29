// ASSIGNED TO: Raja
import React from 'react';

export const ImpactSection = () => {
  return (
    <section data-component="ImpactSection" className="bg-veridian-leaf text-parchment py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Our Impact</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <div className="text-5xl font-bold text-sapling-green mb-2">10k+</div>
            <p className="text-lg">Active Users</p>
          </div>
          <div>
            <div className="text-5xl font-bold text-sapling-green mb-2">50k</div>
            <p className="text-lg">Kg Waste Recycled</p>
          </div>
          <div>
            <div className="text-5xl font-bold text-sapling-green mb-2">1M+</div>
            <p className="text-lg">Points Rewarded</p>
          </div>
        </div>
      </div>
    </section>
  );
};
