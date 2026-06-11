"use client";

import React from 'react';
import { Card } from '../ui/Card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface SpendingChartProps {
  data: { name: string; amount: number }[];
}

export function SpendingChart({ data }: SpendingChartProps) {
  return (
    <Card title="Spending Trends" className="h-[400px]">
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9FD356" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#9FD356" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A4450" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9E99A3', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9E99A3', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#3E3842', 
              border: '1px solid #4A4450',
              borderRadius: '8px',
              color: '#F5F5F5'
            }}
            itemStyle={{ color: '#9FD356' }}
          />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#9FD356" 
            fillOpacity={1} 
            fill="url(#colorAmount)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
