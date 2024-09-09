import {html} from '../../node_modules/lit-html/lit-html.js';
import { dataService } from '../service/dataService.js';

const temp = (error) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Create New Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control ${findHasError(error, 'make')}" id="new-make" type="text" name="make">
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control ${findHasError(error, 'model')}" id="new-model" type="text" name="model">
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control ${findHasError(error, 'year')}" id="new-year" type="number" name="year">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control ${findHasError(error, 'description')}" id="new-description" type="text" name="description">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control ${findHasError(error, 'price')}" id="new-price" type="number" name="price">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control ${findHasError(error, 'img')}" id="new-image" type="text" name="img">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material">
                </div>
                <input type="submit" class="btn btn-primary" value="Create" />
            </div>
        </div>
    </form>
`;

function findHasError(error, prop) {
    if (!error) {
        return;
    }
    return error[prop] ? 'is-invalid' : 'is-valid';
}

let context = null;
export function showCreateView(ctx) {
    context = ctx;
    ctx.render(temp());
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    let {make, model, year, description, price, img, material} = Object.fromEntries(formData);
    year = Number(year);
    price = Number(price);

    let error = {};
    let hasError = false;

    if (make.length < 4) {
        error.make = true;
        hasError = true;
    }
    if (model.length < 4) {
        error.model = true;
        hasError = true;
    }
    if (year < 1950 || year > 2050) {
        error.year = true;
        hasError = true;
    }
    if (description.length <= 10) {
        error.description = true;
        hasError = true;
    }
    if (price <= 0) {
        error.price = true
        hasError = true;
    }
    if (!img) {
       error.img = true;
       hasError = true;
    }

    if (hasError) {
        return context.render(temp(error));
    }

    await dataService.createFurniture({make, model, year, description, price, img, material});
    context.goTo('/dashboard');
}
