// aggregateNode.js
// Data aggregation node using BaseNode abstraction

import { useState } from 'react';
import { BaseNode, NodeInput, NodeSelect } from '../components';

export const AggregateNode = ({ id, data }) => {
  const [groupByField, setGroupByField] = useState(data?.groupByField || '');
  const [aggregationType, setAggregationType] = useState(data?.aggregationType || 'count');
  const [aggregationField, setAggregationField] = useState(data?.aggregationField || '');

  const handleGroupByChange = (e) => {
    setGroupByField(e.target.value);
  };

  const handleAggregationTypeChange = (e) => {
    setAggregationType(e.target.value);
  };

  const handleAggregationFieldChange = (e) => {
    setAggregationField(e.target.value);
  };

  const aggregationOptions = [
    { value: 'count', label: 'Count' },
    { value: 'sum', label: 'Sum' },
    { value: 'average', label: 'Average' },
    { value: 'min', label: 'Minimum' },
    { value: 'max', label: 'Maximum' },
    { value: 'median', label: 'Median' },
    { value: 'mode', label: 'Mode' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Aggregate"
      inputs={[{ id: `${id}-data` }]}
      outputs={[{ id: `${id}-aggregated` }]}
      width={240}
      height={160}
      style={{ backgroundColor: '#dcfce7' }}
    >
      <NodeInput
        label="Group By Field"
        value={groupByField}
        onChange={handleGroupByChange}
        placeholder="Enter field to group by"
        required
      />
      <NodeSelect
        label="Aggregation Type"
        value={aggregationType}
        onChange={handleAggregationTypeChange}
        options={aggregationOptions}
        required
      />
      <NodeInput
        label="Aggregation Field"
        value={aggregationField}
        onChange={handleAggregationFieldChange}
        placeholder="Enter field to aggregate"
        required
      />
    </BaseNode>
  );
};
