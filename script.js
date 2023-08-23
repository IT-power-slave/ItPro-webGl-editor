class viewer {
  constructor() {
    let scene, camera, renderer, cube, cubeEdges;
  }
  //init();
  //animate();

  init() {
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
    document.getElementById('View3D').appendChild(this.renderer.domElement);

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
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.cubeEdges.rotation.x += 0.01;
    this.cubeEdges.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }
}

var viewerPerpective = new viewer();
viewerPerpective.init();
