'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Leaf } from 'lucide-react';

interface PhoneMockupProps {
  image?: string | null;
  material?: {
    name: string;
    color: string;
    type: 'standard' | 'eco';
  };
  deviceName?: string;
  customText?: string;
  textColor?: string;
  filter?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PhoneMockup({ 
  image, 
  material,
  deviceName = 'iPhone 18 Pro',
  customText,
  textColor = '#FFFFFF',
  filter,
  size = 'md'
}: PhoneMockupProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = -(e.clientY - rect.top - rect.height / 2) / 20;
    setRotation({ x: y, y: x });
  };

  const sizeClasses = {
    sm: 'w-40 h-80',
    md: 'w-56 h-[450px]',
    lg: 'w-72 h-[580px]',
  };

  const caseColor = material?.color || '#1E293B';

  return (
    <div 
      className="relative perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setRotation({ x: 0, y: 0 });
      }}
    >
      <motion.div
        animate={{ rotateX: rotation.x, rotateY: rotation.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`relative ${sizeClasses[size]} rounded-[40px] overflow-hidden`}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.25),
            inset 0 0 0 12px ${caseColor}
          `,
        }}
      >
        {/* Phone case border/frame */}
        <div 
          className="absolute inset-0 rounded-[40px] pointer-events-none z-20"
          style={{
            boxShadow: `
              inset 0 0 0 2px rgba(255,255,255,0.1),
              inset 0 0 0 12px ${caseColor}
            `,
          }}
        />

        {/* Camera cutout */}
        <div className="absolute top-4 left-4 w-16 h-16 rounded-2xl bg-black/80 z-30 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-slate-700 border-2 border-slate-600" />
          <div className="w-3 h-3 rounded-full bg-slate-700 border-2 border-slate-600 absolute top-2 right-2" />
          <div className="w-2 h-2 rounded-full bg-slate-600 absolute bottom-3 right-3" />
        </div>

        {/* Content area */}
        <div className="absolute inset-3 rounded-[32px] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
          {/* Custom image or placeholder */}
          {image ? (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${image})`,
                filter: filter || 'none',
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-sage-200 via-earth-100 to-brand-100 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-3">
                  {material?.type === 'eco' ? (
                    <Leaf className="w-8 h-8 text-brand-600" />
                  ) : (
                    <div className="w-8 h-8 bg-slate-400 rounded-lg" />
                  )}
                </div>
                <p className="text-sm font-medium text-slate-600">
                  Your Photo Here
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Upload to preview
                </p>
              </div>
            </div>
          )}

          {/* Custom text overlay */}
          {customText && (
            <div 
              className="absolute bottom-8 left-0 right-0 text-center px-4"
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                color: textColor,
              }}
            >
              <p className="text-lg font-bold">{customText}</p>
            </div>
          )}
        </div>

        {/* Glossy overlay */}
        <div 
          className="absolute inset-0 rounded-[40px] pointer-events-none z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
          }}
        />

        {/* Eco badge */}
        {material?.type === 'eco' && (
          <div className="absolute bottom-4 right-4 z-30">
            <div className="bg-brand-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Leaf className="w-3 h-3" />
              Eco
            </div>
          </div>
        )}
      </motion.div>

      {/* Device name label */}
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">{deviceName}</p>
        {material && (
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <span>{material.name}</span>
            {material.type === 'eco' && <Leaf className="w-3 h-3 text-brand-500" />}
          </p>
        )}
      </div>
    </div>
  );
}
