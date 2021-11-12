var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var balloon, balloonImg

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  balloonImg = loadImage("balloon.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  balloon = createSprite(200, 200, 50, 50);
  balloon.scale =  0.1;
  balloon.addImage(balloonImg);
  

}

function draw() {
  background(200);
  if(gameState==="play"){
   
   if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("RIGHT_ARROW")){
      balloon.x = balloon.x+3;
    }
    if(keyDown("LEFT_ARROW")){
      balloon.x = balloon.x-3;
    }
    if(keyDown("space")){
      balloon.velocityY = -5;
    }
    balloon.velocityY = balloon.velocityY+0.8;

    if(climbersGroup.isTouching(balloon)){
      balloon.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(balloon)||balloon.y>600){
      balloon.destroy();
      gameState = "end";
    }
    
    spawnDoors();
    drawSprites();
  }

    if(gameState==="end"){
      stroke("red");
      fill("red");
      textSize(30);
      text("Game Over", 200, 30, 250)
    }
    
}

function spawnDoors(){
  if(frameCount%240 === 0){
    var door =  createSprite(200, -50);
    door.addImage("doorImage", doorImg);

    var climber = createSprite(200, 10);
    climber.addImage(climberImg);

    var invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    door.x = Math.round(random(120, 400))
    door.velocityY = 1;
    
    climber.x = door.x;
    climber.velocityY = 1;
    
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    
    balloon.depth = door.depth;
    balloon.depth+=1;

    climber.lifetime = 800;
    climbersGroup.add(climber);
    

    door.lifetime = 800;
   
    doorsGroup.add(door);

    invisibleBlock.debug=false;
    invisibleBlockGroup.add(invisibleBlock);
  }
}
