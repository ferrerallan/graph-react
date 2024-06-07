import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Graph from './Graph';
import reportWebVitals from './reportWebVitals';

// Função para obter um tamanho aleatório entre 10 e 30
function getRandomSize() {
  return Math.floor(Math.random() * (30 - 10 + 1)) + 10;
}

// Função para obter uma cor aleatória em formato hexadecimal
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    // Escolher um dígito mais baixo para gerar cores mais escuras
    color += letters[Math.floor(Math.random() * 100)]; // 0 a 9 em vez de 0 a 15
  }
  return color;
}


// Função para obter um estilo de borda aleatório (sólida ou pontilhada)
function getRandomBorderStyle() {
  return 'dotted';
}

// Função para carregar dados do JSON
function loadData() {
  return fetch('entidades_por_cluster.json')
    .then(response => response.json())
    .then(data => transformData(data));
}

// Função para transformar os dados JSON
// Função para transformar os dados JSON
function transformData(data) {
  const nodes = [];
  const links = [];

  Object.entries(data).forEach(([cluster, entidades]) => {
    let maxFrequencia = 0;
    let nodoMaxFrequencia = null;

    // Encontrar o nó de maior frequência no cluster
    Object.entries(entidades).forEach(([entidade, frequencia]) => {
      if (frequencia > maxFrequencia) {
        maxFrequencia = frequencia;
        nodoMaxFrequencia = entidade;
      }

      nodes.push({
        id: entidade,
        group: 'cluster' + cluster,
        size: frequencia,
        backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
        borderStyle: getRandomBorderStyle()
      });
    });

    // Criar links apenas com o nó de maior frequência
    if (nodoMaxFrequencia) {
      Object.keys(entidades).forEach(entidade => {
        if (entidade !== nodoMaxFrequencia) {
          links.push({ source: nodoMaxFrequencia, target: entidade });
        }
      });
    }
  });

  return { nodes, links };
}


function App() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    loadData().then(data => {
      setGraphData(data);
    });
  }, []);

  const graphOptions = {
    // Exemplo: ajustar a força de repulsão entre os nós
    repulsion: {
      centralGravity: 0,
      springLength: 20,
      springConstant: 1,
      nodeDistance: 1,
      damping: 1
    }
  };

  return (
    <Graph nodes={graphData.nodes} links={graphData.links} options={graphOptions}/>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
