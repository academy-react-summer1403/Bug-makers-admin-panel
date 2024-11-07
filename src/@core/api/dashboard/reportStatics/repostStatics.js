import axiosInstance from "../../../interceptor/interceptor";

export const getReportDashboard = async () => {
    const response = await axiosInstance.get(
        'Report/DashboardReport'
    );
    return response.data;
};
