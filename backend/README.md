# VectorShift Pipeline Backend

This is the backend API for the VectorShift Frontend Technical Assessment. It provides pipeline validation, DAG checking, and analysis capabilities.

## Features

- **Pipeline Validation**: Validates pipeline structure and connectivity
- **DAG Detection**: Checks if pipeline forms a valid Directed Acyclic Graph
- **Node/Edge Counting**: Provides detailed pipeline statistics
- **Error Reporting**: Comprehensive validation error messages
- **CORS Support**: Configured for frontend integration

## Setup

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

The server will start on `http://localhost:8000`

## API Endpoints

### GET `/`
Health check and basic information
- **Response**: Basic API status
- **Example**: `{"Ping": "Pong", "message": "VectorShift Pipeline API is running"}`

### POST `/pipelines/parse`
Validate and analyze a pipeline
- **Request Body**: Pipeline data with nodes and edges
- **Response**: Validation results including DAG status

#### Request Format
```json
{
  "nodes": [
    {
      "id": "node-1",
      "type": "input",
      "position": {"x": 100, "y": 100},
      "data": {"inputName": "test"}
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "node-1",
      "target": "node-2",
      "sourceHandle": "output",
      "targetHandle": "input"
    }
  ]
}
```

#### Response Format
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true,
  "validation_errors": [],
  "message": "Valid pipeline with 2 nodes and 1 connection. Pipeline forms a valid DAG (no cycles)."
}
```

### GET `/health`
Detailed health check
- **Response**: Service health status and version information

## DAG Validation Algorithm

The backend uses a **Topological Sort** algorithm to determine if a pipeline forms a valid DAG:

1. **Build Adjacency List**: Create a graph representation of the pipeline
2. **Calculate In-Degrees**: Count incoming edges for each node
3. **Find Sources**: Identify nodes with no incoming edges
4. **Topological Sort**: Process nodes in dependency order
5. **Cycle Detection**: If all nodes can't be visited, cycles exist

## Validation Rules

### Node Validation
- Must have unique IDs
- Must have valid type and position data

### Edge Validation
- Must have unique IDs
- Must reference existing source and target nodes
- No self-loops allowed (node connecting to itself)

### Pipeline Validation
- Must contain at least one node
- All edges must reference valid nodes
- No duplicate IDs allowed

## Error Handling

The API provides comprehensive error handling:

- **400 Bad Request**: Invalid pipeline data
- **500 Internal Server Error**: Server processing errors
- **Detailed Error Messages**: Specific validation failure reasons

## Testing

### Manual Testing
1. Start the backend server
2. Use the frontend to create pipelines
3. Submit pipelines for validation
4. Check console for detailed logs

### API Testing
You can test the API directly using tools like:
- **cURL**: Command-line HTTP client
- **Postman**: API testing tool
- **Insomnia**: API client

### Example cURL Test
```bash
curl -X POST "http://localhost:8000/pipelines/parse" \
  -H "Content-Type: application/json" \
  -d '{
    "nodes": [
      {"id": "input-1", "type": "input", "position": {"x": 0, "y": 0}, "data": {}}
    ],
    "edges": []
  }'
```

## Development

### Project Structure
```
backend/
├── main.py              # Main FastAPI application
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

### Adding New Features
1. Update the Pydantic models in `main.py`
2. Add new validation functions
3. Update the response format if needed
4. Test thoroughly with various pipeline configurations

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Change the port: `uvicorn main:app --reload --port 8001`

2. **CORS Errors**
   - Ensure the frontend URL is in the allowed origins
   - Check that the backend is running on the expected port

3. **Import Errors**
   - Verify all dependencies are installed: `pip install -r requirements.txt`

4. **Validation Failures**
   - Check the pipeline data format
   - Ensure all referenced nodes exist
   - Verify no duplicate IDs

### Logs
The server provides detailed logging. Check the console output for:
- Request/response details
- Validation errors
- Processing steps
- Error stack traces

## Performance

- **Small Pipelines** (< 100 nodes): Near-instantaneous validation
- **Medium Pipelines** (100-1000 nodes): Fast validation (< 100ms)
- **Large Pipelines** (> 1000 nodes): May take longer due to DAG algorithm complexity

## Security

- **Input Validation**: All pipeline data is validated using Pydantic
- **CORS Configuration**: Restricted to localhost for development
- **Error Handling**: No sensitive information leaked in error messages

## Future Enhancements

Potential improvements for production use:
- **Authentication**: User authentication and authorization
- **Rate Limiting**: API usage limits
- **Caching**: Pipeline validation result caching
- **Metrics**: Performance and usage analytics
- **WebSocket Support**: Real-time pipeline updates
