"use client";

import React from 'react';
import { Card } from '../ui/Card';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from 'recharts';

interface CategoryChartProps {
  data: { category: string; spent: number }[];
}

const COLORS = ['#9FD356', '#4ADE80', '#60A5FA', '#F472B6', '#FB923C'];

export function CategoryChart({ data }: CategoryChartProps) {
  return (
    <Card title="Expenses by Category" className="h-[400px]">
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="spent"
            nameKey="category"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#3E3842', 
              border: '1px solid #4A4450',
              borderRadius: '8px',
              color: '#F5F5F5'
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => <span className="text-text-secondary text-xs">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
