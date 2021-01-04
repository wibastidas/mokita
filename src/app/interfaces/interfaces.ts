export interface Customer {
    id: string,
    name : string,
    lastName : string,
    document : number,
    phoneNumber : string,
    address : string,
    email : string,
    reference : string,
    createdAt: string
}

export interface Sale {
    id: string,
    customerId : string,
    amount : string,
    createdAt: string
    montoCuota: number,
    numeroCuotas: Number,
    cuotas: [{cuota: number, date: Date; fechaPago: Date}],
    interest: any, 
    amountWithRate: any,
    cuotasPagadas: any,
    cuotasPendientes: any,
    state:string
    vencimiento: string,
    rate:any
    abonos?: any
    updatedAt?: any
}

export interface Expense {
    id: string,
    concept: string,
    description : Customer,
    amount : string,
    createdAt: string,
    updatedAt: string
}