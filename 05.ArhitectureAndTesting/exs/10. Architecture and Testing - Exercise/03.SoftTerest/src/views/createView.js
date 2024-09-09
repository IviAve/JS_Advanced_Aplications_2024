const main = document.querySelector('main');
const section = document.querySelector('div[data-section="create"]');

export function showCreateView() {
    main.replaceChildren(section)
}