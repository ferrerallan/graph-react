import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Graph from './Graph';


const nodes = [
  { id: 'Ator 1', group: 'ator', size: getRandomSize(), backgroundColor: getRandomColor(), borderColor: getRandomColor(), borderStyle: getRandomBorderStyle() },
  { id: 'Ator 2', group: 'ator', size: getRandomSize(), backgroundColor: getRandomColor(), borderColor: getRandomColor(), borderStyle: getRandomBorderStyle() },
  { id: 'Atriz 3', group: 'ator', size: getRandomSize(), backgroundColor: getRandomColor(), borderColor: getRandomColor(), borderStyle: getRandomBorderStyle() },
  { id: 'Filme A', group: 'filme', size: getRandomSize(), backgroundColor: getRandomColor(), borderColor: getRandomColor(), borderStyle: getRandomBorderStyle() },
  { id: 'Filme B', group: 'filme', size: getRandomSize(), backgroundColor: getRandomColor(), borderColor: getRandomColor(), borderStyle: getRandomBorderStyle() }
];

const links = [
  { source: 'Ator 1', target: 'Filme A' },
  { source: 'Ator 1', target: 'Filme A' },
  { source: 'Ator 1', target: 'Ator 2' },
  { source: 'Ator 1', target: 'Atriz 3' },
  { source: 'Ator 2', target: 'Filme B' },
  { source: 'Atriz 3', target: 'Filme A' }
];

// Função para obter um tamanho aleatório entre 10 e 30
function getRandomSize() {
  return Math.floor(Math.random() * (30 - 10 + 1)) + 10;
}

// Função para obter uma cor aleatória em formato hexadecimal
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Função para obter um estilo de borda aleatório (sólida ou pontilhada)
function getRandomBorderStyle() {
  return 'dotted';
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Graph nodes={nodes} links={links} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
