import { Button, Drawer, List } from "antd";
import { useEffect, useRef, useState } from "react";
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
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
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

const barData: ChartType[] = [
    {
        title: "Recharts",
        description: "Scatter Chart in Recharts",
    },
    {
        title: "Chart JS",
        description: "Scatter Chart in Chart JS",
    },
    {
        title: "Apex Chart",
        description: "Scatter Chart in Apex Chart",
    },
    {
        title: "Echarts",
        description: "Scatter Chart in Echarts",
    },
];

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
    xAxis: {},
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

function ScatterCharts() {
    const [open, setOpen] = useState(false);
    const [miniOpen, setMiniOpen] = useState(false);
    const [selectedChart, setSelectedChart] = useState<ChartType | null>(null);
    const echartsRef = useRef<any>(null);

    useEffect(() => {
        if (open && selectedChart?.title === "Echarts" && echartsRef.current) {
            setTimeout(() => {
                echartsRef.current?.getEchartsInstance().resize();
            }, 100);
        }
    }, [open, selectedChart]);

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
    const navigate = useNavigate();

    return (
        <div className="p-4 h-screen flex flex-col w-full">
            <div className="left">
                <Button
                    onClick={() => navigate("/")}
                    color="primary"
                    icon={<ArrowLeftOutlined />}
                >
                    Back
                </Button>
            </div>
            <div className="flex flex-col items-center flex-1 justify-center">
                <h1 className="text-2xl font-bold">Scatter Charts</h1>

                <List
                    itemLayout="horizontal"
                    dataSource={barData}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <Button
                                    color="primary"
                                    variant="solid"
                                    onClick={() => {
                                        setOpen(true);
                                        setSelectedChart(item);
                                    }}
                                >
                                    Open Chart
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta
                                title={item.title}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                    style={{ width: "60%" }}
                />
            </div>
            <Drawer
                push={false}
                open={open}
                onClose={() => {
                    setOpen(false);
                    setSelectedChart(null);
                    setMiniOpen(false)
                }}
                width={700}
            >
                {renderChart()}
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => setMiniOpen(true)}
                >
                    Show mini chart
                </Button>
                <Drawer
                    placement="bottom"
                    open={miniOpen}
                    onClose={() => setMiniOpen(false)}
                    getContainer={false}
                >
                    <div className="h-full w-full rounded-xl bg-black p-3 shadow-lg border border-[#334155]">
                        <ReactECharts
                            ref={echartsRef}
                            option={scatterEchartsOptions}
                            style={{ height: "100%", width: "100%" }}
                            theme="dark"
                        />
                    </div>
                </Drawer>
            </Drawer>
        </div>
    );
}

export default ScatterCharts;
