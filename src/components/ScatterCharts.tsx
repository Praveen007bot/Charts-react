import { useRef, useState } from "react";
import {
    CartesianGrid,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { ChartType } from "./BarCharts";
import { scatterData } from "../../data";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import ReactECharts from "echarts-for-react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip as ChartJsTooltip,
    Legend as ChartJsLegend,
    type ChartData,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    ChartJsTooltip,
    ChartJsLegend
);
import { Scatter as ChartJSScatter } from "react-chartjs-2";
import ChartDisplay from "./ChartDisplay";
import {
    Sparklines,
    SparklinesLine,
} from "react-sparklines";

const scatterApexOptions: ApexOptions = {
    xaxis: {},
    yaxis: {},
};

const scatterApexSeries: ApexAxisChartSeries = [
    {
        name: "Sample A",
        data: scatterData.map((item) => [item.x, item.y]),
    },
];

const scatterEchartsOptions = {
    xAxis: {
        min: 2.5,
        max: 5
    },
    yAxis: {},
    series: [
        {
            data: scatterData.map((item) => [item.x, item.y]),
            type: "scatter",
        },
    ],
};

const chartJsScatterData: ChartData<"scatter"> = {
    datasets: [
        {
            label: "Set A",
            data: scatterData.map(({ x, y }) => ({ x, y })),
            backgroundColor: "#233798",
        },
    ],
};

function MiniChart() {
    const echartsRef = useRef<any>(null);

    return (
        <ReactECharts
            ref={echartsRef}
            option={scatterEchartsOptions}
            style={{ height: 300, width: "100%" }}
        />
    );
}

function SparkLinechart() {
    return (
        <Sparklines
            data={scatterData.map((item) => item.x)}
            style={{ width: "100%", height: "100%" }}
            limit={10}
        >
            <SparklinesLine
                style={{ strokeWidth: 3, stroke: "#336aff", fill: "none" }}
            />
        </Sparklines>
    );
}

function ScatterCharts() {
    const [selectedChart, setSelectedChart] = useState<ChartType | null>(null);
    const echartsRef = useRef<any>(null);

    const renderChart = () => {
        switch (selectedChart?.title) {
            case "Recharts":
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <ScatterChart
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}
                        >
                            <CartesianGrid />
                            <XAxis dataKey="x" />
                            <YAxis dataKey="y" />
                            <Tooltip />
                            <Scatter data={scatterData} fill="#82ca9d" />
                        </ScatterChart>
                    </ResponsiveContainer>
                );
            case "Echarts":
                return (
                    <ReactECharts
                        ref={echartsRef}
                        option={scatterEchartsOptions}
                        style={{ height: 300, width: "100%" }}
                    />
                );
            case "Chart JS":
                return (
                    <ChartJSScatter
                        key={selectedChart.title + Date.now()}
                        data={chartJsScatterData}
                    />
                );
            case "Apex Chart":
                return (
                    <ReactApexChart
                        type="scatter"
                        options={scatterApexOptions}
                        height={300}
                        series={scatterApexSeries}
                    />
                );
            default:
                return <div>Chart not implemented yet</div>;
        }
    };

    return (
        <ChartDisplay
            MiniChart={MiniChart}
            renderChart={renderChart}
            selectedChart={selectedChart}
            setSelectedChart={setSelectedChart}
            name={"Scatter Chart"}
            echartsRef={echartsRef}
            SparkLinechart={SparkLinechart}
        />
    );
}

export default ScatterCharts;
