'use client'
import React from 'react';
import { interiors } from '../constants/interiors';
import { interiorPricesByModel } from '../constants/interiorPrices';

const InteriorPicker = ({ value, onChange, modelKey }) => {
  return (
    <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
      {interiors.map((interior) => {
        const isSelected = value === interior.key;
        const price = interiorPricesByModel[modelKey]?.[interior.key] ?? 0;

        return (
          <div
            key={interior.key}
            onClick={() => onChange(interior.key)}
            style={{
              cursor: 'pointer',
              border: isSelected ? '2px solid #1890ff' : '1px solid #ccc',
              borderRadius: 8,
              padding: 8,
              width: 140,
              textAlign: 'center',
              boxShadow: isSelected ? '0 0 8px rgba(24,144,255,0.4)' : 'none',
            }}
          >
            <img
              src={interior.img}
              alt={interior.name}
              style={{ width: '100%', height: 60, objectFit: 'contain', marginBottom: 4 }}
            />
            <div style={{ fontWeight: isSelected ? 'bold' : 'normal' }}>
              {interior.name}
            </div>
            {price > 0 && (
              <div style={{ color: '#d00', fontSize: 12 }}>
                +₩{price.toLocaleString()}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default InteriorPicker;
