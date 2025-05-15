import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate();
    return (
        <div className="h-screen flex justify-center p-6">
            <Space size="large" className="flex flex-col lg:flex-row">
                <Card
                    style={{ width: 300 }}
                    title={"Stacked Bar Charts"}
                    cover={
                        <img
                            src="https://plus.unsplash.com/premium_photo-1682310140123-d479f37e2c88?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="bar"
                            style={{ height: 180, objectFit: "cover" }}
                        />
                    }
                >
                    <Button
                        onClick={() => navigate("/bar-chart")}
                        icon={<ArrowRightOutlined />}
                        iconPosition="end"
                        color="primary"
                        variant="filled"
                    >
                        View Charts
                    </Button>
                </Card>

                <Card
                    style={{ width: 300 }}
                    title={"Scatter Charts"}
                    cover={
                        <img
                            src="https://media.lordicon.com/icons/wired/outline/169-scatter-chart.svg"
                            alt="scatter"
                            style={{
                                height: 180,
                                objectFit: "contain",
                                padding: 16,
                            }}
                        />
                    }
                >
                    <Button
                        onClick={() => navigate("/scatter-chart")}
                        icon={<ArrowRightOutlined />}
                        iconPosition="end"
                        color="primary"
                        variant="filled"
                    >
                        View Charts
                    </Button>
                </Card>

                <Card
                    style={{ width: 300 }}
                    title={"Pie Charts"}
                    cover={
                        <img
                            src="https://plus.unsplash.com/premium_photo-1677145595584-ec4e421794a2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="pie"
                            style={{ height: 180, objectFit: "cover" }}
                        />
                    }
                >
                    <Button
                        onClick={() => navigate("/pie-chart")}
                        icon={<ArrowRightOutlined />}
                        iconPosition="end"
                        color="primary"
                        variant="filled"
                    >
                        View Charts
                    </Button>
                </Card>
            </Space>
        </div>
    );
}

export default App;
