import React from 'react';
import PageWrapper from '../components/template/PageWrapper';
import { MenuItem } from '../components/template/types';

interface ProtectedRouteProps {
    children: React.ReactNode;
    menuItems: Record<string, MenuItem[]>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, menuItems }) => { 
    return <PageWrapper children={children} menuItems={menuItems} />;
};

export default ProtectedRoute;
