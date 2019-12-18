import React from 'react';
import './chart-stage.scss';
import BWChart from './bw-chart';

function ChartStage ({ index, props, removeChart, specs }) {

    const chartURL = 'http://0.0.0.0:5000/' + 
        '?device_id=' + specs.device_id + 
        '&end_time='  + specs.end_time + 
        '&window_time='  + specs.window_time + 
        '&num_windows=' + specs.num_windows;

    return (
        <div className='chart chart-{index}'>
            <div className='chart-head'>
                <label className='large'>{specs.device_id}</label>
                <label>{specs.end_time}</label>
                <label className='small'>{specs.window_time}</label>
                <label className='small'>{specs.num_windows}</label>
                <span className='btn-close'><button onClick={() => removeChart(index)}>CLOSE</button></span>
            </div>
            <div className='chart-body'>
                <BWChart 
                    key={index}
                    chartURL={chartURL} />
            </div>
        </div>
    );
}

export default ChartStage;