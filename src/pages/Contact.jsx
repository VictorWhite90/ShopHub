import React from 'react';
import { motion } from 'framer-motion';
import { FiPhoneCall, FiMail, FiMapPin, FiClock } from 'react-icons/fi';

const contactChannels = [
  {
    icon: FiPhoneCall,
    label: 'Global concierge',
    value: '+1 (646) 777-9002',
    note: '24/7 for enterprise clients',
  },
  {
    icon: FiMail,
    label: 'Partnerships',
    value: 'studio@shophub.io',
    note: 'We reply within one business day',
  },
  {
    icon: FiMapPin,
    label: 'Strategy studio',
    value: 'WeWork Galaxy, Bengaluru · NYC · Berlin',
    note: 'Book a private walkthrough',
  },
  {
    icon: FiClock,
    label: 'Support hours',
    value: 'Mon–Fri · 8am – 10pm GMT',
    note: 'Dedicated Slack channel for teams',
  },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <section className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-sm uppercase tracking-[0.3em] text-red-500 mb-4">Contact</p>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
            We design supply stacks for high-growth teams across the globe.
          </h1>
          <p className="text-gray-600 text-lg mb-10">
            Complete the form and a client strategist will reach out with an invite for a collaborative planning session.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {contactChannels.map((channel) => (
              <motion.div
                key={channel.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <channel.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{channel.label}</p>
                  <p className="text-lg font-semibold text-gray-900">{channel.value}</p>
                  <p className="text-gray-500 text-sm">{channel.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8"
        >
          <h2 className="text-2xl font-black text-gray-900 mb-6">Project request</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Full name</label>
              <input
                type="text"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Ada Lovelace"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Work email</label>
                <input
                  type="email"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Company size</label>
                <select className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option>1-20</option>
                  <option>21-100</option>
                  <option>101-500</option>
                  <option>500+</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">What are you building?</label>
              <textarea
                rows="4"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Tell us about the experience, timeline, and audience."
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold rounded-xl hover:shadow-lg transition-shadow"
            >
              Schedule introduction
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;

