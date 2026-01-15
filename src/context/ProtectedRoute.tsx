import React from 'react';
import { PageWrapper } from 'fog-ui';
import type { MenuItem } from 'fog-ui';

interface ProtectedRouteProps {
    children: React.ReactNode;
    menuItems: Record<string, MenuItem[]>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, menuItems }) => {
    return <PageWrapper children={children} menuItems={menuItems} />;
};

export default ProtectedRoute;
