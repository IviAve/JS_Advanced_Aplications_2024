const container = document.querySelector('.notification');
const span = document.querySelector('.msg');

export const notifyView = (errMsg) => {
    span.textContent = errMsg;
    container.style.display = 'inline-block';
    
    setTimeout(() => {
        container.style.display = 'none';
    }, 3000);

    
}