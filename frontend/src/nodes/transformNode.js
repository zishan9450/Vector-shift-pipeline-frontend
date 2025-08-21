// transformNode.js
// Data transformation node using BaseNode abstraction

import { useState } from 'react';
import { BaseNode, NodeInput, NodeSelect } from '../components';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'map');
  const [transformExpression, setTransformExpression] = useState(data?.transformExpression || 'x => x');
  const [outputField, setOutputField] = useState(data?.outputField || 'transformed');

  const handleTypeChange = (e) => {
    setTransformType(e.target.value);
  };

  const handleExpressionChange = (e) => {
    setTransformExpression(e.target.value);
  };

  const handleFieldChange = (e) => {
    setOutputField(e.target.value);
  };

  const transformOptions = [
    { value: 'map', label: 'Map' },
    { value: 'filter', label: 'Filter' },
    { value: 'reduce', label: 'Reduce' },
    { value: 'sort', label: 'Sort' },
    { value: 'group', label: 'Group By' },
    { value: 'custom', label: 'Custom Function' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      inputs={[{ id: `${id}-data` }]}
      outputs={[{ id: `${id}-transformed` }]}
      width={260}
      height={180}
      style={{ backgroundColor: '#dbeafe' }}
    >
      <NodeSelect
        label="Transform Type"
        value={transformType}
        onChange={handleTypeChange}
        options={transformOptions}
        required
      />
      <NodeInput
        label="Expression"
        value={transformExpression}
        onChange={handleExpressionChange}
        placeholder="Enter transformation expression"
        required
      />
      <NodeInput
        label="Output Field"
        value={outputField}
        onChange={handleFieldChange}
        placeholder="Enter output field name"
        required
      />
    </BaseNode>
  );
};
