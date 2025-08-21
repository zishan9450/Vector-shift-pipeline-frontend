// apiNode.js
// External API integration node using BaseNode abstraction

import { useState } from 'react';
import { BaseNode, NodeInput, NodeSelect } from '../components';

export const APINode = ({ id, data }) => {
  const [apiUrl, setApiUrl] = useState(data?.apiUrl || '');
  const [httpMethod, setHttpMethod] = useState(data?.httpMethod || 'GET');
  const [timeout, setTimeout] = useState(data?.timeout || '5000');

  const handleUrlChange = (e) => {
    setApiUrl(e.target.value);
  };

  const handleMethodChange = (e) => {
    setHttpMethod(e.target.value);
  };

  const handleTimeoutChange = (e) => {
    setTimeout(e.target.value);
  };

  const methodOptions = [
    { value: 'GET', label: 'GET' },
    { value: 'POST', label: 'POST' },
    { value: 'PUT', label: 'PUT' },
    { value: 'DELETE', label: 'DELETE' },
    { value: 'PATCH', label: 'PATCH' }
  ];

  const timeoutOptions = [
    { value: '1000', label: '1 second' },
    { value: '5000', label: '5 seconds' },
    { value: '10000', label: '10 seconds' },
    { value: '30000', label: '30 seconds' },
    { value: '60000', label: '1 minute' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="API"
      inputs={[
        { id: `${id}-data`, position: '25%' },
        { id: `${id}-headers`, position: '75%' }
      ]}
      outputs={[
        { id: `${id}-response`, position: '25%' },
        { id: `${id}-error`, position: '75%' }
      ]}
      width={260}
      height={180}
      style={{ backgroundColor: '#f3e8ff' }}
    >
      <NodeInput
        label="API URL"
        value={apiUrl}
        onChange={handleUrlChange}
        placeholder="https://api.example.com/endpoint"
        required
      />
      <NodeSelect
        label="HTTP Method"
        value={httpMethod}
        onChange={handleMethodChange}
        options={methodOptions}
        required
      />
      <NodeSelect
        label="Timeout"
        value={timeout}
        onChange={handleTimeoutChange}
        options={timeoutOptions}
        required
      />
    </BaseNode>
  );
};
