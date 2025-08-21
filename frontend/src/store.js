// store.js
// Enhanced store with dynamic node updates support

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
    // Enhanced function to update node dimensions dynamically
    updateNodeDimensions: (nodeId, width, height) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              style: {
                ...node.style,
                width: width,
                height: height
              }
            };
          }
          return node;
        }),
      });
    },
    // Function to update node data with validation
    updateNodeData: (nodeId, updates) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: { ...node.data, ...updates }
            };
          }
          return node;
        }),
      });
    },
    // Function to get node by ID
    getNode: (nodeId) => {
      return get().nodes.find(node => node.id === nodeId);
    },
    // Function to get connected edges for a node
    getConnectedEdges: (nodeId) => {
      return get().edges.filter(edge => 
        edge.source === nodeId || edge.target === nodeId
      );
    },
    // Function to validate pipeline connections
    validatePipeline: () => {
      const { nodes, edges } = get();
      
      if (nodes.length === 0) {
        return { isValid: false, errors: ['No nodes in pipeline'] };
      }
      
      if (edges.length === 0 && nodes.length > 1) {
        return { isValid: false, errors: ['Multiple nodes but no connections'] };
      }
      
      // Check for orphaned nodes (nodes with no connections)
      const connectedNodeIds = new Set();
      edges.forEach(edge => {
        connectedNodeIds.add(edge.source);
        connectedNodeIds.add(edge.target);
      });
      
      const orphanedNodes = nodes.filter(node => !connectedNodeIds.has(node.id));
      if (orphanedNodes.length > 0) {
        return { 
          isValid: false, 
          errors: [`Orphaned nodes: ${orphanedNodes.map(n => n.id).join(', ')}`] 
        };
      }
      
      return { isValid: true, errors: [] };
    }
  }));
