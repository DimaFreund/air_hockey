var width = window.innerWidth; //получаем ширину экрана
var height = window.innerHeight; // получаем высоту экрана
var app; //создаем глобальную переменную нашей игры
var colors = [0x111111]; //массив цветов
var gravity = 4;
var figuresAmount = -1; //количество созданных фигур
var figure = []; //массив хранящий нашу фигуру



var model = {
    createCanvas: function() {
        app = new PIXI.Application(width, height); //создае холст
        document.body.appendChild(app.view); //выводим его в тело страницы
    },
    drawCircle: function(circleX, circleY) {
        rand = Math.floor(Math.random() * colors.length); //генерим рандомное число(в промежутке от 0 до количества цветов в массиве цветов)
        var radius = 60; //радиус круга
       
       
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
      player = model.drawCircle(70, height/2);
      player.mousemove = function(mouseData){
        player.position.x = mouseData.data.originalEvent.x-70;
        player.position.y = mouseData.data.originalEvent.y-height/2;
         }
    
    }
}
var ball = {
    createBall: function() {
      ball = model.drawCircle(300, 300);
    }
}
var view = {
    loadGame: function() {
        model.createCanvas();
        firstplayer.createPlayer();
        ball.createBall();
        //setInterval(model.drawCircle, 500);

        app.ticker.add(function() { //постоянное обновление холста
            for (var i = 0; i < figuresAmount; i++) {
                figure[i].position.y += gravity; //заставляем гравитацию работать
                if (figure[i].position.y > height && figure[i].live == true) {
                    model.gameOver();
                    return false;
                }

            }
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
