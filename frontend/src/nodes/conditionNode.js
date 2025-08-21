// conditionNode.js
// Conditional logic node using BaseNode abstraction

import { useState } from 'react';
import { BaseNode, NodeInput, NodeSelect } from '../components';

export const ConditionNode = ({ id, data }) => {
  const [conditionField, setConditionField] = useState(data?.conditionField || '');
  const [conditionOperator, setConditionOperator] = useState(data?.conditionOperator || 'equals');
  const [conditionValue, setConditionValue] = useState(data?.conditionValue || '');

  const handleFieldChange = (e) => {
    setConditionField(e.target.value);
  };

  const handleOperatorChange = (e) => {
    setConditionOperator(e.target.value);
  };

  const handleValueChange = (e) => {
    setConditionValue(e.target.value);
  };

  const operatorOptions = [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'greater_equal', label: 'Greater or Equal' },
    { value: 'less_equal', label: 'Less or Equal' },
    { value: 'contains', label: 'Contains' },
    { value: 'starts_with', label: 'Starts With' },
    { value: 'ends_with', label: 'Ends With' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Condition"
      inputs={[{ id: `${id}-data` }]}
      outputs={[
        { id: `${id}-true`, position: '25%' },
        { id: `${id}-false`, position: '75%' }
      ]}
      width={240}
      height={160}
      style={{ backgroundColor: '#fce7f3' }}
    >
      <NodeInput
        label="Condition Field"
        value={conditionField}
        onChange={handleFieldChange}
        placeholder="Enter field to check"
        required
      />
      <NodeSelect
        label="Operator"
        value={conditionOperator}
        onChange={handleOperatorChange}
        options={operatorOptions}
        required
      />
      <NodeInput
        label="Value"
        value={conditionValue}
        onChange={handleValueChange}
        placeholder="Enter condition value"
        required
      />
    </BaseNode>
  );
};
