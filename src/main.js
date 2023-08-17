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
    this.load.setBaseURL('./game/');

    this.load.image('bg', 'bg.jpg');
    this.load.image('hero', 'hero.png');
    this.load.image('red', 'particle-cloud.png');
    
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
    this.points = 0;


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
    // this.hero = this.physics.add.image(400, 100, 'hero');
    // this.hero.setVelocity(0, 0);
    // this.hero.setCollideWorldBounds(true);


    this.basket = this.physics.add.image(1000, 600, 'basket-0');
    this.basket.setVelocity(0, 0);
    this.basket.setCollideWorldBounds(true);
    // attach basket to hero
    this.basket.setImmovable(true);
    this.basket.setDepth(1);
    this.basket.setOrigin(0.5, 0.5);
    this.emitter.startFollow(this.basket, 0, 100, true);

    

    // create random fruits on the screen
    this.fruits = this.physics.add.group();
    // this.physics.add.overlap(this.basket, this.fruits, function (basket, fruit) {
    //     fruit.destroy();
    //     this.points += 1;
    //     console.log(this.points);
    // }, null, this);



    this.cursors = this.input.keyboard.createCursorKeys();


    // this.basket = this.physics.add.image(400, 100, 'basket-0');
    // this.basket.setVelocity(0, 0);
    // this.basket.setCollideWorldBounds(true);
    // this.basket.setImmovable(true);
    // this.basket.setDepth(1);

    // create points text on screen
    this.pointsText = this.add.text(16, 16, 'points: 0', { fontSize: '32px', fill: '#fff', fontFamily: 'Arial', fontWeight: 'bold' });
    this.pointsText.setDepth(1);

    
}

function update ()
{
    this.bg.tilePositionX = this.iter * 700;
    // this.bg.tilePositionY = Math.sin(this.iter) * 500;
    // this.bg.tileScaleX = this.tween.getValue();
    // this.bg.tileScaleY = this.tween.getValue();
    this.iter += 0.01;

    this.pointsText.setText('points: ' + this.points);

    this.basket.setVelocity(0);
    // this.basket.setVelocity(0);

    // generate random fruits from the top right corner, and it will movement the same with bg,
    
    if (this.fruits.getLength() < 4) {

        // Fruit X random [2000, 2000]
        // Fruit height random [0, 300]
        
        var fruit = this.fruits.create(2000 + Math.random() * 0, Math.random() * 300, 'fruit-' + (Math.floor(Math.random() * 10) + 1));

        this.physics.moveToObject(fruit, 
            {
                x: this.input.activePointer.x,
                y: 0 // this.input.activePointer.y
            }, 300 * this.speed);
        // fruit.setVelocity(-100, 0);

        // fruit.setCollideWorldBounds(false);
        // fruit.setBounce(1);
        // fruit.setDepth(1);
        fruit.setOrigin(0.5, 0.5);
        // fruit.setImmovable(true);
    }

    
    // Fruit will drop when it reach [600, 1400] from the left





    // destroy fruits when overlap with basket

    this.physics.add.overlap(this.basket, this.fruits, function (basket, fruit) {
        fruit.destroy();
        this.points += 1;
        console.log(this.points);
    }, null, this);


    // destroy fruits when out of screen
    this.fruits.getChildren().forEach(function (fruit) {
        if (fruit.x < 0) {
            fruit.destroy();
        }
    });

    // change basket image based on points, increase speed
    if (this.points < 10) {
        this.basket.setTexture('basket-0');
    } else if (this.points < 20) {
        this.basket.setTexture('basket-1');
        this.speed = 1.5;
    } else if (this.points < 30) {
        this.basket.setTexture('basket-2');
        this.speed = 2;
    } else if (this.points < 40) {
        this.basket.setTexture('basket-3');
        this.speed = 2.5;
    } else  {
        this.basket.setTexture('basket-4');
        this.speed = 3;
    }

    // 




    if (this.cursors.left.isDown)
    {
        this.basket.setVelocityX(-300 * this.speed);
        this.basket.flipX = true;

    }
    else if (this.cursors.right.isDown)
    {
        this.basket.setVelocityX(300 * this.speed);
        this.basket.flipX = false;

    }

    if (this.cursors.up.isDown)
    {
        // this.basket.setVelocityY(-300 * this.speed);

        // this.basket.setVelocityY(-300 * this.speed);
    }
    else if (this.cursors.down.isDown)
    {
        // this.basket.setVelocityY(300 * this.speed);

        // this.basket.setVelocityY(300 * this.speed);
    }


    /// basket will slowly move to the pointer
    if (this.input.activePointer.isDown) {
        this.physics.moveToObject(this.basket, 
            {
                x: this.input.activePointer.x,
                y: 600 // this.input.activePointer.y
            }, 300 * this.speed);
    }
    


}

function render ()
{
    game.debug.text('Elapsed seconds: ' + this.tween.elapsed, 32, 32);
    game.debug.text('Loop Count: ' + this.tween.loopCount, 32, 64);
    game.debug.text('Elapsed Loops: ' + this.tween.elapsedLoops, 32, 96);
}
