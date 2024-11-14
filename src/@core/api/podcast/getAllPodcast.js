import axiosInstance from "../../interceptor/interceptor";

export const getAllPodcast = async (queryValue) => {

    let url = `https://tahacode.ir/podcast/getAllAdmin?query=&page=1&perPage=5000`

    if (queryValue) {
        url += `&query=${queryValue}`;
      }
    const response = await axiosInstance.get(url);
    
    return response.data;
};
