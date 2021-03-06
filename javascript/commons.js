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
g_game.speed;

g_game.objectAmount = 0;

g_game.play = false;

g_game.mouse = {};
g_game.mouseButtons = {};

g_game.keys = [];
g_game.keysP = [];						// key press

g_game.backgrounds = [];

g_game.player;
g_game.bullets = [];
g_game.levelSpheres = [];
g_game.levelSphereSlots = [];			// walls with level spheres in them
g_game.levelSphereSlotSpikys = [];		// spiky walls with level spheres in them

g_game.triangleEnemies = [];

g_game.lines = [];
g_game.tails = [];

g_game.spritesheets = [];

g_game.camera = {};

g_game.nestSizes = [];


var chunks = [];


function Player(){}
function Sphere(){}
function Bullet(){}
function LevelSphere(){}
function LevelSphereSlot(){}
function LevelSphereSlotSpiky(){}

function TriangleEnemy(){}

function Vector(){}
function Line(){}
function Tail(){}

function tailMake(){}
function tailRealMake(){}

function pointDir(){}
function pointDis(){}
function disDir(){}
function roundFloat(){}
function getLineCircleIntersect(){}

function loadMedia(){}
function tick(){}
function getInput(){}
//function getMousePosition(){}
function draw(){}
function drawCircles(){}
function drawText(){}
function drawTextSpec(){}
function drawObject(){}
function drawObjectRotated(){}
function drawObjectSpec(){}
function drawSprite(){}