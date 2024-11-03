import axiosInstance from "../../interceptor/interceptor";

export const addActive = async ({ id, active, method, api , keyword }) => {
    let data;

    if (method === 'put') {
        if (keyword) { 
            const formData = new FormData();
            formData.append('Active', active);
            formData.append('Id', id);
            data = formData;
        } else {
            data = { active, id }; 
        }
    } else if (method === 'delete') {
        data = { data: { active, id } };
    }

    const response = await axiosInstance[method](api, data);
    return response.data;
};
