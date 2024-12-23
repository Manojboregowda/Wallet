import { Wallet } from "./wallet";

export class Customer {
    customerId!: number;
    customerName!: string;
    mobile!: string;
    password!: string;
    walletDto!:Wallet;
}
