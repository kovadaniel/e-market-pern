import { $authHost, $host } from "./index";

//-------------------------------------------
// type

export const createType = async (type) => {
    const { data } = await $authHost.post("api/type", type);
    return data;
}

export const fetchTypes = async () => {
    const { data } = await $host.get("api/type");
    return data;
}

export const deleteType = async (type) => {
    const { data } = await $authHost.delete("api/type", type);
    return data;
}

//-------------------------------------------
// brand

export const createBrand = async (brand) => {
    const { data } = await $authHost.post("api/brand", brand);
    return data;
}

export const fetchBrands = async () => {
    const { data } = await $host.get("api/brand");
    return data;
}

export const deleteBrand = async (brand) => {
    const { data } = await $authHost.delete("api/brand", brand);
    return data;
}

//-------------------------------------------
// device

export const createDevice = async (device) => {
    const { data } = await $authHost.post("api/device", device);
    return data;
}

export const fetchDevices = async (typeId, brandId, page, limit) => {
    const { data } = await $host.get(`api/device`, {params: {
        typeId, brandId, page, limit // params will be fitted if they are not undefined
    }});
    return data;
}

export const fetchDevice = async (id) => {
    const { data } = await $host.get(`api/device/${id}`);
    return data;
}

export const deleteDevice = async (device) => {
    const { data } = await $authHost.delete("api/device", device);
    return data;
}

// ---------------------------------------------
// rating

export const addRating = async (deviceId, rate) => {
    const { data } = await $authHost.post("api/rating", { 
        deviceId,
        rate,
    });
    return data;
}

export const changeRating = async (id, rate) => {
    const { data } = await $authHost.patch("api/rating", { 
        id,
        rate,
    });
    return data;
}

export const checkRating = async (deviceId) => {
    const { data } = await $authHost.get("api/rating/check", { 
        params: { deviceId },
    });
    return data;
}