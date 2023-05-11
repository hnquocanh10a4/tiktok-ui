import { HeaderOnly } from '~/layouts';
import config from '~/config';

// Pages
import Home from '~/pages/Home';
// import Following from '~/pages/Following';
import Profile from '~/pages/Profile/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search/Search';
import LogOut from '~/components/PopUp/LogOut/LogOut';
import DetailVideo from '~/pages/DetailVideo/DetailVideo';
import Following from '~/pages/Following';
import NotFound from '~/pages/NotFound/NotFound';
// import Live from '~/pages/Live';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    // { path: config.routes.following, component: Following },
    // { path: config.routes.live, component: Live },
    // test with home page
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Home },
    { path: config.routes.detai, component: DetailVideo, layout: null },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.logout, component: LogOut, layout: null },
    { path: '*', component: NotFound, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
