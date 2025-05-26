'use client'
import React from 'react';
import { Card, Typography, Badge, Row, Col } from 'antd';
import { colors } from '../constants/colors';

const { Text } = Typography;

const ColorPicker = ({ value, onChange }) => {
  return (
    <Row gutter={[12, 12]}>
      {colors.map((color) => {
        const isSelected = value === color.key;
        return (
          <Col key={color.key} xs={12} sm={8} md={8} lg={8}>
            <Badge.Ribbon 
              text={color.price > 0 ? `+${color.price.toLocaleString()}원` : '포함'} 
              color={color.price > 0 ? 'red' : 'green'}
              style={{ display: color.price >= 0 ? 'block' : 'none' }}
            >
              <Card
                hoverable
                size="small"
                style={{
                  cursor: 'pointer',
                  border: isSelected ? '1px solid #171a20' : '1px solid #d9d9d9',
                  borderRadius: 8,
                  boxShadow: isSelected ? '0 2px 8px rgba(24,144,255,0.15)' : undefined,
                  paddingTop: '25px',
                }}
                bodyStyle={{
                  padding: 12,
                  textAlign: 'center',
                }}
                onClick={() => onChange(color.key)}
              >
                <div style={{ marginBottom: 8 }}>
                  <img
                    src={color.img}
                    alt={color.name}
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
                    color: isSelected ? '#171a20' : undefined 
                  }}
                >
                  {color.name}
                </Text>
              </Card>
            </Badge.Ribbon>
          </Col>
        );
      })}
    </Row>
  );
};

export default ColorPicker;
