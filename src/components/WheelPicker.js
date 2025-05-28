'use client'
import React from 'react';
import { Card, Typography, Badge, Row, Col, Space } from 'antd';
import { wheels } from '../constants/wheels';
import { wheelPricesByModel } from '../constants/wheelPrices';
import { models } from '../constants/models';

const { Text } = Typography;

const allowedWheels = {
  rwd: ['crossflow19'],
  longrange: ['crossflow19', 'induction20'],
  launch: ['induction20'],
};

const WheelPicker = ({ value, onChange, modelKey }) => {
  const filteredWheels = wheels.filter((w) =>
    allowedWheels[modelKey]?.includes(w.key)
  );

  return (
    <Row gutter={[12, 12]} style={{ marginTop: 16 }}>
      {filteredWheels.map((wheel) => {
        const isSelected = value === wheel.key;
        const dynamicPrice = wheelPricesByModel[modelKey]?.[wheel.key] ?? 0;

        return (
          <Col key={wheel.key} xs={12} sm={12} md={8} lg={8} xl={8}>
            <Badge.Ribbon 
              text={dynamicPrice > 0 ? `+₩${dynamicPrice.toLocaleString()}` : '포함'} 
              color={dynamicPrice > 0 ? 'red' : 'green'}
              style={{ display: dynamicPrice >= 0 ? 'block' : 'none' }}
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
                }}
                styles={{
                  body: {
                    padding: 12,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }
                }}
                onClick={() => onChange(wheel.key)}
              >
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div>
                    <img
                      src={wheel.img}
                      alt={wheel.name}
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
                    {wheel.name}
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

export default WheelPicker;
