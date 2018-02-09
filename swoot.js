var canvas = document.querySelector("canvas");
canvas.width = 1000;
canvas.height = 640;
var surface = canvas.getContext("2d");

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var spacePressed = false;
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
var playerSpeed = 15;

var map = {img:null, x:0, y:0, width:2000, height:canvas.height};
var player = {img:null, x:-150, y:canvas.height-132, jumping:false, xvel:0, yvel:0};
var images = [];
var imgStr = ["map", "platf", "smplat", "player"];
var smPlat = images[2]
var lgPlat = {img:null, x:-150, y:canvas.height-64, width:2000, height:60};
var uInt;

var obsAry = [];

	for (var i = 0; i < imgStr.length; i++)
	{
		images[i] = new Image();
		images[i].src = imgStr[i]+".png";
	}
	map.img = images[0]
	player.img = images[3]
	lgPlat.img = images[1]
	uInt = setInterval(update, 33.34);



function update()
{
	movePlayer();
	render(); 
	//console.log()
	player.x += player.xvel;
	player.y += player.yvel;
	player.xvel *= 0.9;// friction
	player.yvel *= 0.9;// friction
	checkCollision();
}

function movePlayer()
{
	
	if (player.x <= -10)
		player.x += playerSpeed;
	
	if (player.jumping == true)
	{
		spacePressed = false;
		player.jumping = false;
	}
		

	if (leftPressed == true && player.x >= 0)
		player.xvel -= 1;
	if (rightPressed == true && player.x <= 200)
		{
			player.xvel += 1.5;
		}
			else if(rightPressed == true &&(map.x + map.width) != 640)
			{
				map.x -= playerSpeed;
			}
	if (upPressed == true)
		player.x += playerSpeed * 10;
	if (spacePressed == true) 
	{
	player.jumping = true;
	player.yvel -= 40;
	}
	
}

function onKeyDown(event)
{
	switch (event.keyCode)
	{
		case 37:
			leftPressed = true;
			break;
		case 39:
			rightPressed = true;
			break;
		case 38:
			upPressed = true;
			break;
		case 32:
			spacePressed = true;
			break;
	} 
}

function onKeyUp(event)
{
	switch (event.keyCode)
	{
		case 37:
			leftPressed = false; 
			break;
		case 39:
			rightPressed = false;
			break;
		case 38:
			upPressed = false;
			break;
		case 32:
			spacePressed = true;
			break;
	}
}
	
function render()
{
	surface.clearRect(0,0,canvas.width,canvas.height);
	surface.drawImage(map.img, map.x, map.y, map.width, map.height);
	surface.drawImage(lgPlat.img, lgPlat.x, lgPlat.y, lgPlat.width, lgPlat.height);
	surface.drawImage(player.img,
					  0, 0, 64, 64, player.x, player.y, 64, 64);
}
function checkCollision()
{
if (player.y >= canvas.height-130) 
	{
	player.y = canvas.height-130
	}
	else 
	{
	player.yvel += 3;
	player.jumping = true;
	}
}