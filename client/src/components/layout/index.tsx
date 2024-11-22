import { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom';
import ContentArea from './ContentArea';
import Sidebar from './Sidebar';


type Props = {
    children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
    const location = useLocation();
    if (location.pathname === '/login' || location.pathname === '/register') {
        return (
            <>
                {children}
            </>
        )
    }

    return (
        <div className='h-screen flex items-center justify-center'>
            <div className='grid grid-cols-1 md:grid-cols-5 xl:grid-cols-7 lg:w-11/12 lg:h-11/12 max-w-screen-xl w-full h-full bg-neutral-800 rounded-md'>
                <Sidebar />
                <ContentArea>
                {children}
                </ContentArea>
            </div>
        </div>
    )


}

export default Layout;