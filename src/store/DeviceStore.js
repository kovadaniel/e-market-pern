import { makeAutoObservable } from "mobx"

export default class DeviceStore{
    constructor(){
        this._types = []
        this._brands = []
        this._devices = []
        // device (current) info for Device page:
        this._device = null
        // user's rating of a device (current) for Device page:
        this._deviceRating = null
        this._selectedType = null
        this._selectedBrand = null
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this);
    }

    setTypes(types){
        this._types = types;
    }
    setBrands(brands){
        this._brands = brands;
    }
    setDevices(devices){
        this._devices = devices;
    }
    setDevice(device){
        this._device = device;
    }
    setDeviceRating(deviceRating){
        this._deviceRating = deviceRating;
    }

    setSelectedType(type){
        this.setPage(1);
        this._selectedType = type;
        this._selectedBrand = null;
    }
    setSelectedBrand(brand){
        this.setPage(1);
        this._selectedBrand = brand;
    }

    setPage(page){
        this._page = page;
    }
    setTotalCount(totalCount){
        this._totalCount = totalCount;
    }
    setLimit(limit){
        this._limit = limit;
    }

    get types(){
        return this._types;
    }
    get brands(){
        return this._brands;
    }
    get devices(){
        return this._devices;
    }
    get device(){
        return this._device;
    }

    get deviceRating(){
        return this._deviceRating;
    }

    get selectedType(){
        return this._selectedType;
    }
    get selectedBrand(){
        return this._selectedBrand;
    }

    get page(){
        return this._page;
    }
    get totalCount(){
        return this._totalCount;
    }
    get limit(){
        return this._limit;
    }
}