'use client'
import React, { useState } from 'react';
import { Layout, Row, Col, Typography, Affix } from 'antd';
import ModelSelector from '../components/ModelSelector';
import ColorPicker from '../components/ColorPicker';
import WheelPicker from '../components/WheelPicker';
import InteriorPicker from '../components/InteriorPicker';
import RegionSelector from '../components/RegionSelector';
import Summary from '../components/Summary';
import AutopilotSelector from '../components/AutopilotSelector'; // 🟡 추가

import { models } from '../constants/models';
import { colors } from '../constants/colors';
import { wheels } from '../constants/wheels';
import { interiors } from '../constants/interiors';
import { regions } from '../constants/regions';
import { autopilotOptions } from '../constants/autopilotOptions'; // 🟡 추가

import { calculatePrice } from '../utils/calculatePrice';

const { Content } = Layout;
const { Title } = Typography;

export default function Home() {
  // 상태 관리
  const [selectedModel, setSelectedModel] = useState('rwd');
  const [selectedColor, setSelectedColor] = useState('stealthGrey');
  const [selectedWheel, setSelectedWheel] = useState('crossflow19');
  const [selectedInterior, setSelectedInterior] = useState('allBlack');
  const [selectedRegion, setSelectedRegion] = useState('seoul');
  const [selectedAutopilot, setSelectedAutopilot] = useState('none'); // 🟡 추가


  // 선택된 항목 정보 추출
  const model = models.find((m) => m.key === selectedModel);
  const color = colors.find((c) => c.key === selectedColor);
  const wheel = wheels.find((w) => w.key === selectedWheel);
  const region = regions.find((r) => r.key === selectedRegion);
  const autopilot = autopilotOptions.find((o) => o.key === selectedAutopilot); // 🟡 추가

  const price = calculatePrice({
    model: selectedModel,
    color: selectedColor,
    wheel: selectedWheel,
    interior: selectedInterior,
    region: selectedRegion,
    autopilot: selectedAutopilot, // 🟡 추가
  });

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Content style={{ padding: '40px 16px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
          Tesla Model Y 견적기
        </Title>
        <Row gutter={[32, 32]} justify="center">

          <Col xs={24} lg={16} style={{ maxWidth: '700px', }}>
            <ModelSelector
              value={selectedModel}
              onChange={setSelectedModel}
              colorKey={selectedColor}
            />

            <Title level={4} style={{ marginTop: 40 }}>1. 색상 선택</Title>
            <ColorPicker value={selectedColor} onChange={setSelectedColor} />

            <Title level={4} style={{ marginTop: 40 }}>2. 휠 선택</Title>
            <WheelPicker
              value={selectedWheel}
              onChange={setSelectedWheel}
              modelKey={selectedModel}
            />

            <Title level={4} style={{ marginTop: 40 }}>3. 인테리어 선택</Title>
            <InteriorPicker
              value={selectedInterior}
              onChange={setSelectedInterior}
              modelKey={selectedModel}
            />

            <Title level={4} style={{ marginTop: 40 }}>5. 오토파일럿 옵션</Title> {/* 🟡 추가 */}
            <AutopilotSelector
              value={selectedAutopilot}
              onChange={setSelectedAutopilot}
            />

            <Title level={4} style={{ marginTop: 40 }}>4. 거주 지역 선택</Title>
            <RegionSelector
              value={selectedRegion}
              onChange={setSelectedRegion}
            />

          </Col>
          <Col xs={24} lg={8} style={{ maxWidth: '400px', }} >
            <Affix offsetTop={24}>
              <Summary
                model={model}
                color={color}
                price={price}
                wheel={wheel}
                interiors={interiors}
                region={region}
                autopilot={autopilot} // 🟡 추가
              />
            </Affix>
          </Col>
        </Row>
      </Content>
    </Layout>

  );
}
