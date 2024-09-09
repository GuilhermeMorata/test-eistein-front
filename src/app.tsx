import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GlobalContextProvider } from './context/global.context';
import HeaderEcommerc from './components/headerEcommerc.component';
import HomePage from './pages/home/home.page';
import WishPage from './pages/wish.page';




export default function App(){
  return (
    <GlobalContextProvider>
        <Router>
            <HeaderEcommerc />
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/carrinho" element={<WishPage/>} />
            </Routes>
        </Router>
    </GlobalContextProvider>
  );
};

