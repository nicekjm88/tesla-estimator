'use client'
import React from 'react';
import { Radio, Card } from 'antd';
import { models } from '../constants/models';
import { colors } from '../constants/colors';

const ModelSelector = ({ value, onChange, colorKey }) => {

  // 선택된 색상에 해당하는 renderImg 경로 추출
  const selectedColor = colors.find((c) => c.key === colorKey);
  const renderImgSrc = selectedColor?.renderImg || '';

return (
    <div style={{ marginBottom: 32 }}>
      {/* 선택된 색상 이미지 차량 렌더링 */}
      {renderImgSrc && (
        <img
          src={renderImgSrc}
          alt={`${selectedColor.name} 차량`}
          style={{
            width: '100%',
            maxWidth: 640,
            marginBottom: 16,
            borderRadius: 8,
            boxShadow: '0 0 12px rgba(0,0,0,0.1)',
          }}
        />
      )}

      <div style={{ display: 'flex', gap: 8 }}>
        {models.map((model) => {
          const isSelected = model.key === value;
          return (
            <button
              key={model.key}
              onClick={() => onChange(model.key)}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 6,
                border: isSelected ? '2px solid #1890ff' : '1px solid #ccc',
                backgroundColor: isSelected ? '#e6f4ff' : '#fff',
                fontWeight: isSelected ? 'bold' : 'normal',
                cursor: 'pointer',
              }}
            >
              {model.name}
              <br />
              <small>₩{model.price.toLocaleString()}</small>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ModelSelector;
