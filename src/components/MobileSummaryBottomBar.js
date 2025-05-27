'use client'
import React, { useState, useEffect } from 'react';
import { Card, Button, Drawer } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import CountingNumber from './CountingNumber'; // 추가

const isMobile = () => typeof window !== "undefined" && window.innerWidth <= 768;

const MobileSummaryBottomBar = ({ totalWithTax, children }) => {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);

  // 모바일 상태 감지
  useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mobile) return null;

  return (
    <>
      {/* 하단 고정바 */}
      <div style={{
        position: 'fixed',
        left: 0, right: 0, bottom: 0, zIndex: 1001,
        background: '#fff', borderTop: '1px solid #eee',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 16px', boxShadow: '0 -2px 8px rgba(0,0,0,0.06)',
      }}>
        <div style={{ fontWeight: 700, fontSize: 18 }}>
          총 소요비용
          <span style={{ color: '#dc3545', marginLeft: 8 }}>
            <CountingNumber value={totalWithTax} duration={350} />원
          </span>
        </div>
        <Button
          shape="circle"
          icon={open ? <CaretDownOutlined /> : <CaretUpOutlined />}
          size="large"
          onClick={() => setOpen(o => !o)}
        />
      </div>
      {/* 상세 견적 Drawer: antd Drawer 사용 (위로/아래로) */}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="bottom"
        height="65vh"
        closable={false}
        maskClosable
        bodyStyle={{ padding: 0, borderRadius: '24px 24px 0 0', overflow: 'auto' }}
        style={{ borderRadius: '24px 24px 0 0' }}
      >
        {/* 실제 견적 요약 전체 내용 children으로 받아 출력 */}
        <div style={{ padding: 16 }}>{children}</div>
      </Drawer>
    </>
  );
};

export default MobileSummaryBottomBar;
