'use client'
import React from 'react';
import { wheels } from '../constants/wheels';
import { wheelPricesByModel } from '../constants/wheelPrices';
import { models } from '../constants/models';

const allowedWheels = {
  rwd: ['crossflow19'],
  longrange: ['crossflow19', 'induction20'],
  launch: ['induction20'],
};

const WheelPicker = ({ value, onChange, modelKey }) => {
  const filteredWheels = wheels.filter((w) =>
    allowedWheels[modelKey]?.includes(w.key)
  );

  return (
    <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
      {filteredWheels.map((wheel) => {
        const isSelected = value === wheel.key;
        const dynamicPrice = wheelPricesByModel[modelKey]?.[wheel.key] ?? 0;

        return (
          <div
            key={wheel.key}
            onClick={() => onChange(wheel.key)}
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
              src={wheel.img}
              alt={wheel.name}
              style={{ width: '100%', height: 60, objectFit: 'contain', marginBottom: 4 }}
            />
            <div style={{ fontWeight: isSelected ? 'bold' : 'normal' }}>
              {wheel.name}
            </div>
            {dynamicPrice > 0 && (
              <div style={{ color: '#d00', fontSize: 12 }}>
                +₩{dynamicPrice.toLocaleString()}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WheelPicker;
