import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import DefaultLayout from '../Layouts/DefaultLayout/DefaultLayout';

// receives component and any other props represented by ...rest
export default function ProtectedRoutes({ component: Component, children, ...rest }) {
    const user = JSON.parse(localStorage.getItem('USER_INFO'));

    return user ? <DefaultLayout>{children}</DefaultLayout> : <Outlet />;
}
