var app; //создаем глобальную переменную нашей игры
var gravity = 4;
var figuresAmount = -1; //количество созданных фигур
var figure = []; //массив хранящий нашу фигуру
var startBallX = 300;
var startBallY = 300;
var curentPosX = 0;
var curentPosY = 0;
var agree = -30;
var mouselastX = 0;
var mouselastY = 0;
var speed = 1;


function plusVector(vec1, vec2){
  return [vec1[0]+vec2[0], vec1[1]+vec2[1]];
}

function minusVector(vec1, vec2){
  return [vec1[0]-vec2[0], vec1[1]-vec2[1]];
}

function lengthVector(vec){
  return Math.sqrt(Math.pow(vec[0],2)+Math.pow(vec[1],2));
}
function distanceTwoVector(vec1, vec2){
  return lengthVector(minusVector(vec1, vec2));
}
function multiplexVector(vec1, vec2){
  return vec1[0]*vec2[0]+vec1[1]*vec2[1];
}
function multiplexVectorConstant(vec, constant){
  return [vec[0]*constant, vec[1]*constant];
}
function angleReflextion(vec, normal){
  return minusVector(vec, multiplexVectorConstant(multiplexVectorConstant(normal, multiplexVector(vec, normal)/multiplexVector(normal,normal)),2));
}
function return90Vector(vec){
  return [-vec[1], vec[0]];
}
function return180Vector(vec){
  return multiplexVectorConstant(vec, -1);
}
// function plusVectorAbs(vec1, vec2){
//   var mask = []
// }
var model = {
    createCanvas: function() {
        app = new PIXI.Application(vall.width, vall.height); //создае холст
        document.body.appendChild(app.view); //выводим его в тело страницы
    },
    drawCircle: function(vec) {
     
       
       
        var circle = new PIXI.Graphics(); //создаем новый графический элемент
        circle.lineStyle(0); //начинаем рисовать
        circle.beginFill(0x000011, 1); //задаем рандомный цвет
        circle.drawCircle(vec[0], vec[1], ball.radius); //рисуем кружок, ведь он наш дружок
        circle.endFill(); //закончили отрисовку
        circle.interactive = true; //делаем круг интерактивным
        circle.buttonMode = true; //меняем курсор при наведении
        circle.live = true; //указываем что наш шарик жив и не пал жертвой выстрела
        //figuresAmount++;
        //circle.num = figuresAmount; //даем нашему кругу порядковый номер
        figure.push(circle); //обратиться на прямую к объекту circle мы не можем, поэтому отправляем его в массив
        app.stage.addChild(circle); //выводим круг на холсте
        circle.on('pointerdown', controller.clearFigure); //добавляем возможность при клике на фигуру удалить её
        return circle;
    },
    gameOver: function() {
        var style = new PIXI.TextStyle({ //стили для текста
            fill: '0xffffff',
            fontSize: 36,
        }); 
        var gameOverText = new PIXI.Text('Game Over', style); //собственно выводимый текст
        gameOverText.x = width / 2; //центрируем относительно экрана
        gameOverText.y = height / 2; //центрируем относительно экрана
        gameOverText.pivot.x = 50; //выравниваем по оси х
        gameOverText.pivot.y = 50; // выравниваем по оси y
        app.stage.addChild(gameOverText); //выводим на холсте
    }
}
var firstplayer = {
    mousePosition: [0, 0],
    lastPosition: [0, 0],
    lastSpeedValue: [0, 0],
    createPlayer: function() {    
      player = model.drawCircle(0, 0);
      player.mousemove = function(mouseData){
        firstplayer.mousePosition = [mouseData.data.originalEvent.x, mouseData.data.originalEvent.y];
        player.position.x = firstplayer.mousePosition[0];
        player.position.y = firstplayer.mousePosition[1];
        firstplayer.lastspeed();
        }    
    },
    lastspeed: function() {
      this.lastSpeedValue = minusVector(this.lastPosition, this.mousePosition);
      this.lastPosition = this.mousePosition;
      console.log(this.lastSpeedValue);
    }
}

var ball = {
    radius: 60,
    position: [200, 200],
    speed: [11, 11],
    acceleration: 0.999,
    createBall: function() {
        balls = model.drawCircle([0,0]);      
    },
    positionvector: function(){
        this.speedvector();
        this.position = plusVector(this.position, this.speed);
        balls.position.x = this.position[0];
        balls.position.y = this.position[1];  
    },
    speedvector: function(){
        this.speed = multiplexVectorConstant(this.speed, this.acceleration);
    },
    move: function(){
      var checkVall = vall.checkAboard(this.position);
      var checkPlayer = distanceTwoVector(this.position, firstplayer.mousePosition);
      if (checkVall)
        this.speed = angleReflextion(this.speed, checkVall);
      if (checkPlayer<this.radius*2){
        this.speed = angleReflextion(this.speed, minusVector(ball.position, firstplayer.mousePosition));
        this.speed = plusVector(this.speed, firstplayer.lastSpeedValue);
      }

      
      checkPlayer = distanceTwoVector(this.position, firstplayer.mousePosition);
      while(checkPlayer<this.radius*2){
        checkPlayer = distanceTwoVector(this.position, firstplayer.mousePosition);
        this.positionvector();
      }
      ball.positionvector();
    }
    
} 



var vall = {
      width: window.innerWidth,
      height: window.innerHeight,
    checkAboard: function(vec) {
      if(vec[0] + ball.radius > this.width)
        return [this.width, 0];
      if(vec[0] < ball.radius)
        return [-this.width, 0];
      if(vec[1] + ball.radius > this.height)
        return [0, this.height];
      if(vec[1] < ball.radius)
        return [0, -this.height];
    }
}
var view = {
    loadGame: function() {
        model.createCanvas();
        firstplayer.createPlayer();
        ball.createBall();

        app.ticker.add(function() { //постоянное обновление холста
            ball.move();

        });
    }
}


var controller = {
    clearFigure: function() {
        this.clear();
        figure[this.num].live = false;

    } 
}


view.loadGame();