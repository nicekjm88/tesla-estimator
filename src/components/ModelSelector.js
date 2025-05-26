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
              className="model-btn"
              key={model.key}
              type={isSelected ? 'primary' : 'default'}
              size="large"
              onClick={() => onChange(model.key)}
            >
              <strong>
                {model.name}
              </strong>
              {model.price.toLocaleString()}원
              
            </Button>
          );
        })}
      </Space.Compact>
    </Card>
  );
};

export default ModelSelector;
