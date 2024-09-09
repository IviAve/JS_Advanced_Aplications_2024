import { page } from "./lib.js";

import { homeView } from "./views/home.js";
import { catalogView } from "./views/catalog.js";
import { registerView } from "./views/register.js";
import { loginView } from "./views/login.js";
import { updateNav } from "./utils.js";
import { logout } from "./data/user.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";

page('/', homeView);
page('/catalog', catalogView);
page('/catalog/:id', detailsView);
page('/edit/:id', editView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);

page.start();
updateNav();

document.getElementById('logoutLink').addEventListener('click', () => {
    logout();
    updateNav();
    page.redirect('/');
});