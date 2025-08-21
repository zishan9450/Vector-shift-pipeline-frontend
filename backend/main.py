from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import json

app = FastAPI(title="VectorShift Pipeline API", version="1.0.0")

# Add CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineNode(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class PipelineEdge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class PipelineData(BaseModel):
    nodes: List[PipelineNode]
    edges: List[PipelineEdge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool
    validation_errors: List[str] = []
    message: str = ""

@app.get('/')
def root():
    return {"Ping": "Pong", "message": "VectorShift Pipeline API is running"}

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline_data: PipelineData):
    """
    Parse and validate a pipeline, checking if it forms a valid DAG
    """
    try:
        # Count nodes and edges
        num_nodes = len(pipeline_data.nodes)
        num_edges = len(pipeline_data.edges)
        
        # Validate pipeline structure
        validation_errors = validate_pipeline_structure(pipeline_data.nodes, pipeline_data.edges)
        
        # Check if pipeline is a DAG
        is_dag = False
        if not validation_errors:
            is_dag = is_directed_acyclic_graph(pipeline_data.nodes, pipeline_data.edges)
        
        # Prepare response
        response = PipelineResponse(
            num_nodes=num_nodes,
            num_edges=num_edges,
            is_dag=is_dag,
            validation_errors=validation_errors,
            message=get_pipeline_message(num_nodes, num_edges, is_dag, validation_errors)
        )
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing pipeline: {str(e)}")

def validate_pipeline_structure(nodes: List[PipelineNode], edges: List[PipelineEdge]) -> List[str]:
    """
    Validate basic pipeline structure
    """
    errors = []
    
    if not nodes:
        errors.append("Pipeline must contain at least one node")
        return errors
    
    # Check for duplicate node IDs
    node_ids = [node.id for node in nodes]
    if len(node_ids) != len(set(node_ids)):
        errors.append("Duplicate node IDs found")
    
    # Check for duplicate edge IDs
    edge_ids = [edge.id for edge in edges]
    if len(edge_ids) != len(set(edge_ids)):
        errors.append("Duplicate edge IDs found")
    
    # Check if edges reference existing nodes
    existing_node_ids = set(node_ids)
    for edge in edges:
        if edge.source not in existing_node_ids:
            errors.append(f"Edge {edge.id} references non-existent source node: {edge.source}")
        if edge.target not in existing_node_ids:
            errors.append(f"Edge {edge.id} references non-existent target node: {edge.target}")
        if edge.source == edge.target:
            errors.append(f"Edge {edge.id} creates a self-loop (node connecting to itself)")
    
    return errors

def is_directed_acyclic_graph(nodes: List[PipelineNode], edges: List[PipelineEdge]) -> bool:
    """
    Check if the pipeline forms a directed acyclic graph (DAG)
    Uses topological sort algorithm
    """
    if not nodes:
        return True  # No nodes means no cycles
    
    # Build adjacency list and calculate in-degrees
    graph = {}
    in_degree = {}
    
    # Initialize
    for node in nodes:
        graph[node.id] = []
        in_degree[node.id] = 0
    
    # Build graph and calculate in-degrees
    for edge in edges:
        graph[edge.source].append(edge.target)
        in_degree[edge.target] += 1
    
    # Find nodes with no incoming edges (sources)
    queue = [node_id for node_id, degree in in_degree.items() if degree == 0]
    visited = 0
    
    # Topological sort using Kahn's algorithm
    while queue:
        current = queue.pop(0)
        visited += 1
        
        # Reduce in-degree for all neighbors
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we visited all nodes, it's a DAG
    return visited == len(nodes)

def get_pipeline_message(num_nodes: int, num_edges: int, is_dag: bool, errors: List[str]) -> str:
    """
    Generate a user-friendly message about the pipeline
    """
    if errors:
        return f"Pipeline validation failed: {'; '.join(errors)}"
    
    if num_nodes == 0:
        return "Empty pipeline (no nodes)"
    
    if num_nodes == 1:
        return "Single node pipeline created. Add more nodes and connect them to build a workflow."
    
    if num_edges == 0:
        return f"Pipeline has {num_nodes} node(s) but no connections"
    
    if is_dag:
        return f"Valid pipeline with {num_nodes} node(s) and {num_edges} connection(s). Pipeline forms a valid DAG (no cycles)."
    else:
        return f"Pipeline has {num_nodes} node(s) and {num_edges} connection(s), but contains cycles. DAG validation failed."

@app.get('/health')
def health_check():
    """
    Health check endpoint
    """
    return {
        "status": "healthy",
        "service": "VectorShift Pipeline API",
        "version": "1.0.0"
    }
