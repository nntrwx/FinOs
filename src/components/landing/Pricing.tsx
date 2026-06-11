"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "../ui/Button";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started with basic tracking.",
    features: ["Manual transaction entry", "Basic categorization", "Monthly summary", "1 Savings Goal"],
    buttonText: "Get Started",
    accent: false
  },
  {
    name: "Pro",
    price: "$9",
    description: "Advanced insights for power users and freelancers.",
    features: ["Bank sync (Coming Soon)", "Smart AI Categorization", "Advanced visualizations", "Unlimited Goals", "Export to CSV/PDF"],
    buttonText: "Go Pro",
    accent: true
  },
  {
    name: "Team",
    price: "$29",
    description: "Collaborative finance for couples and small teams.",
    features: ["Shared dashboards", "Multiple users", "Permission management", "Priority support", "Custom categories"],
    buttonText: "Contact Sales",
    accent: false
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 bg-background-primary/50">
      <div className="max-w-7xl mx-auto px-12">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-syne font-bold text-4xl md:text-5xl text-text-primary mb-4"
          >
            Simple, transparent <span className="text-accent">pricing.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary text-lg"
          >
            Choose the plan that fits your financial journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-background-secondary border ${plan.accent ? 'border-accent' : 'border-border-tertiary'} rounded-2xl p-8 flex flex-col h-full`}
            >
              {plan.accent && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-background-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="font-syne font-bold text-2xl text-text-primary mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-syne font-bold text-text-primary">{plan.price}</span>
                  <span className="text-text-secondary">/month</span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {plan.description}
                </p>
              </div>
              
              <ul className="flex-1 flex flex-col gap-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <Check size={18} className="text-accent shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.accent ? 'primary' : 'secondary'} 
                className="w-full py-6 font-bold"
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
