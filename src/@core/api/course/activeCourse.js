import axiosInstance from "../../interceptor/interceptor";

export const addActive = async ({ id, active, method, api , keyword , payment ,HelpId}) => {
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
        
         if(payment){
            const formData = new FormData();
            formData.append('PaymentId' , payment)
            data = formData;
        }
    } else if (method === 'delete') {
        data = { data: { active, id } };
    } else if (method === 'post') {
        data = {HelpId :HelpId ,AdminId:id};
    }


    const response = await axiosInstance[method](api, data);
    return response.data;
};
