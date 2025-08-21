// draggableNode.js
// Responsive draggable node component for sidebar
// --------------------------------------------------

export const DraggableNode = ({ type, label, icon, description, color }) => {
    const onDragStart = (event, nodeType) => {
        console.log('Drag started for node type:', nodeType);
        const appData = { nodeType }
        event.target.style.cursor = 'grabbing';
        event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
        event.dataTransfer.effectAllowed = 'move';
        console.log('Drag data set:', appData);
    };

    return (
        <div
            className={type}
            onDragStart={(event) => onDragStart(event, type)}
            onDragEnd={(event) => (event.target.style.cursor = 'grab')}
            style={{
                width: '100%',
                minHeight: '56px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: '10px 12px',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                border: '1px solid #e1e8ed',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                gap: '10px',
                cursor: 'grab',
                transition: 'all 0.2s ease-in-out',
                position: 'relative',
                boxSizing: 'border-box'
            }}
            draggable
            onMouseEnter={(e) => {
                const node = e.currentTarget;
                node.style.borderColor = color;
                node.style.boxShadow = `0 4px 12px rgba(${color === '#3b82f6' ? '59, 130, 246' : color === '#ef4444' ? '239, 68, 68' : color === '#10b981' ? '16, 185, 129' : color === '#f59e0b' ? '245, 158, 11' : color === '#8b5cf6' ? '139, 92, 246' : color === '#7c3aed' ? '124, 58, 237' : color === '#ec4899' ? '236, 72, 153' : color === '#06b6d4' ? '6, 182, 212' : color === '#84cc16' ? '132, 204, 22' : '139, 92, 246'}, 0.3)`;
            }}
            onMouseLeave={(e) => {
                const node = e.currentTarget;
                node.style.borderColor = '#e1e8ed';
                node.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
        >
            {/* Icon */}
            <div style={{
                width: '28px',
                height: '28px',
                backgroundColor: color,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '14px',
                fontWeight: '600',
                color: '#ffffff',
                border: `2px solid ${color}`
            }}>
                {icon}
            </div>

            {/* Content */}
            <div style={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '1px',
                overflow: 'hidden'
            }}>
                <div style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#1e293b',
                    lineHeight: '1.2',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {label}
                </div>
                <div style={{
                    fontSize: '11px',
                    color: '#64748b',
                    lineHeight: '1.2',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {description}
                </div>
            </div>

            {/* Drag Indicator */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                flexShrink: 0,
                opacity: 0.4,
                marginLeft: '4px'
            }}>
                <div style={{
                    width: '10px',
                    height: '2px',
                    backgroundColor: '#94a3b8',
                    borderRadius: '1px'
                }} />
                <div style={{
                    width: '10px',
                    height: '2px',
                    backgroundColor: '#94a3b8',
                    borderRadius: '1px'
                }} />
                <div style={{
                    width: '10px',
                    height: '2px',
                    backgroundColor: '#94a3b8',
                    borderRadius: '1px'
                }} />
            </div>
        </div>
    );
};
  