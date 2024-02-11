import BasketStore from "./BasketStore";
import DeviceStore from "./DeviceStore";
import UserStore from "./UserStore";

export default class AppStore {
    user = new UserStore(this);
    device = new DeviceStore(this);
    basket = new BasketStore(this);
  }