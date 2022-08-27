export class Contact {
    private _id:number;
    private _name: string;
    private _phone: string;
    constructor(name:string, phone:string){
        this._id=0;
        this._name = name;
        this._phone=phone;
    }

    public get id(){
        return this._id;
    }
    public set id(id:number){
        this._id=id;
    }

    public get name(){
        return this._name;
    }
    public set name(name:string){
        this._name=name;
    }

    public get phone(){
        return this._phone;
    }
    public set phone(phone:string){
        this._phone=phone;
    }

    public getModel():ContactModel{
        return {
            id:this._id,
            name:this._name,
            phone:this._phone
        }
    }

}

export interface ContactModel{
    id:number;
    name:string;
    phone:string;
}

export interface Message{
    severity:string;
    message:string;
}

export enum SEVERITY{
    SUCCESS='success',
    DANGER='danger',
    WARNING='warning',
}

export const SESSION_NAME='fiscon_json';