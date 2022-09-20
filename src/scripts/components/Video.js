/** Composante Video de TimTools*/
export default class Video {
  /**
   *  Méthode constructeur
   *  @param{HTMLElement}element Élément HTML sur lequel La composante est instanciée
   */
  constructor(element) {
    this.element = element;

    this.videoContainer = this.element.querySelector('.js-video');
    this.poster = this.element.querySelector('.js-poster');
    this.videoId = this.element.dataset.videoId;
    this.autoplay = this.poster ? 1 : 0;
    this.playerReady = false;

    Video.instances.push(this);

    if (this.videoId) {
      Video.loadScript();
    } else {
      console.error('Vous devez spécifier un id');
    }
  }

  static loadScript() {
    //sert a charger la vidéo youtube
    if (!Video.scriptIsLoading) {
      Video.scriptIsLoading = true;
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api?control=0'; //la parti iframe_api va être remplacer par le html de la vidéo a jouer
      document.body.appendChild(script);
    }
  }

  /*
   * Méthode d'initialisation
   */
  init() {
    document.documentElement.classList.add('is-video-ready');

    this.initPlayer = this.initPlayer.bind(this);

    if (this.poster) {
      this.element.addEventListener('click', this.initPlayer.bind(this));
    } else {
      this.initPlayer();
    }
  }

  initPlayer(event) {
    if (event) {
      this.element.removeEventListener('click', this.initPlayer);
    }

    this.player = new YT.Player(this.videoContainer, {
      height: '100%',
      width: '100%',
      videoId: this.videoId,
      playerVars: { rel: 0, autoplay: this.autoplay },

      events: {
        onReady: () => {
          this.playerReady = true;

          const observer = new IntersectionObserver(this.watch.bind(this), {
            rootMargin: '0px 0px 0px 0px',
          });
          observer.observe(this.element);
        },
        onStateChange: (event) => {
          if (event.data == YT.PlayerState.PLAYING) {
            // pause tous Les vidéos SAUF celui qui joue
            Video.pauseAll(this);
          } else if (event.data == YT.PlayerState.ENDED) {
            this.player.seekTo(0);
            this.player.pauseVideo();
          }
        },
      },
    });
  }

  watch(entries) {
    if (this.playerReady && !entries[0].isIntersecting) {
      this.player.pauseVideo();
    }
  }

  static initAll() {
    document.documentElement.classList.add('is-video-ready');

    for (let i = 0; i < Video.instances.length; i++) {
      const instance = Video.instances[i];
      instance.init();
    }
  }

  static pauseAll(currentInstance) {
    for (let i = 0; i < Video.instances.length; i++) {
      const instance = Video.instances[i];
      if (instance.playerReady && instance !== currentInstance) {
        instance.player.pauseVideo();
      }
    }
  }
}

Video.instances = [];

window.onYouTubeIframeAPIReady = Video.initAll;
