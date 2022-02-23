// Text Labels

function createTextLabel(text, x, y, z, id) {
  const loader = new THREE.FontLoader();
  loader.load('./ADayInAutumn_Medium.json', function (font) {
    // TextGeometry(String, Object)
    const textObj = new THREE.TextGeometry(text, {
        font: font,
        size: 1,
        height: 0.1,
        curveSegments: 4,
    });
    const labelTexture = new THREE.TextureLoader()
      .load('./space.jpg');
    const material = new THREE.MeshBasicMaterial({ map: labelTexture });
    const mesh = new THREE.Mesh(textObj, material);
    mesh.name = id;
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
    scene.add(mesh);
  });
}

createTextLabel("menu1", 4, 0, 4, "m1");
createTextLabel("menu2", -5, 3, 2, "m2");
createTextLabel("menu3", -15, 3, 0, "m3");
createTextLabel("menu4", 3, 3, 15, "m4");