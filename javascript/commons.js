var g_game = {};

g_game.canvas;
g_game.ctx;
g_game.canvasW;
g_game.canvasH;

g_game.frameRate;
g_game.fps;
g_game.lastTick;
g_game.thisTick;
g_game.gameLoop;

g_game.play = false;

g_game.mouse = {};
g_game.mouseButtons = {};

g_game.keys = [];
g_game.keysP = [];			// key press

g_game.player;
g_game.bullets = [];
g_game.levelSpheres = [];

g_game.spritesheets = [];

g_game.camera = {};


function Player(){}
function Bullet(){}
function LevelSphere(){}

function pointDir(){}
function pointDis(){}
function disDir(){}

function loadMedia(){}
function tick(){}
function getInput(){}
//function getMousePosition(){}
function draw(){}
function drawText(){}
function drawTextSpec(){}
function drawObject(){}
function drawObjectSpec(){}