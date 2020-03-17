"use strict";
var DataHelper = /** @class */ (function () {
    function DataHelper(datakey, parmikey) {
        this.datakey = datakey;
        this.parmikey = parmikey;
    }
    DataHelper.prototype.readdata = function () {
        //获取本地的json数据
        var strdata = localStorage.getItem(this.datakey);
        //转成数组
        var arrdata = [];
        if (strdata !== null) {
            arrdata = JSON.parse(strdata);
        }
        return arrdata;
    };
    DataHelper.prototype.savedata = function (arrdata) {
        //得到新增的数据
        var strdata = JSON.stringify(arrdata);
        localStorage.setItem(this.datakey, strdata);
    };
    DataHelper.prototype.adddata = function (comstr) {
        var arrdata = this.readdata();
        var obj = {
            comment: comstr
        };
        var newid = arrdata.length > 0 ? arrdata[arrdata.length - 1][this.parmikey] + 1 : 1;
        obj[this.parmikey] = newid;
        arrdata.push(obj);
        this.savedata(arrdata);
        return newid;
    };
    DataHelper.prototype.deletedata = function (id) {
        var _this = this;
        //先要获取数据
        var arrdata = this.readdata();
        //删除对应的id的数据
        var currentIndex = arrdata.findIndex(function (ele) {
            return ele[_this.parmikey] == id;
        });
        if (currentIndex !== -1) {
            arrdata.splice(currentIndex, 1);
            this.savedata(arrdata);
            return true;
        }
        //保存数据到本地
        return false;
    };
    return DataHelper;
}());
