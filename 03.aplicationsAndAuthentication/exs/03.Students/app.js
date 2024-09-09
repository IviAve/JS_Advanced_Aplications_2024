async function solve() {
    const url = `http://localhost:3030/jsonstore/collections/students`;
 
    const table = document.querySelector("#results tbody");
 
    const response = await fetch(url);
 
    const data = await response.json();
 
    Object.values(data).forEach((s) => {
        const firstName = s.firstName;
        const lastName = s.lastName;
        const facultyNumber = s.facultyNumber;
        const grade = Number(s.grade);
 
 
        const tr = document.createElement("tr");
        tr.setAttribute('id', s._id);
 
        const firstNameCell = tr.insertCell(0);
        firstNameCell.textContent = firstName;
 
        const lastNameCell = tr.insertCell(1);
        lastNameCell.textContent = lastName;
 
        const facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.textContent = facultyNumber;
 
        const gradeCell = tr.insertCell(3);
        gradeCell.textContent = grade;
 
        // const delBtn = document.createElement('button');
        // delBtn.textContent = 'delete';
        // delBtn.style.width = '100%';
        // delBtn.style.color = 'red';
        // delBtn.addEventListener('click', deleteStudent)
 
        // const delBtnCell = tr.insertCell(4);
        // delBtnCell.appendChild(delBtn);
 
 
 
        table.appendChild(tr);
    });
 
    // async function deleteStudent(ev) {
    //     const id = ev.target.parentNode.parentNode.id;
    //     ev.target.parentNode.parentNode.remove();
 
    //     const deleteResponse = await fetch(`${url}/${id}`, {
    //         method: 'DELETE',
    //     });
    // }
 
    const submitBtn = document.getElementById("submit");
 
    submitBtn.addEventListener("click", onClickSubmit);
 
    async function onClickSubmit(ev) {
        ev.preventDefault();
 
        const firstNameInput = document.getElementsByName("firstName")[0];
        const lastNameInput = document.getElementsByName("lastName")[0];
        const facultyNumberInput = document.getElementsByName("facultyNumber")[0];
        const gradeInput = document.getElementsByName("grade")[0];
 
        // const inputsArray = document.querySelectorAll('.inputs input');
 
        // Array.from(inputsArray).map( input => {
        //     input.setAttribute('required','');
        // })
 
        // if (isNaN(gradeInput.value)) {
        //     return alert("Wrong grade format!");
        // }
 
        if (
            firstNameInput.value !== "" &&
            lastNameInput.value !== "" &&
            facultyNumberInput.value !== "" &&
            gradeInput.value !== "" && !isNaN (gradeInput.value)
        ) {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: firstNameInput.value,
                    lastName: lastNameInput.value,
                    facultyNumber:(facultyNumberInput.value),
                    grade: (gradeInput.value), // number was delete
                }),
            });
 
            const tr = document.createElement("tr");
 
            const firstNameCell = tr.insertCell(0);
            firstNameCell.textContent = firstNameInput.value;
 
            const lastNameCell = tr.insertCell(1);
            lastNameCell.textContent = lastNameInput.value;
 
            const facultyNumberCell = tr.insertCell(2);
            facultyNumberCell.textContent = facultyNumberInput.value;
 
            const gradeCell = tr.insertCell(3);
            gradeCell.textContent = gradeInput.value;
            table.appendChild(tr);
        }
 
        firstNameInput.value = '';
        lastNameInput.value = '';
        facultyNumberInput.value = '';
        gradeInput.value = '';
    }
}
solve();

//console.log('TODO...');