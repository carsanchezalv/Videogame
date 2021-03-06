import Enemy from "../enemy.js";

export default class Electricidad1 extends Enemy {

    constructor(scene, x, y) {
        super(scene, x, y, "electricidad1");
        this.nombre = "electricidad1";
        this.animation = "move_down_enemy"+this.nombre;

        // Animacion movimientos
        this.scene.anims.create({
            key: 'move_down_enemy'+this.nombre,
            frames: this.scene.anims.generateFrameNumbers(this.nombre, { start: 1, end: 2 }),
            frameRate: 4,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'move_right_enemy'+this.nombre,
            frames: this.scene.anims.generateFrameNumbers(this.nombre, { start: 7, end: 8 }),
            frameRate: 4,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'move_up_enemy'+this.nombre,
            frames: this.scene.anims.generateFrameNumbers(this.nombre, { start: 13, end: 14 }),
            frameRate: 4,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'move_upright_enemy'+this.nombre,
            frames: this.scene.anims.generateFrameNumbers(this.nombre, { start: 10, end: 11 }),
            frameRate: 4,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'move_downright_enemy'+this.nombre,
            frames: this.scene.anims.generateFrameNumbers(this.nombre, { start: 4, end: 5 }),
            frameRate: 4,
            repeat: 0
        });

        // Animacion ataque
        this.scene.anims.create({
            key: 'attack_down_enemy'+this.nombre,
            frames: this.scene.anims.generateFrameNumbers(this.nombre, { start: 32, end: 33 }),
            frameRate: 4,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'attack_right_enemy'+this.nombre,
            frames: this.scene.anims.generateFrameNumbers(this.nombre, { start: 35, end: 36 }),
            frameRate: 4,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'attack_up_enemy'+this.nombre,
            frames: this.scene.anims.generateFrameNumbers(this.nombre, { start: 41, end: 42 }),
            frameRate: 4,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'attack_upright_enemy'+this.nombre,
            frames: this.scene.anims.generateFrameNumbers(this.nombre, { start: 38, end: 39 }),
            frameRate: 4,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'attack_downright_enemy'+this.nombre,
            frames: this.scene.anims.generateFrameNumbers(this.nombre, { start: 29, end: 30 }),
            frameRate: 4,
            repeat: 0
        });

        // Animaciones daño
        this.scene.anims.create({
            key: 'damage_down_enemy'+this.nombre,
            frames: this.scene.anims.generateFrameNumbers(this.nombre, { start: 17, end: 17 }),
            frameRate: 4,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'damage_downright_enemy'+this.nombre,
            frames: this.scene.anims.generateFrameNumbers(this.nombre, { start: 18, end: 18 }),
            frameRate: 2,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'damage_right_enemy'+this.nombre,
            frames: this.scene.anims.generateFrameNumbers(this.nombre, { start: 19, end: 19 }),
            frameRate: 4,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'damage_upright_enemy'+this.nombre,
            frames: this.scene.anims.generateFrameNumbers(this.nombre, { start: 20, end: 20 }),
            frameRate: 4,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'damage_up_enemy'+this.nombre,
            frames: this.scene.anims.generateFrameNumbers(this.nombre, { start: 21, end: 21 }),
            frameRate: 4,
            repeat: 0
        });

        this.body.setSize(13, 13);
        this.body.offset.x = 18;
        this.body.offset.y = 17;
    }
}