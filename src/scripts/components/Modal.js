export default class Modal {
  constructor(element) {
    this.element = element;
    this.modalId = this.element.dataset.modalId;

    this.init();
  }

  init() {
    this.element.addEventListener('click', this.open.bind(this));

    this.close = this.close.bind(this);

    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        document.documentElement.classList.remove('modal-is-active');
        console.log('yolo');
      }
    });

    const items = document.querySelectorAll('[data-modal]');

    for (let i = 0; i < items.length; i++) {
      const element = items[i];

      if (element.dataset.modal == 'auto') {
        setTimeout(this.appendModal.bind(this), 5000);
      }
    }
  }

  open(event) {
    event.preventDefault();
    this.appendModal();
  }

  close(event) {
    //méthode pour fermer la modal
    document.documentElement.classList.remove('modal-is-active');
    this.closeButton.removeEventListener('click', this.close);

    setTimeout(this.destroy.bind(this), 1000);
  }

  destroy() {
    // détruit l'élément cibler
    this.modalElement.parentElement.removeChild(this.modalElement);
  }

  appendModal() {
    const template = document.querySelector(`#${this.modalId}`);

    if (template) {
      this.modalElement = template.content.firstElementChild.cloneNode(true);

      document.body.appendChild(this.modalElement);

      this.element.getBoundingClientRect();
      document.documentElement.classList.add('modal-is-active');

      this.closeButton = this.modalElement.querySelector('.js-close');
      this.closeButton.addEventListener('click', this.close);
    } else {
      console.log(`Le <template> avece le id ${this.modalId} nexiste pas`);
    }
  }
}
