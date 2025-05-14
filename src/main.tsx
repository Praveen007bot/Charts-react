import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BarCharts from "./components/BarCharts.tsx";
import ScatterCharts from "./components/ScatterCharts.tsx";
import PieCharts from "./components/PieCharts.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/bar-chart",
        element: <BarCharts />,
    },
    {
        path: "/scatter-chart",
        element: <ScatterCharts />,
    },
    {
        path: "/pie-chart",
        element: <PieCharts />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
