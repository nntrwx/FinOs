"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-[180px] pb-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-12 text-center flex flex-col items-center">
        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-syne font-bold text-[64px] md:text-[84px] leading-tight text-text-primary mb-6"
        >
          Your money.<br />
          <span className="text-accent">Finally making sense.</span>
        </motion.h1>

        {/* Subline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-inter font-normal text-lg md:text-xl text-text-secondary max-w-2xl mb-10"
        >
          Most people don&apos;t know where their money goes. <br className="hidden md:block" />
          FinOS fixes that with smart insights and elegant control.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/dashboard">
            <Button className="h-16 px-12 text-lg font-bold bg-accent/90 backdrop-blur-md text-background-primary border border-accent/20 shadow-[0_0_20px_rgba(159,211,86,0.3)] hover:shadow-[0_0_30px_rgba(159,211,86,0.5)]">
              Try FinanceOS Free
            </Button>
          </Link>
        </motion.div>

        {/* Dashboard Preview Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 50 }}
          className="mt-16 md:mt-24 w-full max-w-[1000px] relative"
        >
          <div className="bg-[#3E3842] rounded-2xl border border-border-tertiary shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] overflow-hidden">
            {/* Mockup Title Bar */}
            <div className="bg-background-primary h-10 border-b border-border-tertiary flex items-center px-4 gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F87171]/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-text-secondary/20" />
            </div>
            
            {/* Mockup Content */}
            <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-left">
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "Balance", amount: "$2,583", icon: Wallet, color: "text-accent" },
                  { title: "Income", amount: "$2,850", icon: TrendingUp, color: "text-[#4ADE80]" },
                  { title: "Expenses", amount: "$266", icon: TrendingDown, color: "text-[#F87171]" },
                ].map((item, i) => (
                  <div key={i} className={`bg-background-primary border border-border-tertiary/50 p-4 rounded-xl ${i > 0 ? 'hidden md:block' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                      <item.icon size={16} className={item.color} />
                      <div className="w-8 h-1 bg-border-tertiary rounded-full" />
                    </div>
                    <div className="h-2 w-12 bg-text-secondary/20 rounded-full mb-2" />
                    <div className="h-4 w-20 bg-text-primary/10 rounded-full" />
                  </div>
                ))}
              </div>
              <div className="md:col-span-2 bg-background-primary border border-border-tertiary/50 p-6 rounded-xl h-48 relative overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <div className="h-4 w-32 bg-text-primary/10 rounded-full" />
                  <div className="h-3 w-16 bg-text-secondary/10 rounded-full" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end px-4 gap-2">
                  {[40, 60, 45, 80, 55, 90, 30].map((h, i) => (
                    <div key={i} className="flex-1 bg-accent/20 rounded-t-sm" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <div className="bg-background-primary border border-border-tertiary/50 p-6 rounded-xl h-48 hidden md:block">
                <div className="h-4 w-24 bg-text-primary/10 rounded-full mb-6" />
                <div className="flex flex-col gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <div className="w-6 h-6 rounded-full bg-text-secondary/10" />
                        <div className="h-2 w-12 bg-text-secondary/20 rounded-full" />
                      </div>
                      <div className="h-2 w-8 bg-text-primary/10 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Floating Element */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-12 top-12 bg-accent/10 backdrop-blur-xl border border-accent/20 p-4 rounded-2xl shadow-xl hidden lg:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-background-primary">
                <ArrowUpRight size={20} />
              </div>
              <div>
                <p className="text-accent text-[10px] uppercase font-bold tracking-wider">Smart Insight</p>
                <p className="text-text-primary text-sm font-medium">Savings up 12%</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
