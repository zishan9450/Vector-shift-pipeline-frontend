// outputNode.js
// Refactored to use BaseNode abstraction

import { useState } from 'react';
import { BaseNode, NodeInput, NodeSelect } from '../components';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const typeOptions = [
    { value: 'Text', label: 'Text' },
    { value: 'Image', label: 'Image' },
    { value: 'File', label: 'File' },
    { value: 'JSON', label: 'JSON' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      inputs={[{ id: `${id}-value` }]}
      width={220}
      height={120}
    >
      <NodeInput
        label="Name"
        value={currName}
        onChange={handleNameChange}
        placeholder="Enter output name"
        required
      />
      <NodeSelect
        label="Type"
        value={outputType}
        onChange={handleTypeChange}
        options={typeOptions}
        required
      />
    </BaseNode>
  );
};
