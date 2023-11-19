import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormPage from "./pages/FormPage";
import Home from "./Home";

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FormPage />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}