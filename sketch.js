var dog, dogImage, happyDogImage, happyDog;
var database
var foodS, foodStock

function preload()
{
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,250);
  dog.addImage("dog", dogImage);
  dog.scale = 0.6
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  dog.addImage("dogHappy", happyDogImage);
}


function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.changeImage("dogHappy");
  }
  drawSprites();
  //add styles here
  fill("black");
  textSize(18);
  text("Note: " + "Press Up Arrow Key to feed Drago milk!", 100, 30);
  text("Food Left: " + foodS, 150, 70);
}
  function readStock(data){
    foodS=data.val();
  }
  function writeStock(x){
    if(x<=0){
      x=0;
    }else{
      x=x-1;
    }
    database.ref('/').update({
      Food:x
    })
  }

