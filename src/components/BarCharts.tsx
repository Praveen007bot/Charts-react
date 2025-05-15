import { useRef, useState } from "react";
import {
    Bar,
    BarChart,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import ReactECharts from "echarts-for-react";
import { stackedBarData } from "../../data";
import ReactApexChart from "react-apexcharts";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip as ChartJsTooltip,
    Legend as ChartJsLegend,
    type ChartData,
} from "chart.js";
import { Bar as ChartJsBar } from "react-chartjs-2";
import ChartDisplay from "./ChartDisplay";
import { Sparklines, SparklinesBars } from "react-sparklines";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ChartJsTooltip,
    ChartJsLegend
);

export type ChartType = {
    title: string;
    description: string;
};

const echartsOptions = {
    tooltip: {},
    legend: {
        data: ["Marketing", "Sales", "Support"],
    },
    xAxis: {
        type: "category",
        data: stackedBarData.map((d) => d.month),
    },
    yAxis: {
        type: "value",
    },
    series: [
        {
            name: "Marketing",
            type: "bar",
            stack: "1",
            data: stackedBarData.map((d) => d.marketing),
        },
        {
            name: "Sales",
            type: "bar",
            stack: "1",
            data: stackedBarData.map((d) => d.sales),
        },
        {
            name: "Support",
            type: "bar",
            stack: "1",
            data: stackedBarData.map((d) => d.support),
        },
    ],
};

const apexChartOptions: ApexCharts.ApexOptions = {
    chart: {
        stacked: true,
    },
    plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: false,
        },
    },
    dataLabels: {
        enabled: false,
    },
    xaxis: {
        categories: stackedBarData.map((item) => item.month),
    },
};

const apexChartSeries = [
    {
        name: "Sales",
        data: stackedBarData.map((item) => item.sales),
    },
    {
        name: "Marketing",
        data: stackedBarData.map((item) => item.marketing),
    },
    {
        name: "Support",
        data: stackedBarData.map((item) => item.support),
    },
];

const chartJsData: ChartData<"bar"> = {
    labels: stackedBarData.map((item) => item.month),
    datasets: [
        {
            label: "Marketing",
            data: stackedBarData.map((item) => item.marketing),
            backgroundColor: "#63BDBD",
            stack: "1",
        },
        {
            label: "Sales",
            data: stackedBarData.map((item) => item.sales),
            backgroundColor: "#147878",
            stack: "1",
        },
        {
            label: "Support",
            data: stackedBarData.map((item) => item.support),
            backgroundColor: "#004D4D",
            stack: "1",
        },
    ],
};

function MiniChart() {
    const echartsRef = useRef<any>(null);

    return (
        <ReactECharts
            ref={echartsRef}
            option={echartsOptions}
            style={{ height: "100%", width: "100%" }}
            notMerge={true}
            theme="dark"
        />
    );
}

function SparkLinechart() {
    return (
        <Sparklines
            data={stackedBarData.map((item) => item.sales)}
            style={{ width: "100%", height: "100%" }}
            limit={10}
        >
            <SparklinesBars
                style={{ stroke: "white", strokeWidth: "1", fill: "#40c0f5" }}
            />
        </Sparklines>
    );
}

function BarCharts() {
    const [selectedChart, setSelectedChart] = useState<ChartType | null>(null);
    const echartsRef = useRef<any>(null);

    const renderChart = () => {
        switch (selectedChart?.title) {
            case "Recharts":
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stackedBarData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="marketing"
                                stackId="1"
                                fill="#B6A6E9"
                            />
                            <Bar dataKey="sales" stackId="1" fill="#5E40BE" />
                            <Bar dataKey="support" stackId="1" fill="#21134D" />
                        </BarChart>
                    </ResponsiveContainer>
                );
            case "Echarts":
                return (
                    <ReactECharts
                        ref={echartsRef}
                        option={echartsOptions}
                        style={{ height: 300, width: "100%" }}
                        notMerge={true}
                    />
                );
            case "Chart JS":
                return (
                    <ChartJsBar
                        key={selectedChart.title + Date.now()}
                        data={chartJsData}
                    />
                );
            case "Apex Chart":
                return (
                    <ReactApexChart
                        height={300}
                        type="bar"
                        options={apexChartOptions}
                        series={apexChartSeries}
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
            name={"Stacked Bar Chart"}
            echartsRef={echartsRef}
            SparkLinechart={SparkLinechart}
        />
    );
}

export default BarCharts;
