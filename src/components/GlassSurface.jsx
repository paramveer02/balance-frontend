import React, { forwardRef } from 'react';

const GlassSurface = forwardRef(({
  children,
  className = '',
  style = {},
  width = 300,
  height = 200,
  borderRadius = 24,
  displace = 15,
  distortionScale = -150,
  redOffset = 5,
  greenOffset = 15,
  blueOffset = 25,
  brightness = 60,
  opacity = 0.8,
  mixBlendMode = 'screen',
  ...props
}, ref) => {
  const glassStyles = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    background: `rgba(255, 255, 255, ${opacity * 0.1})`,
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    position: 'relative',
    overflow: 'hidden',
    ...style
  };

  return (
    <div
      ref={ref}
      className={`glass-surface ${className}`}
      style={glassStyles}
      {...props}
    >
      {children}
    </div>
  );
});

GlassSurface.displayName = 'GlassSurface';

export default GlassSurface;