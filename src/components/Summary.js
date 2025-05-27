'use client'
import React, { useState, useEffect } from 'react';
import { Card, Typography, Table, Tag } from 'antd';
import { deliveryOptions } from '../constants/deliveryOptions';

const { Title, Text } = Typography;

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

const Summary = ({
  model,
  color,
  wheel,
  interiors,
  region,
  autopilot,
  price,
  registrationMethod,
  deliveryOption,
  childCount
}) => {
  const deliveryOptionObj = deliveryOptions.find(o => o.key === deliveryOption);

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
    {
      key: 'registrationMethod',
      label: '등록 방법',
      value: registrationMethod?.label || '선택되지 않음',
      price: registrationMethod?.price || 0,
    },
    {
      key: 'deliveryOption',
      label: '탁송비',
      value: deliveryOptionObj?.label || '선택되지 않음',
      price: deliveryOptionObj?.price || 0,
    },
    {
      key: 'childBenefit',
      label: '다자녀 혜택',
      value: childCount >= 2 ? `자녀 ${childCount}명` : '해당 없음',
      price: childCount >= 2 ? -price.childBenefit : 0,
    },
    // **취득세는 표시는 하되, 실 결제액에는 더하지 마세요!**
    {
      key: 'acquisitionTax',
      label: '취등록세(예상)',
      value: '공급가액의 7% - 감면',
      price: price?.acquisitionTax || 0,
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
      render: (price, row) => {
        // 취득세라면 blue, 보조금/다자녀라면 green, 나머지는 blue
        let color = 'blue';
        if (row.key === 'region' || row.key === 'childBenefit') color = 'green';
        if (row.key === 'acquisitionTax') color = 'geekblue';
        return (
          <Tag color={color}>
            {price >= 0
              ? `${price.toLocaleString('ko-KR')}원`
              : `-${Math.abs(price).toLocaleString('ko-KR')}원`}
          </Tag>
        );
      },
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

      {/* 실 결제액: 취득세 포함 X */}
      {/* <div
        style={{
          borderTop: '2px solid #333',
          paddingTop: 8,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Title level={5} style={{ margin: 0, color: '#333' }}>
          실 결제액 (혜택 반영)
        </Title>
        <Title
          level={4}
          style={{
            margin: 0,
            color: '#2e7d32',
            fontWeight: 'bold',
          }}
        >
          <CountingNumber value={price?.total || 0} />원
        </Title>
      </div> */}
      {/* 총 소요 비용: 실 결제액 + 취득세 */}
      <div
        style={{
          marginTop: 0,
          paddingTop: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          총 합계
        </Title>
        <Title
          level={3}
          style={{
            margin: 0,
            color: '#c62828',
            fontWeight: 'bold',
            color: '#c62828'
          }}
        >
          <CountingNumber value={price?.totalWithTax || 0} />원
        </Title>
      </div>
    </Card>
  );
};

export default Summary;
