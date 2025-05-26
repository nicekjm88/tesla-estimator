// components/ChildBenefitInput.js
'use client'
import React from 'react';
import { InputNumber, Card, Typography } from 'antd';

const { Text } = Typography;

const ChildBenefitInput = ({ value, onChange }) => (
  <Card title="만 18세 미만 자녀 수" style={{ marginTop: 24, marginBottom: 12 }}>
    <div style={{ marginTop: 10 }}>
      <InputNumber
        min={0}
        max={10}
        value={value}
        onChange={onChange}
        step={1}
        style={{ width: 80 }}
      />
      <span style={{ marginLeft: 10, fontSize: 13, color: '#999' }}>
        2명 이상부터 혜택 적용
      </span>
    </div>
  </Card>
);

export default ChildBenefitInput;
