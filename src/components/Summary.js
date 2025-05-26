'use client'
import React, { useState, useEffect } from 'react';
import { Card, Typography, Table, Tag } from 'antd';

const { Title, Text } = Typography;

// 숫자 카운팅 애니메이션 컴포넌트
const CountingNumber = ({ value, duration = 100 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startValue = displayValue;
    let endValue = value;
    let startTime = Date.now();

    const updateValue = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutCubic 이징 함수 (Toss 스타일)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeProgress);
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    if (startValue !== endValue) {
      requestAnimationFrame(updateValue);
    }
  }, [value, duration, displayValue]);

  return <span>{displayValue.toLocaleString('ko-KR')}</span>;
};

const Summary = ({ model, color, wheel, interiors, region, autopilot, price, registrationMethod }) => {
  // 디버깅을 위한 콘솔 로그 추가
  console.log('Summary props:', { model, color, wheel, interiors, region, autopilot, price, registrationMethod });

  const dataSource = [
    {
      key: 'model',
      label: '모델',
      value: model?.name || '선택되지 않음',
      price: price?.basePrice || 0,
    },
    {
      key: 'color',
      label: '색상',
      value: color?.name || '선택되지 않음',
      price: price?.colorPrice || 0,
    },
    {
      key: 'wheel',
      label: '휠',
      value: wheel?.name || '선택되지 않음',
      price: price?.wheelPrice || 0,
    },
    {
      key: 'interior',
      label: '인테리어',
      value: interiors?.name || '선택되지 않음',
      price: price?.interiorPrice || 0,
    },
    {
      key: 'autopilot',
      label: '오토파일럿',
      value: autopilot?.name || '선택되지 않음',
      price: price?.autopilotPrice || 0,
    },    
    {
      key: 'region',
      label: '보조금',
      value: region?.name || '선택되지 않음',
      price: -(price?.subsidy || 0),
    },
  ];

  const columns = [
    {
      title: '항목',
      dataIndex: 'label',
      key: 'label',
      width: '30%',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: '선택사항',
      dataIndex: 'value',
      key: 'value',
      width: '40%',
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: '가격',
      dataIndex: 'price',
      key: 'price',
      width: '30%',
      align: 'right',
      render: (price) => (
        <Text color={price >= 0 ? 'blue' : 'green'}>
          {price >= 0
            ? `₩${price.toLocaleString('ko-KR')}`
            : `-₩${Math.abs(price).toLocaleString('ko-KR')}`}
        </Text>
      ),
    },
  ];

  return (
    <Card
      title={<Title level={4} style={{ margin: 0 }}>🧾 견적 요약</Title>}
      bordered
      style={{ width: '100%' }}
      bodyStyle={{ padding: '16px' }}
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        size="small"
        showHeader={false}
        bordered={false}
        style={{ marginBottom: 16 }}
      />
      
      <div 
        style={{
          borderTop: '2px solid #333',
          paddingTop: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Title level={4} style={{ margin: 0, color: '#333' }}>
          총 합계
        </Title>
        <Title 
          level={3} 
          style={{ 
            margin: 0, 
            color: '#dc3545',
            fontWeight: 'bold',
            transition: 'transform 0.2s ease'
          }}
        >
          <CountingNumber value={price?.total || 0} />원
        </Title>
      </div>
    </Card>
  );
};

export default Summary;
