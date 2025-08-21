// BaseNode.js
// Modern node wrapper with robust design inspired by n8n

import React from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ 
  id, 
  data, 
  children, 
  title,
  inputs = [], 
  outputs = [],
  width = 200,
  height = 80,
  className = '',
  style = {}
}) => {
  const baseStyle = {
    width: width,
    height: height,
    border: '2px solid #e1e8ed',
    borderRadius: '16px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    padding: '20px',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: '14px',
    position: 'relative',
    transition: 'all 0.2s ease-in-out',
    ...style
  };

  const handleStyle = {
    background: '#6366f1',
    border: '3px solid #ffffff',
    width: '16px',
    height: '16px',
    boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.8)',
    transition: 'all 0.2s ease-in-out',
    cursor: 'crosshair'
  };

  const outputHandleStyle = {
    ...handleStyle,
    background: '#10b981'
  };

  const titleStyle = {
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '16px',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    paddingBottom: '12px',
    borderBottom: '1px solid #f1f5f9'
  };

  const contentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const handleHoverStyle = {
    transform: 'scale(1.2)',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.9)'
  };

  return (
    <div className={`base-node ${className}`} style={baseStyle}>
      {/* Input Handles */}
      {inputs.map((input, index) => {
        console.log('BaseNode: Rendering input handle:', input);
        return (
          <Handle
            key={`input-${index}`}
            type="target"
            position={Position.Left}
            id={input.id}
            style={{
              ...handleStyle,
              top: input.position || `${((index + 1) * 100) / (inputs.length + 1)}%`,
              left: '-8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = handleHoverStyle.transform;
              e.target.style.boxShadow = handleHoverStyle.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = handleStyle.boxShadow;
            }}
          />
        );
      })}

      {/* Node Header */}
      {title && (
        <div style={titleStyle}>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: style.backgroundColor || '#6366f1',
            borderRadius: '50%',
            flexShrink: 0,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }} />
          <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.025em' }}>
            {title}
          </span>
        </div>
      )}

      {/* Node Content */}
      <div style={contentStyle}>
        {children}
      </div>

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{
            ...outputHandleStyle,
            top: output.position || `${((index + 1) * 100) / (outputs.length + 1)}%`,
            right: '-8px'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.2)';
            e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.9)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = outputHandleStyle.boxShadow;
          }}
        />
      ))}
    </div>
  );
};
