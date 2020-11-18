export interface Customer {
    name : string,
    lastName : string,
    document : string,
    phoneNumber : string,
    addrees : string,
    email : string,
    reference : string
}

export interface Sale {
    customer : Customer,
    amount : string
}