'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Typography, Space, Image } from 'antd';
import { models } from '../constants/models';
import { colors } from '../constants/colors';

const { Text } = Typography;

const FADE_DURATION = 400; // ms

const ModelSelector = ({ value, onChange, colorKey, wheelKey }) => {
  const selectedColor = colors.find((c) => c.key === colorKey);
  const nextImgSrc = wheelKey === 'induction20'
    ? selectedColor?.renderImgW20 || selectedColor?.renderImg || ''
    : selectedColor?.renderImg || '';

  // 두 이미지 상태 관리
  const [currentImg, setCurrentImg] = useState(nextImgSrc);
  const [prevImg, setPrevImg] = useState(null);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (nextImgSrc && nextImgSrc !== currentImg) {
      setPrevImg(currentImg);      // 이전 이미지를 prev로
      setCurrentImg(nextImgSrc);   // 새 이미지를 current로
      setFadeIn(false);            // 새 이미지는 투명하게 시작

      // fade-in 트리거
      const fadeTimeout = setTimeout(() => {
        setFadeIn(true);           // 새 이미지 fade-in
        setPrevImg(null);          // 이전 이미지는 제거
      }, 20); // 1프레임 후 트리거

      return () => clearTimeout(fadeTimeout);
    }
  }, [nextImgSrc]);

  return (
    <Card style={{ marginBottom: 32 }} styles={{ body: { padding: 16 } }}>
      <div style={{
        marginBottom: 24,
        textAlign: 'center',
        minHeight: 200,
        position: 'relative'
      }}>
        {/* 이전 이미지 (fade-out) */}
        {prevImg && (
          <img
            src={prevImg}
            alt="이전 차량"
            style={{
              padding: '30px',
              position: 'absolute',
              left: 0, top: 0, width: '100%', height: 'auto',
              opacity: fadeIn ? 0 : 1,
              transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4,0,0.2,1)`,
              zIndex: 1,
              pointerEvents: 'none',
              background: 'transparent'
            }}
            draggable={false}
          />
        )}
        {/* 현재 이미지 (fade-in) */}
        {currentImg && (
          <img
            src={currentImg}
            alt={`${selectedColor?.name} 차량`}
            style={{
              padding: '30px',
              width: '100%',
              height: 'auto',
              opacity: fadeIn ? 1 : 0,
              transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4,0,0.2,1)`,
              zIndex: 2,
              background: 'transparent'
            }}
            draggable={false}
          />
        )}
      </div>

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
