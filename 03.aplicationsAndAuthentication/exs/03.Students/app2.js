async function students() {
 
    const formRef = document.getElementById('form');
    const bodyRef = document.querySelector('tbody');
    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', onSubmit);
 
    const URL = 'http://localhost:3030/jsonstore/collections/students';
 
    const response = await fetch(URL);
    const data = await response.json();
    
    if (!response.ok) {
        const error = response.json();
        return alert(error.message);
    }
 
    Object.keys(data).forEach(user => {
        const trEl = document.createElement('tr');
        const fNameTh = document.createElement('th');
        fNameTh.textContent = data[user].firstName;
        const lNameTh = document.createElement('th');
        lNameTh.textContent = data[user].lastName;
        const fNumTh = document.createElement('th');
        fNumTh.textContent = data[user].facultyNumber;
        const gradeTh = document.createElement('th');
        gradeTh.textContent = Number(data[user].grade).toFixed(2);
 
        trEl.appendChild(fNameTh);
        trEl.appendChild(lNameTh);
        trEl.appendChild(fNumTh);
        trEl.appendChild(gradeTh);
        bodyRef.appendChild(trEl);
    })
 
    async function onSubmit(event) {
        event.preventDefault();
 
        const formData = new FormData(formRef);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const facultyNumber = Number(formData.get('facultyNumber'));
        const grade = Number(formData.get('grade'));
 
        if (firstName === '' || lastName === '' || facultyNumber === '' || grade === '' || isNaN(grade)) {
            return;
        }
 
        
 
        const newUser = { firstName, lastName, facultyNumber, grade };
 
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }
        const postResponse = await fetch(URL, option);
 
        if (!response.ok) {
            const error = response.json();
            return alert(error.message);
        }
 
        location.reload();
        formRef.reset();
 
    }
 
}
 
students();