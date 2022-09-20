export default class Form {
  constructor(element) {
    this.element = element;
    this.formElements = this.element.elements;

    this.init();
  }

  init() {
    this.element.setAttribute('novalidate', '');

    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];

      if (input.required) {
        input.addEventListener('input', this.validateInput.bind(this));
      }
    }

    this.element.addEventListener('submit', this.onSubmit.bind(this));
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      console.log('allo');

      this.showConfirmation();
    } else {
      console.log('aaloooo3');
    }
  }

  validate() {
    let isValid = true;

    for (let i = 0; i < formElements.length; i++) {
      const input = formElements[i];

      if (input.required && this.validateInput(input)) {
        isValid = false;
      }
    }

    return isValid;
  }

  validateInput(event) {
    const input = event.currentTarget || event;
    if (input.validity.valid) {
      this.removeError(input);
    } else {
      this.addError();
    }

    return input.validity.valid;
  }

  addError() {
    const container = input.closest('.input');
    container.classList.add('error');
  }

  removedError() {
    const container = input.closest('.input');
    container.classList.remove('error');
  }
}
