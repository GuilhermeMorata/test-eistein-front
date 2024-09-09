import { useContext, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { GlobalContext } from '../../context/global.context';
import { IGlobalContext } from '../../types/global.modal';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Skeleton } from '../../components/ui/skeleton';
import ProductCategory from './productCategory.component';
import ProductCard from './productCard.component';

export default function HomePage() {
    const { productItems,loading,  filter, setFilter } = useContext<IGlobalContext>(GlobalContext);

    useEffect(() => {}, [productItems]); 

    const totalPages = Math.ceil(productItems.length / filter.limit); 
    return (
        <div className="flex flex-col w-full justify-center items-center px-32 pt-14">
            {
                loading ? 
                <div className='flex flex-row items-center justify-center'>
                    <Skeleton className='w-[15vw] self-start m-10 h-[35vh] p-5' />
                    <Skeleton className='w-[35vw]  self-start m-10 h-[50vh] ' />
                </div>
            :
                <div className='flex flex-row items-center justify-center'> 
                    <ProductCategory />
                    <div className='flex flex-col items-center'>
                        {productItems.length > 0 ? (
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 w-full'>
                                {productItems
                                    .slice(filter.page * filter.limit, (filter.page + 1) * filter.limit)
                                    .map((product: any) => (<ProductCard key={product.id} {...product} />))}
                            </div>
                        ) : (
                            <span className='text-4xl w-full font-semibold'>Não possui produtos</span>
                        )}

                        {totalPages > 1 && (
                            <ReactPaginate
                                previousLabel={<FiChevronLeft />} 
                                nextLabel={<FiChevronRight />} 
                                pageCount={totalPages}
                                onPageChange={(e: { selected: number }) => {
                                    setFilter({ ...filter, page: e.selected });
                                }}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                containerClassName="h-[5vh] gap-5 text-md text-center min-w-[10vw] max-w-[20vw] w-auto rounded-sm text-black flex items-center justify-center mt-4 border border-solid border-gray-300"
                                pageClassName="mx-2"
                                pageLinkClassName=" "
                                previousClassName="px-3 py-1 text-black"
                                nextClassName="px-3 py-1 text-black "
                                activeClassName="bg-gray-100 w-12 h-[3vh] text-center flex items-center justify-center rounded-sm text-black"
                                disabledClassName="opacity-50 cursor-not-allowed"
                            />
                        )}
                    </div>   
                </div>     
            }
        </div>
    );
}