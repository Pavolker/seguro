
import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Cell
} from 'recharts';
import { PillarName, DiagnosisResults } from '../types';
import { PILLARS, GLOBAL_BENCHMARK } from '../constants';

interface RadarProps {
  results: DiagnosisResults;
}

export const GrcRadarChart: React.FC<RadarProps> = ({ results }) => {
  const data = PILLARS.map(pillar => ({
    subject: pillar,
    A: results.pillarScores[pillar],
    B: GLOBAL_BENCHMARK[pillar],
    fullMark: 100,
  }));

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fontWeight: 500 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Sua Empresa"
            dataKey="A"
            stroke="#2563eb"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
          <Radar
            name="Benchmark Setor"
            dataKey="B"
            stroke="#94a3b8"
            fill="#cbd5e1"
            fillOpacity={0.4}
            strokeDasharray="4 4"
          />
          <Legend />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

interface BarProps {
  results: DiagnosisResults;
}

export const ComparisonBarChart: React.FC<BarProps> = ({ results }) => {
  const data = PILLARS.map(pillar => ({
    name: pillar,
    score: results.pillarScores[pillar],
    benchmark: GLOBAL_BENCHMARK[pillar],
    gap: results.gaps[pillar]
  }));

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis type="number" domain={[0, 100]} />
          <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
          <Tooltip 
            formatter={(value, name) => [value, name === 'score' ? 'Seu Score' : 'Benchmark']}
          />
          <Legend />
          <Bar dataKey="score" name="Seu Score" fill="#3b82f6" radius={[0, 4, 4, 0]} />
          <Bar dataKey="benchmark" name="Benchmark" fill="#94a3b8" radius={[0, 4, 4, 0]} opacity={0.6} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
