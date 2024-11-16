
import axiosInstance from "../../interceptor/interceptor";

export const AddSchedualAtomatic = async (data , id) => {

const response = await axiosInstance.post(`/Schedual/AddSchedualAutomatic?currentCurseId=${id}` , [data]);
    return response.data;
};
export const UpdateSchedual = async (data , id) => {

const response = await axiosInstance.put(`/Schedual/UpdateSchedualSingle?currentCurseId=${id}` , data);
    return response.data;
};
export const AddSchedualSingle = async (data , id) => {

const response = await axiosInstance.post(`/Schedual/AddSchedualSingle?currentCurseId=${id}` , data);
    return response.data;
};
export const getAdminSchedual = async (startTime , endTime) => {

const response = await axiosInstance.get(`/Schedual/GetAdminScheduals?startDate=${startTime}&endDate=${endTime}`);
    return response.data;
};
export const getSchedualId = async (schedualId) => {

const response = await axiosInstance.get(`/Schedual/GetStudentScheduals/${schedualId}`);
    return response.data;
};
