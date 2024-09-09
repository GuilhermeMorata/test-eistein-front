import { useContext } from "react";
import { Separator } from "../components/ui/separator";
import { GlobalContext } from "../context/global.context";
import { IGlobalContext } from "../types/global.modal";
import { IProductCardProp } from "../types/product.modal";
import WishCard from "../components/wishCard.component";
import WishResume from "../components/wishResume.component";



export default function WishPage(){
    const { wishItems } = useContext<IGlobalContext>(GlobalContext);

    return(
        <div className="flex flex-row justify-center items-center px-44 py-20">
            <div className="w-3/6 px-24 self-start">
                <span className="font-bold text-xl text-slate-800 ">Seu Carrinho</span>
                <Separator className="my-5"/>
                <div>
                  {
                    wishItems?.data.length ? 
                    <div className="flex flex-col gap-5">
                        {
                            wishItems.data.map((props:IProductCardProp) => <WishCard {...props} />)
                        }
                    </div>
                    : <span>Não possue dados !</span>
                  }
                </div>
            </div>
            <WishResume />  
        </div>
    )
}