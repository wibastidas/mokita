export interface Customer {
    id: string,
    name : string,
    lastName : string,
    document : number,
    phoneNumber : string,
    address : string,
    email : string,
    reference : string,
    createdAt: string,
    userUid?: string;
}

export interface Sale {
    id: string,
    customerId : string,
    amount : string,
    createdAt: string
    montoCuota: number,
    numeroCuotas: number,
    cuotas: [{cuota: number, date: Date; fechaPago: Date}],
    intereses: any, 
    montoConInteres: any,
    cuotasPagadas: number,
    cuotasPendientes: number,
    estado:string
    vencimiento: string,
    porcentaje:any
    abonos?: any
    updatedAt?: any,
    saldo: any,
    userUid?: string;
}

export interface Expense {
    id: string,
    concept: string,
    description : Customer,
    amount : string,
    createdAt: string,
    updatedAt: string,
    userUid?: string;
}

export interface User {
    // id?: string,
    // name?: string,
    // email?: string,
    // password?: string,

    uid: string;
    email: string;
    displayName: string;
    emailVerified: boolean;
    photoUrl?: string,
    roles?: Roles
}

export interface Roles {
    cobrador?: boolean,
    admin?: boolean,
}