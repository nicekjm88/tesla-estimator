'use client'
import React from 'react';
import { colors } from '../constants/colors';

const ColorPicker = ({ value, onChange }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {colors.map((color) => {
        const isSelected = value === color.key;
        return (
          <div
            key={color.key}
            onClick={() => onChange(color.key)}
            style={{
              cursor: 'pointer',
              border: isSelected ? '2px solid #1890ff' : '1px solid #ccc',
              borderRadius: 8,
              padding: 8,
              width: 120,
              textAlign: 'center',
              boxShadow: isSelected ? '0 0 8px rgba(24,144,255,0.4)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            <img
              src={color.img}
              alt={color.name}
              style={{ width: '100%', height: 60, objectFit: 'contain', marginBottom: 4 }}
            />
            <div style={{ fontWeight: isSelected ? 'bold' : 'normal' }}>
              {color.name}
            </div>
            {color.price > 0 && (
              <div style={{ color: '#d00', fontSize: 12 }}>
                +₩{color.price.toLocaleString()}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ColorPicker;
