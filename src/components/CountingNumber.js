// components/CountingNumber.js
'use client'
import React, { useEffect, useState } from 'react';

const CountingNumber = ({ value = 0, duration = 100 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startValue = displayValue;
    let endValue = value;
    let startTime = Date.now();

    const updateValue = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Toss 스타일 이징 함수
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(startValue + (endValue - startValue) * easeProgress);
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    if (startValue !== endValue) {
      requestAnimationFrame(updateValue);
    }
    // value가 바뀌면 항상 새로 실행
    // eslint-disable-next-line
  }, [value]);

  return <span>{displayValue.toLocaleString('ko-KR')}</span>;
};

export default CountingNumber;
