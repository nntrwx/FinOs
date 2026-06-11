"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <nav className="flex items-center justify-between py-6 px-6 md:px-12 fixed top-0 left-0 right-0 z-50 bg-[#342E37]/80 backdrop-blur-md border-b border-border-tertiary/20">
      <div className="font-syne font-extrabold text-[28px] md:text-[32px] text-accent tracking-tighter">FinOs</div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 text-[16px] text-text-secondary font-medium">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} className="hover:text-text-primary transition-colors">
            {link.name}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-4">
        <Link href="/dashboard" className="text-text-primary text-sm font-medium hover:text-accent transition-colors">
          Log In
        </Link>
        <Link href="/dashboard">
          <Button size="sm" className="px-6">Get started</Button>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden text-text-primary p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-[#342E37] border-b border-border-tertiary/20 overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg text-text-secondary font-medium hover:text-accent"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-border-tertiary/20" />
              <div className="flex flex-col gap-4">
                <Link href="/dashboard" className="text-text-primary text-center py-2" onClick={() => setIsOpen(false)}>
                  Log In
                </Link>
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button className="w-full py-4">Get started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}