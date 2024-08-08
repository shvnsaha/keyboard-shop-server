import { Types } from "mongoose"

export type TCartItems = {
    _id: Types.ObjectId,
    name: string,
    price: number;
    quantity: number;
    image: string
}