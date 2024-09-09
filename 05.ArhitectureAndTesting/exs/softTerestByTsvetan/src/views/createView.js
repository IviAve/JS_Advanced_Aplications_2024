import {html} from '../../node_modules/lit-html/lit-html.js';
import { dataService } from '../service/dataService.js';
import { goTo } from '../utility/goTo.js';
import { renderer } from '../utility/render.js';

const temp = () => html`
    <div class="container home wrapper my-md-5 pl-md-5">
        <div class="d-md-flex flex-mb-equal">
            <div class="col-md-6">
                <img class="responsive-ideas create" src="./images/creativity_painted_face.jpg" alt="" />
            </div>
            <form @submit=${onSubmit} class="form-idea col-md-5" action="" method="">
                <div class="text-center mb-4">
                    <h1 class="h3 mb-3 font-weight-normal">Share Your Idea</h1>
                </div>
                <div class="form-label-group">
                    <label for="ideaTitle">Title</label>
                    <input type="text" id="ideaTitle" name="title" class="form-control" placeholder="What is your idea?"
                        required="" autofocus="" />
                </div>
                <div class="form-label-group">
                    <label for="ideaDescription">Description</label>
                    <textarea type="text" name="description" class="form-control" placeholder="Description"
                        required=""></textarea>
                </div>
                <div class="form-label-group">
                    <label for="inputURL">Add Image</label>
                    <input type="text" id="inputURL" name="imageURL" class="form-control" placeholder="Image URL"
                        required="" />
                </div>
                <button class="btn btn-lg btn-dark btn-block" type="submit">
                    Create
                </button>

                <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2021.</p>
            </form>
        </div>
    </div>
`;

export function showCreateView() {
    renderer(temp());
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    let {title, description, imageURL} = Object.fromEntries(formData);

    if (title.length < 6 || description.length < 10 || imageURL.length < 5) {
        return;
    }

    await dataService.createIdea({title, description, img: imageURL});
    goTo('/dashboard');
    e.target.reset();
}
