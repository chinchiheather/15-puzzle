export class ConfigInput {
  constructor(label, defaultVal, minVal, onInputChange) {
    this.inputContainer = document.createElement('div');
    this.inputContainer.className = 'input-container';

    const labelEl = document.createElement('label');
    labelEl.className = 'config-label';
    labelEl.textContent = label;
    this.inputContainer.appendChild(labelEl);

    const inputEl = document.createElement('input');
    inputEl.type = 'number';
    inputEl.value = defaultVal;
    inputEl.setAttribute('min', minVal);
    inputEl.onchange = (event) => {
      let newVal = +event.target.value;
      // even with min attribute a user can manually enter a number outside the allowed range
      if (newVal < minVal) {
        newVal = minVal;
        inputEl.value = minVal;
      }
      onInputChange(newVal);
    };
    this.inputContainer.appendChild(inputEl);
  }

  get element() {
    return this.inputContainer;
  }
}
