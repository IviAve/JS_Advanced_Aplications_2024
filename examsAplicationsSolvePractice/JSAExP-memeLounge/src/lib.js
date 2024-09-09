
import page from '../node_modules/page/page.mjs';
import { render as renderBase,html} from '../node_modules/lit-html/lit-html.js';
import {classMap} from '../node_modules/lit-html/directives/class-map.js';
import { styleMap } from '../node_modules/lit-html/directives/style-map.js';

//TODO replace with project root element
const root = document.querySelector('main');

function render(templateResult) {
    renderBase(templateResult,root);

    
}

export {
    page,
    render,
    html,
    classMap,
    styleMap
    
}