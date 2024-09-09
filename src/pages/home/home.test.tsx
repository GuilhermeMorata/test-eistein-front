import { render, screen, waitFor,  } from '@testing-library/react';
import HomePage from './home.page';
import { GlobalContext } from '../../context/global.context';
import { IGlobalContext } from '@/src/types/global.modal';
import userEvent from '@testing-library/user-event';

const renderHomePage = (contextValue: any) => {
    render(
        <GlobalContext.Provider value={contextValue}>
            <HomePage />
        </GlobalContext.Provider>
    );
};


jest.mock('../../components/ui/skeleton', () => ({
    Skeleton: () => <div>Mock Skeleton</div>
}));


describe('HomePage Component', () => {
    test('renders skeletons when loading', () => {
        const contextValue = {
            productItems: [],
            loading: true,
            filter: { page: 0, limit: 10 },
            setFilter: jest.fn(),
            categoryItems: []
        };

          renderHomePage(contextValue);
          const skeletons = screen.getAllByText('Mock Skeleton');
          expect(skeletons.length).toBe(2);
    });

    test('renders products when not loading', async () => {
        const contextValue: IGlobalContext = {
            productItems: [{ id: 1, category: '', description: '', image: '', price: 2, rating: { rate: 2, count: 1 }, title: 'TEST', quant: 1 }],
            loading: false,
            filter: { page: 0, limit: 10 },
            setFilter: jest.fn(),
            categoryItems: [],
            wishItems: jest.fn(),
            handleAddWishlist: jest.fn(),
            handleRemoveWishlist: jest.fn(),
            handleDeleteWishlist: jest.fn()
        };
        
        renderHomePage(contextValue);
    
        expect(screen.getByText(/Categorias/i)).toBeInTheDocument();
        expect(screen.getByText(/TEST/i)).toBeInTheDocument(); 
    });

    test('shows "No products available" message when no products', () => {
        const contextValue = {
        productItems: [],
        loading: false,
        filter: { page: 0, limit: 10 },
        setFilter: jest.fn()
        };

        renderHomePage(contextValue);

        expect(screen.getByText('Não possui produtos')).toBeInTheDocument();
    });

    test('pagination changes page and updates context', async () => {
        const setFilter = jest.fn();

        const contextValue: IGlobalContext = {
            productItems: [
                { id: 1, category: '', description: '', image: '', price: 2, rating: { rate: 2, count: 1 }, title: 'TESTA', quant: 1 },
                { id: 2, category: '', description: '', image: '', price: 3, rating: { rate: 2, count: 1 }, title: 'TESTB', quant: 1 },
            ],
            loading: false,
            filter: { page: 0, limit: 1 },
            setFilter,
            categoryItems: [],
            wishItems: jest.fn(),
            handleAddWishlist: jest.fn(),
            handleRemoveWishlist: jest.fn(),
            handleDeleteWishlist: jest.fn()
        };

        renderHomePage(contextValue);

        expect(screen.getByText('TESTA')).toBeInTheDocument();
        expect(screen.queryByText('TESTB')).not.toBeInTheDocument();

        const page2Button = screen.getByText('2');
        if (page2Button) {
            userEvent.click(page2Button);
        } else {
            throw new Error('Page 2 button not found');
        }

        await waitFor(() => {
            expect(setFilter).toHaveBeenCalledWith({ page: 1, limit: 1 });
    
        });
    });

   
});
