import React from 'react';
import Sidebar from '../pages/components/Sidebar';
import TopBar from '../pages/components/Topbar';

const MainLayout = ({ children }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <div className="flex-1 bg-gray-100 p-4 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;