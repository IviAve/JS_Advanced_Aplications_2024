import { dataService } from "../api/dataService.js";

const main = document.querySelector('main');
const section = document.querySelector('div[data-section="dashboard"]');

export function showDashboardView() {
    main.replaceChildren(section);

    loadAllIdea(); // повикваме функцията loadAllIdea
}

// Правим асинхронна функция loadAllIdea, която:
async function loadAllIdea() {
    const data = await dataService.getAllIdea(); // изъплнява функцията getAllIdea от обекта dataService и взима data-та.
}