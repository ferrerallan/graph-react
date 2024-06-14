
# Graph React Example

## Description

This repository provides an example of a web application built with React and D3.js for graph visualization. The project demonstrates how to set up and use React for building the user interface and D3.js for rendering dynamic, interactive graphs. This is useful for developers looking to create data-driven visualizations in web applications.

## Requirements

- Node.js
- npm or Yarn for package management

## Mode of Use

1. Clone the repository:
   ```bash
   git clone https://github.com/ferrerallan/graph-react.git
   ```
2. Navigate to the project directory:
   ```bash
   cd graph-react
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the application:
   ```bash
   npm start
   ```

## Implementation Details

- **src/**: Contains the React application source code.
- **src/components/**: Contains the React components for the graph visualizations.
- **src/utils/**: Contains utility functions for data processing and graph rendering.
- **public/**: Contains the static assets and the HTML template.
- **package.json**: Configuration file for the Node.js project, including dependencies.

### Example of Use

Here is an example of how to create a simple bar chart component using D3.js in React:

**src/components/BarChart.js**
```javascript
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    
    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top]);

    svg.append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth());

    svg.append("g")
      .call(d3.axisLeft(y))
      .attr("transform", `translate(${margin.left},0)`);

    svg.append("g")
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0,${height - margin.bottom})`);
  }, [data]);

  return <svg ref={svgRef} width="500" height="300"></svg>;
};

export default BarChart;
```

This code defines a React component that renders a bar chart using D3.js.

## License

This project is licensed under the MIT License.

You can access the repository [here](https://github.com/ferrerallan/graph-react).
