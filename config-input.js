export class ConfigInput {
  constructor(label, prop, defaultVal, onInputChange) {
    this.inputContainer = document.createElement('div');
    this.inputContainer.className = 'input-container';
    
    const labelEl = document.createElement('label');
    labelEl.className = 'config-label';
    labelEl.textContent = label;
    this.inputContainer.appendChild(labelEl);

    const inputEl = document.createElement('input');
    inputEl.type = 'number';
    inputEl.value = defaultVal;
    inputEl.onchange = (event) => onInputChange(prop, +event.target.value);
    this.inputContainer.appendChild(inputEl);
  }

  get element() {
    return this.inputContainer;
  }
}