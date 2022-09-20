export default class Header {
  constructor(element) {
    this.element = element;
    this.scrollLimit = 0.1;
    this.scrollPosition = 0;
    this.lastScrollPosition = 0;
    this.html = document.documentElement;

    this.init();
    this.initNavMobile();
  }

  init() {
    const items = document.querySelectorAll('[data-autohide]');

    for (let i = 0; i < items.length; i++) {
      const element = items[i];

      if (element.dataset.autohide == 'hide') {
        window.addEventListener('scroll', this.onScroll.bind(this));
      }
    }

    if (this.element.dataset.scroll == 'scroll') {
      this.scrollLimit = 0.25;
    }
  }

  onScroll(evt) {
    this, (this.lastScrollPosition = this.scrollPosition);
    this.scrollPosition = document.scrollingElement.scrollTop;

    this.setHeaderState();
    this.setDirectionState();
  }

  setHeaderState() {
    const scrollHeight = document.scrollingElement.scrollHeight;

    if (this.scrollPosition > scrollHeight * this.scrollLimit) {
      this.html.classList.add('header-is-hidden');
    } else {
      this.html.classList.remove('header-is-hidden');
    }
  }
  setDirectionState() {
    if (this.scrollPosition >= this.lastScrollPosition) {
      this.html.classList.add('is-scrolling-down');
      this.html.classList.remove('is-scrolling-up');
    } else {
      this.html.classList.remove('is-scrolling-down');
      this.html.classList.add('is-scrolling-up');
    }
  }
  initNavMobile() {
    const toggle = this.element.querySelector('.js-toggle');

    toggle.addEventListener('click', this.onToggleNav.bind(this));
  }

  onToggleNav() {
    this.html.classList.toggle('nav-is-active');
  }
}
