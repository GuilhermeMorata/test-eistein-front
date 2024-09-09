import { Dispatch, SetStateAction } from "react"
import { IProductCardProp } from "./product.modal"

export interface IFilterProps {
    limit: number,
    page: number,
    type?: string | null,
    title?: string | null
}


export interface IGlobalContext {
    productItems: IProductCardProp[],
    categoryItems: string[],
    loading: boolean,
    filter: IFilterProps,
    setFilter: Dispatch<SetStateAction<IFilterProps>>,
    wishItems: any,
    handleAddWishlist: any,
    handleRemoveWishlist: any,
    handleDeleteWishlist: any
}