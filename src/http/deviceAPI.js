export default class DeviceApi {
    constructor(api, store) {
        this.api = api;
        this.store = store;
    }

    /* ======= type ======= */
    async createType (type) {
        const { data } = await this.api.$authHost.post("api/type", type);
        return data;
    }
    async fetchTypes() {
        const { data } = await this.api.$host.get("api/type");
        this.store.device.setTypes(data);
    }
    async deleteType (id) {
        const { data } = await this.api.$authHost.delete("api/type/" + id);
        return data;
    }

    /* ======= brand ======= */
    async createBrand (payload) {
        const { data } = await this.api.$authHost.post("api/brand", payload);
        return data;
    }
    async fetchBrands () {
        const { data } = await this.api.$host.get("api/brand");
        this.store.device.setBrands(data);
    }
    async deleteBrand (id) {
        const { data } = await this.api.$authHost.delete("api/brand/" + id);
        return data;
    }

    /* ======= device ======= */
    async createDevice (device) {
        const { data } = await this.api.$authHost.post("api/device", device);
        return data;
    }
    async fetchDevices (typeId, brandId, page, limit) {
        const { data } = await this.api.$host.get(`api/device`, {params: {
            typeId, brandId, page, limit // params will be fitted if they are not undefined
        }});
        this.store.device.setDevices(data.rows);
        this.store.device.setTotalCount(data.count);
    }
    async fetchDevice (id) {
        const { data } = await this.api.$host.get(`api/device/${id}`);
        this.store.device.setDevice(data);
    }
    async deleteDevice (id) {
        const { data } = await this.api.$authHost.delete("api/device/" + id);
        return data;
    }

    /* ======= rating ======= */
    /**
     * @returns Rating object
     */
    async addRating (deviceId, rate) {
        const { data } = await this.api.$authHost.post("api/rating", { 
            deviceId,
            rate,
        });
        // put received rating to state:
        this.store.device.setDeviceRating(data);
    }
    async changeRating (id, rate) {
        const { data } = await this.api.$authHost.patch("api/rating", { 
            id,
            rate,
        });
        // put received rating to state:
        this.store.device.setDeviceRating(data);
    }
    async checkRating (deviceId) {
        const { data } = await this.api.$authHost.get("api/rating/check", { 
            params: { deviceId },
        });
        this.store.device.setDeviceRating(data);
    }
}