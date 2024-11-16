export interface CreateTemperatureDTO {
    value: number;
}

export interface GetTemperatureDTO {
    id: string;
    value: number;
    timestamp: Date;
}