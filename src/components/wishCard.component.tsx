import { FaMinus, FaPlus } from "react-icons/fa6";
import { IProductCardProp } from "../types/product.modal";
import { Button } from "./ui/button";
import { useContext } from "react";
import { GlobalContext } from "../context/global.context";
import { IGlobalContext } from "../types/global.modal";
import { MdClose } from "react-icons/md";


export default function WishCard(props : IProductCardProp){
    const { handleAddWishlist, handleRemoveWishlist , handleDeleteWishlist  } = useContext<IGlobalContext>(GlobalContext);
    const { title, image , quant, price} = props;

    return(
        <div className="flex flex-row items-center my-5 w-2/3">
            <div className="flex flex-row items-center w-2/3 mr-24">
                <img src={image} alt={title} className="w-[6vw] h-[7vh] p-1" />
                <span className="pl-5 text-lg font-semibold text-ellipsis">{title}</span>
            </div>
            <div className="flex items-center gap-3 w-1/3">
                <p className="text-md font-bold  w-20 text-gray-500">R${(price * (quant || 1)).toFixed(2)}</p>
                <div className="flex flex-row items-center border rounded-sm ">
                    <Button variant="ghost" size="icon" onClick={()=>{handleRemoveWishlist(props)}}>
                        <FaMinus />
                    </Button>
                    <span>
                        {quant}
                    </span>
                    <Button variant="ghost" size="icon" onClick={()=>{handleAddWishlist(props)}}> 
                        <FaPlus />
                    </Button>
                </div>
                <Button variant="ghost" onClick={()=>{handleDeleteWishlist(props)}} className="border  bg-slate-100 rounded-sm" size="icon">
                    <MdClose className="text-black w-20  h-5" />
                </Button>
            </div>
        </div>
    )
}