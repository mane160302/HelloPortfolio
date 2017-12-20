var camera, scene, light, renderer, container;
var meshs = [];
var grounds = [];
var isMobile = false;
var antialias = true;
var graph;
var stats;

var geos = {};
var mats = {};
var spheres = [];
var updateIntervalHandler;

initShapes();
init();
loop();
startAnimation();
setupWorld();

var randpos = Math.random(0,100)*100;
var randv = Math.random(0,100)*100;


function setupWorld() {
	drawAxes();
	// TODO
	addSphere({x:Math.random(0,100)*100,y:Math.random(0,100)*100,z:Math.random(0,100)*100, vx:Math.random(0,100), vy:Math.random(0,100), vz:Math.random(0,100)});
	addSphere({x:Math.random(0,100)*100,y:Math.random(0,100)*100,z:Math.random(0,100)*100, vx:Math.random(0,100), vy:Math.random(0,100), vz:Math.random(0,100)});
	addSphere({x:Math.random(0,100)*100,y:Math.random(0,100)*100,z:Math.random(0,100)*100, vx:Math.random(0,100), vy:Math.random(0,100), vz:Math.random(0,100)});
	addSphere({x:Math.random(0,100)*100,y:Math.random(0,100)*100,z:Math.random(0,100)*100, vx:Math.random(0,100), vy:Math.random(0,100), vz:Math.random(0,100)});
	addSphere({x:Math.random(0,100)*100,y:Math.random(0,100)*100,z:Math.random(0,100)*100, vx:Math.random(0,100), vy:Math.random(0,100), vz:Math.random(0,100)});
	addSphere({x:Math.random(0,100)*100,y:Math.random(0,100)*100,z:Math.random(0,100)*100, vx:Math.random(0,100), vy:Math.random(0,100), vz:Math.random(0,100)});
	addSphere({x:Math.random(0,100)*100,y:Math.random(0,100)*100,z:Math.random(0,100)*100, vx:Math.random(0,100), vy:Math.random(0,100), vz:Math.random(0,100)});
	addSphere({x:Math.random(0,100)*100,y:Math.random(0,100)*100,z:Math.random(0,100)*100, vx:Math.random(0,100), vy:Math.random(0,100), vz:Math.random(0,100)});
	addSphere({x:Math.random(0,100)*100,y:Math.random(0,100)*100,z:Math.random(0,100)*100, vx:Math.random(0,100), vy:Math.random(0,100), vz:Math.random(0,100)});
	addSphere({x:Math.random(0,100)*100,y:Math.random(0,100)*100,z:Math.random(0,100)*100, vx:Math.random(0,100), vy:Math.random(0,100), vz:Math.random(0,100)});
	addSphere({x:Math.random(0,100)*100,y:Math.random(0,100)*100,z:Math.random(0,100)*100, vx:Math.random(0,100), vy:Math.random(0,100), vz:Math.random(0,100)});
	
}


/*
 *	returns mesh of a sphere positioned at x,y,z
 *
 *  creating a new mesh: new THREE.Mesh( geometry, material );
 *  setting a position:  mesh.position.set(x, y, z);
 */
function addSphere(params)
{
	params = params || {};
	params.x = params.x || 0;
	params.y = params.y || 0;
	params.z = params.z || 0;	
	params.vx = params.vx || 0;
	params.vy = params.vy || 0;
	params.vz = params.vz || 0;	
	params.ax = params.ax || 0;
	params.ay = params.ay || 0;
	params.az = params.az || 0;
	// TODO
	var circle = new THREE.Mesh(geos.sphere, mats.sphere);
	circle.position.set(params.x, params.y, params.z);
	scene.add(circle);
	var obj = {
		mesh: circle,
		pos:{x: params.x, y: params.y, z: params.z},
		v:{x: params.vx, y: params.vy, z: params.vz},
		a:{x: params.ax,y: params.ay,z: params.az}
	}
	spheres.push(obj);
}

/*
* start calling the update function every 1000/60 milliseconds
*/
function startAnimation(){
	if(updateIntervalHandler) clearInterval(updateIntervalHandler);
	updateIntervalHandler =	setInterval(updateScene, 1000/60);
}

/*
* change the positions according to the physics
*/
function updateScene(){
	var i, obj, newPosition;
	for(i = 0; i < spheres.length; ++i){
		obj = spheres[i];
		newPosition = getPosition(obj);
		obj.mesh.position.set(newPosition.x, newPosition.y, newPosition.z)
		obj.pos = newPosition;
	}
}


/*
* returns the acceleration, based on 
* gravity and friction
*/
function getAcceleration(obj) {
	return obj.a;
}

function getVelocity(obj) {
	return obj.v;
}

function getPosition(obj) {
	var v = getVelocity(obj);
	
	if(obj.pos.x > 100 || obj.pos.x < 0){
		obj.v.x *= -1;
	}else if(obj.pos.y > 100 || obj.pos.y < 0){
		obj.v.y *= -1;
	}else if(obj.pos.z > 100 || obj.pos.z < 0){
		obj.v.z *= -1;
	}
	var newpos = {
		x: obj.pos.x + obj.v.x,
		y: obj.pos.y + obj.v.y,
		z: obj.pos.z + obj.v.z
	}
	return newpos; 
}