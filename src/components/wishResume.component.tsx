import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { useContext } from "react";
import { GlobalContext } from "../context/global.context";
import { IGlobalContext } from "../types/global.modal";


export default function WishResume(){
    const { wishItems } = useContext<IGlobalContext>(GlobalContext);

    return(
        <Card className=" border self-start flex flex-col gap-2 p-8 w-2/6">
            <h1 className="font-semibold text-xl my-2">Order Summary</h1>
            <div className="flex flex-col gap-4 my-4">
                <p className="flex justify-between">Subtotal  <span className="font-semibold">R$ {(wishItems?.totalValue).toFixed(2)}</span></p>
                <p className="flex justify-between">Frete <span className="font-semibold">Gratis</span></p>
                <p className="flex justify-between">Tax <span className="font-semibold">R$ 0.00</span></p>
            </div>
            <Separator className="my-2"/>
            <p className="font-semibold my-4 flex flex-row w-full justify-between">Total <span>R$ { (wishItems?.totalValue).toFixed(2)  || "0.00"}</span> </p>
            <Button className="mt-10">Checkout</Button>
            <Link className="m-10 self-center underline underline-offset-2 font-semibold" to="/">Continue na loja</Link>
        </Card> 
    )
}