export class CuentaResponse {
    banco: string;
    nroCuenta: string;
    tipoCuenta: string;
    titular: string;
    documento: string;
    nroDocumento: string;
}

export class ReceptoresDonacionResponse {
    id: number;
    empresa: string;
    cuentas: CuentaResponse[] ;
}