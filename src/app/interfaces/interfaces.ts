export interface Customer {
    name : string,
    lastName : string,
    document : number,
    phoneNumber : string,
    address : string,
    email : string,
    reference : string,
    date: Date
}

export interface Sale {
    id: string,
    customer : Customer,
    amount : string
}