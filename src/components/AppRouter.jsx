import { Route, Routes } from 'react-router-dom'
import { adminRoutes, privateRoutes, publicRoutes } from '../router';
import { useContext } from 'react';
import { AppContext } from '../context';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
    const {store: { user }} = useContext(AppContext);

    return ( 
        <Routes>
            {user.isAuth && privateRoutes.map(route => 
                <Route 
                    key={route.path}
                    element={route.component} 
                    path={route.path}/>
            )}
            {user.user.role === "ADMIN" && adminRoutes.map(route => 
                <Route 
                    key={route.path}
                    element={route.component} 
                    path={route.path}/>
            )}
            {publicRoutes.map(route => 
                <Route 
                    key={route.path}
                    element={route.component} 
                    path={route.path}/>
            )}
        </Routes>
    );
});
 
export default AppRouter;