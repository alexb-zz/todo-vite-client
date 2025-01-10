import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider  } from "react-router-dom";
import App from "../App";
import { ModalProvider } from "./ModalContext";


const queryClient = new QueryClient();
const router = createBrowserRouter([{
    path: "/",
    element: <App />
}]);

const AppProviders = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ModalProvider>
                <RouterProvider router={router}>
                    {children}
                </RouterProvider>
            </ModalProvider>
        </QueryClientProvider>
    );
}

export default AppProviders;