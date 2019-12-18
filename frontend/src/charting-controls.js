import React, { useState, useEffect } from 'react';
import ChartStage from './chart-stage'
import './charting-controls.scss';

const BTN_LABEL = 'Load Diagonostics Chart'

// Charting Controls
//==============================================================================
function ChartingControls() {
    const [charts, setCharts] = useState([]);
    const [chartSpecs, setChartSpecs] = useState({
        device_uuid: 'cf4844bc-a107-4e0a-84e1-fa04d76d388c',
        end_time: Date.now(),
        window_time: 60,
        num_windows: 10
    });

    useEffect(() => {
        console.log(chartSpecs)
    }, [chartSpecs])

    const handleChange = event => {
        const { name, value } = event.target;
        setChartSpecs({ ...chartSpecs, [name]: value })
    };

    const addChart = (e) => {
        e.preventDefault();
        const newCharts = [...charts, chartSpecs];
        setCharts(newCharts);
    };

    const removeChart = index => {
        const newCharts = [...charts];
        newCharts.splice(index, 1);
        setCharts(newCharts);
    };

    return (
        <div className='charting-controls'>
            <div className='charting-controls-widget'>
                <h2>Bandwidth Diagonostics</h2>
                <form className='charting-controls-form'>
                    <span>
                        <label htmlFor='device_uuid'>Device ID:</label>
                        <input 
                            className='charting-controls-input large'
                            type='text'
                            name='device_uuid'
                            value={chartSpecs.device_uuid}
                            onChange={handleChange}/>
                    </span>
                    <span>
                        <label htmlFor='end_time'>End Time (timestamp):</label>
                        <input 
                            className='charting-controls-input'
                            type='text'
                            name='end_time'
                            value={chartSpecs.end_time}
                            onChange={handleChange}/>
                    </span>
                    <span>
                        <label htmlFor='window_time'>Window Time (in seconds):</label>
                        <input 
                            className='charting-controls-input small'
                            type='number'
                            name='window_time'
                            value={chartSpecs.window_time}
                            onChange={handleChange}/>
                        </span>
                        <span>
                            <label fohtmlForr='num_windows'>Number of windows:</label>
                            <input 
                                className='charting-controls-input small'
                                type='number'
                                name='num_windows'
                                value={chartSpecs.num_windows}
                                onChange={handleChange}/>
                        </span>
                        <button 
                            className='charting-controls-button'
                            name={BTN_LABEL}
                            onClick={addChart}
                            >{BTN_LABEL}</button>

                </form>
                
                <div className='charts'>

                    { charts.map((chart, index) => (
                        <ChartStage
                            key={index}
                            className='chart-stage'
                            removeChart={removeChart}
                            specs={chart} />
                    ))}

                </div>
            </div>
        </div>
    );
}

export default ChartingControls;
