
const emp_container = document.getElementById("emp-list-container");
let currentId = 1;

// Clear localStorage on page load
window.onload = function () {
    localStorage.removeItem("data"); 
    createElement(); 
};

function handleSubmit() {
    let msg = document.getElementById("msg_ref");
    let name = document.getElementById("name").value;
    let profession = document.getElementById("profession").value;
    let age = document.getElementById("age").value;
    let result = [];
    
    var id = currentId++;

    if (name === "" || profession === "" || age === "") {
        msg.innerHTML = `<span class="msg_error">Error : Please Make sure All the fields are filled before adding in an employee !</span>`;
        return;
    } else {
        msg.innerHTML = `<span class="msg_success">Success : Employee Added!</span>`;
    }

    let localData = JSON.parse(localStorage.getItem("data"));
    result.push({ _id: id, name: name, profession: profession, age: age });

    if (localData) {
        localStorage.setItem("data", JSON.stringify([...localData, ...result]));
    } else {
        localStorage.setItem("data", JSON.stringify([...result]));
    }

    createElement();
    document.getElementById("name").value = "";
    document.getElementById("profession").value = "";
    document.getElementById("age").value = "";
}

function handleDelete(id) {
    let resultData = JSON.parse(localStorage.getItem("data"));
    let res = resultData.filter((val) => val._id !== id);
    localStorage.setItem("data", JSON.stringify(res));
    createElement();
}

function createElement() {
    let resultData = JSON.parse(localStorage.getItem("data"));
  
    if (resultData && resultData.length > 0) {
        emp_container.innerHTML = resultData.map((val) => {
            return ` <div class="list_box">
                <div class="emp-details-box">
                    <p>${val._id}.</p>
                    <p>Name: ${val.name}</p>
                    <p>Profession: ${val.profession}</p>
                    <p>Age: ${val.age}</p>
                </div>
    
                <button onclick="handleDelete(${val._id})" class="delete-btn">Delete User</button>
            </div>`;
        }).join(""); 
    } else {
        emp_container.innerHTML = `<h3 class="zeroEmp">You have 0 Employees.</h3>`;
    }
}

createElement();
