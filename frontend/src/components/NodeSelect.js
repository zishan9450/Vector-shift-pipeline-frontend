// NodeSelect.js
// Modern select dropdown component with robust design inspired by n8n

import React from 'react';

export const NodeSelect = ({ 
  label, 
  value, 
  onChange, 
  options = [],
  placeholder = 'Select an option',
  required = false,
  style = {}
}) => {
  const selectStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e1e8ed',
    borderRadius: '10px',
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#1e293b',
    backgroundColor: '#ffffff',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    boxSizing: 'border-box',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: 'right 16px center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '16px',
    paddingRight: '48px',
    fontWeight: '500',
    ...style
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    lineHeight: '1.2'
  };

  const containerStyle = {
    marginBottom: '16px'
  };

  const requiredStyle = {
    color: '#ef4444',
    marginLeft: '4px',
    fontWeight: '700'
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>
        {label}
        {required && <span style={requiredStyle}>*</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        required={required}
        style={selectStyle}
        onFocus={(e) => {
          e.target.style.borderColor = '#6366f1';
          e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
          e.target.style.backgroundColor = '#fafafa';
          e.target.style.transform = 'translateY(-1px)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#e1e8ed';
          e.target.style.boxShadow = 'none';
          e.target.style.backgroundColor = '#ffffff';
          e.target.style.transform = 'translateY(0)';
        }}
        onMouseEnter={(e) => {
          if (document.activeElement !== e.target) {
            e.target.style.borderColor = '#cbd5e1';
            e.target.style.backgroundColor = '#f8fafc';
          }
        }}
        onMouseLeave={(e) => {
          if (document.activeElement !== e.target) {
            e.target.style.borderColor = '#e1e8ed';
            e.target.style.backgroundColor = '#ffffff';
          }
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
