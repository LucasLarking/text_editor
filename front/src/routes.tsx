import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import DocumentPage from "./document/DocumentPage";
import Test from "./Test";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {index: true, element: <Test />},
            {path: ':slug', element: <DocumentPage />},
        ]
    }
])

export default router