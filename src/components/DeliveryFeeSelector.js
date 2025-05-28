// components/DeliveryFeeSelector.js
'use client'
import React from 'react';
import { Card, Badge, Row, Col, Space, Typography } from 'antd';
import { deliveryOptions } from '../constants/deliveryOptions';

const { Text } = Typography;

const DeliveryFeeSelector = ({ selectedOption, onOptionChange }) => {
  return (
    <Row gutter={[12, 12]} style={{ marginTop: 16 }}>
      {deliveryOptions.map((option) => {
        const isSelected = selectedOption === option.key;
        return (
          <Col key={option.key} xs={12} sm={12} md={8} lg={8} xl={8}>
            <Badge.Ribbon
              text={option.price > 0 ? `+${option.price.toLocaleString()}원` : '포함'}
              color={option.price > 0 ? 'red' : 'green'}
              style={{ display: option.price >= 0 ? 'block' : 'none' }}
            >
              <Card
                hoverable
                size="small"
                style={{
                  cursor: 'pointer',
                  border: isSelected ? '1px solid #171a20' : '1px solid #d9d9d9',
                  borderRadius: 8,
                  boxShadow: isSelected ? '0 2px 8px rgba(24,144,255,0.15)' : undefined,
                  transition: 'all 0.3s ease',
                  height: '100%',
                  paddingTop: '25px',
                  background: isSelected ? '#e6f4ff' : '#fff',
                }}
                styles={{ body: { padding: 12,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center', } 
                }}
                onClick={() => onOptionChange(option.key)}
              >
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <Text
                    strong={isSelected}
                    style={{
                      fontSize: 15,
                      color: isSelected ? '#171a20' : undefined,
                      textAlign: 'center',
                    }}
                  >
                    {option.label}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    {option.key === 'self'
                      ? '직접 방문 수령'
                      : '원하는 장소로 탁송 요청'}
                  </Text>
                </Space>
              </Card>
            </Badge.Ribbon>
          </Col>
        );
      })}
    </Row>
  );
};

export default DeliveryFeeSelector;
