import { Button, Drawer, List } from "antd";
import { useEffect, useRef, useState } from "react";
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
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
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

const barData: ChartType[] = [
    {
        title: "Recharts",
        description: "Stacked Bar Chart in Recharts",
    },
    {
        title: "Chart JS",
        description: "Stacked Bar Chart in Chart JS",
    },
    {
        title: "Apex Chart",
        description: "Stacked Bar Chart in Apex Chart",
    },
    {
        title: "Echarts",
        description: "Stacked Bar Chart in Echarts",
    },
];

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

function BarCharts() {
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
                <h1 className="text-2xl font-bold">Stacked Bar Charts</h1>
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
                            option={echartsOptions}
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

export default BarCharts;
