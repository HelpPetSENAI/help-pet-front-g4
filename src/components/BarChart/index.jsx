import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { StyledCanvasWrapper } from './style';

const todaysDate = new Date()

const currentDay = todaysDate.toLocaleString('pt-br', { weekday: 'short' })

const yesterdayDate1 = new Date(todaysDate);
yesterdayDate1.setDate(todaysDate.getDate() - 1);

const yesterdayDate2 = new Date(todaysDate);
yesterdayDate2.setDate(todaysDate.getDate() - 2);

const yesterdayDate3 = new Date(todaysDate);
yesterdayDate3.setDate(todaysDate.getDate() - 3);

const yesterdayDate4 = new Date(todaysDate);
yesterdayDate4.setDate(todaysDate.getDate() - 4);

const yesterdayDate5 = new Date(todaysDate);
yesterdayDate5.setDate(todaysDate.getDate() - 5);

const yesterdayDate6 = new Date(todaysDate);
yesterdayDate6.setDate(todaysDate.getDate() - 6);


const labels = [
  yesterdayDate6.toLocaleDateString('pt-br', { weekday: 'short' }),
  yesterdayDate5.toLocaleDateString('pt-br', { weekday: 'short' }),
  yesterdayDate4.toLocaleDateString('pt-br', { weekday: 'short' }),
  yesterdayDate3.toLocaleDateString('pt-br', { weekday: 'short' }),
  yesterdayDate2.toLocaleDateString('pt-br', { weekday: 'short' }),
  yesterdayDate1.toLocaleDateString('pt-br', { weekday: 'short' }),
  currentDay];

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Quantidade de Requisições',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: ['#81DA87']
    },
    {
      label: 'Quantidade de Respostas',
      data: [44, 33, 98, 45, 99, 65, 32],
      backgroundColor: ['#2FA237'],
    }
  ]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true,
    maintainAspectRatio: false
  },
};

// Não sei muito bem como essa parte funciona (códiguin de ia)
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

  // Consumo da api
  // try {
  //   // Não sei o resto da url ainda
  //   const response = await fetch("http://localhost:8080/")

  //   const requisitionAmountPerDay = new Array(response.data.req)
  //   const responseAmountPerDay = new Array(response.data)
  // } catch {
  //   alert("Erro em obter informações para o dashboard")
  // }

  return (
    <StyledCanvasWrapper>
      <canvas ref={canvasRef}></canvas>
    </StyledCanvasWrapper>
  );
}