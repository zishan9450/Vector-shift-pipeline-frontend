// submit.js
// Compact submit button for n8n-style layout

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [lastResponse, setLastResponse] = useState(null);
    const { nodes, edges } = useStore();

    const handleSubmit = async () => {
        if (nodes.length === 0) {
            showAlert('Please add at least one node to your pipeline before submitting.', 'warning');
            return;
        }

        setIsLoading(true);
        
        try {
            // Prepare pipeline data for backend
            const pipelineData = {
                nodes: nodes.map(node => ({
                    id: node.id,
                    type: node.type,
                    position: node.position,
                    data: node.data
                })),
                edges: edges.map(edge => ({
                    id: edge.id,
                    source: edge.source,
                    target: edge.target,
                    sourceHandle: edge.sourceHandle,
                    targetHandle: edge.targetHandle
                }))
            };

            // Call backend API
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setLastResponse(result);
            
            // Show success alert with results
            showValidationResults(result);
            
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            
            if (error.message.includes('fetch')) {
                showAlert('Unable to connect to backend server. Please ensure the backend is running on http://localhost:8000', 'error');
            } else {
                showAlert('Error submitting pipeline. Please try again.', 'error');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const showValidationResults = (result) => {
        const { num_nodes, num_edges, is_dag, validation_errors, message } = result;
        
        let alertType = 'success';
        let title = 'Pipeline Validation Successful!';
        let content = `
            <div style="text-align: left; margin: 10px 0;">
                <p><strong>Nodes:</strong> ${num_nodes}</p>
                <p><strong>Connections:</strong> ${num_edges}</p>
                <p><strong>DAG Valid:</strong> ${is_dag ? '✅ Yes' : '❌ No'}</p>
                <p><strong>Message:</strong> ${message}</p>
            </div>
        `;

        if (validation_errors && validation_errors.length > 0) {
            alertType = 'warning';
            title = 'Pipeline Validation Issues Found';
            content += `
                <div style="text-align: left; margin: 10px 0;">
                    <p><strong>Validation Errors:</strong></p>
                    <ul style="margin: 5px 0; padding-left: 20px;">
                        ${validation_errors.map(error => `<li>${error}</li>`).join('')}
                    </ul>
                </div>
            `;
        } else if (!is_dag) {
            alertType = 'warning';
            title = 'Pipeline Contains Cycles';
            content += `
                <div style="text-align: left; margin: 10px 0;">
                    <p style="color: #d97706;">
                        ⚠️ Your pipeline contains cycles, which means it cannot be executed as a linear workflow. 
                        Please remove the cycles to create a valid DAG.
                    </p>
                </div>
            `;
        }

        showAlert(content, alertType, title);
    };

    const showAlert = (content, type = 'info', title = 'Pipeline Status') => {
        // Create custom alert element
        const alertDiv = document.createElement('div');
        alertDiv.style.cssText = `
            position: fixed;
            top: 24px;
            right: 24px;
            width: 450px;
            max-width: 90vw;
            background: ${type === 'success' ? '#f0fdf4' : type === 'warning' ? '#fffbeb' : type === 'error' ? '#fef2f2' : '#eff6ff'};
            border: 2px solid ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : type === 'error' ? '#ef4444' : '#8b5cf6'};
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            z-index: 10000;
            font-family: inherit;
            animation: slideIn 0.3s ease-out;
        `;

        alertDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                <h4 style="margin: 0; color: ${type === 'success' ? '#065f46' : type === 'warning' ? '#92400e' : type === 'error' ? '#991b1b' : '#1e40af'}; font-size: 18px; font-weight: 700;">
                    ${title}
                </h4>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: none;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                    color: #6b7280;
                    padding: 0;
                    line-height: 1;
                    border-radius: 8px;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease-in-out;
                " onmouseover="this.style.backgroundColor='#f3f4f6'; this.style.color='#374151';" onmouseout="this.style.backgroundColor='transparent'; this.style.color='#6b7280'">&times;</button>
            </div>
            <div style="color: ${type === 'success' ? '#065f46' : type === 'warning' ? '#92400e' : type === 'error' ? '#991b1b' : '#1e40af'}; font-size: 14px; line-height: 1.6;">
                ${content}
            </div>
        `;

        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(alertDiv);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (alertDiv.parentElement) {
                alertDiv.remove();
            }
        }, 10000);
    };

    // Only show submit button when there are nodes
    if (nodes.length === 0) {
        return null;
    }

    const buttonStyle = {
        backgroundColor: isLoading ? '#9ca3af' : '#8b5cf6',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 20px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease-in-out',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        margin: '16px'
    };

    return (
        <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            zIndex: 1000
        }}>
            <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                style={buttonStyle}
                onMouseEnter={(e) => {
                    if (!isLoading) {
                        e.target.style.backgroundColor = '#7c3aed';
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.15)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isLoading) {
                        e.target.style.backgroundColor = '#8b5cf6';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 2px 4px 0 rgba(0, 0, 0, 0.1)';
                    }
                }}
            >
                {isLoading ? (
                    <>
                        <div style={{
                            width: '16px',
                            height: '16px',
                            border: '2px solid #ffffff',
                            borderTop: '2px solid transparent',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }} />
                        Validating...
                    </>
                ) : (
                    <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                        Validate Pipeline
                    </>
                )}
            </button>
        </div>
    );
};
