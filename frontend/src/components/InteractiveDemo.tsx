import React, { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import Chart from 'chart.js/auto';
import ReactPlayer from 'react-player';

interface DemoProps {
  demoType: 'kmeans' | 'neuralnet' | 'video';
  videoUrl?: string;
  data?: number[][];
}

const InteractiveDemo: React.FC<DemoProps> = ({ demoType, videoUrl, data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const runKMeansClustering = async () => {
    if (!canvasRef.current || !data) return;

    const points = tf.tensor2d(data);
    const numClusters = 3;
    const iterations = 10;

    // Initialize random centroids
    let centroids = tf.randomUniform([numClusters, 2]);

    for (let i = 0; i < iterations; i++) {
      // Calculate distances between points and centroids
      const expandedPoints = points.expandDims(1);
      const expandedCentroids = centroids.expandDims(0);
      const distances = expandedPoints.sub(expandedCentroids).square().sum(-1);

      // Assign points to nearest centroid
      const assignments = distances.argMin(-1);

      // Update centroids
      const newCentroids = [];
      for (let j = 0; j < numClusters; j++) {
        const mask = assignments.equal(tf.scalar(j));
        const cluster = points.mul(mask.expandDims(1));
        const sum = cluster.sum(0);
        const count = mask.sum();
        const centroid = sum.div(count);
        newCentroids.push(centroid);
      }
      centroids = tf.stack(newCentroids);

      // Visualize current state
      drawClusters(
        points.arraySync() as number[][],
        centroids.arraySync() as number[][],
        assignments.arraySync() as number[]
      );
    }
  };

  const drawClusters = (points: number[][], centroids: number[][], assignments: number[]) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw points
    points.forEach((point, i) => {
      ctx.fillStyle = ['red', 'blue', 'green'][assignments[i]];
      ctx.beginPath();
      ctx.arc(point[0] * 400, point[1] * 400, 5, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw centroids
    centroids.forEach((centroid) => {
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(centroid[0] * 400, centroid[1] * 400, 8, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const initNeuralNetChart = () => {
    if (!canvasRef.current || chartRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 10 }, (_, i) => i + 1),
        datasets: [
          {
            label: 'Training Loss',
            data: [0.5, 0.4, 0.3, 0.25, 0.2, 0.15, 0.12, 0.1, 0.08, 0.07],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
          {
            label: 'Validation Loss',
            data: [0.55, 0.45, 0.35, 0.3, 0.25, 0.22, 0.2, 0.18, 0.17, 0.16],
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Training Progress'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  useEffect(() => {
    switch (demoType) {
      case 'kmeans':
        runKMeansClustering();
        break;
      case 'neuralnet':
        initNeuralNetChart();
        break;
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [demoType, data]);

  if (demoType === 'video' && videoUrl) {
    return (
      <div className="aspect-w-16 aspect-h-9">
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          controls
          pip
          stopOnUnmount={false}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full max-w-xl mx-auto border border-gray-300 rounded-lg"
      />
    </div>
  );
};

export default InteractiveDemo;
