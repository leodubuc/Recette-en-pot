import Icons from './utils/Icons';
import Scrolly from './utils/components/Scrolly';
import Carousel from './components/Carousel';
import Video from './components/Video';
import Header from './components/Header';
import Modal from './components/Modal';
import Form from './components/Form';
import Cursor from './components/Cursor';

/** Classe principale du projet */
class Main {
  /**
   * Méthode constructeur
   */
  constructor() {
    this.init();
  }

  /**
   * Méthode d'initialisation
   */
  init() {
    document.documentElement.classList.add('has-js');

    Icons.load();

    const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (componentName == 'Carousel') {
        new Carousel(element);
      }
      if (componentName == 'Video') {
        new Video(element);
      }
      if (componentName == 'Header') {
        new Header(element);
      }
      if (componentName == 'Modal') {
        new Modal(element);
      }
      if (componentName == 'Scrolly') {
        new Scrolly(element);
      }

      if (componentName == 'Form') {
        new Form(element);
      }
    }
  }
}

new Main();
