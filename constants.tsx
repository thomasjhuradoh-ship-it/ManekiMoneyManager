
import React from 'react';

export const COLORS = {
  black: '#000000',
  yellow: '#ffcc00',
  white: '#ffffff',
  green: '#97ac47',
  blue: '#5588ff',
  pink: '#ff5588',
  red: '#e63946',
  gold: '#f1c40f'
};

export const CATEGORIES = [
  'Comida',
  'Transporte',
  'Vivienda',
  'Ocio',
  'Salud',
  'Sueldo',
  'Otros'
];

export const MoneyBagIcon = ({ className = "w-24 h-24" }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M30 45 C 10 45 10 95 50 95 C 90 95 90 45 70 45 C 70 30 80 20 50 20 C 20 20 30 30 30 45 Z" 
      fill="#f1c40f" 
      stroke="black" 
      strokeWidth="5" 
    />
    <path 
      d="M30 45 Q 50 50 70 45" 
      fill="none" 
      stroke="black" 
      strokeWidth="5" 
      strokeLinecap="round" 
    />
    <text 
      x="50" 
      y="80" 
      textAnchor="middle" 
      fontSize="35" 
      fontWeight="900" 
      fontFamily="Arial" 
      fill="black"
    >$</text>
  </svg>
);

export const ManekiNekoIcon = ({ className = "w-24 h-24" }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M25 85 Q 25 45 50 45 T 75 85 Q 75 95 50 95 T 25 85" fill="white" stroke="black" strokeWidth="4" />
    <circle cx="50" cy="40" r="32" fill="white" stroke="black" strokeWidth="4" />
    <path d="M25 18 L 18 5 L 40 15" fill="#e63946" stroke="black" strokeWidth="3" strokeLinejoin="round" />
    <path d="M75 18 L 82 5 L 60 15" fill="#e63946" stroke="black" strokeWidth="3" strokeLinejoin="round" />
    <circle cx="38" cy="35" r="7" fill="black" />
    <circle cx="40" cy="33" r="2.5" fill="white" />
    <circle cx="62" cy="35" r="7" fill="black" />
    <circle cx="64" cy="33" r="2.5" fill="white" />
    <circle cx="50" cy="42" r="2" fill="#ffb7b7" />
    <path d="M45 48 Q 50 52 55 48" fill="none" stroke="#e63946" strokeWidth="2" strokeLinecap="round" />
    <path d="M30 40 H 15 M30 44 L 16 48 M30 36 L 16 32" stroke="black" strokeWidth="1" strokeLinecap="round" />
    <path d="M70 40 H 85 M70 44 L 84 48 M70 36 L 84 32" stroke="black" strokeWidth="1" strokeLinecap="round" />
    <path d="M28 55 Q 50 62 72 55" fill="none" stroke="#e63946" strokeWidth="6" strokeLinecap="round" />
    <circle cx="50" cy="62" r="5" fill="#f1c40f" stroke="black" strokeWidth="3" />
    <g transform="translate(42, 68) rotate(-10)">
      <rect x="0" y="0" width="30" height="24" rx="10" fill="#f1c40f" stroke="black" strokeWidth="4" />
      <path d="M8 6 H 22 M8 12 H 22 M8 18 H 22" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 4 V 20" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    <path d="M78 40 Q 92 40 92 55 T 78 70" fill="white" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    <path d="M22 75 Q 35 75 35 85" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" />
    <path d="M35 95 L 35 90 M 65 95 L 65 90" stroke="black" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconHome = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);

export const IconList = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
);

export const IconStar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

export const IconSparkles = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
);

export const DarumaIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#e63946" stroke="black" strokeWidth="5" />
    <path d="M30 40 Q 50 30 70 40 L 80 70 Q 50 85 20 70 Z" fill="white" stroke="black" strokeWidth="4" />
    <circle cx="40" cy="50" r="5" fill="black" />
    <circle cx="60" cy="50" r="5" fill="white" stroke="black" strokeWidth="2" />
    <path d="M45 65 Q 50 70 55 65" stroke="black" strokeWidth="3" fill="none" />
  </svg>
);

export const WaveIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 70 Q 30 40 50 70 T 90 70" stroke="#5588ff" strokeWidth="8" strokeLinecap="round" />
    <path d="M10 85 Q 30 55 50 85 T 90 85" stroke="#5588ff" strokeWidth="8" strokeLinecap="round" />
    <path d="M15 70 Q 20 50 25 70" stroke="white" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
