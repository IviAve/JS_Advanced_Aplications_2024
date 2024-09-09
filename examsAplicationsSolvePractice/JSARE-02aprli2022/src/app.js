import { page } from "./lib.js"

// TODO remove this import.

//import { showHome } from "./views/home.js";
import { registerView } from "./views/register.js";
import { loginView} from "./views/login.js";
import { logoutView } from "./views/logout.js";
import { updateNav } from "./utils.js";
import { dashboardView } from "./views/dashboard.js";
import { addNewItemView } from "./views/addNewItemView.js";
import { detailsView } from "./views/detailsAndDeletebtnView.js";
import { editView } from "./views/editView.js";
import { showMyPostView } from "./views/mypostView.js";
import { showHome } from "./views/home.js";
//import { searchView } from "./views/searchView.js";




page('/' , showHome);
page('/register' , registerView);
page('/login' , loginView);
page('/logout', logoutView);
page('/dashboard', dashboardView);
page('/addPostcard', addNewItemView);
page('/details/:id', detailsView)
page('/edit/:id', editView)
page('/mypost', showMyPostView)
//page('/search', searchView)

page.start();
updateNav();

