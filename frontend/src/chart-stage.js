import React from 'react';
import './chart-stage.scss';
import BWChart from './bw-chart';


function ChartStage ({ index, props, removeChart, specs }) {  
    const chartURL = 'http://0.0.0.0:5000/' + 
        '?device_uuid=' + specs.device_uuid + 
        '&end_time='  + specs.end_time + 
        '&window_time='  + specs.window_time + 
        '&num_windows=' + specs.num_windows
    console.log(props)
    return (
        <div className='chart chart-{key}'>
            <div className='chart-head'>
                <label className='large'>{specs.device_uuid}</label>
                <label>{specs.end_time}</label>
                <label className='small'>{specs.window_time}</label>
                <label className='small'>{specs.num_windows}</label>
                <span><button onClick={() => removeChart(index)}> close x</button></span>
            </div>
            <div className='chart-body'>
                <BWChart chartURL={chartURL} />
            </div>
        </div>
    );
}

export default ChartStage;