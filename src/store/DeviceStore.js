import { makeAutoObservable } from "mobx"

export default class DeviceStore{
    constructor(){
        this._types = []
        this._brands = []
        this._devices = []
        this._device = [] // device (current) info for Device page
        //this._deviceRating = [] // user's (current) rating of device for Device page
        this._selectedType = {}
        this._selectedBrand = {}
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
        this._devices = device;
    }

    /* setDeviceRating(deviceRating){
        this._deviceRating = deviceRating;
    } */

    setSelectedType(type){
        this.setPage(1);
        this._selectedType = type;
        this._selectedBrand = {};
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