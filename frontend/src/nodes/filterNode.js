// filterNode.js
// Data filtering node using BaseNode abstraction

import { useState } from 'react';
import { BaseNode, NodeInput, NodeSelect } from '../components';

export const FilterNode = ({ id, data }) => {
  const [filterField, setFilterField] = useState(data?.filterField || '');
  const [filterOperator, setFilterOperator] = useState(data?.filterOperator || 'equals');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');

  const handleFieldChange = (e) => {
    setFilterField(e.target.value);
  };

  const handleOperatorChange = (e) => {
    setFilterOperator(e.target.value);
  };

  const handleValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const operatorOptions = [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'regex', label: 'Regex Match' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      inputs={[{ id: `${id}-data` }]}
      outputs={[{ id: `${id}-filtered` }]}
      width={240}
      height={160}
      style={{ backgroundColor: '#fef3c7' }}
    >
      <NodeInput
        label="Field"
        value={filterField}
        onChange={handleFieldChange}
        placeholder="Enter field name to filter on"
        required
      />
      <NodeSelect
        label="Operator"
        value={filterOperator}
        onChange={handleOperatorChange}
        options={operatorOptions}
        required
      />
      <NodeInput
        label="Value"
        value={filterValue}
        onChange={handleValueChange}
        placeholder="Enter filter value"
        required
      />
    </BaseNode>
  );
};
