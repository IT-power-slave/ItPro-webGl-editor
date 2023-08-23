class viewer {
  constructor() {
    let scene, camera, renderer, cube, cubeEdges;
  }
  //init();
  //animate();

  init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2); // updated for 2x2 layout
    document.getElementById('View3D').appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Edges for the cube
    const edges = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x000000,
      linewidth: 2,
    });
    cubeEdges = new THREE.LineSegments(edges, edgeMaterial);
    scene.add(cubeEdges);

    window.addEventListener('resize', onWindowResize, false);
  }

  onWindowResize() {
    const centerPartWidth = window.innerWidth / 2;
    const centerPartHeight = window.innerHeight / 2;
    camera.aspect = centerPartWidth / centerPartHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(centerPartWidth, centerPartHeight);
  }

  animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cubeEdges.rotation.x += 0.01;
    cubeEdges.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
}
