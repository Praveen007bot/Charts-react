import { Button, Drawer, List } from "antd";
import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export type ChartType = {
    title: string;
    description: string;
};

type ChartDisplayProps = {
    renderChart: () => React.JSX.Element;
    MiniChart: () => React.JSX.Element;
    SparkLinechart: () => React.JSX.Element;
    setSelectedChart: React.Dispatch<React.SetStateAction<ChartType | null>>;
    selectedChart: ChartType | null;
    name: string;
    echartsRef: React.RefObject<any>;
};

function ChartDisplay({
    renderChart,
    MiniChart,
    setSelectedChart,
    selectedChart,
    name,
    echartsRef,
    SparkLinechart
}: ChartDisplayProps) {
    const [open, setOpen] = useState(false);
    const [miniOpen, setMiniOpen] = useState(false);

    const barData: ChartType[] = [
        {
            title: "Recharts",
            description: `${name} in Recharts`,
        },
        {
            title: "Chart JS",
            description: `${name} in Chart JS`,
        },
        {
            title: "Apex Chart",
            description: `${name} in Apex Chart`,
        },
        {
            title: "Echarts",
            description: `${name} in Echarts`,
        },
    ];

    useEffect(() => {
        if (open && selectedChart?.title === "Echarts" && echartsRef.current) {
            setTimeout(() => {
                echartsRef.current?.getEchartsInstance().resize();
            }, 100);
        }
    }, [open, selectedChart]);

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
                <h1 className="text-2xl font-bold">{name}</h1>
                <List
                    itemLayout="horizontal"
                    dataSource={barData}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <div className="border-black border-2 w-40 h-12 p-0">
                                    <SparkLinechart />
                                </div>,
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
                        <MiniChart />
                    </div>
                </Drawer>
            </Drawer>
        </div>
    );
}

export default ChartDisplay;
