'use client'
import React from 'react';
import { Card, Typography, Badge, Space } from 'antd';
import { autopilotOptions } from '../constants/autopilotOptions';

const { Text } = Typography;

const AutopilotSelector = ({ value, onChange }) => {
  return (
    <Space direction="vertical" size="middle" style={{ width: '100%', marginTop: 16 }}>
      {autopilotOptions.map((option) => {
        const isSelected = value === option.key;
        return (
          <Badge.Ribbon
            key={option.key}
            text={option.price > 0 ? `+${option.price.toLocaleString()}원` : '기본'}
            color={option.price > 0 ? 'red' : 'green'}
          >
            <Card
              hoverable
              size="small"
              style={{
                cursor: 'pointer',
                border: isSelected ? '1px solid #171a20' : '1px solid #d9d9d9',
                borderRadius: 8,
                boxShadow: isSelected ? '0 2px 8px rgba(24,144,255,0.15)' : undefined,
                backgroundColor: isSelected ? '#e6f4ff' : '#fff',
                transition: 'all 0.3s ease',
                width: '100%',
              }}
              styles={{ body: { padding: 16 } }}
              onClick={() => onChange(option.key)}
            >
              <Space direction="vertical" size="small">
                <Text
                  strong={isSelected}
                  style={{
                    fontSize: 16,
                    color: isSelected ? '#171a20' : undefined
                  }}
                >
                  {option.name}
                </Text>
                <Text
                  type="secondary"
                  style={{ fontSize: 13 }}
                >
                  {option.description}
                </Text>
              </Space>
            </Card>
          </Badge.Ribbon>
        );
      })}
    </Space>
  );
};

export default AutopilotSelector;
