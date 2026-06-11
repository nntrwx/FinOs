"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code, X, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-32 pb-12 bg-background-primary">
      <div className="max-w-7xl mx-auto px-12">
        {/* Final CTA */}
        <div className="bg-accent/10 border border-accent/20 rounded-[32px] p-12 md:p-20 text-center flex flex-col items-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-syne font-bold text-4xl md:text-6xl text-text-primary mb-8"
          >
            Ready to make sense <br className="hidden md:block" /> of your money?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href="/dashboard" 
              className="h-16 px-12 bg-accent/90 backdrop-blur-md text-background-primary rounded-lg font-bold flex items-center justify-center hover:bg-accent border border-accent/20 shadow-[0_0_20px_rgba(159,211,86,0.3)] hover:shadow-[0_0_30px_rgba(159,211,86,0.5)] transition-all"
            >
              Start for Free Now
            </Link>
          </motion.div>
          <p className="text-text-secondary text-sm mt-6">
            No credit card required. Join 5,000+ users today.
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-border-tertiary/20 pt-16 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="font-syne font-extrabold text-2xl text-accent mb-6">FinOs</div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-[200px]">
              The personal financial dashboard for the modern individual.
            </p>
          </div>
          <div>
            <h4 className="font-syne font-bold text-text-primary mb-6 uppercase text-xs tracking-widest">Product</h4>
            <ul className="flex flex-col gap-4 text-sm text-text-secondary">
              <li><Link href="#features" className="hover:text-accent transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-accent transition-colors">Pricing</Link></li>
              <li><Link href="/dashboard" className="hover:text-accent transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-syne font-bold text-text-primary mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="flex flex-col gap-4 text-sm text-text-secondary">
              <li><Link href="#" className="hover:text-accent transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-syne font-bold text-text-primary mb-6 uppercase text-xs tracking-widest">Social</h4>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all">
                <X size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all">
                <Code size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all">
                <Globe size={18} />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-text-secondary text-xs border-t border-border-tertiary/10 pt-8">
          <p>© 2026 FinOS. All rights reserved.</p>
          <p>Built by Nikol 🤍</p>
        </div>
      </div>
    </footer>
  );
}
