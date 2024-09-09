import page from '../node_modules/page/page.mjs';
import { logout } from './utility/logout.js';
import { updateNav } from './utility/updateNav.js';
import { showCreateView } from './views/createView.js';
import { showDashboardView } from './views/dashboardView.js';
import { showHomeView } from './views/homeView.js';
import { showLoginView } from './views/loginView.js';
import { showRegisterView } from './views/registerView.js';
import { showDetailsView } from './views/showDetails.js';

showHomeView();
page('/', showHomeView);
page('/dashboard', showDashboardView);
page('/register', showRegisterView);
page('/login', showLoginView);
page('/logout', logout);
page('/create', showCreateView);
page('/details/:id', showDetailsView);
//page('/delete', () => console.log('delete'))

page.start();
updateNav();