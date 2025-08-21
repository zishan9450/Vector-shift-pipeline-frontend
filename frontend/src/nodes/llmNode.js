// llmNode.js
// Refactored to use BaseNode abstraction

import { useState } from 'react';
import { BaseNode, NodeSelect } from '../components';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4');
  const [temperature, setTemperature] = useState(data?.temperature || '0.7');

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  const modelOptions = [
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    { value: 'claude-3', label: 'Claude 3' },
    { value: 'llama-2', label: 'Llama 2' }
  ];

  const temperatureOptions = [
    { value: '0.1', label: '0.1 (Focused)' },
    { value: '0.3', label: '0.3 (Balanced)' },
    { value: '0.7', label: '0.7 (Creative)' },
    { value: '1.0', label: '1.0 (Very Creative)' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      inputs={[
        { id: `${id}-system`, position: '25%' },
        { id: `${id}-prompt`, position: '75%' }
      ]}
      outputs={[{ id: `${id}-response` }]}
      width={240}
      height={140}
    >
      <NodeSelect
        label="Model"
        value={model}
        onChange={handleModelChange}
        options={modelOptions}
        required
      />
      <NodeSelect
        label="Temperature"
        value={temperature}
        onChange={handleTemperatureChange}
        options={temperatureOptions}
        required
      />
    </BaseNode>
  );
};
