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

/**
 * Show the action message
 * @param {string} text
 * @param {boolean} isError
 */

function showMessage(text, isError=false){
  messageBox.textContent = text;
  messageBox.style.color = isError ? 'red' : 'green';
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
}

btnAdd.addEventListener('click', showMessage)
{
  showMessage('Button Add clicked')
}


btnSearch.addEventListener('click', showMessage)
{
  showMessage('Button Search clicked')
}

btnReset.addEventListener('click', showMessage)
{
  showMessage('Button Reset clicked')
}

renderEmployees();