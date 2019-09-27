var param = {
    acc_x: 0,
    acc_y: 0,
    acc_z: 0,
    gyro_x: 0,
    gyro_y: 0,
    gyro_z: 0,

    setAcc_X: function (data) {
        this.acc_x = parseFloat(data);
    },
    setAcc_Y: function (data) {
        this.acc_y = parseFloat(data);
    },
    setAcc_Z: function (data) {
        this.acc_z = parseFloat(data);
    },
    getAcc_X: function () {
        return this.acc_x;
    },
    getAcc_Y: function () {
        return this.acc_y;
    },
    getAcc_Z: function () {
        return this.acc_z;
    },

    setGyro_X: function (data) {
        this.gyro_x = parseFloat(data);
    },
    setGyro_Y: function (data) {
        this.gyro_y = parseFloat(data);
    },
    setGyro_Z: function (data) {
        this.gyro_z = parseFloat(data);
    },
    getGyro_X: function () {
        return this.gyro_x;
    },
    getGyro_Y: function () {
        return this.gyro_y;
    },
    getGyro_Z: function () {
        return this.gyro_z;
    }
}

var scene,
    camera,
    renderer,
    controls;
/////////////////////////////////////////
// Scene Setup
/////////////////////////////////////////
scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera( 10,  16/9, 1, 50 );
camera.position.set(5, 4, 5);
camera.lookAt( scene.position );

renderer = new THREE.WebGLRenderer({
  alpha: true,
	antialias: true
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( 470, 280);

document.getElementById("3D").appendChild( renderer.domElement );



/////////////////////////////////////////
// Trackball Controller
/////////////////////////////////////////

controls = new THREE.TrackballControls( camera );
controls.rotateSpeed = 5.0;
controls.zoomSpeed = 3.2;
controls.panSpeed = 0.8;
controls.noZoom = true;
controls.noPan = true;
controls.staticMoving = false;
controls.dynamicDampingFactor = 0.2;


/////////////////////////////////////////
// Lighting
/////////////////////////////////////////

var object_color  = '#FAFAFA',
    ambientLight  = new THREE.AmbientLight( '#EEEEEE' ),
    hemiLight     = new THREE.HemisphereLight( object_color, object_color, 0 ),
    light         = new THREE.PointLight( object_color, 1, 100 );
scene.add( ambientLight );
scene.add( hemiLight );
scene.add( light );


/////////////////////////////////////////
// Utilities
/////////////////////////////////////////

var axisHelper = new THREE.AxisHelper( 5 );
scene.add( axisHelper );


/////////////////////////////////////////
// Render Loop
/////////////////////////////////////////

function renderObject() {
  renderer.render( scene, camera );
}

// Render the scene when the controls have changed.
// If you don’t have other animations or changes in your scene,
// you won’t be draining system resources every frame to render a scene.
controls.addEventListener( 'change', renderObject );

// Avoid constantly rendering the scene by only 
// updating the controls every requestAnimationFrame
function animationLoop() {
  requestAnimationFrame(animationLoop);
  controls.update();
}

animationLoop();


/////////////////////////////////////////
// Window Resizing
/////////////////////////////////////////

window.addEventListener( 'resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
	controls.handleResize();
	renderObject();
}, false );


/////////////////////////////////////////
// Object Loader
/////////////////////////////////////////

var dae,
    loader = new THREE.ColladaLoader();

function loadCollada( collada ) {
  dae = collada.scene;
  dae.position.set(0, 0, 0.2);
  scene.add(dae);
  renderObject();
}

loader.options.convertUpAxis = true;
loader.load( '../3d/model.dae', loadCollada);



function TdModel() {
    const socket = io.connect();
    socket.on('data3d', (data) => {
        param.setAcc_X(data.dataHasil[5]);
        param.setAcc_Y(data.dataHasil[6]);
        param.setAcc_Z(data.dataHasil[7]);

        param.setGyro_X(data.dataHasil[8]);
        param.setGyro_Y(data.dataHasil[9]);
        param.setGyro_Z(data.dataHasil[10])

        var animate = function () {
            requestAnimationFrame( animate );
        
            dae.rotation.x += parseFloat(data.dataHasil[8]);
            dae.rotation.y += parseFloat(data.dataHasil[9]);
            dae.rotation.z += parseFloat(data.dataHasil[10]);
            
            renderer.render(scene,camera)
        }
        animate()
    });
}
