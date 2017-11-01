export class ConfigInput {
  constructor(label, defaultVal, minVal, onInputChange) {
    this.inputContainer = document.createElement('div');
    this.inputContainer.className = 'input-container';

    this.addLabelEl(label);
    this.addInputEl(defaultVal, minVal, onInputChange);
  }

  addLabelEl(text) {
    const labelEl = document.createElement('label');
    labelEl.className = 'config-label';
    labelEl.textContent = text;
    this.inputContainer.appendChild(labelEl);
  }

  addInputEl(defaultVal, minVal, onInputChange) {
    const inputEl = document.createElement('input');
    inputEl.type = 'number';
    inputEl.value = defaultVal;
    inputEl.setAttribute('min', minVal);
    inputEl.addEventListener('change', (event) => {
      let newVal = +event.target.value;
      // even with min attribute a user can manually enter a number outside the allowed range
      if (newVal < minVal) {
        newVal = minVal;
        inputEl.value = minVal;
      }
      onInputChange(newVal);
    });
    this.inputContainer.appendChild(inputEl);
  }

  get element() {
    return this.inputContainer;
  }
}
