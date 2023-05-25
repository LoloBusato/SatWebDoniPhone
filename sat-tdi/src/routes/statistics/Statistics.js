import React from 'react';
import Chart from './Chart';

const Statistics = () => {
    const data = [
        { date: '2023-01-01', value: 10 },
        { date: '2023-01-02', value: 20 },
        { date: '2023-01-03', value: 15 },
        // Agrega más datos aquí...
      ];
    
      return (
        <div className=''>
          <h1>Gráfico de cantidad de filas por tiempo</h1>
          <Chart data={data} />
        </div>
  );
};

export default Statistics;
