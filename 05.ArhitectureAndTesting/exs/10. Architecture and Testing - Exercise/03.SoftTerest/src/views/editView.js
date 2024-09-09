const main = document.querySelector('main');
const section = document.querySelector('div[data-section="edit"]');

export function showEditView() {
    main.replaceChildren(section)
}