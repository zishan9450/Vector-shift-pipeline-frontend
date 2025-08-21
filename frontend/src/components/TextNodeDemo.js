// TextNodeDemo.js
// Demo component to showcase enhanced Text node features

import React from 'react';

export const TextNodeDemo = () => {
  const examples = [
    {
      title: "Simple Variable",
      text: "Hello {{name}}, welcome to {{company}}!",
      description: "Basic variable substitution with {{variable}} syntax"
    },
    {
      title: "Multiple Variables",
      text: "User {{username}} has {{count}} messages in {{folder}}",
      description: "Multiple variables in a single text string"
    },
    {
      title: "Complex Template",
      text: "Dear {{recipient}},\n\nYour order #{{orderId}} for {{product}} has been {{status}}.\n\nTotal: ${{amount}}\n\nBest regards,\n{{sender}}",
      description: "Multi-line template with various variable types"
    },
    {
      title: "Invalid Variables (Will be ignored)",
      text: "{{123invalid}} {{invalid-name}} {{}}",
      description: "Variables that don't follow JavaScript naming conventions"
    }
  ];

  const containerStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '20px',
    margin: '20px 0',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const exampleStyle = {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px'
  };

  const exampleTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px'
  };

  const codeStyle = {
    backgroundColor: '#1f2937',
    color: '#f9fafb',
    padding: '12px',
    borderRadius: '6px',
    fontFamily: 'monospace',
    fontSize: '14px',
    whiteSpace: 'pre-wrap',
    marginBottom: '8px'
  };

  const descriptionStyle = {
    color: '#6b7280',
    fontSize: '14px',
    fontStyle: 'italic'
  };

  const featureListStyle = {
    backgroundColor: '#f0f9ff',
    border: '1px solid #bae6fd',
    borderRadius: '8px',
    padding: '16px',
    marginTop: '20px'
  };

  const featureTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#0369a1',
    marginBottom: '12px'
  };

  const featureItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
    color: '#0369a1'
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>
        <span style={{
          width: '24px',
          height: '24px',
          backgroundColor: '#f59e0b',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          T
        </span>
        Enhanced Text Node Features
      </div>

      <p style={{ color: '#6b7280', marginBottom: '20px' }}>
        The enhanced Text node now supports dynamic sizing and variable detection using the {'{{variable}}'} syntax.
        Try these examples in your Text nodes to see the features in action!
      </p>

      {examples.map((example, index) => (
        <div key={index} style={exampleStyle}>
          <div style={exampleTitleStyle}>{example.title}</div>
          <div style={codeStyle}>{example.text}</div>
          <div style={descriptionStyle}>{example.description}</div>
        </div>
      ))}

      <div style={featureListStyle}>
        <div style={featureTitleStyle}>✨ Key Features</div>
        <div style={featureItemStyle}>
          <span>🔍</span>
          <span>Automatic variable detection with {'{{variable}}'} syntax</span>
        </div>
        <div style={featureItemStyle}>
          <span>📏</span>
          <span>Dynamic sizing based on content length</span>
        </div>
        <div style={featureItemStyle}>
          <span>🔗</span>
          <span>Automatic input handle generation for detected variables</span>
        </div>
        <div style={featureItemStyle}>
          <span>✅</span>
          <span>JavaScript variable naming validation</span>
        </div>
        <div style={featureItemStyle}>
          <span>💡</span>
          <span>Real-time visual feedback and helper text</span>
        </div>
        <div style={featureItemStyle}>
          <span>🎨</span>
          <span>Smooth transitions and responsive design</span>
        </div>
      </div>

      <div style={{
        backgroundColor: '#fef3c7',
        border: '1px solid #f59e0b',
        borderRadius: '8px',
        padding: '16px',
        marginTop: '20px'
      }}>
        <div style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#92400e',
          marginBottom: '8px'
        }}>
          💡 How to Use
        </div>
        <ol style={{
          color: '#92400e',
          margin: 0,
          paddingLeft: '20px'
        }}>
          <li>Drag a Text node from the toolbar</li>
          <li>Type text with {'{{variable}}'} syntax</li>
          <li>Watch the node automatically resize</li>
          <li>See input handles appear for each variable</li>
          <li>Connect other nodes to the generated handles</li>
        </ol>
      </div>
    </div>
  );
};
