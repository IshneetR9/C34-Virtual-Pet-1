//Create variables here
var dog, dogImg, happyDog, happyDogImg;
var database, foodS, foodStock;

function preload()
{
  dogImg = loadImage("images/Dog.png");
  happyDogImg = loadImage("images/HappyDog.png");
}

function setup() {
  createCanvas(500, 500);
  
  //assigning firebase database
  database = firebase.database();
  
  //creating the dog sprite and adding image
  dog = createSprite (250, 250, 100, 100);
  dog.addImage(dogImg); 
  dog.scale = 0.3;

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  if(foodS!==undefined)
  {
  if(keyWentDown(UP_ARROW))
      {
          writeStock(foodS);
          dog.addImage(happyDogImg);
      }
    drawSprites();
 if(foodS===0)
    {
      textSize(20);
      textStyle("Calibri");
      fill("white");
      text("Food remaining: " + foodS, 170, 100);
      text("Refill milk to feed Fluffy!!", 130, 50);
      dog.addImage(dogImg);
  }
  else
  {
    textSize(20);
    textStyle("Calibri");
    fill("white");
    text("Food remaining: " + foodS, 170, 100);
    text("Press UP Arrow to feed milk to Fluffy!!", 100, 50); 
  }
}
}


function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
  if(x<=0)
  {
    x=0;
  }
  else
  {
    x=x-1;
  }
  database.ref('/').update({
    'food': x
 })
}
