'use client'
import React from 'react';
import { Card, Badge, Row, Col, Space, Typography } from 'antd';
import { registrationMethods } from '../constants/registrationMethods';

const { Text } = Typography;

const RegistrationMethodSelector = ({ selectedMethod, onMethodChange }) => {
  return (
    <Row gutter={[12, 12]} style={{ marginTop: 16 }}>
      {registrationMethods.map((method) => {
        const isSelected = selectedMethod === method.key;
        return (
          <Col key={method.key} xs={12} sm={12} md={8} lg={8} xl={8}>
            <Badge.Ribbon
              text={method.price > 0 ? `+${method.price.toLocaleString()}원` : '포함'}
              color={method.price > 0 ? 'red' : 'green'}
              style={{ display: method.price >= 0 ? 'block' : 'none' }}
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
                bodyStyle={{
                  padding: 12,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => onMethodChange(method.key)}
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
                    {method.label}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    {method.key === 'self' ? '직접 등록을 원하는 분께 추천' : '등록을 간편하게 대행 요청'}
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

export default RegistrationMethodSelector;
