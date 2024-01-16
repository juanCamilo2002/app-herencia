import SessionAuthProvider from './SessionAuthProvider';
import { SidebarProvider } from './SidebarProvider';

const Providers = ({ children }) => {
    return (
        <SessionAuthProvider> 
            <SidebarProvider>
            {children}
        </SidebarProvider>
        </SessionAuthProvider>
    );
}

export default Providers;
