import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Chart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length) {
      const margin = { top: 20, right: 20, bottom: 30, left: 50 };
      const width = chartRef.current.clientWidth - margin.left - margin.right;
      const height = chartRef.current.clientHeight - margin.top - margin.bottom;

      const svg = d3
        .select(chartRef.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // Procesar los datos
      const parseDate = d3.timeParse('%Y-%m-%d'); // Formato de fecha
      data.forEach((d) => {
        d.date = parseDate(d.date);
      });

      // Escalas y ejes
      const xScale = d3.scaleTime().range([0, width]);
      const yScale = d3.scaleLinear().range([height, 0]);
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      // Dominios de las escalas
      xScale.domain(d3.extent(data, (d) => d.date));
      yScale.domain([0, d3.max(data, (d) => d.value)]);

      // Dibujar barras
      svg
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => xScale(d.date))
        .attr('y', (d) => yScale(d.value))
        .attr('width', 10)
        .attr('height', (d) => height - yScale(d.value));

      // Agregar ejes
      svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);
      svg.append('g').call(yAxis);
    }
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default Chart;