import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import PopUp from './components/PopUp/PopUp';
import SignIn from './components/PopUp/SignIn/SignIn';
import { useSelector, useDispatch } from 'react-redux';
import { getLoadingSelector, getOpenLoginFormSelector } from './redux/selectors';
import SignUp from './components/PopUp/SignUp/SignUp';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { TOKEN } from './untils/setting/configs';
import { getFollowingList } from './redux/slice/followingSlice';
import Loading from './components/Loading/Loading';

function App() {
    const loginform = useSelector(getOpenLoginFormSelector);
    const loading = useSelector(getLoadingSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            dispatch(getFollowingList());
        }
    }, []);
    return (
        <Router>
            <div className="App">
                <>
                    <Loading hidden={!loading} />
                    <ToastContainer />
                    <PopUp>{loginform ? <SignIn /> : <SignUp />}</PopUp>
                </>

                <Routes>
                    {publicRoutes.map((item, index) => {
                        let Layout = DefaultLayout;
                        if (item.layout) {
                            Layout = item.layout;
                        } else if (item.layout === null) {
                            Layout = Fragment;
                        }
                        const Page = item.component;
                        // console.log(Layout);
                        return (
                            <Route
                                key={index}
                                path={item.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
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
