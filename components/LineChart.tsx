'use client'
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { pipeline } from 'stream';

function LineChart () {
    
    const chartRef = useRef(null);

    useEffect(function() {
        const pieChart = echarts.init(chartRef.current);

        var option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line'
                }
            ]
        };

        pieChart.setOption(option)


        return function () {
            pieChart.dispose();
        };

    }, [])




    return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
}

export default LineChart;
