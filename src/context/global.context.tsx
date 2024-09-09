import { IFilterProps, IGlobalContext } from "../types/global.modal";
import { createContext, ReactNode, useState, useEffect } from "react";
import { IProductCardProp } from "../types/product.modal";

export const GlobalContext = createContext({} as IGlobalContext);

type GlobalContextProviderProps = {
    children: ReactNode;
};


export const GlobalContextProvider = ({ children }: GlobalContextProviderProps) => {
    const [filter, setFilter] = useState<IFilterProps>({ limit: 6, page: 0 });
    const [productItems, setProductItems] = useState<any>([]);
    const [categoryItems, setCategoryItems] = useState<string[]>([]);
    const [wishItems, setWishItems] = useState<{ data: IProductCardProp[]; totalValue: number }>({ data: [], totalValue: 0 });
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const apiBashUrl = process.env.REACT_APP_API_BASH_URL || "https://fakestoreapi.com";
        const fetchProductItems = async () => {
            try {
                setLoading(true)

                //${filter?.title ? `?title=${filter.title}` : ""} adicionar se tivesse na api!
                const product: IProductCardProp[]  = await fetch(`${apiBashUrl}/products${filter?.type ? `/category/${filter.type}` : ""}`)
                .then(res => res.json())
                .then((res: IProductCardProp[]) => filter?.title ? res.filter(product => product.title.toLowerCase().includes( filter?.title ? filter?.title.toLowerCase() : '')): res)

                const category: string[] = await fetch(`https://fakestoreapi.com/products/categories`).then(res => res.json());
                               
                setProductItems([...product]);
                setCategoryItems([...category])
                setLoading(false)
                    
            } catch (error) {
                console.log('fetch Error');
            }
        };
        
        fetchProductItems();
    }, [filter]);


    const recalculateTotal = (data: IProductCardProp[]) => {
        return data.reduce((total, item) => total + (item.price * (item.quant || 1)), 0);
    };

    const handleAddWishlist = async (param: IProductCardProp) => {
        const existingItem = wishItems.data.find((item: IProductCardProp) => item.title === param.title);

        let updatedData: IProductCardProp[];

        if (existingItem) {
            updatedData = wishItems.data.map((item: IProductCardProp) =>
                item.title === param.title
                    ? {
                        ...item,
                        quant: (item.quant || 0) + 1
                    }
                    : item
            );
        } else {
            updatedData = [...wishItems.data, { ...param, quant: 1 }];
        }

        setWishItems({
            data: updatedData,
            totalValue: recalculateTotal(updatedData),
        });
    };

    const handleRemoveWishlist = async (param: IProductCardProp) => {
        const existingItem = wishItems.data.some((list: IProductCardProp) => list.title === param.title);

        if (existingItem) {
            const updatedData: IProductCardProp[] = wishItems.data
                .map((item: IProductCardProp) =>
                    item.title === param.title
                        ? item.quant && item.quant - 1 > 0
                            ? { ...item, quant: item.quant - 1}
                            : null
                        : item
                )
                .filter((item: IProductCardProp | null) => item !== null) as IProductCardProp[];

            setWishItems({
                data: updatedData,
                totalValue: recalculateTotal(updatedData),
            });
        }
    };

    const handleDeleteWishlist = async (param: IProductCardProp) => {
        const updatedData = wishItems.data.filter((item: IProductCardProp) => item.title !== param.title);

        setWishItems({
            data: updatedData,
            totalValue: wishItems.totalValue - (param.price * (param.quant || 1)),
        });
    };

    return (
        <GlobalContext.Provider
            value={{
                loading,
                filter,
                setFilter,
                categoryItems,
                productItems,
                wishItems,
                handleAddWishlist,
                handleRemoveWishlist,
                handleDeleteWishlist
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
