import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Graph = ({ nodes, links }) => {
    const svgRef = useRef();

    useEffect(() => {
        const width = 2000;
        const height = 1000;

        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .call(d3.zoom().on("zoom", (event) => {
                container.attr("transform", event.transform);
            }))
            .append("g");

        const container = svg.append("g");

        // Encontrar o valor mínimo e máximo da propriedade 'size' entre os nós
        const maxSize = d3.max(nodes, d => d.size);
        const minSize = d3.min(nodes, d => d.size);

        // Definir o intervalo de tamanho desejado para os nós (por exemplo, entre 5 e 30)
        const sizeScale = d3.scaleLinear()
                            .domain([minSize, maxSize])
                            .range([5, 30]);

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-400))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collide", d3.forceCollide().radius(d => sizeScale(d.size) + 10));

        const link = container.append("g")
            .attr("stroke", "#999")
            .attr("stroke-width", 3)
            .selectAll("line")
            .data(links)
            .join("line");

        const node = container.append("g")
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", d => sizeScale(d.size))
            .attr("fill", d => getRandomDarkColor())
            .attr("opacity", 1)
            .attr("stroke", "#ddd")
            .attr("stroke-width", 3);

        const nodeText = container.append("g")
            .selectAll("text")
            .data(nodes)
            .join("text")
            .text(d => d.id)
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .style("pointer-events", "none")
            .style("fill", "black")
            .style("font-size", "10px");

        const drag = simulation => {
            function dragstarted(event, d) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }

            function dragended(event, d) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        };

        node.call(drag(simulation));

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            nodeText
                .attr("x", d => d.x)
                .attr("y", d => d.y);
        });
    }, [nodes, links]);

    return <svg ref={svgRef}></svg>;
};

// Função para obter uma cor aleatória mais escura
function getRandomDarkColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 10)]; // Gera cores mais escuras
    }
    return color;
}

export default Graph;
