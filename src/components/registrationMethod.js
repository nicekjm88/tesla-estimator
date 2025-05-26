import React from 'react';
import { registrationMethods } from '../constants/registrationMethods';

const RegistrationMethodSelector = ({ selectedMethod, onMethodChange }) => {
  return (
    <div className="registration-method-selector">
      <h3>등록 방법 선택</h3>
      <div className="method-options">
        {registrationMethods.map((method) => (
          <label key={method.key} className="method-option">
            <input
              type="radio"
              name="registrationMethod"
              value={method.key}
              checked={selectedMethod === method.key}
              onChange={(e) => onMethodChange(e.target.value)}
            />
            <span className="method-label">
              {method.label}
              <span className="method-price">
                {method.price.toLocaleString()}원
              </span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RegistrationMethodSelector;