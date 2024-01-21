import {makeAutoObservable} from 'mobx';

export default class UserStore{
    constructor(){
        this._isAuth = localStorage.getItem("isAuth") ?? false;
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        if (bool) {
            localStorage.setItem("isAuth", true);
        } else {
            localStorage.removeItem("isAuth");
        }
        this._isAuth = bool;
    }
    setUser(user){
        this._user = user;
    }

    logout(){
        this.setIsAuth(false);
        this.setUser({});
        localStorage.removeItem("token");
    }


    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }
}