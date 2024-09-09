import { page } from "./lib.js"

// TODO remove this import.
import {exampleView} from "./views/example.js";

// TODO remove this API.test.

// import * as api from './data/api.js';
// import * as userApi from './data/user.js';
// window.api = api;
// windows.userApi = userApi;


page('/' , exampleView);

page.start();
