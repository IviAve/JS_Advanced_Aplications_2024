const main = document.querySelector('main');
const section = document.querySelector('div[data-section="details"]');

export function showDetailsView() {
    main.replaceChildren(section)
}