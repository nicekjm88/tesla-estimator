'use client'
import React from 'react';
import { autopilotOptions } from '../constants/autopilotOptions';

const AutopilotSelector = ({ value, onChange }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
      {autopilotOptions.map((option) => {
        const isSelected = value === option.key;
        return (
          <div
            key={option.key}
            onClick={() => onChange(option.key)}
            style={{
              border: isSelected ? '2px solid #1890ff' : '1px solid #ccc',
              borderRadius: 8,
              padding: 12,
              backgroundColor: isSelected ? '#e6f4ff' : '#fff',
              cursor: 'pointer',
            }}
          >
            <strong>{option.name}</strong>
            <div style={{ fontSize: 12, marginTop: 4 }}>
              {option.price > 0 ? `+₩${option.price.toLocaleString()}` : '포함'}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AutopilotSelector;
