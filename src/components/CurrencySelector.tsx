import React from 'react';
import Select from 'react-select';
import { currencies, Currency } from '../utils/currency';

interface CurrencySelectorProps {
  value: string;
  onChange: (currency: string) => void;
  className?: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ value, onChange, className = '' }) => {
  const options = currencies.map(currency => ({
    value: currency.code,
    label: (
      <div className="flex items-center">
        <span className="mr-2">{currency.flag}</span>
        <span className="mr-2">{currency.symbol}</span>
        <span>{currency.code}</span>
        <span className="ml-2 text-gray-500 text-sm">- {currency.name}</span>
      </div>
    ),
    currency
  }));

  const selectedOption = options.find(option => option.value === value);

  return (
    <Select
      value={selectedOption}
      onChange={(option) => onChange(option?.value || 'USD')}
      options={options}
      className={className}
      classNamePrefix="currency-select"
      isSearchable
      placeholder="Select currency..."
      styles={{
        control: (base) => ({
          ...base,
          minHeight: '48px',
          borderRadius: '8px',
          borderColor: '#d1d5db',
          '&:hover': {
            borderColor: '#8b5cf6'
          },
          '&:focus-within': {
            borderColor: '#8b5cf6',
            boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)'
          }
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected ? '#8b5cf6' : state.isFocused ? '#f3f4f6' : 'white',
          color: state.isSelected ? 'white' : '#374151'
        })
      }}
    />
  );
};

export default CurrencySelector;