'use client'
import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const Summary = ({ model, color, wheel, interiors, region, autopilot, price }) => {
  const data = [
    {
      label: '모델',
      value: model.name,
      price: price.basePrice,
    },
    {
      label: '색상',
      value: color.name,
      price: price.colorPrice,
    },
    {
      label: '휠',
      value: wheel.name,
      price: price.wheelPrice,
    },
    {
      label: '인테리어',
      value: interiors.name,
      price: price.interiorPrice,
    },
    {
      label: '오토파일럿',
      value: autopilot.name,
      price: price.autopilotPrice,
    },
    {
      label: '보조금',
      value: region.name,
      price: -price.subsidy,
    },
  ];

  return (
    <Card
      title={<Title level={4}>🧾 견적 요약</Title>}
      bordered
      style={{ width: '100%' }}
    >
      <table style={{ width: '100%', fontSize: 14 }}>
        <tbody>
          {data.map((item) => (
            <tr key={item.label}>
              <td>{item.label}</td>
              <td>{item.value}</td>
              <td style={{ textAlign: 'right' }}>
                {item.price >= 0
                  ? `₩${item.price.toLocaleString('ko-KR')}`
                  : `-₩${Math.abs(item.price).toLocaleString('ko-KR')}`}
              </td>
            </tr>
          ))}
          <tr style={{ borderTop: '1px solid #ccc' }}>
            <td colSpan="2" style={{ paddingTop: 12 }}><strong>총 합계</strong></td>
            <td style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 16, paddingTop: 12 }}>
              ₩{price.total.toLocaleString('ko-KR')}
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default Summary;
