import { data } from "./data.js";

// Pikachu
import Pikachu from "./pikachu.js";
import Estado from "./estado.js";
import Puntuacion from "./puntuacion.js";
import Objetivo from "./objetivos.js";
import Evoluciones from "./evoluciones.js";

// Enemigo
import Snorlax from './jefes/snorlax.js';

// Portal
import Portal from './portal.js';

import Mensaje from './mensajes/mensaje.js';

export default class JefePlanta extends Phaser.Scene {
  
  constructor() {
    super({ key: 'jefePlanta' });
  }


  preload() {  
    this.load.tilemapTiledJSON('mapPlanta', 'assets/tiles/mapa/mapa_jefe_planta.json');

    // Tilesets
    this.load.image('zonaPlanta', 'assets/tiles/dungeonPlanta.png');
    
    // Portal
    this.load.spritesheet('portal', 'assets/tiles/portal.png',{ frameWidth: 256, frameHeight: 256 });

    this.load.audio("musica_planta", [
      "assets/music/Bosque.ogg",
      "assets/music/Bosque.mp3"
    ]);
    this.load.audio("musicaEvolucion", [
      "assets/music/Evolucion.ogg",
      "assets/music/Evolucion.mp3"
    ]);this.load.audio("musicaAtaque", [
      "assets/music/Ataque.ogg",
      "assets/music/Ataque.mp3"
    ]);
    this.load.audio("musicaPortal", [
      "assets/music/Portal.ogg",
      "assets/music/Portal.mp3"
    ]);
    this.load.audio("musicaDamage", [
      "assets/music/Damage.ogg",
      "assets/music/Damage.mp3"
    ]);
    this.load.audio("musicaRecuperarse", [
      "assets/music/Recuperarse.ogg",
      "assets/music/Recuperarse.mp3"
    ]);



    // Pikachu
    this.load.spritesheet('protagonista', 'assets/icons/personajes/Protagonista/8/25.png',{ frameWidth: 48, frameHeight: 64 });

    // Enemigo
    this.load.spritesheet('snorlax', 'assets/icons/personajes/Boss/boss_planta.png',{ frameWidth: 48, frameHeight: 64 });

    // Barra vida
    this.load.image('vida10', 'assets/estado/VIDA_10.png');
    this.load.image('vida9', 'assets/estado/VIDA_9.png');
    this.load.image('vida8', 'assets/estado/VIDA_8.png');
    this.load.image('vida7', 'assets/estado/VIDA_7.png');
    this.load.image('vida6', 'assets/estado/VIDA_6.png');
    this.load.image('vida5', 'assets/estado/VIDA_5.png');
    this.load.image('vida4', 'assets/estado/VIDA_4.png');
    this.load.image('vida3', 'assets/estado/VIDA_3.png');
    this.load.image('vida2', 'assets/estado/VIDA_2.png');
    this.load.image('vida1', 'assets/estado/VIDA_1.png');
    this.load.image('vida0', 'assets/estado/VIDA_0.png');
    this.load.image('vidahit', 'assets/estado/VIDA_HIT.png');
  }

  init(datos) {
    this.datosInit = datos;
    this.protagonista = this.datosInit.pikachuData;
  }

  create() {

    this.recienLlegado = true;
    this.mensajeActivo = false;

    this.map = this.make.tilemap({ 
      key: 'mapPlanta', 
      tileWidth: 5325, 
      tileHeight: 3150 
    });

    let musicaMuroConfig = {
      mute: false,
      volume: 0.3,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    };
    this.musicaMuro = this.sound.add('musicaMuro', musicaMuroConfig);

    this.map.addTilesetImage('pr1', 'zonaPlanta');

    this.activarPortal = false;
    this.portalExiste = false;

    // Capas, los nombres han de coincidir con los de las capas reales
    this.borde = this.map.createStaticLayer('borde', ['pr1']);
    this.suelo = this.map.createStaticLayer('suelo', ['pr1']);
    
    
   // Para que colisionen los personajes que tengan un rango de ID concreto
    this.borde.setCollisionBetween(0, 9999);

    this.xPikachu = 485;
    this.yPikachu = 420;

    this.pikachuSprite = new Pikachu(this, this.xPikachu, this.yPikachu);
    this.pikachuSprite.vida = this.protagonista.vida;
    this.pikachuSprite.evoluciones = this.protagonista.evoluciones;
    this.pikachuSprite.puntuacion = this.protagonista.puntuacion;
    this.pikachuSprite.jefesIslasRestantes = this.protagonista.jefesIslasRestantes;
    this.pikachuSprite.snorlax = this.protagonista.snorlax;
    this.pikachuSprite.articuno = this.protagonista.articuno;
    this.pikachuSprite.zapdos = this.protagonista.zapdos;
    this.pikachuSprite.moltres = this.protagonista.moltres;
    this.pikachuSprite.mewtwo = this.protagonista.mewtwo;
    this.pikachuSprite.nivelRequerido = this.protagonista.nivelRequerido;

    this.cursor = this.input.keyboard.addKeys({
      up: 'up',
      down: 'down',
      left: 'left',
      right: 'right',
      space: 'space',
      pause:'p',
      c:'c',
      r:'r',
      e:'e',
      i: 'i'
    });


    this.vidaPikachu = new Estado(this);
    this.puntuacion = new Puntuacion(this);
    this.objetivo = new Objetivo(this);
    this.marcador = new Evoluciones(this);

    // Enemigo
    this.xJefe = 485;
    this.yJefe = 320;
    this.jefe = new Snorlax(this, this.xJefe, this.yJefe);
       

    // Colisiones
    this.physics.add.collider(this.pikachuSprite, this.borde, () => { if(!this.musicaMuro.isPlaying)this.musicaMuro.play()});
    this.physics.add.collider(this.jefe, this.borde);
    
    
    // Camera zoom
    const camera = this.cameras.main;
    camera.setZoom(2);
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    camera.startFollow(this.pikachuSprite);

    // Música
    let config = {
      mute: false,
      volume: 0.3,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    };
    this.music = this.sound.add('musica_planta', config);
    if(data.musica) {
      this.music.play();
    }
  }

  update(time, delta) {
    
    this.puntuacion.updatePuntos(this.pikachuSprite.puntuacion);
    this.vidaPikachu.updateVida(this.pikachuSprite.vida, this.animacionHerido);
    this.objetivo.updateObjetivo(this.pikachuSprite.snorlax, this.pikachuSprite.articuno, this.pikachuSprite.zapdos, this.pikachuSprite.moltres, this.pikachuSprite.mewtwo);
    this.marcador.updateEvoluciones(this.pikachuSprite.evoluciones);

    if(this.protagonista.esRaichu && this.recienLlegado && !this.mensajeActivo)
    {
      this.mensajeActivo = true;
      this.mensaje = new Mensaje(this, "evolucion3");
      this.pikachuSprite.puedeActuar = false;
      this.animation = "evolve";
      this.pikachuSprite.anims.play(this.animation, true);
      
      this.time.addEvent({
        delay: 2000,
        callback: () => {
            this.pikachuSprite.puedeActuar = true;
            this.animation = "move_up";
            this.pikachuSprite.anims.play(this.animation, true);
        },
        loop: false
      });

      this.timer = this.time.addEvent({
          delay: 5000,
          callback: () => {
            this.mensaje.alerta.destroy();
            this.recienLlegado = false;
            this.mensajeActivo = false;
          },
          loop: false
      });      
    }

    if(this.jefe.vida <= 0)
    {
      this.pikachuSprite.snorlax = true;
      if(!this.portalExiste)
      {  
        this.portalVuelta = new Portal(this, 485, 470, "finalPlanta");
        this.portalExiste = true;
      }
      else if(this.activarPortal)
      {
        this.pikachuSprite.jefesIslasRestantes--;
        this.pikachuSprite.x = 3264;
        this.pikachuSprite.y = 1392;

        this.scene.stop('jefePlanta');
        this.scene.start('game', {pikachuData: this.pikachuSprite, groupGemas: this.datosInit.groupGemas,
          groupEnemies: this.datosInit.groupEnemies, groupTrampillas: this.datosInit.groupTrampillas,
          groupPortales: this.datosInit.groupPortales});
        this.music.stop();
        this.activarPortal = false;
      }
    }
  }
}