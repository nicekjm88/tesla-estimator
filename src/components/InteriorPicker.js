'use client'
import React from 'react';
import { Card, Typography, Badge, Row, Col, Space } from 'antd';
import { interiors } from '../constants/interiors';
import { interiorPricesByModel } from '../constants/interiorPrices';

const { Text } = Typography;

const InteriorPicker = ({ value, onChange, modelKey }) => {
  return (
    <Row gutter={[12, 12]} style={{ marginTop: 16 }}>
      {interiors.map((interior) => {
        const isSelected = value === interior.key;
        const price = interiorPricesByModel[modelKey]?.[interior.key] ?? 0;

        return (
          <Col key={interior.key} xs={12} sm={8} md={8} lg={8} xl={8}>
            <Badge.Ribbon 
              text={price > 0 ? `+${price.toLocaleString()}원` : '포함'} 
              color={price > 0 ? 'red' : 'green'}
              style={{ display: price >= 0 ? 'block' : 'none' }}
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
                }}
                bodyStyle={{
                  padding: 12,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: '25px',
                }}
                onClick={() => onChange(interior.key)}
              >
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div>
                    <img
                      src={interior.img}
                      alt={interior.name}
                      style={{ 
                        width: '100%', 
                        height: 60, 
                        objectFit: 'contain',
                        borderRadius: 4,
                      }}
                    />
                  </div>
                  <Text 
                    strong={isSelected}
                    style={{ 
                      fontSize: 14,
                      color: isSelected ? '#171a20' : undefined,
                      textAlign: 'center'
                    }}
                  >
                    {interior.name}
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

export default InteriorPicker;
