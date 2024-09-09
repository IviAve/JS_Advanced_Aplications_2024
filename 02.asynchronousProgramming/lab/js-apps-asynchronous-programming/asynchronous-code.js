console.log('Start');

setTimeout(() => {
    console.log('Done2');
}, 2000);

setTimeout(() => {
    console.log('Done0');
}, 0);

console.log('End');

Element.addEvenetListener('click', callback)