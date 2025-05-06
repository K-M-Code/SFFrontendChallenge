import React from 'react';

/**
 * @interface DataValueItemProps
 * @description Props for the DataValueItem component.
 * @property {string} label - The label for the data item.
 * @property {string | number | React.ReactNode} value - The value to display.
 * @property {string} [className] - Optional additional class names.
 */

interface DataValueItemProps {
  label: string;
  value: string | number | React.ReactNode;
  className?: string;
}

/**
 * DataValueItem Atom Component
 * Displays a label and its corresponding value.
 * BEM-style: `data-value-item` block.
 *
 * @param {DataValueItemProps} props - The props for the component.
 * @returns {JSX.Element} The rendered data value item.
 */

export const DataValueItem: React.FC<DataValueItemProps> = ({ label, value, className }) => {
  return (
    <div className={`data-value-item ${className || ''}`}>
      <span className="data-value-item__label font-semibold text-sm text-white">{label}: </span>
      <span className="data-value-item__value text-sm text-white">{value}</span>
    </div>
  );
};