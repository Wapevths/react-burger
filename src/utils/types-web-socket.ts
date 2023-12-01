export interface ITypesWebSocket {
    success: boolean,
    orders: {
        ingredients: string[],
        _id: string,
        status: string,
        number: number,
        createdAt: string,
        updatedAt: string
    }[],
    total: number,
    totalToday: number
}