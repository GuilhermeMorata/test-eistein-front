import { CgShoppingCart } from "react-icons/cg";
import { IProductCardProp } from "../../types/product.modal";
import { Card } from "../../components/ui/card";
import { CiHeart } from "react-icons/ci";
import { useContext } from "react";
import { GlobalContext } from "../../context/global.context";
import { IGlobalContext } from "../../types/global.modal";

export default function ProductCard(props: IProductCardProp) {
    const {  handleAddWishlist } = useContext<IGlobalContext>(GlobalContext);
    const { title, image, price } = props;
  
    return (
      <Card className="relative p-4 flex flex-col w-[15vw] hover: items-center border-none shadow-none overflow-hidden group" >
        <div className="relative w-full flex items-center justify-center mb-10 group-hover:brightness-110">
            <CiHeart className="absolute top-1 left-32 w-full h-8 text-gray-600  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img src={image} alt={title} className="w-[10vw] h-[25vh]  " />
            <button onClick={()=>{handleAddWishlist(props)}} className="absolute flex justify-center bottom-0 left-0 w-full bg-slate-900 text-white py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Add to cart <CgShoppingCart className="w-6 mx-2 h-6  text-white" />
            </button>
        </div>
        <div className="flex flex-col justify-start p-2">
            <h2 className="text-md font-bold text-gray-800 mb-6">{title}</h2>
            <div className="flex flex-row items-center">
                <p className="rounded-full border mr-5 px-5 font-semibold text-sm text-black">IN STOCK</p>
                <p className="text-md font-bold text-gray-500">R${price.toFixed(2)}</p>
            </div>
        </div>
      </Card>
    );
  }
  