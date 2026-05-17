/**
 * Class representing an employee.
 * @class
 */
export class Employee {
  /** @type {number} Unique identifier of the employee (private field) */
  #id;
  /** @type {string} Name of the employee (private field, defaults to "Anonymous") */
  #name="Anonymous";
  /** @type {string} Position or department of the employee (public field) */
  title;
  /** @type {number} Salary of the employee (private field) */
  #salary;

  /**
   * Creates an instance of Employee.
   * @param {number} id - Unique identifier of the employee.
   * @param {string} name - Name of the employee.
   * @param {string} title - Position or department.
   * @param {number} salary - Salary of the employee (must be strictly greater than 10000).
   */
  constructor(id,name,title, salary) {
    this.#id=id;
    this.setName(name);
    this.title=title;
    this.setSalary(salary);
  }

  /**
   * Validates and sets the employee's name. Trims whitespace.
   * @param {string} name - New name of the employee.
   * @returns {void}
   */
  setName(name) {
    if(typeof name=='string' && name.trim()) {
      this.#name=name.trim();
    }
  }

  /**
   * Validates and sets the employee's salary.
   * Updates only if the value is a number and strictly greater than 10000.
   * @param {number} salary - New salary value.
   * @returns {void}
   */
  setSalary(salary) {
    if (typeof salary=='number'&& salary>10000) {
      this.#salary=salary;
    }
  }

  /**
   * Gets the employee's name.
   * @returns {string} Current name of the employee.
   */
  getName(){
    return this.#name;
  }

  /**
   * Gets the employee's salary.
   * @returns {number} Current salary of the employee.
   */
  getSalary(){
    return this.#salary;
  }

  /**
   * Gets the unique identifier of the employee.
   * @returns {number} Employee ID.
   */
  getId(){
    return this.#id;
  }

  /**
   * Returns a string representation of the employee's information.
   * @returns {string} String with employee data (Name, Salary, Title).
   */
  toString(){
    return `Employee ${this.#name} ${this.#salary} ${this.title} `;
  }

  /**
   * Convert class to JSON format
   * @returns {Object}
   */
  toJSON(){
    return {
      id:this.getId(),
      name:this.getName(),
      title:this.title,
      salary:this.getSalary()
    }
  }
}

/**
 * Class managing company staff and payroll operations.
 * @class
 */
export class Company{
  /** @type {Employee[]} Array containing the list of all hired employees (private field) */
  #employees=[];
  /** @type {string} Key for local storage */
  #storageKey = 'company_employees_data';

  /**
   * Hires (adds) a new employee to the roster.
   * Checks if the passed object is an instance of the Employee class and if its ID is unique.
   * @param {Employee} employee - Employee object to add.
   * @returns {void}
   */
  hireEmployee(employee){
    if (!(employee instanceof Employee)){
      console.error('Operation failed: Invalid Employee object');
      return;
    }

    const isDuplicate = this.#employees.some(e => e.getId() === employee.getId());
    if (isDuplicate) {
      console.warn(`Validation error: Employee ID ${employee.getId()} already exists.`);
      return;
    }

    this.#employees.push(employee);
  }

  /**
   * Fires (removes) an employee from the roster by their unique ID.
   * @param {number} id - Identifier of the employee to remove.
   * @returns {void}
   */
  fireEmployee(id){
    const initialCount = this.#employees.length;
    this.#employees= this.#employees.filter(e => e.getId() !== id);

    if (this.#employees.length === initialCount) {
      console.warn(`Termination failed: Employee with ID ${id} not found.`);
    }
  }

  /**
   * Returns a copy of the list of all employees.
   * @returns {Employee[]} Array of employee objects.
   */
  getAllEmployees(){
    return [...this.#employees];
  }

  /**
   * Calculates the total monthly payroll for all employees.
   * @returns {number} Total salary amount.
   */
  getTotalSalary(){
    return this.#employees.reduce((total, e) => total + (e.getSalary() || 0), 0);
  }

  /**
   * Finds the employee with the lowest salary in the company.
   * @returns {Employee|null} Employee object with minimum salary or null if staff is empty.
   */
  getEmployeeMinSalary(){
    if (this.#employees.length === 0) return null;

    return this.#employees.reduce((min, e) => (e.getSalary() < min.getSalary() ? e : min));
  }

  /**
   * Clear all company data
   */
  clearCompany() {
    this.#employees = [];
    localStorage.removeItem(this.#storageKey);
  }

  /**
   * Save all company data on a local storage
   */
  saveToStorage(){
    const compData = this.#employees.map(
      emp => emp.toJSON()
    );
    localStorage.setItem(this.#storageKey, JSON.stringify(compData));
  }

  /**
   * Load all company data from a local storage
   */
  loadFromStorage(){
    try {
      const dataStr = localStorage.getItem(this.#storageKey);
      if (!dataStr) return;

      const rawData = JSON.parse(dataStr);
      this.#employees = rawData.map(
        field => new Employee(field.id, field.name, field.title, field.salary)
      )
    } catch (error) {
      console.error('Error loading Employee data:', error);
      this.#employees = [];
    }
  }
}
