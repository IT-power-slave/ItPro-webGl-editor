class viewer {
  constructor(anim) {
    this.animation = anim;
  }

  init(part) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2); // updated for 2x2 layout
    document.getElementById(part).appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    // Edges for the cube
    const edges = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x000000,
      linewidth: 2,
    });
    this.cubeEdges = new THREE.LineSegments(edges, edgeMaterial);
    this.scene.add(this.cubeEdges);

    window.addEventListener('resize', this.onWindowResize, false);
    this.animate();
  }

  onWindowResize() {
    const centerPartWidth = window.innerWidth / 2;
    const centerPartHeight = window.innerHeight / 2;
    this.camera.aspect = centerPartWidth / centerPartHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(centerPartWidth, centerPartHeight);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.animation(
      this.cube,
      this.cubeEdges,
      this.renderer,
      this.scene,
      this.camera
    );
    //this.cube.rotation.x += 0.1;
    //this.cube.rotation.y += 0.1;
    //this.cubeEdges.rotation.x += 0.1;
    //this.cubeEdges.rotation.y += 0.1;
    //this.renderer.render(this.scene, this.camera);
  }
}

function animation1(cube, cubeEdges, renderer, scene, camera) {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cubeEdges.rotation.x += 0.01;
  cubeEdges.rotation.y += 0.01;
  renderer.render(scene, camera);
}

function animation2(cube, cubeEdges, renderer, scene, camera) {
  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;
  cubeEdges.rotation.x += 0.1;
  cubeEdges.rotation.y += 0.1;
  renderer.render(scene, camera);
}

var viewerPerpective = new viewer(animation1);
viewerPerpective.init('View3D');
var viewerPerpectiveX = new viewer(animation2);
viewerPerpectiveX.init('ViewX');
var viewerPerpectiveY = new viewer(animation2);
viewerPerpectiveY.init('ViewY');
var viewerPerpectiveZ = new viewer(animation1);
viewerPerpectiveZ.init('ViewZ');
