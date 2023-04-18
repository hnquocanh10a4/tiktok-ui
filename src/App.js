import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import { useSelector } from 'react-redux';
import PopUp from './components/PopUp/PopUp';
import { getLoginFormSelector } from './redux/selectors';
import SignIn from './components/PopUp/SignIn/SignIn';

function App() {
    const stateLoginForm = useSelector(getLoginFormSelector);

    return (
        <Router>
            <div className="App">
                {stateLoginForm ? (
                    <>
                        <PopUp>
                            <SignIn />
                        </PopUp>
                    </>
                ) : (
                    ''
                )}
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
