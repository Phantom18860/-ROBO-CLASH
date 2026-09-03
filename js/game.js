const scene = new THREE.Scene();
scene.background = new THREE.Color(0x070b14);

const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 8, 12);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const game = document.getElementById("game");
game.appendChild(renderer.domElement);


// ====================
// LIGHTING
// ====================

scene.add(new THREE.HemisphereLight(0xffffff, 0x18243a, 2));

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 12, 5);
scene.add(light);


// ====================
// ARENA
// ====================

const floor = new THREE.Mesh(
    new THREE.BoxGeometry(40, 1, 40),
    new THREE.MeshStandardMaterial({
        color: 0x182235,
        metalness: 0.6,
        roughness: 0.45
    })
);

floor.position.y = -0.5;
scene.add(floor);

const grid = new THREE.GridHelper(
    40,
    40,
    0x2488ff,
    0x20304d
);

grid.position.y = 0.02;
scene.add(grid);


// ====================
// MAPS
// ====================

const maps = [
    ["NEON CITY", "A futuristic city packed with cover."],
    ["ROBOT FACTORY", "An industrial battlefield filled with machinery."],
    ["LAVA CORE", "A dangerous arena surrounding a molten reactor."],
    ["FROST BASE", "A frozen military base built for combat."],
    ["SCRAP DESERT", "A massive battlefield filled with abandoned machines."]
];


// ====================
// MAP ROLLER
// ====================

const mapRoll = document.getElementById("map-roll");
const mapName = document.getElementById("map-name");
const mapDescription = document.getElementById("map-description");
const rollStatus = document.querySelector(".roll-status");

let selectedMap = null;

if (mapRoll && mapName && mapDescription && rollStatus) {

    rollStatus.textContent = "SELECTING MAP...";

    let rolling = true;

    const roller = setInterval(() => {

        const randomMap =
            maps[Math.floor(Math.random() * maps.length)];

        mapName.textContent = randomMap[0];
        mapDescription.textContent = randomMap[1];

    }, 120);

    setTimeout(() => {

        rolling = false;
        clearInterval(roller);

        selectedMap =
            maps[Math.floor(Math.random() * maps.length)];

        mapName.textContent = selectedMap[0];
        mapDescription.textContent = selectedMap[1];

        rollStatus.textContent = "SELECTED MAP";

        setTimeout(() => {
            mapRoll.style.display = "none";
        }, 1000);

    }, 4000);
}


// ====================
// ROBOT
// ====================

const robot = new THREE.Group();

const blueMetal = new THREE.MeshStandardMaterial({
    color: 0x287cff,
    metalness: 0.8,
    roughness: 0.25
});

const darkMetal = new THREE.MeshStandardMaterial({
    color: 0x35485e,
    metalness: 0.8,
    roughness: 0.25
});

const silverMetal = new THREE.MeshStandardMaterial({
    color: 0x9bb0c7,
    metalness: 0.85,
    roughness: 0.2
});


// Body
const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 1.4, 0.9),
    blueMetal
);

body.position.y = 1.3;
robot.add(body);


// Head
const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 16, 12),
    silverMetal
);

head.position.y = 2.4;
robot.add(head);


// Glowing eyes
const eyeMaterial = new THREE.MeshStandardMaterial({
    color: 0x66ddff,
    emissive: 0x2299ff,
    emissiveIntensity: 3
});

for (const x of [-0.2, 0.2]) {

    const eye = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 0.13, 0.08),
        eyeMaterial
    );

    eye.position.set(x, 2.45, 0.5);
    robot.add(eye);
}


// Arms
for (const x of [-0.9, 0.9]) {

    const arm = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.16, 0.7, 4, 8),
        darkMetal
    );

    arm.position.set(x, 1.25, 0);
    robot.add(arm);
}


// Legs
for (const x of [-0.35, 0.35]) {

    const leg = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.18, 0.7, 4, 8),
        darkMetal
    );

    leg.position.set(x, 0.35, 0);
    robot.add(leg);
}


// Feet
for (const x of [-0.35, 0.35]) {

    const foot = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.25, 0.7),
        darkMetal
    );

    foot.position.set(x, -0.05, 0.12);
    robot.add(foot);
}

robot.position.set(0, 0, 0);
scene.add(robot);


// ====================
// ANIMATION
// ====================

function animate() {

    requestAnimationFrame(animate);

    // Robot idle animation
    robot.rotation.y += 0.004;

    renderer.render(scene, camera);
}

animate();


// ====================
// RESIZE
// ====================

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});
