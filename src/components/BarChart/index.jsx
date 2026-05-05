import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// 1. The Labels (Replaced Utils.months with standard array)
const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
// 2. The Data Object
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

// 3. The Config Object (This is what React was missing!)
const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    // Make sure it resizes nicely inside your Dashboard layout
    responsive: true,
    maintainAspectRatio: false 
  },
};

export default function BarChart() {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Clean up previous chart instance to prevent errors
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Initialize the chart
    const ctx = canvasRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, config);

    // Clean up when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); 

  return (
    // Set explicit height/width constraints so it doesn't break your grid layout
    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}