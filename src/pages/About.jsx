import React from 'react';
import { motion } from 'framer-motion';
import { FiGlobe, FiUsers, FiAward, FiCompass } from 'react-icons/fi';

const timeline = [
  {
    year: '2018',
    title: 'Launch',
    description: 'Started as a curated pop-up for remote product teams.',
  },
  {
    year: '2020',
    title: 'Global fulfillment',
    description: 'Expanded logistics with partners on three continents.',
  },
  {
    year: '2023',
    title: 'Enterprise concierge',
    description: 'Launched white-glove styling for fast-growing orgs.',
  },
];

const values = [
  { icon: FiGlobe, title: 'Borderless creative', detail: 'We source responsibly from studios worldwide.' },
  { icon: FiUsers, title: 'Human first', detail: 'Product stories are co-built with the communities that wear them.' },
  { icon: FiAward, title: 'Quality obsessed', detail: 'Only 6% of submissions make it through our curation panel.' },
  { icon: FiCompass, title: 'Future-focused', detail: 'We invest in circular design and emerging materials.' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <section className="relative overflow-hidden bg-slate-900 text-white py-24">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,.35),_transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4">Our origin</p>
            <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-6">
              Building the retail OS for ambitious creative companies.
            </h1>
            <p className="text-white/80 text-lg mb-8">
              ShopHub was founded by brand strategists and supply experts who wanted to elevate how high-growth companies outfit their teams. Today we combine cinematic storytelling with operational precision to deliver experiences trusted by top engineering and design orgs abroad.
            </p>
            <div className="flex gap-4 flex-wrap">
              <motion.div className="px-6 py-3 rounded-full bg-white/10 border border-white/20">B Corp pending · 2025</motion.div>
              <motion.div className="px-6 py-3 rounded-full bg-white/10 border border-white/20">340+ partner ateliers</motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl p-8 shadow-2xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Impact</p>
            <h2 className="text-3xl font-black my-4">20+ million</h2>
            <p className="text-white/70 mb-6">Pieces shipped sustainably since 2018.</p>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10"
                >
                  <p className="text-sm text-white/60">{item.year}</p>
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="text-white/70 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-red-500 mb-3">Values</p>
            <h2 className="text-4xl font-black text-gray-900">How we operate</h2>
            <p className="text-gray-500 max-w-2xl mx-auto mt-4">
              We pair boutique creative energy with enterprise rigor so every launch feels bespoke but scales globally.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <value.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

