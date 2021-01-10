class Tooltip {
  static instance;
  element;
  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;
  }
  render(content) {
    this.element = document.createElement('div');
    this.element.className = 'tooltip';
    this.element.innerHTML = content;
    document.body.append(this.element);
  }

  onMouseOver = event => {
    const dataElem = event.target.closest('[data-tooltip]');

    if (dataElem) {
      this.render(dataElem.dataset.tooltip);
      this.computeTooltipPosition(event);

      document.addEventListener('pointermove', this.onMouseMove); // use POINTER not MOUSE
    }
  };

  onMouseMove = event => {
    this.computeTooltipPosition(event);
  };

  computeTooltipPosition(event) {
    const top = event.clientY + 10;
    const left = event.clientX + 10;
    this.element.style.top = `${top}px`;
    this.element.style.left = `${left}px`;
  };

  onMouseOut = () => {
    this.removeTooltip();
  };

  addEventListeners() {
    document.addEventListener('pointerover', this.onMouseOver);
    document.addEventListener('pointerout', this.onMouseOut);
  }

  initialize() {
    this.addEventListeners();
  } 
  
  removeTooltip() {
    if (this.element) {
      this.element.remove();
      this.element = null;

      document.removeEventListener('pointermove', this.onMouseMove);
    }
  }
  remove () {
    this.element.remove();
  }

  destroy() {
    document.removeEventListener('pointerover', this.onMouseOver);
    document.removeEventListener('pointerout', this.onMouseOut);
    this.removeTooltip();
  }
}

const tooltip = new Tooltip();

export default tooltip;
