// App.js
// Main application with n8n-style layout and collapsible sidebar
// --------------------------------------------------

import { useState, useEffect } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { useStore } from './store';

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [backendStatus, setBackendStatus] = useState('checking');
    const [nodeCount, setNodeCount] = useState(0);
    const [connectionCount, setConnectionCount] = useState(0);
    const [runStatus, setRunStatus] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    
    const { nodes, edges } = useStore();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Check backend status
    useEffect(() => {
        const checkBackendStatus = async () => {
            try {
                const response = await fetch('http://localhost:8000/health');
                if (response.ok) {
                    setBackendStatus('live');
                } else {
                    setBackendStatus('down');
                }
            } catch (error) {
                setBackendStatus('down');
            }
        };

        // Check immediately
        checkBackendStatus();

        // Check every 30 seconds
        const interval = setInterval(checkBackendStatus, 30000);

        return () => clearInterval(interval);
    }, []);

    // Update node and connection counts
    useEffect(() => {
        setNodeCount(nodes.length);
        setConnectionCount(edges.length);
    }, [nodes, edges]);

    // Handle pipeline validation and execution
    const handleRunPipeline = async () => {
        if (nodes.length === 0) {
            setRunStatus({
                type: 'error',
                message: 'No nodes to run. Please add some nodes to your pipeline.',
                title: 'Pipeline Empty'
            });
            return;
        }

        setIsRunning(true);
        setRunStatus(null);

        try {
            const pipelineData = {
                nodes: nodes.map(node => ({
                    id: node.id,
                    type: node.type,
                    data: node.data,
                    position: node.position
                })),
                edges: edges.map(edge => ({
                    id: edge.id,
                    source: edge.source,
                    target: edge.target,
                    type: edge.type
                }))
            };

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData),
            });

            const result = await response.json();

            if (response.ok) {
                setRunStatus({
                    type: 'success',
                    message: result.message || 'Pipeline executed successfully!',
                    title: 'Success',
                    details: result
                });
            } else {
                setRunStatus({
                    type: 'error',
                    message: result.detail || 'Pipeline validation failed.',
                    title: 'Validation Error'
                });
            }
        } catch (error) {
            setRunStatus({
                type: 'error',
                message: 'Failed to connect to backend. Please check your connection.',
                title: 'Connection Error'
            });
        } finally {
            setIsRunning(false);
        }

        // Auto-remove status after 5 seconds
        setTimeout(() => {
            setRunStatus(null);
        }, 5000);
    };

    const getStatusColor = () => {
        switch (backendStatus) {
            case 'live':
                return '#10b981';
            case 'down':
                return '#ef4444';
            default:
                return '#f59e0b';
        }
    };

    const getStatusText = () => {
        switch (backendStatus) {
            case 'live':
                return 'Live';
            case 'down':
                return 'Down';
            default:
                return 'Checking...';
        }
    };

    const getRunButtonStyle = () => {
        const baseStyle = {
            padding: '8px 16px',
            border: '1px solid #10b981',
            backgroundColor: '#10b981',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '500',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
        };

        if (isRunning) {
            return {
                ...baseStyle,
                backgroundColor: '#059669',
                cursor: 'not-allowed'
            };
        }

        return baseStyle;
    };

    return (
        <div style={{ 
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8fafc'
        }}>
            {/* Top Navigation Bar */}
            <div style={{
                height: '60px',
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e1e8ed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 24px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                zIndex: 100
            }}>
                {/* Left side - Pipeline path */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <div style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#64748b'
                    }}>
                        Pipeline:
                    </div>
                    <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#1e293b'
                    }}>
                        Untitled Pipeline
                    </div>
                </div>

                {/* Center - Action buttons */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <button style={{
                        padding: '8px 16px',
                        border: '1px solid #e1e8ed',
                        backgroundColor: '#ffffff',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '500',
                        color: '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out'
                    }}>
                        Undo
                    </button>
                    <button style={{
                        padding: '8px 16px',
                        border: '1px solid #e1e8ed',
                        backgroundColor: '#ffffff',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '500',
                        color: '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out'
                    }}>
                        Redo
                    </button>
                    <button style={{
                        padding: '8px 16px',
                        border: '1px solid #8b5cf6',
                        backgroundColor: '#8b5cf6',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '500',
                        color: '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out'
                    }}>
                        Deploy
                    </button>
                    <button 
                        onClick={handleRunPipeline}
                        disabled={isRunning}
                        style={getRunButtonStyle()}
                        onMouseEnter={(e) => {
                            if (!isRunning) {
                                e.target.style.backgroundColor = '#059669';
                                e.target.style.transform = 'translateY(-1px)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isRunning) {
                                e.target.style.backgroundColor = '#10b981';
                                e.target.style.transform = 'translateY(0)';
                            }
                        }}
                    >
                        {isRunning ? (
                            <>
                                <svg style={{ animation: 'spin 1s linear infinite' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                                </svg>
                                Running...
                            </>
                        ) : (
                            <>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="5,3 19,12 5,21"/>
                                </svg>
                                Run
                            </>
                        )}
                    </button>
                    <button style={{
                        padding: '8px 16px',
                        border: '1px solid #e1e8ed',
                        backgroundColor: '#ffffff',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '500',
                        color: '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out'
                    }}>
                        Export
                    </button>
                    <button style={{
                        padding: '8px 16px',
                        border: '1px solid #e1e8ed',
                        backgroundColor: '#ffffff',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '500',
                        color: '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out'
                    }}>
                        Settings
                    </button>
                </div>

                {/* Right side - Status indicators and help */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                }}>
                    {/* Backend Status */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '6px',
                        border: '1px solid #e1e8ed'
                    }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: getStatusColor(),
                            animation: backendStatus === 'checking' ? 'pulse 2s infinite' : 'none'
                        }} />
                        <span style={{
                            fontSize: '12px',
                            fontWeight: '500',
                            color: '#64748b'
                        }}>
                            {getStatusText()}
                        </span>
                    </div>

                    {/* Node Count */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 10px',
                        backgroundColor: '#f0f9ff',
                        borderRadius: '6px',
                        border: '1px solid #bae6fd'
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#0369a1' }}>
                            <circle cx="12" cy="12" r="3"/>
                            <path d="M12 1v6m0 6v6"/>
                            <path d="M1 12h6m6 0h6"/>
                        </svg>
                        <span style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#0369a1'
                        }}>
                            {nodeCount}
                        </span>
                    </div>

                    {/* Connection Count */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 10px',
                        backgroundColor: '#fef3c7',
                        borderRadius: '6px',
                        border: '1px solid #fcd34d'
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#d97706' }}>
                            <path d="M8 12h8M12 8v8"/>
                        </svg>
                        <span style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#d97706'
                        }}>
                            {connectionCount}
                        </span>
                    </div>

                    {/* Help Icon */}
                    <button style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid #e1e8ed',
                        backgroundColor: '#ffffff',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out'
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#64748b' }}>
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                            <path d="M12 17h.01"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Status Alert */}
            {runStatus && (
                <div style={{
                    position: 'fixed',
                    top: '80px',
                    right: '24px',
                    width: '400px',
                    backgroundColor: runStatus.type === 'success' ? '#f0fdf4' : '#fef2f2',
                    border: `1px solid ${runStatus.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                    animation: 'slideInUp 0.3s ease-out'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px'
                    }}>
                        <h4 style={{
                            margin: 0,
                            fontSize: '14px',
                            fontWeight: '600',
                            color: runStatus.type === 'success' ? '#059669' : '#dc2626'
                        }}>
                            {runStatus.title}
                        </h4>
                        <button
                            onClick={() => setRunStatus(null)}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '18px',
                                cursor: 'pointer',
                                color: '#64748b',
                                padding: '0',
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            ×
                        </button>
                    </div>
                    <p style={{
                        margin: 0,
                        fontSize: '13px',
                        color: '#374151',
                        lineHeight: '1.4'
                    }}>
                        {runStatus.message}
                    </p>
                </div>
            )}

            {/* Main Content Area */}
            <div style={{
                flex: 1,
                display: 'flex',
                position: 'relative'
            }}>
                {/* Left Sidebar - Pipeline Toolbar */}
                {sidebarOpen && <PipelineToolbar onToggle={toggleSidebar} />}

                {/* Main Canvas Area */}
                <div style={{
                    flex: 1,
                    position: 'relative'
                }}>
                    <PipelineUI />
                    
                    {/* Floating + Button to show sidebar */}
                    {!sidebarOpen && (
                        <button
                            onClick={toggleSidebar}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                left: '20px',
                                width: '48px',
                                height: '48px',
                                backgroundColor: '#8b5cf6',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '50%',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)',
                                zIndex: 1001,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease-in-out'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.1)';
                                e.target.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.6)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.4)';
                            }}
                        >
                            +
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
