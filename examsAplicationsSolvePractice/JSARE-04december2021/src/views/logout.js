import * as userService from "../apies/user.js"

import {page} from "../lib.js"
import { updateNav } from "../utils.js";



export async function logoutView(){
    await userService.logout();
    updateNav();
    page.redirect("/")
 }