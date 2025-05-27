'use client'
import React from 'react';
import { Card, Typography } from 'antd';

const { Text } = Typography;

const AcquisitionTaxDisplay = ({ carTotalPrice }) => {
  // 취득세 7% 계산
  const acquisitionTax = Math.round(carTotalPrice * 0.07);

  return (
    <Card style={{ margin: '24px 0 8px 0' }}>
      <Text style={{ fontSize: 18, color: '#c62828', fontWeight: 600 }}>
        {acquisitionTax.toLocaleString()}원
      </Text>
      <Text style={{ marginLeft: 16, color: '#999', fontSize: 13 }}>
        (차량 가격의 7% 적용, 실제 감면은 별도 확인)
      </Text>
    </Card>
  );
};

export default AcquisitionTaxDisplay;
