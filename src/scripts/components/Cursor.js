export default class Cursor {
  constructor(element) {
    this.element = element;

    document.documentElement.classList.add('custom-cursor');

    this.init();
  }

  init() {
    this.initCursorActions();
    this.initHoverAnimation();
  }

  initCursorActions() {
    document.addEventListener('mousemove', this.followCursor.bind(this));
    document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  initHoverAnimation() {
    const links = document.querySelectorAll('a, button, .testDarkMode');

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      if (link.dataset.cursor != 'not-hover') {
        if (link.dataset.cursor == 'Mode-sombre') {
          link.addEventListener('mouseenter', this.onDarkOver.bind(this));
          link.addEventListener('mouseleave', this.onDarkOut.bind(this));
        } else {
          link.addEventListener('mouseenter', this.onLinkHover.bind(this));
          link.addEventListener('mouseleave', this.onLinkOut.bind(this));
        }
      }
    }
  }

  followCursor(evt) {
    const mouseX = evt.pageX;
    const mouseY = evt.pageY;

    this.element.style.left = `${mouseX}px`;
    this.element.style.top = `${mouseY}px`;
  }

  onLinkHover() {
    this.element.classList.add('hover');
  }
  onLinkOut() {
    this.element.classList.remove('hover');
  }
  onMouseDown() {
    this.element.classList.add('down');
  }
  onMouseUp() {
    this.element.classList.remove('down');
  }
  onDarkOver() {
    this.element.classList.add('sombre');
  }
  onDarkOut() {
    this.element.classList.remove('sombre');
  }
}
