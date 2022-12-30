export class PaymentInfo {
    [x: string]: void;
    constructor(public amount:number,
        public currency:string,
        public receiptEmail:string ){
            
        }
}
