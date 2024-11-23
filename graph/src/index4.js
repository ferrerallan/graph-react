import React, { useMemo } from 'react';
import { ForceGraph2D } from 'react-force-graph';

const jsonString = `
{
  "0": {
    "Adrenalina Pura": {
      "frequency": 64,
      "connections": {
        "Action": 1.0,
        "Thriller": 0.44856303655198526,
        "Drama": 0.3917223340622017,
        "Romance": 0.00044875439380346303,
        "Comedy": 0.00037676036737000797
      }
    }
  },
  "1": {
    "Filmelier": {
      "frequency": 64,
      "connections": {
        "Action": 1.0,
        "Thriller": 0.43812169312169313,
        "Drama": 0.32444188428059395,
        "Romance": 0.004457245263696877,
        "Comedy": 0.0025968595323434033
      }
    }
  },
  "2": {
    "Netflix": {
      "frequency": 64,
      "connections": {
        "Action": 1.0,
        "Thriller": 0.45251339101771737,
        "Drama": 0.34806345282241447,
        "Comedy": 0.0,
        "Romance": 0.0
      }
    }
  },
  "3": {
    "IMDb": {
      "frequency": 64,
      "connections": {
        "Filmelier": 1.0,
        "Adrenalina Pura": 1.0,
        "Netflix": 1.0
      }
    }
  }
}




`;

const data = JSON.parse(jsonString);

const GraphComponent = ({ data }) => {
  const graphData = useMemo(() => {
    const nodes = new Map();
    const links = [];

    Object.values(data).forEach(group => {
      Object.entries(group).forEach(([node, { frequency, connections }]) => {
        if (!nodes.has(node)) {
          nodes.set(node, { id: node, frequency });
        }

        Object.entries(connections).forEach(([target, value]) => {
          if (!nodes.has(target)) {
            nodes.set(target, { id: target, frequency: group[target]?.frequency || 0.1 });
          }
          links.push({ source: node, target, value });
        });
      });
    });

    return {
      nodes: Array.from(nodes.values()),
      links,
    };
  }, [data]);

  return (
    <ForceGraph2D
      graphData={graphData}
      width={window.innerWidth}
      height={window.innerHeight}
      nodeAutoColorBy="id"
      linkWidth={link => link.value * 15}
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.id;
        const fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline='middle';
        ctx.fillText(label, node.x, node.y);
      }}
    />
  );
};

const App = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <GraphComponent data={data} />
    </div>
  );
};

export default App;
