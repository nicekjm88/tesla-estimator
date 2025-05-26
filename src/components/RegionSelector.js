'use client'
import React from 'react';
import { regions } from '../constants/regions';

const RegionSelector = ({ value, onChange }) => {
  return (
    <div style={{ marginTop: 32 }}>
      <label htmlFor="region-select"><strong>거주 지역 선택</strong></label>
      <select
        id="region-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ display: 'block', marginTop: 8, padding: 8, width: 240 }}
      >
        {regions.map((region) => (
          <option
            key={region.key}
            value={region.key}
          >
            {region.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionSelector;
