import React, { Component } from 'react'
import Chart from "chart.js";
import classes from "./LineGraph.module.css";

export default class BWChart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            graph_data: {
                label: [], 
                datasets:[]}
        };
    }

    chartRef = React.createRef();

    componentWillMount() {

        const fetchData = async (fetchUrl) => {
            const response = await fetch(fetchUrl);
            const dataJson =  await response.json();
            return dataJson
        };

        const bw_backgrounds = [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ];
        const bw_colors = [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ];
        fetchData(this.props.chartURL)
        .then((response) => {
            const new_graph_data = {
                labels: response.end_time_labels,
                datasets: [
                    {
                        label: "bytes to server",
                        data: response.bytes_ts,
                    }, 
                    {
                        label: "bytes from server",
                        data: response.bytes_fs,
                    }
                ]
            }
            this.setState((state) => {
                return {
                    graph_data: new_graph_data
                };
              });
            })
            .then((state) => {
                const bwChartRef = this.chartRef.current.getContext("2d");
                new Chart(bwChartRef, {
                    type: "line",
                    data: this.state.graph_data,
                    backgroundColor: bw_backgrounds,
                    borderColor: bw_colors,
                    fillStyle: bw_backgrounds,
                    strokeStyle: bw_colors,
                    borderWidth: 1,
                    options: {
                        legend: {
                            display: true,
                            labels: {
                                fontColor: bw_colors
                            }
                        }
                    }
                });
            })
    }

    render() {
        return (
            <div className="classes.graphContainer">
                <canvas ref={this.chartRef} />
            </div>
        )
    }
}
