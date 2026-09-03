// ROBO CLASH - GAME ENGINE

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


// ARENA

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


// GRID

const grid = new THREE.GridHelper(
    40,
    40,
    0x2488ff,
    0x20304d
);

grid.position.y = 0.02;
scene.add(grid);


// MAPS

const maps = [
    {
        name: "NEON CITY",
        description: "A futuristic city packed with cover."
    },
    {
        name: "ROBOT FACTORY",
        description: "An industrial battlefield filled with machinery."
    },
    {
        name: "LAVA CORE",
        description: "A dangerous arena surrounding a molten reactor."
    },
    {
        name: "FROST BASE",
        description: "A frozen military base built for combat."
    },
    {
        name: "MECHA FOREST",
        description: "A mechanical forest hiding dangerous enemies."
    },
    {
        name: "ORBITAL STATION",
        description: "A futuristic station high above the planet."
    },
    {
        name: "SCRAP DESERT",
        description: "A huge desert filled with abandoned machines."
    },
    {
        name: "POWER PLANT",
        description: "A massive energy facility full of hazards."
    }
];


// MAP ROLLER

const mapRoll = document.getElementById("map-roll");
const mapName = document.getElementById("map-name");
const mapDescription = document.getElementById("map-description");
const rollStatus = document.querySelector(".roll-status");

let mapIndex = 0;

function startMapRoll() {

    if (!mapRoll || !mapName || !rollStatus) {
        return;
    }

    mapRoll.style.display = "flex";
    mapRoll.style.opacity = "1";

    rollStatus.textContent = "SELECTING MAP...";

    const roller = setInterval(() => {

        const currentMap = maps[mapIndex % maps.length];

        mapName.textContent = currentMap.name;

        if (mapDescription) {
            mapDescription.textContent = currentMap.description;
        }

        mapIndex++;

    }, 120);

    setTimeout(() => {

        clearInterval(roller);

        const selectedMap =
            maps[Math.floor(Math.random() * maps.length)];

        mapName.textContent = selectedMap.name;

        if (mapDescription) {
            mapDescription.textContent =
                selectedMap.description;
        }

        rollStatus.textContent = "SELECTED MAP";

        setTimeout(() => {

            mapRoll.style.opacity = "0";

            setTimeout(() => {
                mapRoll.style.display = "none";
            }, 500);

        }, 900);

    }, 4000);
}

startMapRoll();


// PLAYER ROBOT

const robot = new THREE.Group();

const robotMaterial = new THREE.MeshStandardMaterial({
    color: 0x287cff,
    metalness: 0.8,
    roughness: 0.25
});

const darkMaterial = new THREE.MeshStandardMaterial({
    color: 0x35485e,
    metalness: 0.8,
    roughness: 0.25
});

const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0x9bb0c7,
    metalness: 0.85,
    roughness: 0.2
});


// BODY

const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 1.4, 0.9),
    robotMaterial
);

body.position.y = 1.3;
robot.add(body);


// HEAD

const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 16, 12),
    metalMaterial
);

head.position.y = 2.4;
robot.add(head);


// EYES

const eyeMaterial = new THREE.MeshStandardMaterial({
    color: 0x66ddff,
    emissive: 0x2299ff,
    emissiveIntensity: 3
});

const leftEye = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.13, 0.08),
    eyeMaterial
);

leftEye.position.set(-0.2, 2.45, 0.5);
robot.add(leftEye);

const rightEye = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.13, 0.08),
    eyeMaterial
);

rightEye.position.set(0.2, 2.45, 0.5);
robot.add(rightEye);


// SHOULDERS

const leftShoulder = new THREE.Mesh(
    new THREE.SphereGeometry(0.24, 12, 8),
    darkMaterial
);

leftShoulder.position.set(-0.82, 1.75, 0);
robot.add(leftShoulder);

const rightShoulder = new THREE.Mesh(
    new THREE.SphereGeometry(0.24, 12, 8),
    darkMaterial
);

rightShoulder.position.set(0.82, 1.75, 0);
robot.add(rightShoulder);


// ARMS

const leftArm = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.16, 0.7, 4, 8),
    darkMaterial
);

leftArm.position.set(-0.9, 1.2, 0);
robot.add(leftArm);

const rightArm = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.16, 0.7, 4, 8),
    darkMaterial
);

rightArm.position.set(0.9, 1.2, 0);
robot.add(rightArm);


// LEGS

const leftLeg = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.18, 0.7, 4, 8),
    darkMaterial
);

leftLeg.position.set(-0.35, 0.35, 0);
robot.add(leftLeg);

const rightLeg = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.18, 0.7, 4, 8),
    darkMaterial
);

rightLeg.position.set(0.35, 0.35, 0);
robot.add(rightLeg);


// FEET

const leftFoot = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.25, 0.7),
    darkMaterial
);

leftFoot.position.set(-0.35, -0.05, 0.12);
robot.add(leftFoot);

const rightFoot = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.25, 0.7),
    darkMaterial
);

rightFoot.position.set(0.35, -0.05, 0.12);
robot.add(rightFoot);


// ROBOT POSITION

robot.position.set(0, 0, 0);
scene.add(robot);


// ANIMATION

function animate() {

    requestAnimationFrame(animate);

    robot.rotation.y += 0.003;

    renderer.render(scene, camera);
}

animate();


// RESIZE

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});
