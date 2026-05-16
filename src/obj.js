export class Employee {
  #id;
  #name="Anonymous";
  title;
  #salary;
  constructor(id,name,title, salary) {
    this.#id=id;
    this.setName(name);
    this.title=title;
    this.setSalary(salary);
  }
  // I think use here .trim() is good practices
  setName(name) {
    if(typeof name=='string' && name.trim()) {
      this.#name=name.trim();
    }
  }

  setSalary(salary) {
    if (typeof salary=='number'&& salary>10000) {
      this.#salary=salary;
    }
  }
  getName(){
    return this.#name;
  }
  getSalary(){
    return this.#salary;
  }
  getId(){
    return this.#id;
  }
  toString(){
    return `Employee ${this.#name} ${this.#salary} ${this.title} `;
  }
}

/**
 * Manages company staff and payroll operations.
 */
export class Company{
  #employees=[];

  /**
   * Adds a new employee to the roster
   * @param {Employee} employee
   */
  hireEmployee(employee){
    if (!(employee instanceof Employee)){
      console.error('Operation failed: Invalid Employee object');
      return;
    }

    const isDublicate = this.#employees.some(e => e.getId() === employee.getId());
    if (isDublicate) {
      console.warn(`Validation error: Employee ID ${employee.getId()} already exists.`);
      return;
    }

    this.#employees.push(employee);
  }

  /**
   * Remove employee from the roster by ID
   * @param {number} id
   */
  fireEmployee(id){
    const initialCount = this.#employees.length;
    this.#employees= this.#employees.filter(e => e.getId() !== id);

    if (this.#employees.length === initialCount) {
      console.warn(`Termination failed: Employee with ID ${id} not found.`);
    }
  }

  /**
   * Retrieves all employees
   * @returns {Employee[]}
   */
  getAllEmployees(){
    return [...this.#employees];
  }

  /**
   *  Calculate the total monthly payroll
   *  @returns {number}
   */
  getTotalSalary(){
    return this.#employees.reduce((total, e) => total + (e.getSalary() || 0), 0);
  }

  /**
   * Find the lowest salary
   * @returns {number|null}
   */
  getEmployeeMinSalary(){
    if (this.#employees.length === 0) return null;

    // that is not a good if we have many employees
    // return Math.min(...this.#employees.map((e) => e.getSalary()), 0);

    return this.#employees.reduce((min, e) => (e.getSalary() < min.getSalary() ? e : min));


  }
}
