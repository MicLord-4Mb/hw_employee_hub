import {Company, Employee} from "./obj.js";

const myCompany = new Company();


const formContainer = document.querySelector('.app-form');
const inputId = document.getElementById('emp-id');
const inputName = document.getElementById('emp-name');
const inputTitle = document.getElementById('emp-title');
const inputSalary = document.getElementById('emp-salary');
const btnAdd = document.getElementById('btn-add');
const btnSearch = document.getElementById('btn-search');
const btnReset = document.getElementById('btn-reset');
const inputSearch = document.getElementById('search-query');
const messageBox = document.getElementById('message-box');
const rootStyles = window.getComputedStyle(document.documentElement);
const successColor = rootStyles.getPropertyValue('--color-success').trim();
const errorColor = rootStyles.getPropertyValue('--color-cancel').trim();

/**
 * Show an action message
 * @param {string} text
 * @param {boolean} isError
 */

function showMessage(text, isError=false){
  messageBox.textContent = text;
  messageBox.style.color = isError ? errorColor : successColor;
}

/**
 * Render employees list in the main section
 * @param {Employee[]} employeesToRender
 */
function renderEmployees(employeesToRender = myCompany.getAllEmployees()) {

  if (employeesToRender.length === 0) {
    formContainer.innerHTML = '<p>Employee list is empty or no matches found.</p>';
    return;
  }

  let html = '<ul>';
  employeesToRender.forEach(emp => {
    html += `
      <li>
        <div>
          <strong>ID:</strong> ${emp.getId()} |
          <strong>Name:</strong> ${emp.getName()} |
          <strong>Title:</strong> ${emp.title} |
          <strong>Salary:</strong> ${emp.getSalary()}
        </div>
        <div>
          <button onclick="editEmployee(${emp.getId()})">Edit</button>
          <button onclick="deleteEmployee(${emp.getId()})" style="color: ${errorColor}">Delete</button>
        </div>      
      </li>
    `;
  })

  html += '</ul>';
  formContainer.innerHTML = html;
}

btnAdd.addEventListener('click', () => {
  const id = parseInt(inputId.value);
  const name = inputName.value.trim();
  const title = inputTitle.value.trim();
  const salary = parseFloat(inputSalary.value);

  // Data validation block
  if (!id || isNaN(id) || id<1) return showMessage('Error: Invalid ID', true);
  if (!name) return showMessage('Error: Name is empty', true);
  if (!title) return showMessage('Error: Title is empty', true);
  if (!salary || salary <= 10000) return showMessage('Error: Salary must be greater than 10`000 (company rules)', true);

  const isExist = myCompany.getAllEmployees().find(e => e.getId() === id);

  // Update employee section
  if (isExist) {
    myCompany.fireEmployee(id);
    const updatedEmp = new Employee(id, name, title, salary);
    myCompany.hireEmployee(updatedEmp);
    showMessage(`Employee info with ID${id} updated.`);
  }
  else {
    // add employee section
    const newEmployee = new Employee(id, name, title, salary);
    myCompany.hireEmployee(newEmployee);
    showMessage('Successfully Added Employee');
  }

  // Reset form before render
  inputId.value = '';
  inputName.value = '';
  inputTitle.value = '';
  inputSalary.value = '';

  renderEmployees();
});


btnSearch.addEventListener('click', () => {
  showMessage('Search button clicked')
  const query = inputSearch.value.toLowerCase().trim();
  if (!query) return renderEmployees();

  const filteredEmployees = myCompany.getAllEmployees().filter(emp =>
    emp.getName().toLowerCase().includes(query) ||
    emp.title.toLowerCase().includes(query)
  );

  if (filteredEmployees.length === 0) {
    showMessage('No results found.', true);
  }
  else {
    showMessage(`Employees found: ${filteredEmployees.length}`);
  }

  renderEmployees(filteredEmployees);
});

btnReset.addEventListener('click', () => {
  inputSearch.value = '';
  showMessage('')
  renderEmployees();
});

window.deleteEmployee = (id) => {
  myCompany.fireEmployee(id);
  showMessage(`Employee with ID ${id} deleted`);
  renderEmployees();
};

window.editEmployee = (id) => {
  const emp = myCompany.getAllEmployees().find(e => e.getId() === id);
  inputId.value = emp.getId();
  inputName.value = emp.getName();
  inputTitle.value = emp.title;
  inputSalary.value = emp.getSalary();
  showMessage('Data loaded to the head section. Edit and click "Add / Update Employee"');
}

renderEmployees();