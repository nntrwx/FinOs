"use client";

import { motion } from "framer-motion";
import { Zap, PieChart, Target, LineChart } from "lucide-react";
import { Card } from "../ui/Card";

const features = [
  {
    icon: Zap,
    title: "Smart Categorization",
    description: "Our AI-powered engine automatically sorts your expenses into meaningful categories. No more manual tags."
  },
  {
    icon: PieChart,
    title: "Monthly Insights",
    description: "Get a clear picture of your financial health. Understand your income, expenses, and savings at a glance."
  },
  {
    icon: Target,
    title: "Savings Goals",
    description: "Visualize your progress toward big dreams. Set targets, track contributions, and reach your goals faster."
  },
  {
    icon: LineChart,
    title: "Spending Visualizations",
    description: "Patterns you can actually see. Beautiful charts replace messy spreadsheets for instant clarity."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-32">
      <div className="max-w-7xl mx-auto px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-syne font-bold text-4xl md:text-5xl text-text-primary mb-6"
            >
              Everything you need to <span className="text-accent">own your future.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary text-lg"
            >
              Built for the modern individual who values time, clarity, and elegant design.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-accent/10 border border-accent/20 px-6 py-3 rounded-full text-accent font-bold text-sm tracking-wider uppercase"
          >
            Core Features
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:border-accent/50 transition-colors group">
                <div className="w-12 h-12 bg-background-primary rounded-xl flex items-center justify-center mb-6 border border-border-tertiary group-hover:bg-accent group-hover:text-background-primary transition-all">
                  <feature.icon size={24} />
                </div>
                <h3 className="font-syne font-bold text-2xl text-text-primary mb-4">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
