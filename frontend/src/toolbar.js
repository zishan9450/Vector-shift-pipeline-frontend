// toolbar.js
// Left sidebar toolbar with n8n-style design and category-based node filtering
// --------------------------------------------------

import { useState } from 'react';
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = ({ onToggle }) => {
    const [activeCategory, setActiveCategory] = useState('start');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'start', label: 'Start', active: true },
        { id: 'objects', label: 'Objects' },
        { id: 'knowledge', label: 'Knowledge' },
        { id: 'ai', label: 'AI' },
        { id: 'integrations', label: 'Integrations' },
        { id: 'logic', label: 'Logic' },
        { id: 'data', label: 'Data' },
        { id: 'chat', label: 'Chat' }
    ];

    const allNodes = {
        start: [
            { type: 'customInput', label: 'Input', icon: '→', description: 'Data source node', color: '#3b82f6' },
            { type: 'customOutput', label: 'Output', icon: '←', description: 'Data destination', color: '#ef4444' }
        ],
        objects: [
            { type: 'text', label: 'Text', icon: '📝', description: 'Text processing & variables', color: '#10b981' },
            { type: 'note', label: 'Note', icon: '📋', description: 'Add notes and comments', color: '#8b5cf6' }
        ],
        knowledge: [
            { type: 'llm', label: 'LLM', icon: '🤖', description: 'Language model processing', color: '#8b5cf6' },
            { type: 'api', label: 'API', icon: '🌐', description: 'External API integration', color: '#7c3aed' }
        ],
        ai: [
            { type: 'llm', label: 'LLM', icon: '🤖', description: 'Language model processing', color: '#8b5cf6' },
            { type: 'text', label: 'Text', icon: '📝', description: 'Text processing & variables', color: '#10b981' }
        ],
        integrations: [
            { type: 'api', label: 'API', icon: '🌐', description: 'External API integration', color: '#7c3aed' },
            { type: 'customInput', label: 'Input', icon: '→', description: 'Data source node', color: '#3b82f6' },
            { type: 'customOutput', label: 'Output', icon: '←', description: 'Data destination', color: '#ef4444' }
        ],
        logic: [
            { type: 'condition', label: 'Condition', icon: '⚖️', description: 'Conditional logic', color: '#ec4899' },
            { type: 'filter', label: 'Filter', icon: '🔍', description: 'Data filtering operations', color: '#f59e0b' }
        ],
        data: [
            { type: 'filter', label: 'Filter', icon: '🔍', description: 'Data filtering operations', color: '#f59e0b' },
            { type: 'transform', label: 'Transform', icon: '🔄', description: 'Data transformation', color: '#06b6d4' },
            { type: 'aggregate', label: 'Aggregate', icon: '📊', description: 'Data aggregation', color: '#84cc16' }
        ],
        chat: [
            { type: 'llm', label: 'LLM', icon: '🤖', description: 'Language model processing', color: '#8b5cf6' },
            { type: 'text', label: 'Text', icon: '📝', description: 'Text processing & variables', color: '#10b981' },
            { type: 'customOutput', label: 'Output', icon: '←', description: 'Data destination', color: '#ef4444' }
        ]
    };

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        // Reset to 'all' category when searching
        if (e.target.value.trim() !== '') {
            setActiveCategory('all');
        }
    };

    const getCurrentNodes = () => {
        // If searching, search across all categories
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            const searchResults = [];
            
            Object.entries(allNodes).forEach(([categoryId, nodes]) => {
                nodes.forEach(node => {
                    if (
                        node.label.toLowerCase().includes(query) ||
                        node.description.toLowerCase().includes(query) ||
                        node.type.toLowerCase().includes(query)
                    ) {
                        searchResults.push({
                            ...node,
                            category: categories.find(cat => cat.id === categoryId)?.label || categoryId
                        });
                    }
                });
            });
            
            return searchResults;
        }
        
        // If not searching, return nodes from active category
        return allNodes[activeCategory] || [];
    };

    const clearSearch = () => {
        setSearchQuery('');
        setActiveCategory('start');
    };

    const isSearching = searchQuery.trim() !== '';

    return (
        <div style={{ 
            width: '320px',
            backgroundColor: '#ffffff',
            borderRight: '1px solid #e1e8ed',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden'
        }}>
            {/* Search Bar */}
            <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid #f1f5f9',
                flexShrink: 0
            }}>
                <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <svg style={{
                        position: 'absolute',
                        left: '12px',
                        width: '16',
                        height: '16',
                        color: '#94a3b8'
                    }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search Nodes"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{
                            width: '100%',
                            height: '36px',
                            padding: '8px 12px 8px 36px',
                            border: '1px solid #e1e8ed',
                            borderRadius: '8px',
                            fontSize: '14px',
                            backgroundColor: '#f8fafc',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                    {isSearching && (
                        <button
                            onClick={clearSearch}
                            style={{
                                position: 'absolute',
                                right: '8px',
                                width: '20px',
                                height: '20px',
                                border: 'none',
                                backgroundColor: 'transparent',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#94a3b8',
                                fontSize: '16px',
                                fontWeight: 'bold'
                            }}
                            title="Clear Search"
                        >
                            ×
                        </button>
                    )}
                </div>
            </div>

            {/* Category Tabs */}
            <div style={{
                padding: '0 20px',
                borderBottom: '1px solid #f1f5f9',
                flexShrink: 0
            }}>
                <div 
                    className="category-tabs-scroll"
                    style={{
                        display: 'flex',
                        gap: '4px',
                        overflowX: 'auto',
                        paddingBottom: '16px',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#cbd5e1 #f1f5f9'
                    }}
                >
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            style={{
                                padding: '8px 16px',
                                border: 'none',
                                backgroundColor: activeCategory === category.id ? '#8b5cf6' : 'transparent',
                                color: activeCategory === category.id ? '#ffffff' : '#64748b',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s ease-in-out',
                                flexShrink: 0
                            }}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Node Types */}
            <div style={{
                flex: 1,
                padding: '16px 20px',
                overflowY: 'auto',
                overflowX: 'hidden',
                minHeight: 0
            }}>
                {/* Search Results Header */}
                {isSearching && (
                    <div style={{
                        marginBottom: '16px',
                        padding: '12px',
                        backgroundColor: '#f0f9ff',
                        border: '1px solid #bae6fd',
                        borderRadius: '8px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '8px'
                        }}>
                            <span style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#0369a1'
                            }}>
                                Search Results
                            </span>
                            <span style={{
                                fontSize: '12px',
                                color: '#0ea5e9'
                            }}>
                                {getCurrentNodes().length} nodes found
                            </span>
                        </div>
                        <div style={{
                            fontSize: '12px',
                            color: '#0ea5e9'
                        }}>
                            Searching for: "{searchQuery}"
                        </div>
                    </div>
                )}

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    width: '100%'
                }}>
                    {getCurrentNodes().map((node, index) => (
                        <div key={`${node.type}-${index}`}>
                            <DraggableNode 
                                type={node.type} 
                                label={node.label}
                                icon={node.icon}
                                description={node.description}
                                color={node.color}
                            />
                            {/* Show category for search results */}
                            {isSearching && node.category && (
                                <div style={{
                                    fontSize: '10px',
                                    color: '#94a3b8',
                                    marginTop: '4px',
                                    marginLeft: '12px',
                                    fontStyle: 'italic'
                                }}>
                                    Category: {node.category}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                
                {/* Empty state when category has no nodes */}
                {getCurrentNodes().length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px 20px',
                        color: '#94a3b8'
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: '#f1f5f9',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px auto',
                            color: '#cbd5e1'
                        }}>
                            {isSearching ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8"/>
                                    <path d="M21 21l-4.35-4.35"/>
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            )}
                        </div>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>
                            {isSearching ? 'No nodes found' : 'No nodes in this category'}
                        </p>
                        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#cbd5e1' }}>
                            {isSearching ? 'Try a different search term' : 'Try selecting a different category'}
                        </p>
                    </div>
                )}
            </div>

            {/* Close Button */}
            <div style={{
                padding: '16px 20px',
                borderTop: '1px solid #f1f5f9',
                flexShrink: 0
            }}>
                <button 
                    onClick={onToggle}
                    style={{
                        width: '100%',
                        height: '40px',
                        border: '1px solid #e1e8ed',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#64748b',
                        fontSize: '16px',
                        fontWeight: '500',
                        transition: 'all 0.2s ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#f8fafc';
                        e.target.style.borderColor = '#cbd5e1';
                        e.target.style.color = '#374151';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#ffffff';
                        e.target.style.borderColor = '#e1e8ed';
                        e.target.style.color = '#64748b';
                    }}
                >
                    ✕
                </button>
            </div>
        </div>
    );
};
