# 🧪 VectorShift Frontend Technical Assessment - Testing Guide

This document provides a comprehensive step-by-step testing procedure to verify that all parts of the assessment are working correctly.

## 📋 Prerequisites

Before starting the tests, ensure:
- ✅ Backend server is running on `http://localhost:8000`
- ✅ Frontend application is running on `http://localhost:3000`
- ✅ Browser console is open (F12 → Console tab)
- ✅ No JavaScript errors in console

---

## 🎯 Part 1: Node Abstraction Testing

### Test 1.1: Verify All Node Types Are Available
**Objective**: Ensure all 9 node types are present in the toolbar

**Steps**:
1. Look at the "Pipeline Nodes" section in the toolbar
2. Verify these 9 nodes are visible:
   - 🔵 **Input** (blue)
   - 🟣 **LLM** (purple)
   - 🟢 **Text** (green)
   - 🟠 **Filter** (orange)
   - 🔵 **Transform** (blue)
   - 🟢 **Aggregate** (green)
   - 🩷 **Condition** (pink)
   - 🟣 **API** (purple)
   - 🔴 **Output** (red)

**Expected Result**: All 9 node types should be visible with correct colors and labels

---

### Test 1.2: Verify Node Abstraction Components
**Objective**: Ensure all nodes use the BaseNode abstraction

**Steps**:
1. Open browser console (F12)
2. Drag any node to the canvas
3. Check console for any errors
4. Verify the node appears on the canvas

**Expected Result**: 
- No console errors
- Node appears on canvas
- Node has consistent styling (BaseNode abstraction working)

---

### Test 1.3: Test Node Dragging and Dropping
**Objective**: Verify drag and drop functionality works for all node types

**Steps**:
1. Drag an **Input** node to the canvas
2. Drag an **LLM** node to the canvas
3. Drag a **Text** node to the canvas
4. Drag a **Filter** node to the canvas
5. Drag a **Transform** node to the canvas
6. Drag an **Aggregate** node to the canvas
7. Drag a **Condition** node to the canvas
8. Drag an **API** node to the canvas
9. Drag an **Output** node to the canvas

**Expected Result**: 
- All nodes can be dragged and dropped
- Console shows: "Drag started for node type: [type]"
- Console shows: "Drop event triggered"
- Console shows: "Node added to store"
- Each node appears on canvas with correct styling

---

## 🎨 Part 2: Styling Testing

### Test 2.1: Verify Unified Design System
**Objective**: Ensure all components have consistent, appealing styling

**Steps**:
1. Observe the overall application appearance
2. Check header styling (logo, title, tagline)
3. Check toolbar styling (node buttons, layout)
4. Check canvas styling (background, borders, shadows)
5. Check node styling (colors, borders, shadows)

**Expected Result**:
- Professional, modern appearance
- Consistent color scheme
- Proper shadows and borders
- Responsive layout
- Hover effects on interactive elements

---

### Test 2.2: Test Interactive Elements
**Objective**: Verify hover effects and animations work

**Steps**:
1. Hover over toolbar nodes
2. Hover over canvas nodes (if any exist)
3. Check for smooth transitions and animations

**Expected Result**:
- Hover effects on toolbar nodes (lift effect, border highlight)
- Smooth transitions (0.2s ease-in-out)
- Box shadows change on hover
- Cursor changes to grab/grabbing during drag

---

### Test 2.3: Verify Responsive Design
**Objective**: Ensure the UI works on different screen sizes

**Steps**:
1. Resize browser window to different sizes
2. Check if layout adapts properly
3. Verify grid layout in toolbar adjusts

**Expected Result**:
- Layout adapts to different screen sizes
- Grid layout adjusts number of columns
- No horizontal scrolling issues
- Maintains readability at all sizes

---

## 🔤 Part 3: Enhanced Text Node Testing

### Test 3.1: Test Dynamic Sizing
**Objective**: Verify Text node automatically resizes based on content

**Steps**:
1. Drag a **Text** node to the canvas
2. Click on the Text node to edit
3. Type a short text: "Hello"
4. Type a longer text: "This is a very long text that should make the node resize automatically"
5. Type a multi-line text with line breaks

**Expected Result**:
- Node starts with default size
- Node automatically grows as you type more text
- Node shrinks when you delete text
- Smooth resize transitions
- No text overflow or clipping

---

### Test 3.2: Test Variable Detection
**Objective**: Verify `{{variable}}` syntax detection and validation

**Steps**:
1. In the Text node, type: "Hello {{name}}, welcome to {{company}}!"
2. Type: "User {{username}} has {{count}} messages"
3. Type: "{{123invalid}} {{invalid-name}} {{}}"
4. Type: "{{validVariable}} {{_alsoValid}} {{$validToo}}"

**Expected Result**:
- Valid variables (name, company, username, count, validVariable, _alsoValid, $validToo) are detected
- Invalid variables (123invalid, invalid-name, empty) are ignored
- Helper text shows detected variables
- Variables are highlighted or indicated

---

### Test 3.3: Test Input Handle Generation
**Objective**: Verify input handles are created for detected variables

**Steps**:
1. Type valid variables in Text node: "Hello {{name}}, your order #{{orderId}} is {{status}}"
2. Look for input handles on the left side of the node
3. Verify handle positions are distributed evenly

**Expected Result**:
- Left-side input handles appear for each valid variable
- Handles are positioned evenly along the left edge
- Handle IDs follow pattern: `{nodeId}-{variableName}`
- Handles are properly styled and visible

---

### Test 3.4: Test Variable Validation
**Objective**: Verify JavaScript variable naming convention validation

**Steps**:
1. Test valid variable names:
   - `{{name}}` ✅
   - `{{userName}}` ✅
   - `{{_private}}` ✅
   - `{{$global}}` ✅
   - `{{user123}}` ✅

2. Test invalid variable names:
   - `{{123invalid}}` ❌
   - `{{invalid-name}}` ❌
   - `{{}}` ❌
   - `{{user name}}` ❌

**Expected Result**:
- Valid variables create input handles
- Invalid variables are ignored
- No input handles for invalid variables
- Console shows validation results

---

## 🔗 Part 4: Backend Integration Testing

### Test 4.1: Test Backend Connection
**Objective**: Verify frontend can communicate with backend

**Steps**:
1. Check if backend is running (`http://localhost:8000`)
2. Look for "Backend: Ready" status in the UI
3. Check browser console for any connection errors

**Expected Result**:
- Backend status shows "Ready" (green dot)
- No connection errors in console
- Backend responds to health check

---

### Test 4.2: Test Pipeline Validation
**Objective**: Verify pipeline validation works with backend

**Steps**:
1. Create a simple pipeline:
   - Drag **Input** node to canvas
   - Drag **Text** node to canvas
   - Connect Input to Text (drag from Input output to Text input)
   - Drag **Output** node to canvas
   - Connect Text to Output

2. Click "Validate Pipeline" button

**Expected Result**:
- Button shows "Validating Pipeline..." during request
- Custom alert appears with results
- Shows: "3 nodes, 2 connections, DAG Valid: Yes"
- No JavaScript errors

---

### Test 4.3: Test Empty Pipeline Validation
**Objective**: Verify validation handles edge cases

**Steps**:
1. Clear all nodes from canvas
2. Click "Validate Pipeline" button

**Expected Result**:
- Alert shows: "0 nodes, 0 connections"
- Appropriate message for empty pipeline
- No errors

---

### Test 4.4: Test Invalid Pipeline Validation
**Objective**: Verify validation detects invalid configurations

**Steps**:
1. Create a cycle (invalid DAG):
   - Drag 3 nodes to canvas
   - Connect them in a circle (A→B→C→A)
   - Click "Validate Pipeline"

**Expected Result**:
- Alert shows: "DAG Valid: No"
- Message indicates cycle detection
- No errors

---

### Test 4.5: Test Backend Error Handling
**Objective**: Verify graceful handling of backend failures

**Steps**:
1. Stop the backend server
2. Try to validate a pipeline
3. Check error message

**Expected Result**:
- Clear error message about backend connection
- No application crashes
- Helpful user guidance

---

## 🔄 Integration Testing

### Test 5.1: End-to-End Workflow
**Objective**: Test complete pipeline creation and validation workflow

**Steps**:
1. **Create Pipeline**:
   - Drag Input node to canvas
   - Drag Text node to canvas
   - Drag LLM node to canvas
   - Drag Output node to canvas

2. **Configure Nodes**:
   - Set Input node name to "user_data"
   - Type "Hello {{name}}, your query is: {{query}}" in Text node
   - Set LLM model to "GPT-4"
   - Set Output type to "JSON"

3. **Connect Nodes**:
   - Connect Input output to Text input
   - Connect Text output to LLM input
   - Connect LLM output to Output input

4. **Validate Pipeline**:
   - Click "Validate Pipeline" button
   - Check results

**Expected Result**:
- All nodes are properly configured
- All connections are established
- Validation shows: "4 nodes, 3 connections, DAG Valid: Yes"
- Complete workflow functions correctly

---

### Test 5.2: Performance Testing
**Objective**: Verify application performance with larger pipelines

**Steps**:
1. Create a pipeline with 10+ nodes
2. Test dragging and dropping performance
3. Test connection performance
4. Test validation performance

**Expected Result**:
- Smooth dragging and dropping
- Fast connection creation
- Quick validation response
- No lag or freezing

---

## 🐛 Error Testing

### Test 6.1: Invalid Operations
**Objective**: Verify application handles invalid operations gracefully

**Steps**:
1. Try to connect a node to itself
2. Try to connect non-existent handles
3. Try to drag nodes outside canvas
4. Try to validate with malformed data

**Expected Result**:
- Clear error messages
- No application crashes
- Graceful fallbacks
- User guidance

---

### Test 6.2: Network Issues
**Objective**: Verify handling of network/backend issues

**Steps**:
1. Disconnect internet
2. Stop backend server
3. Try various operations
4. Check error handling

**Expected Result**:
- Clear error messages
- Graceful degradation
- No infinite loading states
- Helpful user guidance

---

## 📊 Success Criteria Checklist

### Part 1: Node Abstraction ✅
- [ ] All 9 node types are available
- [ ] All nodes use BaseNode abstraction
- [ ] Drag and drop works for all node types
- [ ] No code duplication between nodes

### Part 2: Styling ✅
- [ ] Unified, appealing design system
- [ ] Consistent colors and styling
- [ ] Smooth animations and transitions
- [ ] Responsive design works
- [ ] Professional appearance

### Part 3: Enhanced Text Node ✅
- [ ] Dynamic sizing based on content
- [ ] Variable detection with `{{variable}}` syntax
- [ ] Input handle generation for variables
- [ ] JavaScript variable validation
- [ ] Smooth resize transitions

### Part 4: Backend Integration ✅
- [ ] Frontend connects to backend
- [ ] Pipeline validation works
- [ ] DAG detection works
- [ ] Error handling works
- [ ] User-friendly alerts

### Overall Integration ✅
- [ ] Complete workflow functions
- [ ] Performance is acceptable
- [ ] Error handling is robust
- [ ] User experience is smooth

---

## 🚨 Troubleshooting

### Common Issues and Solutions

**Issue**: Nodes not appearing on canvas
**Solution**: Check console for errors, verify drag and drop events

**Issue**: Backend connection fails
**Solution**: Ensure backend is running on port 8000, check CORS settings

**Issue**: Text node not resizing
**Solution**: Check CSS transitions, verify textarea refs

**Issue**: Validation not working
**Solution**: Check backend logs, verify API endpoint

**Issue**: Styling looks broken
**Solution**: Check CSS imports, verify component styling

---

## 🎉 Completion Criteria

The assessment is **COMPLETE** when:
1. ✅ All 4 parts are functional
2. ✅ All tests pass
3. ✅ No critical errors
4. ✅ User experience is smooth
5. ✅ Backend integration works
6. ✅ Code is clean and maintainable

---

## 📝 Notes

- Keep browser console open during testing
- Document any issues found
- Test edge cases and error scenarios
- Verify performance with larger pipelines
- Check cross-browser compatibility if needed

**Happy Testing! 🚀**
