import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { Fragment } from 'react';
import ProtectedRoutes from './AuthComponent/ProtectedRoutes';
import LogIn from './pages/LogIn/LogIn';
import DefaultLayout from './Layouts/DefaultLayout/DefaultLayout';

function App() {
    return (
        <Router basename="/">
            <div className="App">
                <Routes>
                    <Route path="/login" element={<LogIn />} />
                    {publicRoutes.map((route, ind) => {
                        const Layout = route.layout ? route.layout : Fragment;
                        const Page = route.component;
                        return (
                            <Route
                                key={ind}
                                path={route.path}
                                element={
                                    <DefaultLayout>
                                        <Page />
                                    </DefaultLayout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
