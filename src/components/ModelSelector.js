'use client'
import React from 'react';
import { Card, Button, Typography, Space, Image } from 'antd';
import { models } from '../constants/models';
import { colors } from '../constants/colors';

const { Text } = Typography;

const ModelSelector = ({ value, onChange, colorKey }) => {
  // 선택된 색상에 해당하는 renderImg 경로 추출
  const selectedColor = colors.find((c) => c.key === colorKey);
  const renderImgSrc = selectedColor?.renderImg || '';

  return (
    <Card style={{ marginBottom: 32 }} bodyStyle={{ padding: 16 }}>
      {/* 선택된 색상 이미지 차량 렌더링 */}
      {renderImgSrc && (
        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <Image
            src={renderImgSrc}
            alt={`${selectedColor.name} 차량`}
            style={{ width: '100%', maxHeight: 300 }}
            preview={false}
          />
        </div>
      )}

      <Space.Compact style={{ display: 'flex', width: '100%' }}>
        {models.map((model) => {
          const isSelected = model.key === value;
          return (
            <Button
              key={model.key}
              type={isSelected ? 'primary' : 'default'}
              size="large"
              style={{ 
                flex: 1,
                height: 'auto',
                padding: '12px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => onChange(model.key)}
            >
              <div>
                {model.name}
              </div>
              <Text type="primary" style={{ fontSize: '12px', marginTop: 4 }}>
                {model.price.toLocaleString()}원
              </Text>
            </Button>
          );
        })}
      </Space.Compact>
    </Card>
  );
};

export default ModelSelector;
