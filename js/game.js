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
// ROBO CLASH ROBOT
// ====================

const robot = new THREE.Group();

// ---------- MATERIALS ----------

const armorBlue = new THREE.MeshStandardMaterial({
    color: 0x287cff,
    metalness: 0.9,
    roughness: 0.22
});

const armorDark = new THREE.MeshStandardMaterial({
    color: 0x17243a,
    metalness: 0.85,
    roughness: 0.3
});

const armorSilver = new THREE.MeshStandardMaterial({
    color: 0xb8c7d9,
    metalness: 0.95,
    roughness: 0.18
});

const black = new THREE.MeshStandardMaterial({
    color: 0x05070c,
    metalness: 0.5,
    roughness: 0.15
});

const glowBlue = new THREE.MeshStandardMaterial({
    color: 0x55ddff,
    emissive: 0x168cff,
    emissiveIntensity: 5,
    metalness: 0.2,
    roughness: 0.2
});


// ---------- HELPER ----------

function addBox(
    parent,
    x, y, z,
    sx, sy, sz,
    material,
    name
) {
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(sx, sy, sz),
        material
    );

    mesh.position.set(x, y, z);

    if (name) mesh.name = name;

    parent.add(mesh);

    return mesh;
}


// ====================
// BODY
// ====================

// Main torso
const torso = addBox(
    robot,
    0, 1.9, 0,
    2.6, 2.8, 1.8,
    armorBlue,
    "Armored Torso"
);

// Dark chest plate
addBox(
    robot,
    0, 2.05, -0.94,
    1.8, 1.45, 0.18,
    armorDark,
    "Chest Plate"
);

// Chest reactor
const reactor = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.32, 0.12, 24),
    glowBlue
);

reactor.rotation.x = Math.PI / 2;
reactor.position.set(0, 2.15, -1.05);
robot.add(reactor);

// Small chest armor strips
for (const x of [-0.72, 0.72]) {
    addBox(
        robot,
        x, 2.15, -1.06,
        0.18, 0.9, 0.12,
        armorSilver
    );
}


// ====================
// NECK
// ====================

const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.42, 0.42, 0.35, 16),
    armorDark
);

neck.position.y = 3.45;
robot.add(neck);


// ====================
// HEAD
// ====================

const head = new THREE.Group();
head.name = "Helmet";
head.position.set(0, 4.25, 0);
robot.add(head);

// Main helmet
const helmet = new THREE.Mesh(
    new THREE.SphereGeometry(0.95, 24, 18),
    armorSilver
);

helmet.scale.set(1.15, 0.9, 1.05);
head.add(helmet);

// Helmet armor shell
const helmetShell = new THREE.Mesh(
    new THREE.SphereGeometry(1.0, 24, 16),
    armorBlue
);

helmetShell.scale.set(1.17, 0.93, 1.08);
helmetShell.position.y = 0.08;
head.add(helmetShell);


// ====================
// FACE VISOR
// ====================

const visor = new THREE.Mesh(
    new THREE.BoxGeometry(1.45, 0.52, 0.16),
    black
);

visor.position.set(0, -0.05, -1.0);
head.add(visor);


// Visor glass
const visorGlass = new THREE.Mesh(
    new THREE.BoxGeometry(1.28, 0.34, 0.08),
    new THREE.MeshStandardMaterial({
        color: 0x07111d,
        emissive: 0x03182b,
        emissiveIntensity: 1,
        metalness: 0.7,
        roughness: 0.08
    })
);

visorGlass.position.set(0, -0.05, -1.1);
head.add(visorGlass);


// ====================
// GLOWING EYES
// ====================

for (const x of [-0.32, 0.32]) {

    const eye = new THREE.Mesh(
        new THREE.BoxGeometry(0.27, 0.12, 0.08),
        glowBlue
    );

    eye.position.set(x, -0.05, -1.17);

    head.add(eye);
}


// ====================
// THUG LIFE GLASSES 😎
// ====================

const glasses = new THREE.Group();
glasses.name = "THUG LIFE GLASSES";
head.add(glasses);

// Left lens
const leftLens = new THREE.Mesh(
    new THREE.BoxGeometry(0.58, 0.34, 0.10),
    black
);

leftLens.position.set(-0.34, -0.05, -1.22);
leftLens.rotation.z = -0.05;
glasses.add(leftLens);

// Right lens
const rightLens = new THREE.Mesh(
    new THREE.BoxGeometry(0.58, 0.34, 0.10),
    black
);

rightLens.position.set(0.34, -0.05, -1.22);
rightLens.rotation.z = 0.05;
glasses.add(rightLens);

// Bridge
addBox(
    glasses,
    0, -0.05, -1.25,
    0.22, 0.08, 0.08,
    armorSilver,
    "Glasses Bridge"
);

// Glasses shine
const shineMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x333333,
    emissiveIntensity: 1
});

addBox(
    glasses,
    -0.46, 0.02, -1.28,
    0.10, 0.05, 0.04,
    shineMaterial
);

addBox(
    glasses,
    0.22, 0.02, -1.28,
    0.10, 0.05, 0.04,
    shineMaterial
);

// Side arms of glasses
addBox(
    glasses,
    -0.92, -0.05, -1.0,
    0.45, 0.07, 0.07,
    black
);

addBox(
    glasses,
    0.92, -0.05, -1.0,
    0.45, 0.07, 0.07,
    black
);


// ====================
// HEAD ANTENNA
// ====================

const antenna = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.055, 0.55, 10),
    armorDark
);

antenna.position.set(0, 1.0, 0);
head.add(antenna);

const antennaLight = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 12, 8),
    glowBlue
);

antennaLight.position.set(0, 1.3, 0);
head.add(antennaLight);


// ====================
// SHOULDERS
// ====================

for (const x of [-1.65, 1.65]) {

    const shoulder = new THREE.Mesh(
        new THREE.SphereGeometry(0.62, 18, 12),
        armorBlue
    );

    shoulder.scale.set(1.15, 0.8, 1.0);
    shoulder.position.set(x, 2.75, 0);

    robot.add(shoulder);
}


// ====================
// ARMS
// ====================

for (const x of [-1.75, 1.75]) {

    // Upper arm
    addBox(
        robot,
        x, 2.0, 0,
        0.62, 1.35, 0.72,
        armorDark,
        x < 0 ? "Left Arm" : "Right Arm"
    );

    // Elbow
    const elbow = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 16, 12),
        armorSilver
    );

    elbow.position.set(x, 1.25, 0);
    robot.add(elbow);

    // Forearm
    addBox(
        robot,
        x, 0.75, -0.05,
        0.72, 1.0, 0.8,
        armorBlue
    );

    // Hand
    addBox(
        robot,
        x, 0.05, -0.12,
        0.72, 0.45, 0.7,
        armorDark
    );
}


// ====================
// LEGS
// ====================

for (const x of [-0.65, 0.65]) {

    // Hip joint
    const hip = new THREE.Mesh(
        new THREE.SphereGeometry(0.32, 16, 12),
        armorDark
    );

    hip.position.set(x, 0.65, 0);
    robot.add(hip);

    // Upper leg
    addBox(
        robot,
        x, 0.25, 0,
        0.85, 1.25, 0.9,
        armorBlue
    );

    // Knee
    const knee = new THREE.Mesh(
        new THREE.SphereGeometry(0.27, 16, 12),
        armorSilver
    );

    knee.position.set(x, -0.45, -0.05);
    robot.add(knee);

    // Lower leg
    addBox(
        robot,
        x, -1.0, 0,
        0.8, 1.0, 0.85,
        armorDark
    );

    // Big armored foot
    addBox(
        robot,
        x, -1.65, -0.18,
        1.0, 0.5, 1.35,
        armorSilver
    );

    // Blue foot armor
    addBox(
        robot,
        x, -1.62, -0.78,
        0.8, 0.28, 0.25,
        armorBlue
    );
}


// ====================
// WEAPON
// ====================

const weapon = new THREE.Group();
weapon.name = "Blaster";
weapon.position.set(2.35, 0.8, -0.2);
weapon.rotation.z = -0.12;

robot.add(weapon);

// Main weapon body
addBox(
    weapon,
    0, 0, 0,
    0.65, 1.7, 0.75,
    armorDark
);

// Barrel
const barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.17, 0.17, 1.25, 16),
    armorSilver
);

barrel.rotation.z = Math.PI / 2;
barrel.position.x = 0.95;
weapon.add(barrel);

// Energy core
const weaponCore = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, 0.22, 16),
    glowBlue
);

weaponCore.rotation.z = Math.PI / 2;
weaponCore.position.x = 1.55;
weapon.add(weaponCore);

// Handle
addBox(
    weapon,
    -0.05, -0.95, 0,
    0.4, 0.8, 0.5,
    armorBlue
);


// ====================
// FINAL ROBOT POSITION
// ====================

robot.position.set(0, 1.8, 0);

scene.add(robot);


// ====================
// ANIMATION
// ====================

function animate() {

    requestAnimationFrame(animate);

    // Subtle robot idle motion
    robot.rotation.y += 0.004;

    updateCamera();

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
// ====================
// MOUSE CAMERA CONTROL
// ====================

const gameCanvas = renderer.domElement;

let cameraYaw = 0;
let cameraPitch = -0.35;

gameCanvas.addEventListener("click", () => {
    gameCanvas.requestPointerLock();
});

document.addEventListener("mousemove", (event) => {

    if (document.pointerLockElement !== gameCanvas) {
        return;
    }

    cameraYaw -= event.movementX * 0.0025;
    cameraPitch -= event.movementY * 0.0025;

    cameraPitch = Math.max(
        -1.2,
        Math.min(0.5, cameraPitch)
    );
});

function updateCamera() {

    const distance = 9;

    const cameraX =
        robot.position.x - Math.sin(cameraYaw) * distance;

    const cameraZ =
        robot.position.z - Math.cos(cameraYaw) * distance;

    camera.position.x = cameraX;
    camera.position.z = cameraZ;

    camera.position.y =
        robot.position.y + 5 - cameraPitch * 3;

    camera.lookAt(
        robot.position.x,
        robot.position.y + 1.2,
        robot.position.z
    );
}
