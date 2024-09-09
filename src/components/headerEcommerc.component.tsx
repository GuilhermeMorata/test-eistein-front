import { useContext, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { CgShoppingCart } from "react-icons/cg";
import { useLocation, Link } from "react-router-dom";
import icon from '../assets/icon.png';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "./ui/breadcrumb";
import { GlobalContext } from "../context/global.context";
import { IGlobalContext } from "../types/global.modal";
import { FaRegCircleUser } from "react-icons/fa6";

const NavegationBreadcrumb = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const getBreadcrumbs = (pathname: string) => {
    const pathnames = pathname.split("/").filter(x => x);
    if (pathnames.length === 0) return [{ name: 'Home', href: '/' }];
    return pathnames.map((path, index) => {
      const href = `/${pathnames.slice(0, index + 1).join("/")}`;
      return { name: path.charAt(0).toUpperCase() + path.slice(1), href };
    });
  };

  const breadcrumbs = isHome
    ? [{ name: 'Ecommerce', href: '/' }, { name: 'Home', href: '/' }]
    : [{ name: 'Ecommerce', href: '/' }, ...getBreadcrumbs(location.pathname)];

  return (
    <Breadcrumb className="flex justify-center">
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <BreadcrumbItem key={index}>
            {index < breadcrumbs.length - 1 ? (
              <Link to={breadcrumb.href}>
                {breadcrumb.name}
              </Link>
            ) : (
              <BreadcrumbPage className="text-black font-bold">
                {breadcrumb.name}
              </BreadcrumbPage>
            )}
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default function HeaderEcommerc() {
  const { wishItems , setFilter } = useContext<IGlobalContext>(GlobalContext);

  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const handleSearchProduct = () =>{        
    setFilter({
      page:0,
      type: null,
      title: searchTerm ? searchTerm : null,
      limit: 6
    })
  }
 
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-around p-5">
        <div className="flex items-center">
          <img className="h-10" src={icon} alt="icon" />
          <span className="font-semibold text-2xl ml-3">Ecommerce</span>
          <div className="flex ml-20 gap-6">
            <Link to="/">Home</Link>
            <Link to="/">Categorias</Link>
            <Link to="/">Sobre</Link>
            <Link to="/">Contato</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Procure um produto"
              value={searchTerm || ""}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border indent-3 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <FiSearch 
                  onClick={handleSearchProduct}
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-black ${searchTerm?.trim() ? 'bg-blue-800 text-black cursor-pointer border border-blue-800  rounded-sm mr-2' : 'bg-gray-200 text-gray-400 '} w-8 h-8 p-2  bg-transparent`}
                  style={{ fontSize: '1.5rem' }} 
              />  
          </div>
          <Link className="relative flex items-center" to="/carrinho">
            <CgShoppingCart className="w-7 h-7 text-gray-700" />
            {wishItems?.data?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                {wishItems.data.length}
              </span>
            )}
          </Link>
          <FaRegCircleUser className="w-7 h-7 text-gray-700" />
        </div>
      </div>
      <div className="bg-gray-100 h-20 w-full flex items-center pl-[20vw]">
        <NavegationBreadcrumb />
      </div>
    </div>
  );
}