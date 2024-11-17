export interface CreateSensorDataDTO {
    nitrogen: number;
    phospor: number;
    kalium: number;
    ph: number;
    temperature: number;
    moisture: number;
    conductivity: number;
}

export interface GetSensorDataDTO {
    id: number;  
    nitrogen: number;
    phospor: number;
    kalium: number;
    ph: number;
    temperature: number;
    moisture: number;
    conductivity: number;
    createdAt: Date;  
}