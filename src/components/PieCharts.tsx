
import { useRef, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip as ReChartsTooltip } from "recharts";
import { pieData } from "../../data";
import type { ChartType } from "./BarCharts";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import ReactECharts from "echarts-for-react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    type ChartData,
} from "chart.js";
import { Pie as ChartJSPie } from "react-chartjs-2";
import ChartDisplay from "./ChartDisplay";
import { PieChart as MiniPie } from 'react-minimal-pie-chart';

ChartJS.register(ArcElement, Tooltip, Legend);


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}: {
    cx: any;
    cy: any;
    midAngle: any;
    innerRadius: any;
    outerRadius: any;
    percent: any;
    index: any;
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const pieApexOptions: ApexOptions = {
    labels: pieData.map((item) => item.name),
    colors: pieData.map((item) => item.color),
};

const pieApexSeries: ApexNonAxisChartSeries = pieData.map((item) => item.value);

const pieEchartsOptions = {
    legend: {
        top: "bottom",
    },
    tooltip: {
        trigger: "item",
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
        },
    },
    series: {
        name: "Pie Chart",
        type: "pie",
        radius: [50, 250],
        roseType: "area",
        itemStyle: {
            borderRadius: 10,
        },
        data: pieData.map(({ name, value }) => ({ name, value })),
    },
};

const miniPieEchartsOptions = {
    legend: {
        orient: "vertical",
        left: "left",
    },
    tooltip: {
        trigger: "item",
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
        },
    },
    series: {
        name: "Pie Chart",
        type: "pie",
        radius: "90%",
        data: pieData.map(({ name, value }) => ({ name, value })),
    },
};

console.log(pieEchartsOptions.series.data);

const chartJsPieData: ChartData<"pie"> = {
    labels: pieData.map((item) => item.name),
    datasets: [
        {
            label: "Pie Data",
            data: pieData.map((item) => item.value),
            backgroundColor: pieData.map((item) => item.color),
            borderWidth: 1,
        },
    ],
};

console.log(chartJsPieData.datasets[0].data);

function MiniChart() {
    const echartsRef = useRef<any>(null);

    return (
        <ReactECharts
            ref={echartsRef}
            option={miniPieEchartsOptions}
            style={{ height: "100%", width: "100%" }}
            notMerge={true}
            theme="dark"
        />
    );
}

function SparkLinechart() {
    return (
        <MiniPie 
            data={pieData}

        />
        
    );
}

function PieCharts() {
    const [selectedChart, setSelectedChart] = useState<ChartType | null>(null);
    const echartsRef = useRef<any>(null);



    const renderChart = () => {
        switch (selectedChart?.title) {
            case "Recharts":
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                label={renderCustomizedLabel}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>
                        <ReChartsTooltip />
                        </PieChart>
                    </ResponsiveContainer>
                );
            case "Echarts":
                return (
                    <ReactECharts
                        ref={echartsRef}
                        option={pieEchartsOptions}
                        style={{ height: 600, width: "100%" }}
                        notMerge={true}
                    />
                );
            case "Chart JS":
                return (
                    <ChartJSPie
                        data={chartJsPieData}
                        style={{ width: "100%", height: 300 }}
                    />
                );
            case "Apex Chart":
                return (
                    <ReactApexChart
                        options={pieApexOptions}
                        series={pieApexSeries}
                        height={300}
                        type="donut"
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
            name={"Pie Chart"}
            echartsRef={echartsRef}
            SparkLinechart={SparkLinechart}
        />
    );
}

export default PieCharts;
