
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className="max-w-[1300px]  mx-auto">
            <Navbar></Navbar>
            <div className="py-10">
               <Outlet></Outlet>
           </div>
           {/* main */}
         
           
           
        </div>
    );
};

export default Main;