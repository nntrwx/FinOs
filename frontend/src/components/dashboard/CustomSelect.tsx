"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface CustomSelectProps {
  options: string[];
  defaultValue?: string;
}

export function CustomSelect({ options, defaultValue }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || options[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full md:w-48" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-background-secondary border border-border-tertiary rounded-lg py-2.5 px-4 text-sm text-text-primary flex items-center justify-between hover:border-accent transition-colors focus:outline-none"
      >
        <span>{selected}</span>
        <ChevronDown 
          size={16} 
          className={`text-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background-secondary border border-border-tertiary rounded-xl shadow-2xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                selected === option 
                  ? 'bg-accent/10 text-accent font-medium' 
                  : 'text-text-secondary hover:bg-background-primary hover:text-text-primary'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
