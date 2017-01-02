
var renderer, scene, camera;

window.onload = init;

function init() {
    // info
    var info = document.createElement('div');
    info.style.position = 'absolute';
    info.style.top = '30px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.style.color = '#fff';
    info.style.fontWeight = 'bold';
    info.style.backgroundColor = 'transparent';
    info.style.zIndex = '1';
    info.style.fontFamily = 'Monospace';
    info.innerHTML = "three.js - hole in buffer geometry";
    document.body.appendChild(info);

    // renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // scene
    scene = new THREE.Scene();

    // ambient light
    var ambient = new THREE.AmbientLight(0x404040);
    scene.add(ambient);

    // directional light
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(-1, -0.5, 1);
    scene.add(directionalLight);

    // camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(-50, 100, 50);
    camera.up.set( 0, 0, 1 );
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    // controls
    controls = new THREE.OrbitControls( camera );

    material = new THREE.MeshPhongMaterial({color: 0xff0000, shading: THREE.FlatShading, side: THREE.FrontSide});

    // Box from non indexed buffer geometry
    var nonIndexedBoxGeometry = getNonIndexedBoxGeometry();
    nonIndexedBoxGeometry.scale( 20, 20, 20 );
    var nonIndexedBoxMesh = new THREE.Mesh( nonIndexedBoxGeometry, material );
    var bsp1 = new ThreeBSP( nonIndexedBoxMesh );
    //scene.add( nonIndexedBoxMesh );

    // Box from indexed buffer geometry
    var indexedBoxGeometry = getIndexedBoxGeometry();
    indexedBoxGeometry.scale( 10, 10, 10 );
    var indexedBoxMesh = new THREE.Mesh( indexedBoxGeometry, material );
    indexedBoxMesh.position.set( 0, 12.5, 7.5 );
    //scene.add( indexedBoxMesh );

    var bsp2 = new ThreeBSP( indexedBoxMesh );

    var geometry = bsp1.subtract( bsp2 ).toBufferGeometry();

    var mesh = new THREE.Mesh( geometry, material );

    scene.add( mesh );

    animate();
}

// render
function render() {
    renderer.render(scene, camera);
}

// animate
function animate() {
    controls.update();
    requestAnimationFrame(animate);
    render();
}

function getIndexedBoxGeometry(){
    var geometry = new THREE.BufferGeometry();
    var positions = [
        -1, -1, -1,
        -1,  1, -1,
        1,  1, -1,
        1, -1, -1,
        -1, -1,  1,
        -1,  1,  1,
        1,  1,  1,
        1, -1,  1
    ];
    var indices = [
        0, 2, 3,
        0, 1, 2,
        5, 1, 0,
        5, 0, 4,
        6, 5, 4,
        4, 7, 6,
        2, 6, 7,
        2, 7, 3,
        3, 4, 0,
        3, 7, 4,
        1, 5, 2,
        2, 5, 6
    ];
    geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.setIndex( new THREE.BufferAttribute( new Uint32Array( indices ), 1 ) );
    return geometry;
}

function getNonIndexedBoxGeometry(){
    var geometry = new THREE.BufferGeometry();
    var positions = [
        -1, -1, -1,
        1, 1, -1,
        1, -1, -1,
        -1, -1, -1,
        -1, 1, -1,
        1, 1, -1,
        -1, 1, 1,
        -1, 1, -1,
        -1, -1, -1,
        -1, 1, 1,
        -1, -1, -1,
        -1, -1, 1,
        1, 1, 1,
        -1, 1, 1,
        -1, -1, 1,
        -1, -1, 1,
        1, -1, 1,
        1, 1, 1,
        1, 1, -1,
        1, 1, 1,
        1, -1, 1,
        1, 1, -1,
        1, -1, 1,
        1, -1, -1,
        1, -1, -1,
        -1, -1, 1,
        -1, -1, -1,
        1, -1, -1,
        1, -1, 1,
        -1, -1, 1,
        -1, 1, -1,
        -1, 1, 1,
        1, 1, -1,
        1, 1, -1,
        -1, 1, 1,
        1, 1, 1
    ];
    geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    return geometry;
}