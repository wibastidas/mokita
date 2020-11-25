export interface Customer {
    name : string,
    lastName : string,
    document : number,
    phoneNumber : string,
    address : string,
    email : string,
    reference : string,
    createdAt: Date
}

export interface Sale {
    id: string,
    customer : Customer,
    amount : string,
    createdAt: Date
    montoCuota: number,
    numeroCuotas: Number,
    cuotas: []
}