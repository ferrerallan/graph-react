import React, { useEffect, useState } from 'react';
import Graph from 'react-graph-vis';

function App2() {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });

  useEffect(() => {
    // Carregar o JSON (pode ser de um arquivo ou de uma API)
    fetch('entidades_por_cluster.json')
      .then(response => response.json())
      .then(data => {
        const nodes = [];
        const edges = [];

        // Converter os dados para o formato esperado pela biblioteca de grafos
        Object.entries(data).forEach(([cluster, entidades]) => {
          Object.entries(entidades).forEach(([entidade, frequencia]) => {
            nodes.push({ id: entidade, label: `Entidade ${entidade}`, value: frequencia });
          });

          Object.entries(entidades).forEach(([entidade1, _]) => {
            Object.entries(entidades).forEach(([entidade2, __]) => {
              if (entidade1 !== entidade2) {
                edges.push({ from: entidade1, to: entidade2 });
              }
            });
          });
        });

        setGraph({ nodes, edges });
      });
  }, []);

  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000"
    },
    height: "500px"
  };

  return (
    <Graph
      graph={graph}
      options={options}
    />
  );
}

export default App2;
