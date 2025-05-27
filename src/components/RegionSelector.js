'use client'
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

const RegionSelector = ({ value, onChange, regions = [] }) => {
  const [fetchedRegions, setFetchedRegions] = useState(regions);

  useEffect(() => {
    if (regions.length === 0) {
      fetch('/api/regions')
        .then(res => res.json())
        .then(data => setFetchedRegions(data));
    } else {
      setFetchedRegions(regions);
    }
  }, [regions]);

  const options = fetchedRegions.map(region => ({
    label: region.name,
    value: region.key,
  }));

  return (
    <div style={{ marginTop: 32 }}>
      <Select
        id="region-select"
        showSearch // 검색 자동완성 활성화
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        value={value}
        onChange={onChange}
        style={{ display: 'block', marginTop: 8, width: 240 }}
        placeholder="지역을 선택하세요"
        options={options}
      />
    </div>
  );
};

export default RegionSelector;
