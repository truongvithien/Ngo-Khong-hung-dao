import Phaser from 'phaser'
import "./_scaleRoot";
import "./style.scss";

var config = {
    type: Phaser.AUTO,
    width: 2000,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.setBaseURL('./src/game/');

    this.load.image('bg', 'bg.jpg');
    this.load.image('hero', 'hero.png');
    this.load.image('red', 'particle.png');
}

function create ()
{
    this.add.image(0, 0, 'bg').setOrigin(0, 0);

    var emitter = this.add.particles(0, 0, "red", {
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    var hero = this.physics.add.image(400, 100, 'hero');

    hero.setVelocity(100, 200);
    hero.setBounce(1, 1);
    hero.setCollideWorldBounds(true);

    emitter.startFollow(hero);
}