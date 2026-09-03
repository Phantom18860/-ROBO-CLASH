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

// SHOW GAME AFTER MAP SELECTION
setTimeout(() => {
    const mapRoll = document.getElementById("map-roll");

    if (mapRoll) {
        mapRoll.classList.add("hidden");
    }
}, 4100);
// REAL ROBOT
const robot = new THREE.Group();

// Body
const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 1.4, 0.8),
    new THREE.MeshStandardMaterial({ color: 0x287cff, metalness: 0.7, roughness: 0.3 })
);
body.position.y = 1.2;
robot.add(body);

// Head
const head = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.7, 0.75),
    new THREE.MeshStandardMaterial({ color: 0x8aa4c4, metalness: 0.8, roughness: 0.25 })
);
head.position.y = 2.25;
robot.add(head);

// Eyes
const eyeMaterial = new THREE.MeshStandardMaterial({
    color: 0x66ccff,
    emissive: 0x2299ff,
    emissiveIntensity: 2
});

for (const x of [-0.22, 0.22]) {
    const eye = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 0.16, 0.08),
        eyeMaterial
    );
    eye.position.set(x, 2.3, 0.39);
    robot.add(eye);
}

// Arms
for (const x of [-0.85, 0.85]) {
    const arm = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 1.2, 0.35),
        new THREE.MeshStandardMaterial({ color: 0x465b73, metalness: 0.7 })
    );
    arm.position.set(x, 1.25, 0);
    robot.add(arm);
}

// Legs
for (const x of [-0.35, 0.35]) {
    const leg = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 1, 0.45),
        new THREE.MeshStandardMaterial({ color: 0x35485e, metalness: 0.7 })
    );
    leg.position.set(x, 0.3, 0);
    robot.add(leg);
}

robot.position.set(0, 0, 0);
scene.add(robot);
// PLAYER ROBOT - UPGRADED
const robot = new THREE.Group();

const robotBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 1.4, 0.9),
    new THREE.MeshStandardMaterial({
        color: 0x287cff,
        metalness: 0.8,
        roughness: 0.25
    })
);
robotBody.position.y = 1.3;
robot.add(robotBody);

const robotHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 16, 12),
    new THREE.MeshStandardMaterial({
        color: 0x9bb0c7,
        metalness: 0.85,
        roughness: 0.2
    })
);
robotHead.position.y = 2.45;
robot.add(robotHead);

const eyeMaterial = new THREE.MeshStandardMaterial({
    color: 0x66ddff,
    emissive: 0x2299ff,
    emissiveIntensity: 3
});

for (const x of [-0.2, 0.2]) {
    const eye = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.12, 0.08),
        eyeMaterial
    );
    eye.position.set(x, 2.48, 0.5);
    robot.add(eye);
}

for (const x of [-0.85, 0.85]) {
    const arm = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.16, 0.7, 4, 8),
        new THREE.MeshStandardMaterial({
            color: 0x465b73,
            metalness: 0.8,
            roughness: 0.25
        })
    );
    arm.position.set(x, 1.3, 0);
    robot.add(arm);
}

for (const x of [-0.35, 0.35]) {
    const leg = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.18, 0.7, 4, 8),
        new THREE.MeshStandardMaterial({
            color: 0x35485e,
            metalness: 0.8,
            roughness: 0.25
        })
    );
    leg.position.set(x, 0.35, 0);
    robot.add(leg);
}

robot.position.set(0, 0, 0);
scene.add(robot);
