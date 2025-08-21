// inputNode.js
// Refactored to use BaseNode abstraction

import { useState } from 'react';
import { BaseNode, NodeInput, NodeSelect } from '../components';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const typeOptions = [
    { value: 'Text', label: 'Text' },
    { value: 'File', label: 'File' },
    { value: 'Number', label: 'Number' },
    { value: 'Boolean', label: 'Boolean' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      outputs={[{ id: `${id}-value` }]}
      width={220}
      height={120}
    >
      <NodeInput
        label="Name"
        value={currName}
        onChange={handleNameChange}
        placeholder="Enter input name"
        required
      />
      <NodeSelect
        label="Type"
        value={inputType}
        onChange={handleTypeChange}
        options={typeOptions}
        required
      />
    </BaseNode>
  );
};
