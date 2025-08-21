// ui.js
// n8n-style pipeline UI with left sidebar and central canvas
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { FilterNode } from './nodes/filterNode';
import { TransformNode } from './nodes/transformNode';
import { AggregateNode } from './nodes/aggregateNode';
import { ConditionNode } from './nodes/conditionNode';
import { APINode } from './nodes/apiNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: (props) => <InputNode {...props} />,
  llm: (props) => <LLMNode {...props} />,
  customOutput: (props) => <OutputNode {...props} />,
  text: (props) => <TextNode {...props} />,
  filter: (props) => <FilterNode {...props} />,
  transform: (props) => <TransformNode {...props} />,
  aggregate: (props) => <AggregateNode {...props} />,
  condition: (props) => <ConditionNode {...props} />,
  api: (props) => <APINode {...props} />,
  note: (props) => <TextNode {...props} />
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
          console.log('Drop event triggered');
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          console.log('ReactFlow bounds:', reactFlowBounds);
          
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
            console.log('Dropped node type:', type);
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              console.log('Invalid node type');
              return;
            }
      
            // Calculate position relative to the container
            const position = {
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            };
            console.log('Calculated position:', position);

            const nodeID = getNodeID(type);
            console.log('Generated node ID:', nodeID);
            
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
            console.log('New node object:', newNode);
      
            addNode(newNode);
            console.log('Node added to store');
          } else {
            console.log('No reactflow data in drop event');
          }
        },
        [addNode, getNodeID]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const containerStyle = {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        position: 'relative',
        flex: 1
    };

    const emptyStateStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#64748b',
        textAlign: 'center',
        padding: '40px'
    };

    const addNodeButtonStyle = {
        padding: '16px 24px',
        backgroundColor: '#8b5cf6',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s ease-in-out',
        boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.2)'
    };

    return (
        <>
        <div 
            ref={reactFlowWrapper} 
            className="react-flow-wrapper" 
            style={containerStyle}
            onDrop={onDrop}
            onDragOver={onDragOver}
        >
            {nodes.length === 0 ? (
                <div style={emptyStateStyle}>
                    <button
                        style={addNodeButtonStyle}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#7c3aed';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 8px 15px -3px rgba(139, 92, 246, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#8b5cf6';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 6px -1px rgba(139, 92, 246, 0.2)';
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12h14"/>
                        </svg>
                         Add Your First Node
                    </button>
                </div>
            ) : (
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={(connection) => {
                      console.log('Connection attempt:', connection);
                      onConnect(connection);
                    }}
                    onInit={setReactFlowInstance}
                    nodeTypes={nodeTypes}
                    proOptions={proOptions}
                    snapGrid={[gridSize, gridSize]}
                    connectionLineType='smoothstep'
                    defaultEdgeOptions={{
                        type: 'smoothstep',
                        animated: true,
                        style: {
                            stroke: '#8b5cf6',
                            strokeWidth: 2,
                        },
                        markerEnd: {
                            type: 'arrow',
                            width: 20,
                            height: 20,
                            color: '#8b5cf6',
                        },
                    }}
                    fitView
                    fitViewOptions={{ padding: 0.1 }}
                    style={{ width: '100%', height: '100%' }}
                >
                    <Background 
                        color="#f1f5f9" 
                        gap={gridSize}
                        size={1}
                        style={{ opacity: 0.3 }}
                    />
                    <Controls 
                        style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e1e8ed',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            padding: '4px',
                            zIndex: 1000
                        }}
                        position="bottom-left"
                    />
                    <MiniMap 
                        style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e1e8ed',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            zIndex: 1000
                        }}
                        nodeColor="#8b5cf6"
                        nodeStrokeColor="#ffffff"
                        nodeStrokeWidth={2}
                        position="bottom-right"
                    />
                </ReactFlow>
            )}
        </div>
        </>
    )
}
