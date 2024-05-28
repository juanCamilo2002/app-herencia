import axios from "axios";

export const createAxiosInstancie = (accessToken, customConfig={}) => {
    const apiInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
            'Content-Type': 'application/json',
            'token': `Bearer ${accessToken}`
        },
        ...customConfig,
    })

    return apiInstance;
}

export const getSales = async (accessToken) => {
    const customApiInstace = createAxiosInstancie(accessToken);
    try {
        const res = await customApiInstace.get("/sales");
        return res.data;    
    } catch (error) {
        console.error('error fetching data:', error);
    }
}

export const getSale = async (accessToken, id) => {
    const customApiInstace = createAxiosInstancie(accessToken);
    try {
        const res = await customApiInstace.get(`/sales/${id}`);
        return res.data;
    } catch (error) {
        console.error('error fetching data:', error);
    }
}


export const CreateSale = async (accessToken, data) => {
    const customApiInstace = createAxiosInstancie(accessToken);
    try {
        const res = await customApiInstace.post("/sales", data);
        return res.data;
    } catch (error) {
        console.error('error fetching data:', error);
    }
}
export const updateSale = async (accessToken, data, id) => {
    const customApiInstace = createAxiosInstancie(accessToken);
    try {
        const res = await customApiInstace.put(`/sales/${id}`, data);
        return res.data;
    } catch (error) {
        console.error('error fetching data:', error);
    }
}

export const deleteSale = async (id, accessToken) => {
    const customApiInstace = createAxiosInstancie(accessToken);
    try {
        await customApiInstace.delete(`/sales/${id}`);
    } catch (error) {
        console.error(error)
    }
}

export const getCustomers = async (accessToken) => {
    const customApiInstace = createAxiosInstancie(accessToken);
    try {
        const res = await customApiInstace.get("/customers");
        return res.data;
    } catch (error) {
        console.error('error fetching data:', error);
    }
}
export const getProducts = async (accessToken) => {
    const customApiInstace = createAxiosInstancie(accessToken);
    try {
        const res = await customApiInstace.get("/products");
        return res.data;
    } catch (error) {
        console.error('error fetching data:', error);
    }
}
