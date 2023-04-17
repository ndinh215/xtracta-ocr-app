import React, {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import {ROUTE_HOME_PAGE} from './constants';

const Notfound = lazy(() => import('$app/pages/NotFound'));
const Home = lazy(() => import('$app/pages/Home'));

const Routing = () => {
    return (
        <Suspense fallback={<LinearProgress/>}>
            <Routes>
                <Route path={ROUTE_HOME_PAGE} element={<Home/>}/>
                <Route path='*' element={<Notfound/>}/>
            </Routes>
        </Suspense>
    );
};

export default Routing;
