class DataHelper{
    datakey:string
    parmikey:string
    constructor(datakey:string,parmikey:string){
        this.datakey = datakey
        this.parmikey = parmikey
    }
    readdata(){
        //获取本地的json数据
        let strdata: string|null = localStorage.getItem(this.datakey)
        //转成数组
        let arrdata = [];
        if(strdata !== null){
            arrdata = JSON.parse(strdata)
        }
        return arrdata;
    }
    savedata(arrdata:Array<Object>):void{
        //得到新增的数据
        let strdata = JSON.stringify(arrdata);
        localStorage.setItem(this.datakey,strdata)
    }
    adddata(comstr:string):number{
        let arrdata:any = this.readdata();

        let obj:any = {
            comment:comstr
        }
        let newid= arrdata.length>0 ?arrdata[arrdata.length-1][this.parmikey] +1 : 1
        obj[this.parmikey] = newid
        arrdata.push(obj)
        this.savedata(arrdata)
        return newid;
    }
    deletedata(id:number){

        //先要获取数据
        let arrdata = this.readdata();

        //删除对应的id的数据
            let currentIndex = arrdata.findIndex((ele:any)=>{
                return ele[this.parmikey] == id
            })
            
            if(currentIndex !== -1){
                arrdata.splice(currentIndex,1)
                this.savedata(arrdata)
                return true;
            }
        //保存数据到本地
        return false;
    }
    
}
