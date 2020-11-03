var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime;

function preload(){
  monkey_running =        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(450,400);
  monkey = createSprite(50,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  survivalTime = 0;
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
}

function draw() {
  background("white");
  stroke("black");
  fill("black");
  //textSize(15);
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
  monkey.collide(ground);
  if (ground.x < 0){
        ground.x = ground.width/2;
      }
  if(keyDown("space")&& monkey.y >=310 ) {
        monkey.velocityY = -15;
    }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  spawnBanana();
  spawnObstacles();
  
  drawSprites();
  text("Survival Time: "+ survivalTime, 300,50);
}

function spawnBanana(){
  if(frameCount % 80 ===0){
    banana = createSprite(450,180,20,20);
    banana.y=Math.round(random(130,210));
    banana.addImage(bananaImage);
    banana.velocityX=-6;
    banana.scale=0.1;
    banana.lifetime=400;
    
    monkey.depth = banana.depth+1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(400,325,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-3;
    obstacle.scale=0.125;
    obstacle.lifetime=200;
    
    //obstacle.depth = monkey.depth+1;
    obstacleGroup.add(obstacle);
  }
}