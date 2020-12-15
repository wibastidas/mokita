export interface Customer {
    id: string,
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

export interface Expense {
    id: string,
    concept: string,
    description : Customer,
    amount : string,
    createdAt: Date
}