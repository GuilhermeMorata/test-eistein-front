import { useContext, useState } from "react";
import { GlobalContext } from "../../context/global.context";
import { IGlobalContext } from "../../types/global.modal";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { Card } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Separator } from "../../components/ui/separator";

export default function ProductCategory() {
    const { setFilter, filter, categoryItems } = useContext<IGlobalContext>(GlobalContext);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(filter.type || null);

    const handleFilter = (typeProduct: string) => {
        setSelectedCategory(typeProduct === selectedCategory ? null : typeProduct);
        setFilter({ ...filter, type: typeProduct === selectedCategory ? null : typeProduct , page:0 ,title : null});
    };

    return (
        <Card className="w-[15vw] self-start m-10 h-[35vh] p-5">
            <span className="text-md font-semibold">Categorias</span>
            <div className="flex flex-col gap-5 mt-5">
                {categoryItems?.map((category: string) => (
                    <div key={category} className="flex flex-col  gap-2 items-start">
                        <div className="flex flex-row gap-2 mb-2 items-center">
                            <Checkbox
                                checked={selectedCategory === category}
                                onCheckedChange={() => handleFilter(category)}
                            />
                            <span>{capitalizeFirstLetter(category)}</span>
                        </div>
                        <Separator />
                    </div>
                ))}
            </div>
        </Card>
    );
}