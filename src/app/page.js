'use client'
import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Typography, Affix } from 'antd';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive'; // 추가
import ModelSelector from '../components/ModelSelector';
import ColorPicker from '../components/ColorPicker';
import WheelPicker from '../components/WheelPicker';
import InteriorPicker from '../components/InteriorPicker';
import RegionSelector from '../components/RegionSelector';
import Summary from '../components/Summary';
import MobileSummaryBottomBar from '../components/MobileSummaryBottomBar';
import AutopilotSelector from '../components/AutopilotSelector';
import RegistrationMethodSelector from '../components/RegistrationMethodSelector';
import DeliveryFeeSelector from '../components/DeliveryFeeSelector';
import ChildBenefitInput from '../components/ChildBenefitInput';
import AcquisitionTaxDisplay from '../components/AcquisitionTaxDisplay';

import { models } from '../constants/models';
import { colors } from '../constants/colors';
import { wheels } from '../constants/wheels';
import { interiors } from '../constants/interiors';
import { autopilotOptions } from '../constants/autopilotOptions';
import { calculatePrice } from '../utils/calculatePrice';
import { registrationMethods } from '../constants/registrationMethods';

const { Content } = Layout;
const { Title } = Typography;

export default function Home() {
  const router = useRouter();
  const handleTitleClick = () => {
    router.push('/');
  };

  // 상태 관리
  const [selectedModel, setSelectedModel] = useState('rwd');
  const [selectedColor, setSelectedColor] = useState('stealthGrey');
  const [selectedWheel, setSelectedWheel] = useState('crossflow19');
  const [selectedInterior, setSelectedInterior] = useState('allBlack');
  const [selectedRegion, setSelectedRegion] = useState('seoul');
  const [regions, setRegions] = useState([]); // regions 상태 추가
  const [selectedAutopilot, setSelectedAutopilot] = useState('none');
  const [registrationMethod, setRegistrationMethod] = useState(registrationMethods[0].key);
  const [deliveryOption, setDeliveryOption] = useState('self');
  const [childCount, setChildCount] = useState(0);

  // regions API 연동
  useEffect(() => {
    fetch('/api/regions')
      .then(res => res.json())
      .then(data => setRegions(data));
  }, []);

  // 선택된 항목 정보 추출
  const model = models.find((m) => m.key === selectedModel);
  const color = colors.find((c) => c.key === selectedColor);
  const wheel = wheels.find((w) => w.key === selectedWheel);
  const interior = interiors.find((i) => i.key === selectedInterior);
  const region = regions.find((r) => r.key === selectedRegion);
  const autopilot = autopilotOptions.find((o) => o.key === selectedAutopilot);
  const handleRegistrationMethodChange = (methodKey) => setRegistrationMethod(methodKey);

  const price = calculatePrice({
    model: selectedModel,
    color: selectedColor,
    wheel: selectedWheel,
    interior: selectedInterior,
    region: selectedRegion,
    autopilot: selectedAutopilot,
    registrationMethod: registrationMethod,
    deliveryOption: deliveryOption,
    childCount,
    regions, // 반드시 추가!
  });

  // 모바일 디바이스 감지
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Content style={{ padding: '40px 16px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }} onClick={handleTitleClick}>
          New Model Y
        </Title>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} lg={16} className="main-content-col" style={{ maxWidth: '900px', }}>
            {/* 모바일에서만 Affix로 ModelSelector를 sticky 처리 */}
            {isMobile ? (
              <>
                <Affix offsetTop={0}>
                  <div style={{ background: '#fff', zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    {/* 썸네일 이미지만 보여주기 */}
                    <ModelSelector
                      value={selectedModel}
                      onChange={setSelectedModel}
                      colorKey={selectedColor}
                      wheelKey={selectedWheel}
                      isThumbnail
                    />
                  </div>
                </Affix>
                {/* 트림(모델) 선택 버튼은 Affix 아래에 항상 노출 */}
                <div style={{ margin: '16px 0' }}>
                  <ModelSelector
                    value={selectedModel}
                    onChange={setSelectedModel}
                    colorKey={selectedColor}
                    wheelKey={selectedWheel}
                    showOnlyButtons // 버튼만 보이도록 prop 추가
                  />
                </div>
              </>
            ) : (
              <ModelSelector
                value={selectedModel}
                onChange={setSelectedModel}
                colorKey={selectedColor}
                wheelKey={selectedWheel}
              />
            )}

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
              regions={regions} // props로 전달
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
            <Title level={4} style={{ marginTop: 40 }}>8. 다자녀 혜택</Title>
            <ChildBenefitInput value={childCount} onChange={setChildCount} />

            <Title level={4} style={{ marginTop: 40 }}>9. 취등록세(예상)</Title>
            <AcquisitionTaxDisplay acquisitionTax={price.acquisitionTax} />

          </Col>
          <Col xs={24} lg={8} className="main-content-col" style={{ maxWidth: '500px', }} >
            <Affix offsetTop={24}>
              <div className="summary-desktop">
                <Summary
                  model={model}
                  color={color}
                  price={price}
                  wheel={wheel}
                  interiors={interior}
                  region={region}
                  autopilot={autopilot}
                  registrationMethod={registrationMethods.find(r => r.key === registrationMethod)}
                  deliveryOption={deliveryOption}
                  childCount={childCount}
                  acquisitionTax={price.acquisitionTax}
                />
              </div>
              <MobileSummaryBottomBar totalWithTax={price.totalWithTax}>
                <Summary
                  model={model}
                  color={color}
                  price={price}
                  wheel={wheel}
                  interiors={interior}
                  region={region}
                  autopilot={autopilot}
                  registrationMethod={registrationMethods.find(r => r.key === registrationMethod)}
                  deliveryOption={deliveryOption}
                  childCount={childCount}
                  acquisitionTax={price.acquisitionTax}
                />
              </MobileSummaryBottomBar>
            </Affix>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
