// textNode.js
// Modern Text node with robust design inspired by n8n

import { useState, useEffect, useRef } from 'react';
import { BaseNode } from '../components';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [detectedVariables, setDetectedVariables] = useState([]);
  const [nodeDimensions, setNodeDimensions] = useState({ width: 240, height: 120 });
  const textareaRef = useRef(null);
  const hiddenTextRef = useRef(null);

  // Function to detect variables in text using regex
  const detectVariables = (text) => {
    const variableRegex = /\{\{([^}]+)\}\}/g;
    const matches = text.match(variableRegex);
    
    if (!matches) return [];
    
    // Extract variable names and validate them
    const variables = matches.map(match => {
      const varName = match.slice(2, -2).trim(); // Remove {{ }}
      
      // Validate JavaScript variable naming conventions
      const isValidVariable = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(varName);
      
      return {
        name: varName,
        isValid: isValidVariable,
        originalMatch: match
      };
    });
    
    // Remove duplicates and invalid variables
    const uniqueVariables = variables.filter((variable, index, self) => 
      index === self.findIndex(v => v.name === variable.name) && variable.isValid
    );
    
    return uniqueVariables;
  };

  // Function to calculate optimal node dimensions based on text content
  const calculateDimensions = (text) => {
    if (!hiddenTextRef.current) return { width: 240, height: 120 };
    
    // Set the hidden textarea content to measure
    hiddenTextRef.current.value = text;
    
    // Get the scroll dimensions
    const scrollHeight = hiddenTextRef.current.scrollHeight;
    const scrollWidth = hiddenTextRef.current.scrollWidth;
    
    // Calculate optimal dimensions with some padding
    const minWidth = 240;
    const minHeight = 120;
    const maxWidth = 450;
    const maxHeight = 350;
    
    const optimalWidth = Math.max(minWidth, Math.min(maxWidth, scrollWidth + 80));
    const optimalHeight = Math.max(minHeight, Math.min(maxHeight, scrollHeight + 100));
    
    return { width: optimalWidth, height: optimalHeight };
  };

  // Handle text changes
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    
    // Detect variables
    const variables = detectVariables(newText);
    setDetectedVariables(variables);
    
    // Calculate new dimensions
    const newDimensions = calculateDimensions(newText);
    setNodeDimensions(newDimensions);
  };

  // Update dimensions when detected variables change
  useEffect(() => {
    const newDimensions = calculateDimensions(currText);
    setNodeDimensions(newDimensions);
  }, [detectedVariables, currText]);

  // Generate input handles for detected variables
  const generateInputHandles = () => {
    // Always provide at least one default input handle
    if (detectedVariables.length === 0) {
      const defaultHandle = {
        id: `${id}-input`,
        position: '50%'
      };
      console.log('TextNode: Generated default input handle:', defaultHandle);
      return [defaultHandle];
    }
    
    const handles = detectedVariables.map((variable, index) => ({
      id: `${id}-${variable.name}`,
      position: `${((index + 1) * 100) / (detectedVariables.length + 1)}%`
    }));
    console.log('TextNode: Generated variable input handles:', handles);
    return handles;
  };

  // Enhanced textarea with auto-resize
  const EnhancedTextarea = () => (
    <div style={{ position: 'relative' }}>
      <textarea
        ref={textareaRef}
        value={currText}
        onChange={handleTextChange}
        placeholder="Enter text or use {{variable}} syntax"
        required
        style={{
          width: '100%',
          minHeight: '80px',
          padding: '16px 20px',
          border: '2px solid #e1e8ed',
          borderRadius: '12px',
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#1e293b',
          backgroundColor: '#ffffff',
          transition: 'all 0.2s ease-in-out',
          boxSizing: 'border-box',
          resize: 'none',
          fontFamily: 'inherit',
          fontWeight: '500'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#6366f1';
          e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
          e.target.style.backgroundColor = '#fafafa';
          e.target.style.transform = 'translateY(-1px)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#e1e8ed';
          e.target.style.boxShadow = 'none';
          e.target.style.backgroundColor = '#ffffff';
          e.target.style.transform = 'translateY(0)';
        }}
        onMouseEnter={(e) => {
          if (document.activeElement !== e.target) {
            e.target.style.borderColor = '#cbd5e1';
            e.target.style.backgroundColor = '#f8fafc';
          }
        }}
        onMouseLeave={(e) => {
          if (document.activeElement !== e.target) {
            e.target.style.borderColor = '#e1e8ed';
            e.target.style.backgroundColor = '#ffffff';
          }
        }}
      />
      
      {/* Hidden textarea for measuring dimensions */}
      <textarea
        ref={hiddenTextRef}
        style={{
          position: 'absolute',
          top: '-9999px',
          left: '-9999px',
          width: 'auto',
          height: 'auto',
          visibility: 'hidden',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          fontSize: '14px',
          lineHeight: '1.6',
          fontFamily: 'inherit',
          padding: '16px 20px',
          border: 'none',
          outline: 'none',
          resize: 'none'
        }}
        readOnly
      />
      
      {/* Variable syntax helper */}
      {detectedVariables.length > 0 && (
        <div style={{
          marginTop: '16px',
          padding: '16px 20px',
          backgroundColor: '#f0f9ff',
          border: '2px solid #bae6fd',
          borderRadius: '12px',
          fontSize: '13px',
          color: '#0369a1',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '16px',
            height: '16px',
            backgroundColor: '#0ea5e9',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '10px',
            fontWeight: '700'
          }}>
            i
          </div>
          <div>
            <strong>Detected Variables:</strong> {detectedVariables.map(v => v.name).join(', ')}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text Processing"
      inputs={generateInputHandles()}
      outputs={[{ id: `${id}-output` }]}
      width={nodeDimensions.width}
      height={nodeDimensions.height}
      style={{ 
        backgroundColor: '#fef3c7',
        transition: 'all 0.3s ease-in-out'
      }}
    >
      <EnhancedTextarea />
    </BaseNode>
  );
};
