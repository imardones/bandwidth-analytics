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
        }

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
                options: {}
            });
        })
    }

    render() {
        return (
            <div className={classes.graphContainer}>
                <canvas ref={this.chartRef} />
            </div>
        )
    }
}
