import {showHome} from "./homeView.js"; // import-ираме си showHome от файлът homeView

document.querySelector('nav a').addEventListener('click', showHome); // добавяме eventListener с функция showHome при натискането на бутона home в навигацията
showHome(); // извикваме функцията



