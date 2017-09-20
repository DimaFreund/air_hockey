var width = window.innerWidth; //получаем ширину экрана
var height = window.innerHeight; // получаем высоту экрана
var app; //создаем глобальную переменную нашей игры
var colors = [0x111111]; //массив цветов
var gravity = 4;
var figuresAmount = -1; //количество созданных фигур
var figure = []; //массив хранящий нашу фигуру
var startBallX = 300;
var startBallY = 300;
var curentPosX = 0;
var curentPosY = 0;
var radius = 60;
var agree = -30;
var model = {
    createCanvas: function() {
        app = new PIXI.Application(width, height); //создае холст
        document.body.appendChild(app.view); //выводим его в тело страницы
    },
    drawCircle: function(circleX, circleY) {
        rand = Math.floor(Math.random() * colors.length); //генерим рандомное число(в промежутке от 0 до количества цветов в массиве цветов)
         //радиус круга
       
       
        var circle = new PIXI.Graphics(); //создаем новый графический элемент
        circle.lineStyle(0); //начинаем рисовать
        circle.beginFill(colors[rand], 1); //задаем рандомный цвет
        circle.drawCircle(circleX, circleY, radius); //рисуем кружок, ведь он наш дружок
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
    createPlayer: function() {    
      player = model.drawCircle(0, 0);
      player.mousemove = function(mouseData){
        player.position.x = mouseData.data.originalEvent.x;
        player.position.y = mouseData.data.originalEvent.y;

        if(ball.radiusArea(player.position.x, player.position.y) < radius*2){
          alert();
         }

        }

    
    }

}
var ball = {

    createBall: function() {
        balls = model.drawCircle(startBallX, startBallY);
        
        
    },
    moveBall: function(moveX,moveY) {
        
        balls.position.x += moveX;
        balls.position.y += moveY;
        vall.checkAboard(balls.position.x, balls.position.y);
          
    },
    positionBall: function(cut, speed){
        curentPosX = Math.cos(Math.PI*cut/180)*speed;
        curentPosY = Math.cos(Math.PI*(90-cut)/180)*speed;
        ball.moveBall(curentPosX, curentPosY);
    },
    radiusArea: function(PlayerX, PlayerY) {
      var x = Math.abs(PlayerX-balls.position.x-startBallX);
      var y = Math.abs(PlayerY-balls.position.y-startBallY);
      var distans = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      return distans;
      
    }
}
var vall = {
    checkAboard: function(x, y) {
      x += startBallX + radius;
      y += startBallY + radius;
      if(x > width || x < radius*2)
        agree += (180-2*agree); 
      if(y > height || y < radius*2)
        agree -= (2*agree); 
    }
}
var view = {
    loadGame: function() {
        model.createCanvas();
        firstplayer.createPlayer();
        ball.createBall();

        app.ticker.add(function() { //постоянное обновление холста
            ball.positionBall(agree, 2);
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