const scene = new THREE.Scene();

scene.background = new THREE.Color(0x070b14);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 8, 12);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

document.getElementById("game").appendChild(renderer.domElement);


// LIGHTING

const ambientLight = new THREE.HemisphereLight(
    0xffffff,
    0x18243a,
    2
);

scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(
    0xffffff,
    2
);

mainLight.position.set(5, 12, 5);
scene.add(mainLight);


// ARENA FLOOR

const floorGeometry = new THREE.BoxGeometry(40, 1, 40);

const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x182235,
    metalness: 0.6,
    roughness: 0.45
});

const floor = new THREE.Mesh(
    floorGeometry,
    floorMaterial
);

floor.position.y = -0.5;
scene.add(floor);


// ARENA GRID

const grid = new THREE.GridHelper(
    40,
    40,
    0x2488ff,
    0x20304d
);

grid.position.y = 0.02;
scene.add(grid);


// ANIMATION

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

animate();


// RESIZE

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});
// MAP ROLLER
setTimeout(() => {
    const mapName = document.getElementById("map-name");
    const mapDescription = document.getElementById("map-description");
    const status = document.querySelector(".roll-status");

    if (!mapName || !mapDescription || typeof MAPS === "undefined") return;

    let i = 0;

    const roller = setInterval(() => {
        const map = MAPS[i % MAPS.length];

        mapName.textContent = map.name;
        mapDescription.textContent = map.description;

        i++;
    }, 120);

    setTimeout(() => {
        clearInterval(roller);

        const chosen = MAPS[Math.floor(Math.random() * MAPS.length)];

        mapName.textContent = chosen.name;
        mapDescription.textContent = chosen.description;
        status.textContent = "SELECTED MAP";
    }, 4000);
}, 100);
// PLAYER ROBOT
const robotGeometry = new THREE.BoxGeometry(1, 1.5, 1);
const robotMaterial = new THREE.MeshStandardMaterial({
    color: 0x287cff,
    metalness: 0.8,
    roughness: 0.3
});

const playerRobot = new THREE.Mesh(
    robotGeometry,
    robotMaterial
);

playerRobot.position.set(0, 0.75, 0);
scene.add(playerRobot);
