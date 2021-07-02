export interface CartItems {
    _id: string,
    productId: {
            _id: string,
            headLine: string,
            category: string,
            price: number,
            createdAt: string,
            updatedAt: string
        },
        quantity: number
}