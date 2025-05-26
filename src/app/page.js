'use client'
import React, { useState } from 'react';
import { Layout, Row, Col, Typography, Affix } from 'antd';
import ModelSelector from '../components/ModelSelector';
import ColorPicker from '../components/ColorPicker';
import WheelPicker from '../components/WheelPicker';
import InteriorPicker from '../components/InteriorPicker';
import RegionSelector from '../components/RegionSelector';
import Summary from '../components/Summary';
import AutopilotSelector from '../components/AutopilotSelector';
import RegistrationMethodSelector from '../components/RegistrationMethodSelector';
import DeliveryFeeSelector from '../components/DeliveryFeeSelector';

import { models } from '../constants/models';
import { colors } from '../constants/colors';
import { wheels } from '../constants/wheels';
import { interiors } from '../constants/interiors';
import { regions } from '../constants/regions';
import { autopilotOptions } from '../constants/autopilotOptions';
import { calculatePrice } from '../utils/calculatePrice';
import { registrationMethods } from '../constants/registrationMethods';


const { Content } = Layout;
const { Title } = Typography;

export default function Home() {
  // 상태 관리
  const [selectedModel, setSelectedModel] = useState('rwd');
  const [selectedColor, setSelectedColor] = useState('stealthGrey');
  const [selectedWheel, setSelectedWheel] = useState('crossflow19');
  const [selectedInterior, setSelectedInterior] = useState('allBlack');
  const [selectedRegion, setSelectedRegion] = useState('seoul');
  const [selectedAutopilot, setSelectedAutopilot] = useState('none');
  const [registrationMethod, setRegistrationMethod] = useState(registrationMethods[0].key);
  const [deliveryOption, setDeliveryOption] = useState('self');

  // 선택된 항목 정보 추출
  const model = models.find((m) => m.key === selectedModel);
  const color = colors.find((c) => c.key === selectedColor);
  const wheel = wheels.find((w) => w.key === selectedWheel);
  const interior = interiors.find((i) => i.key === selectedInterior); // 🔴 수정: 선택된 인테리어 객체 추출
  const region = regions.find((r) => r.key === selectedRegion);
  const autopilot = autopilotOptions.find((o) => o.key === selectedAutopilot);
  const handleRegistrationMethodChange = (methodKey) => {
    setRegistrationMethod(methodKey);
  };

  const price = calculatePrice({
    model: selectedModel,
    color: selectedColor,
    wheel: selectedWheel,
    interior: selectedInterior,
    region: selectedRegion,
    autopilot: selectedAutopilot,
    registrationMethod: registrationMethod,
    deliveryOption: deliveryOption
  });

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Content style={{ padding: '40px 16px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
          New Model Y
        </Title>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} lg={16} className="main-content-col" style={{ maxWidth: '900px', }}>
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

            <Title level={4} style={{ marginTop: 40 }}>4. 오토파일럿 옵션</Title>
            <AutopilotSelector
              value={selectedAutopilot}
              onChange={setSelectedAutopilot}
            />

            <Title level={4} style={{ marginTop: 40 }}>5. 거주 지역 선택</Title>
            <RegionSelector
              value={selectedRegion}
              onChange={setSelectedRegion}
            />

            <Title level={4} style={{ marginTop: 40 }}>6. 등록 방법</Title>
            <RegistrationMethodSelector
              selectedMethod={registrationMethod}
              onMethodChange={handleRegistrationMethodChange}
            />
            <Title level={4} style={{ marginTop: 40 }}>7. 탁송비</Title>
            <DeliveryFeeSelector
              selectedOption={deliveryOption}
              onOptionChange={setDeliveryOption}
            />

          </Col>
          <Col xs={24} lg={8} className="main-content-col" style={{ maxWidth: '500px', }} >
            <Affix offsetTop={24}>
              <Summary
                model={model}
                color={color}
                price={price}
                wheel={wheel}
                interiors={interior} // 🔴 수정: 선택된 인테리어 객체 전달
                region={region}
                autopilot={autopilot}
                registrationMethod={registrationMethods.find(r => r.key === registrationMethod)}
                deliveryOption={deliveryOption}
              />
            </Affix>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
