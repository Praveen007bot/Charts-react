import { Button, Drawer, List } from "antd";
import { useEffect, useRef, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { pieData } from "../../data";
import type { ChartType } from "./BarCharts";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import ReactECharts from "echarts-for-react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    type ChartData,
} from "chart.js";
import { Pie as ChartJSPie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const barData: ChartType[] = [
    {
        title: "Recharts",
        description: "Pie Chart in Recharts",
    },
    {
        title: "Chart JS",
        description: "Pie Chart in Chart JS",
    },
    {
        title: "Apex Chart",
        description: "Pie Chart in Apex Chart",
    },
    {
        title: "Echarts",
        description: "Pie Chart in Echarts",
    },
];

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

function PieCharts() {
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

    const navigate = useNavigate();

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
                <h1 className="text-2xl font-bold">Pie Charts</h1>
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
                    setMiniOpen(false);
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
                    getContainer={false}
                    open={miniOpen}
                    onClose={() => setMiniOpen(false)}
                >
                    <div className="h-full w-full rounded-xl bg-black p-3 shadow-lg border border-[#334155]">
                        <ReactECharts
                            ref={echartsRef}
                            option={miniPieEchartsOptions}
                            style={{ height: "100%", width: "100%" }}
                            notMerge={true}
                            theme="dark"
                        />
                    </div>
                </Drawer>
            </Drawer>
        </div>
    );
}

export default PieCharts;
