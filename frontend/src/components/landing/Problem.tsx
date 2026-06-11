"use client";

import { motion } from "framer-motion";
import { AlertCircle, Clock, BarChart3 } from "lucide-react";

const problems = [
  {
    icon: AlertCircle,
    title: "Spreadsheets are dead",
    description: "Manual tracking is tedious and prone to errors. You deserve a system that works for you, not the other way around."
  },
  {
    icon: Clock,
    title: "Where did my money go?",
    description: "The end of the month shouldn't be a mystery. Stop wondering where your hard-earned cash vanished."
  },
  {
    icon: BarChart3,
    title: "Saving feels like a chore",
    description: "Without clear goals and visual progress, saving money feels impossible. We make it rewarding."
  }
];

export default function Problem() {
  return (
    <section id="about" className="py-32 bg-background-primary/50">
      <div className="max-w-7xl mx-auto px-12">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-syne font-bold text-4xl md:text-5xl text-text-primary mb-4"
          >
            The old way is broken.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary text-lg"
          >
            Managing personal finances shouldn&apos;t require a degree in accounting.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {problems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-[#3E3842] border border-border-tertiary rounded-2xl flex items-center justify-center mb-6 group-hover:border-accent transition-colors">
                <item.icon size={32} className="text-text-secondary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-syne font-bold text-xl text-text-primary mb-3">{item.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
