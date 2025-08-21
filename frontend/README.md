# VectorShift Pipeline Builder Frontend

This is the frontend application for the VectorShift Frontend Technical Assessment. It provides a visual pipeline builder with drag-and-drop functionality, node abstraction, and backend integration.

## Features

### 🎯 **Core Functionality**
- **Visual Pipeline Builder**: Drag-and-drop interface for creating workflows
- **Node Abstraction**: Reusable components for rapid node development
- **Real-time Validation**: Backend integration for pipeline analysis
- **DAG Detection**: Automatic cycle detection and validation

### 🎨 **Node Types**
- **Input Node**: Data input with configurable types
- **Output Node**: Data output with configurable types
- **LLM Node**: Language model integration with model selection
- **Text Node**: Enhanced text processing with variable detection
- **Filter Node**: Data filtering with operators
- **Transform Node**: Data transformation with expressions
- **Aggregate Node**: Data aggregation and grouping
- **Condition Node**: Conditional logic with true/false outputs
- **API Node**: External API integration

### ✨ **Advanced Features**
- **Dynamic Sizing**: Text nodes automatically resize based on content
- **Variable Detection**: `{{variable}}` syntax with automatic handle generation
- **Smart Validation**: Real-time pipeline structure validation
- **Professional UI**: Modern, responsive design with smooth animations

## Setup

### Prerequisites

- Node.js 16 or higher
- npm or yarn package manager
- Backend server running (see backend README)

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`

## Backend Integration

### Starting the Backend

1. In a separate terminal, navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the backend server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

The backend will be available at `http://localhost:8000`

### Integration Features

- **Real-time Validation**: Submit pipelines for backend analysis
- **DAG Checking**: Automatic cycle detection
- **Error Reporting**: Detailed validation error messages
- **Live Statistics**: Node and connection counts

## Usage

### Building Pipelines

1. **Add Nodes**: Drag nodes from the toolbar to the canvas
2. **Connect Nodes**: Click and drag from output handles to input handles
3. **Configure Nodes**: Click on nodes to edit their properties
4. **Validate Pipeline**: Click "Validate Pipeline" to check for issues

### Text Node Variables

The enhanced Text node supports variable syntax:

```text
Hello {{name}}, welcome to {{company}}!
Your order #{{orderId}} has been {{status}}.
```

- **Automatic Detection**: Variables are detected in real-time
- **Input Handles**: Left-side handles are automatically generated
- **Validation**: JavaScript naming conventions are enforced
- **Dynamic Sizing**: Node resizes based on content length

### Pipeline Validation

1. **Submit Pipeline**: Click the validate button
2. **Backend Processing**: Pipeline is sent to backend for analysis
3. **Results Display**: Validation results shown in custom alerts
4. **Error Handling**: Detailed error messages for invalid pipelines

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Base node components
│   │   ├── BaseNode.js     # Core node wrapper
│   │   ├── NodeInput.js    # Reusable input component
│   │   ├── NodeSelect.js   # Reusable select component
│   │   └── TextNodeDemo.js # Text node showcase
│   ├── nodes/              # Node implementations
│   │   ├── inputNode.js    # Input node
│   │   ├── outputNode.js   # Output node
│   │   ├── llmNode.js      # LLM node
│   │   ├── textNode.js     # Enhanced text node
│   │   ├── filterNode.js   # Filter node
│   │   ├── transformNode.js # Transform node
│   │   ├── aggregateNode.js # Aggregate node
│   │   ├── conditionNode.js # Condition node
│   │   └── apiNode.js      # API node
│   ├── App.js              # Main application component
│   ├── store.js            # Zustand state management
│   ├── ui.js               # Pipeline canvas
│   ├── toolbar.js          # Node toolbar
│   ├── submit.js           # Pipeline submission
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Key Components

### BaseNode
The core abstraction that provides:
- Consistent styling and layout
- Automatic handle positioning
- Common functionality for all nodes

### NodeInput & NodeSelect
Reusable form components with:
- Consistent styling
- Focus states and animations
- Validation support

### Enhanced Text Node
Advanced text processing with:
- Dynamic sizing
- Variable detection
- Automatic handle generation
- Real-time feedback

## State Management

The application uses **Zustand** for state management:

- **Nodes**: Pipeline node data and positions
- **Edges**: Connection information between nodes
- **Validation**: Backend response and error states
- **UI State**: Loading states and user interactions

## Styling

### Design System
- **Color Palette**: Consistent blues, greens, and grays
- **Typography**: Inter font family with proper hierarchy
- **Spacing**: 8px grid system for consistent layout
- **Animations**: Smooth transitions and hover effects

### CSS Features
- **Custom Scrollbars**: Styled scrollbars for better UX
- **Hover Effects**: Interactive feedback throughout
- **Loading Animations**: CSS keyframes for spinners
- **Responsive Design**: Mobile-friendly layouts

## Testing

### Manual Testing
1. **Node Creation**: Test all node types
2. **Connections**: Verify handle connections work
3. **Validation**: Test pipeline submission
4. **Error Handling**: Test invalid pipeline scenarios

### Browser Testing
- **Chrome**: Primary development browser
- **Firefox**: Cross-browser compatibility
- **Safari**: macOS compatibility
- **Edge**: Windows compatibility

## Performance

- **Small Pipelines** (< 50 nodes): Instant rendering
- **Medium Pipelines** (50-200 nodes): Smooth interactions
- **Large Pipelines** (> 200 nodes): May require optimization

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **ES6 Features**: Arrow functions, destructuring, async/await
- **CSS Grid**: Modern layout features
- **React 18**: Latest React features and hooks

## Troubleshooting

### Common Issues

1. **Backend Connection Failed**
   - Ensure backend is running on port 8000
   - Check CORS configuration
   - Verify network connectivity

2. **Node Not Dragging**
   - Check browser console for errors
   - Verify ReactFlow is properly initialized
   - Check for CSS conflicts

3. **Validation Errors**
   - Review pipeline structure
   - Check for duplicate IDs
   - Verify all connections are valid

4. **Styling Issues**
   - Clear browser cache
   - Check CSS file loading
   - Verify component imports

### Debug Mode

Enable debug logging in the browser console:
```javascript
localStorage.setItem('debug', 'true');
```

## Development

### Adding New Nodes

1. **Create Node Component**: Use BaseNode abstraction
2. **Add to Toolbar**: Update toolbar.js with new node type
3. **Register in UI**: Add to nodeTypes in ui.js
4. **Test Functionality**: Verify drag, drop, and configuration

### Customizing Styles

1. **Component Styles**: Modify individual component styles
2. **Global CSS**: Update index.css for global changes
3. **Theme Variables**: Use consistent color and spacing values

## Future Enhancements

Potential improvements for production:
- **User Authentication**: Login and user management
- **Pipeline Persistence**: Save and load pipelines
- **Collaboration**: Real-time collaborative editing
- **Export/Import**: Pipeline format conversion
- **Advanced Validation**: Custom validation rules
- **Performance Monitoring**: Pipeline execution metrics

## Contributing

1. **Fork the Repository**: Create your own fork
2. **Create Feature Branch**: Work on new features
3. **Follow Standards**: Use consistent code style
4. **Test Thoroughly**: Ensure all features work
5. **Submit Pull Request**: Share your improvements

## License

This project is part of the VectorShift Frontend Technical Assessment.

## Support

For questions or issues:
- Check the troubleshooting section
- Review browser console for errors
- Ensure backend is running properly
- Verify all dependencies are installed
