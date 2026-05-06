import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const todaysDate = new Date()

const dayOfTheWeek = todaysDate.toLocaleString('pt-br', {weekday: 'short' })

const tomorrowDate1 = new Date(todaysDate);
tomorrowDate1.setDate(todaysDate.getDate() + 1);

const tomorrowDate2 = new Date(todaysDate);
tomorrowDate2.setDate(todaysDate.getDate() + 2);

const tomorrowDate3 = new Date(todaysDate);
tomorrowDate3.setDate(todaysDate.getDate() + 3);

const tomorrowDate4 = new Date(todaysDate);
tomorrowDate4.setDate(todaysDate.getDate() + 4);

const tomorrowDate5 = new Date(todaysDate);
tomorrowDate5.setDate(todaysDate.getDate() + 5);

const tomorrowDate6 = new Date(todaysDate);
tomorrowDate6.setDate(todaysDate.getDate() + 6);


const labels = [dayOfTheWeek, 
  tomorrowDate1.toLocaleDateString('pt-br', {weekday: 'short' }), 
  tomorrowDate2.toLocaleDateString('pt-br', {weekday: 'short' }),
  tomorrowDate3.toLocaleDateString('pt-br', {weekday: 'short' }),
  tomorrowDate4.toLocaleDateString('pt-br', {weekday: 'short' }),
  tomorrowDate5.toLocaleDateString('pt-br', {weekday: 'short' }),
  tomorrowDate6.toLocaleDateString('pt-br', {weekday: 'short' })];
// 2. The Data Object
const data = {
  labels: labels,
  datasets: [{
    label: 'Quantidade de Requests',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      '#81DA87'
    ]
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
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}