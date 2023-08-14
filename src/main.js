import Phaser from 'phaser'
import "./_scaleRoot";
import "./style.scss";

var config = {
    type: Phaser.AUTO,
    parent: 'wrapper',
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
        create: create,
        update: update,
        render: render
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.setBaseURL('./src/game/');

    this.load.image('bg', 'bg.jpg');
    this.load.image('hero', 'hero.png');
    this.load.image('red', 'particle.png');
    
    // basket
    this.load.image('basket-0', 'basket/0.png');
    this.load.image('basket-1', 'basket/1.png');
    this.load.image('basket-2', 'basket/2.png');
    this.load.image('basket-3', 'basket/3.png');
    this.load.image('basket-4', 'basket/4.png');

    // fruits
    this.load.image('fruit-1', 'fruit/1.png');
    this.load.image('fruit-2', 'fruit/2.png');
    this.load.image('fruit-3', 'fruit/3.png');
    this.load.image('fruit-4', 'fruit/4.png');
    this.load.image('fruit-5', 'fruit/5.png');
    this.load.image('fruit-6', 'fruit/6.png');
    this.load.image('fruit-7', 'fruit/7.png');
    this.load.image('fruit-8', 'fruit/8.png');
    this.load.image('fruit-9', 'fruit/9.png');
    this.load.image('fruit-10', 'fruit/10.png');


}

function create ()
{
    // this.add.image(0, 0, 'bg').setOrigin(0, 0);
    this.iter = 0;
    this.speed = 1;

    this.bg = this.add.tileSprite(0, 0, 2000, 900, 'bg').setOrigin(0, 0);
    this.tween = this.tweens.addCounter({
        from: 1,
        to: 2,
        duration: 5000,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
    });

    this.emitter = this.add.particles(0, 0, "red", {
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    // create group
    this.hero = this.physics.add.image(400, 100, 'hero');
    this.hero.setVelocity(0, 0);
    this.hero.setCollideWorldBounds(true);
    this.emitter.startFollow(this.hero);


    this.basket = this.physics.add.image(680, 130, 'basket-0');
    this.basket.setVelocity(0, 0);
    this.basket.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    // this.basket = this.physics.add.image(400, 100, 'basket-0');
    // this.basket.setVelocity(0, 0);
    // this.basket.setCollideWorldBounds(true);
    // this.basket.setImmovable(true);
    // this.basket.setDepth(1);
    
}

function update ()
{
    this.bg.tilePositionX = this.iter * 700;
    // this.bg.tilePositionY = Math.sin(this.iter) * 500;
    // this.bg.tileScaleX = this.tween.getValue();
    // this.bg.tileScaleY = this.tween.getValue();
    this.iter += 0.01;

    this.hero.setVelocity(0);
    this.basket.setVelocity(0);

    if (this.cursors.left.isDown)
    {
        this.hero.setVelocityX(-300 * this.speed);
        this.hero.flipX = true;

        this.basket.flipX = true;
    }
    else if (this.cursors.right.isDown)
    {
        this.hero.setVelocityX(300 * this.speed);
        this.hero.flipX = false;

        this.basket.flipX = false;
    }

    if (this.cursors.up.isDown)
    {
        this.hero.setVelocityY(-300 * this.speed);

        this.basket.setVelocityY(-300 * this.speed);
    }
    else if (this.cursors.down.isDown)
    {
        this.hero.setVelocityY(300 * this.speed);

        this.basket.setVelocityY(300 * this.speed);
    }
}

function render ()
{
    game.debug.text('Elapsed seconds: ' + this.tween.elapsed, 32, 32);
    game.debug.text('Loop Count: ' + this.tween.loopCount, 32, 64);
    game.debug.text('Elapsed Loops: ' + this.tween.elapsedLoops, 32, 96);
}
