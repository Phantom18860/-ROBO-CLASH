// ============================================================
// ROBO CLASH - PHONE + PC GAME
// ============================================================

// ====================
// SCENE
// ====================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x070b14);

const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 8, 12);


// ====================
// RENDERER
// ====================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const game = document.getElementById("game");

if (!game) {
    throw new Error("ROBO CLASH: #game element was not found.");
}

game.appendChild(renderer.domElement);

const gameCanvas = renderer.domElement;

gameCanvas.style.display = "block";
gameCanvas.style.touchAction = "none";


// ====================
// LIGHTING
// ====================

scene.add(
    new THREE.HemisphereLight(
        0xffffff,
        0x18243a,
        2
    )
);

const light = new THREE.DirectionalLight(
    0xffffff,
    2
);

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


// Grid
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
    [
        "NEON CITY",
        "A futuristic city packed with cover."
    ],
    [
        "ROBOT FACTORY",
        "An industrial battlefield filled with machinery."
    ],
    [
        "LAVA CORE",
        "A dangerous arena surrounding a molten reactor."
    ],
    [
        "FROST BASE",
        "A frozen military base built for combat."
    ],
    [
        "SCRAP DESERT",
        "A massive battlefield filled with abandoned machines."
    ]
];


// ====================
// MAP ROLLER
// ====================

const mapRoll = document.getElementById("map-roll");
const mapName = document.getElementById("map-name");
const mapDescription =
    document.getElementById("map-description");

const rollStatus =
    document.querySelector(".roll-status");

let selectedMap = null;

if (
    mapRoll &&
    mapName &&
    mapDescription &&
    rollStatus
) {

    rollStatus.textContent = "SELECTING MAP...";

    const roller = setInterval(() => {

        const randomMap =
            maps[Math.floor(Math.random() * maps.length)];

        mapName.textContent = randomMap[0];
        mapDescription.textContent = randomMap[1];

    }, 120);

    setTimeout(() => {

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


// ============================================================
// ROBOT
// ============================================================

const robot = new THREE.Group();


// ====================
// MATERIALS
// ====================

const armorBlue =
    new THREE.MeshStandardMaterial({
        color: 0x287cff,
        metalness: 0.9,
        roughness: 0.22
    });

const armorDark =
    new THREE.MeshStandardMaterial({
        color: 0x17243a,
        metalness: 0.85,
        roughness: 0.3
    });

const armorSilver =
    new THREE.MeshStandardMaterial({
        color: 0xb8c7d9,
        metalness: 0.95,
        roughness: 0.18
    });

const black =
    new THREE.MeshStandardMaterial({
        color: 0x05070c,
        metalness: 0.5,
        roughness: 0.15
    });

const glowBlue =
    new THREE.MeshStandardMaterial({
        color: 0x55ddff,
        emissive: 0x168cff,
        emissiveIntensity: 5,
        metalness: 0.2,
        roughness: 0.2
    });


// ====================
// BOX HELPER
// ====================

function addBox(
    parent,
    x,
    y,
    z,
    sx,
    sy,
    sz,
    material,
    name
) {

    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(
            sx,
            sy,
            sz
        ),
        material
    );

    mesh.position.set(
        x,
        y,
        z
    );

    if (name) {
        mesh.name = name;
    }

    parent.add(mesh);

    return mesh;
}


// ============================================================
// BODY
// ============================================================

const torso = addBox(
    robot,
    0,
    1.9,
    0,
    2.6,
    2.8,
    1.8,
    armorBlue,
    "Armored Torso"
);


// Chest plate

addBox(
    robot,
    0,
    2.05,
    -0.94,
    1.8,
    1.45,
    0.18,
    armorDark,
    "Chest Plate"
);


// Chest reactor

const reactor = new THREE.Mesh(
    new THREE.CylinderGeometry(
        0.32,
        0.32,
        0.12,
        24
    ),
    glowBlue
);

reactor.rotation.x = Math.PI / 2;

reactor.position.set(
    0,
    2.15,
    -1.05
);

robot.add(reactor);


// Chest strips

for (const x of [-0.72, 0.72]) {

    addBox(
        robot,
        x,
        2.15,
        -1.06,
        0.18,
        0.9,
        0.12,
        armorSilver
    );
}


// ============================================================
// NECK
// ============================================================

const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(
        0.42,
        0.42,
        0.35,
        16
    ),
    armorDark
);

neck.position.y = 3.45;

robot.add(neck);


// ============================================================
// HEAD
// ============================================================

const head = new THREE.Group();

head.name = "Helmet";

head.position.set(
    0,
    4.25,
    0
);

robot.add(head);


// Main helmet

const helmet = new THREE.Mesh(
    new THREE.SphereGeometry(
        0.95,
        24,
        18
    ),
    armorSilver
);

helmet.scale.set(
    1.15,
    0.9,
    1.05
);

head.add(helmet);


// Blue shell

const helmetShell = new THREE.Mesh(
    new THREE.SphereGeometry(
        1,
        24,
        16
    ),
    armorBlue
);

helmetShell.scale.set(
    1.17,
    0.93,
    1.08
);

helmetShell.position.y = 0.08;

head.add(helmetShell);


// ============================================================
// VISOR
// ============================================================

const visor = new THREE.Mesh(
    new THREE.BoxGeometry(
        1.45,
        0.52,
        0.16
    ),
    black
);

visor.position.set(
    0,
    -0.05,
    -1.0
);

head.add(visor);


const visorGlass = new THREE.Mesh(
    new THREE.BoxGeometry(
        1.28,
        0.34,
        0.08
    ),
    new THREE.MeshStandardMaterial({
        color: 0x07111d,
        emissive: 0x03182b,
        emissiveIntensity: 1,
        metalness: 0.7,
        roughness: 0.08
    })
);

visorGlass.position.set(
    0,
    -0.05,
    -1.1
);

head.add(visorGlass);


// ============================================================
// GLOWING EYES
// ============================================================

for (const x of [-0.32, 0.32]) {

    const eye = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.27,
            0.12,
            0.08
        ),
        glowBlue
    );

    eye.position.set(
        x,
        -0.05,
        -1.17
    );

    head.add(eye);
}


// ============================================================
// THUG LIFE GLASSES 😎
// ============================================================

const glasses = new THREE.Group();

glasses.name = "THUG LIFE GLASSES";

head.add(glasses);


// Left lens

const leftLens = new THREE.Mesh(
    new THREE.BoxGeometry(
        0.58,
        0.34,
        0.10
    ),
    black
);

leftLens.position.set(
    -0.34,
    -0.05,
    -1.22
);

leftLens.rotation.z = -0.05;

glasses.add(leftLens);


// Right lens

const rightLens = new THREE.Mesh(
    new THREE.BoxGeometry(
        0.58,
        0.34,
        0.10
    ),
    black
);

rightLens.position.set(
    0.34,
    -0.05,
    -1.22
);

rightLens.rotation.z = 0.05;

glasses.add(rightLens);


// Bridge

addBox(
    glasses,
    0,
    -0.05,
    -1.25,
    0.22,
    0.08,
    0.08,
    armorSilver,
    "Glasses Bridge"
);


// Glasses shine

const shineMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x333333,
        emissiveIntensity: 1
    });


addBox(
    glasses,
    -0.46,
    0.02,
    -1.28,
    0.10,
    0.05,
    0.04,
    shineMaterial
);


addBox(
    glasses,
    0.22,
    0.02,
    -1.28,
    0.10,
    0.05,
    0.04,
    shineMaterial
);


// Glasses arms

addBox(
    glasses,
    -0.92,
    -0.05,
    -1.0,
    0.45,
    0.07,
    0.07,
    black
);


addBox(
    glasses,
    0.92,
    -0.05,
    -1.0,
    0.45,
    0.07,
    0.07,
    black
);


// ============================================================
// ANTENNA
// ============================================================

const antenna = new THREE.Mesh(
    new THREE.CylinderGeometry(
        0.055,
        0.055,
        0.55,
        10
    ),
    armorDark
);

antenna.position.set(
    0,
    1.0,
    0
);

head.add(antenna);


const antennaLight = new THREE.Mesh(
    new THREE.SphereGeometry(
        0.12,
        12,
        8
    ),
    glowBlue
);

antennaLight.position.set(
    0,
    1.3,
    0
);

head.add(antennaLight);


// ============================================================
// SHOULDERS
// ============================================================

for (const x of [-1.65, 1.65]) {

    const shoulder = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.62,
            18,
            12
        ),
        armorBlue
    );

    shoulder.scale.set(
        1.15,
        0.8,
        1
    );

    shoulder.position.set(
        x,
        2.75,
        0
    );

    robot.add(shoulder);
}


// ============================================================
// ARMS
// ============================================================

for (const x of [-1.75, 1.75]) {

    // Upper arm

    addBox(
        robot,
        x,
        2.0,
        0,
        0.62,
        1.35,
        0.72,
        armorDark,
        x < 0
            ? "Left Arm"
            : "Right Arm"
    );


    // Elbow

    const elbow = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.3,
            16,
            12
        ),
        armorSilver
    );

    elbow.position.set(
        x,
        1.25,
        0
    );

    robot.add(elbow);


    // Forearm

    addBox(
        robot,
        x,
        0.75,
        -0.05,
        0.72,
        1.0,
        0.8,
        armorBlue
    );


    // Hand

    addBox(
        robot,
        x,
        0.05,
        -0.12,
        0.72,
        0.45,
        0.7,
        armorDark
    );
}


// ============================================================
// LEGS
// ============================================================

for (const x of [-0.65, 0.65]) {

    // Hip

    const hip = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.32,
            16,
            12
        ),
        armorDark
    );

    hip.position.set(
        x,
        0.65,
        0
    );

    robot.add(hip);


    // Upper leg

    addBox(
        robot,
        x,
        0.25,
        0,
        0.85,
        1.25,
        0.9,
        armorBlue
    );


    // Knee

    const knee = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.27,
            16,
            12
        ),
        armorSilver
    );

    knee.position.set(
        x,
        -0.45,
        -0.05
    );

    robot.add(knee);


    // Lower leg

    addBox(
        robot,
        x,
        -1.0,
        0,
        0.8,
        1.0,
        0.85,
        armorDark
    );


    // Foot

    addBox(
        robot,
        x,
        -1.65,
        -0.18,
        1.0,
        0.5,
        1.35,
        armorSilver
    );


    // Foot armor

    addBox(
        robot,
        x,
        -1.62,
        -0.78,
        0.8,
        0.28,
        0.25,
        armorBlue
    );
}


// ============================================================
// BLASTER
// ============================================================

const weapon = new THREE.Group();

weapon.name = "Blaster";

weapon.position.set(
    2.35,
    0.8,
    -0.2
);

weapon.rotation.z = -0.12;

robot.add(weapon);


// Weapon body

addBox(
    weapon,
    0,
    0,
    0,
    0.65,
    1.7,
    0.75,
    armorDark
);


// Barrel

const barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(
        0.17,
        0.17,
        1.25,
        16
    ),
    armorSilver
);

barrel.rotation.z = Math.PI / 2;

barrel.position.x = 0.95;

weapon.add(barrel);


// Energy core

const weaponCore = new THREE.Mesh(
    new THREE.CylinderGeometry(
        0.22,
        0.22,
        0.22,
        16
    ),
    glowBlue
);

weaponCore.rotation.z = Math.PI / 2;

weaponCore.position.x = 1.55;

weapon.add(weaponCore);


// Handle

addBox(
    weapon,
    -0.05,
    -0.95,
    0,
    0.4,
    0.8,
    0.5,
    armorBlue
);


// ============================================================
// ROBOT POSITION
// ============================================================

robot.position.set(
    0,
    1.8,
    0
);

scene.add(robot);


// ============================================================
// PLAYER MOVEMENT
// ============================================================

const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false
};

const moveSpeed = 0.10;


// PC keyboard

window.addEventListener("keydown", (event) => {

    const key = event.key.toLowerCase();

    if (key === "w") keys.forward = true;
    if (key === "s") keys.backward = true;
    if (key === "a") keys.left = true;
    if (key === "d") keys.right = true;
});


window.addEventListener("keyup", (event) => {

    const key = event.key.toLowerCase();

    if (key === "w") keys.forward = false;
    if (key === "s") keys.backward = false;
    if (key === "a") keys.left = false;
    if (key === "d") keys.right = false;
});


// ============================================================
// CAMERA
// ============================================================

let cameraYaw = 0;
let cameraPitch = -0.35;

const cameraDistance = 9;


// ============================================================
// PC MOUSE CAMERA
// ============================================================

gameCanvas.addEventListener("click", () => {

    if (!isTouchDevice()) {

        if (
            document.pointerLockElement !==
            gameCanvas
        ) {
            gameCanvas.requestPointerLock();
        }
    }
});


document.addEventListener("mousemove", (event) => {

    if (
        document.pointerLockElement !==
        gameCanvas
    ) {
        return;
    }

    cameraYaw -=
        event.movementX * 0.0025;

    cameraPitch -=
        event.movementY * 0.0025;

    cameraPitch = Math.max(
        -1.2,
        Math.min(
            0.5,
            cameraPitch
        )
    );
});


// ============================================================
// MOBILE TOUCH CAMERA
// ============================================================

let touchLooking = false;
let lastTouchX = 0;
let lastTouchY = 0;

function isTouchDevice() {

    return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
    );
}


// Don't let joystick touches control camera

gameCanvas.addEventListener(
    "touchstart",
    (event) => {

        if (!isTouchDevice()) {
            return;
        }

        // Camera touch is only on the right side
        const touch =
            event.changedTouches[0];

        if (
            touch.clientX >
            window.innerWidth * 0.45
        ) {

            touchLooking = true;

            lastTouchX =
                touch.clientX;

            lastTouchY =
                touch.clientY;
        }
    },
    { passive: false }
);


gameCanvas.addEventListener(
    "touchmove",
    (event) => {

        if (!touchLooking) {
            return;
        }

        const touch =
            event.changedTouches[0];

        const dx =
            touch.clientX - lastTouchX;

        const dy =
            touch.clientY - lastTouchY;

        cameraYaw -= dx * 0.006;

        cameraPitch -= dy * 0.006;

        cameraPitch = Math.max(
            -1.2,
            Math.min(
                0.5,
                cameraPitch
            )
        );

        lastTouchX =
            touch.clientX;

        lastTouchY =
            touch.clientY;

        event.preventDefault();
    },
    { passive: false }
);


gameCanvas.addEventListener(
    "touchend",
    () => {
        touchLooking = false;
    }
);


// ============================================================
// MOBILE CONTROLS
// ============================================================

const mobileControls =
    document.createElement("div");

mobileControls.id =
    "mobile-controls";

mobileControls.innerHTML = `

    <div id="mobile-joystick">
        <div id="joystick-knob"></div>
    </div>

    <button id="mobile-fire">
        FIRE
    </button>
`;

document.body.appendChild(
    mobileControls
);


// Mobile joystick

const joystick =
    document.getElementById(
        "mobile-joystick"
    );

const knob =
    document.getElementById(
        "joystick-knob"
    );

let joystickActive = false;

let joystickX = 0;
let joystickY = 0;


function resetJoystick() {

    joystickX = 0;
    joystickY = 0;

    knob.style.transform =
        "translate(-50%, -50%)";

    joystickActive = false;
}


function moveJoystick(
    clientX,
    clientY
) {

    const rect =
        joystick.getBoundingClientRect();

    const centerX =
        rect.left +
        rect.width / 2;

    const centerY =
        rect.top +
        rect.height / 2;

    let dx =
        clientX - centerX;

    let dy =
        clientY - centerY;

    const maxDistance =
        rect.width / 2 - 30;

    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );

    if (distance > maxDistance) {

        dx =
            dx / distance *
            maxDistance;

        dy =
            dy / distance *
            maxDistance;
    }

    joystickX =
        dx / maxDistance;

    joystickY =
        dy / maxDistance;

    knob.style.transform =
        `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
}


joystick.addEventListener(
    "touchstart",
    (event) => {

        joystickActive = true;

        const touch =
            event.changedTouches[0];

        moveJoystick(
            touch.clientX,
            touch.clientY
        );

        event.preventDefault();
    },
    { passive: false }
);


joystick.addEventListener(
    "touchmove",
    (event) => {

        if (!joystickActive) {
            return;
        }

        const touch =
            event.changedTouches[0];

        moveJoystick(
            touch.clientX,
            touch.clientY
        );

        event.preventDefault();
    },
    { passive: false }
);


joystick.addEventListener(
    "touchend",
    resetJoystick
);

joystick.addEventListener(
    "touchcancel",
    resetJoystick
);


// Fire button

const fireButton =
    document.getElementById(
        "mobile-fire"
    );

fireButton.addEventListener(
    "touchstart",
    (event) => {

        event.preventDefault();

        fireWeapon();
    },
    { passive: false }
);


// ============================================================
// FIRE
// ============================================================

function fireWeapon() {

    // Visual recoil
    weapon.position.x = 2.25;

    setTimeout(() => {

        weapon.position.x = 2.35;

    }, 90);

}


// ============================================================
// UPDATE PLAYER
// ============================================================

function updatePlayer() {

    let forward = 0;
    let sideways = 0;


    // Keyboard

    if (keys.forward) {
        forward += 1;
    }

    if (keys.backward) {
        forward -= 1;
    }

    if (keys.left) {
        sideways -= 1;
    }

    if (keys.right) {
        sideways += 1;
    }


    // Mobile joystick

    if (
        Math.abs(joystickY) > 0.05 ||
        Math.abs(joystickX) > 0.05
    ) {

        forward += -joystickY;

        sideways += joystickX;
    }


    // Normalize

    const length =
        Math.sqrt(
            forward * forward +
            sideways * sideways
        );

    if (length > 1) {

        forward /= length;
        sideways /= length;
    }


    // Movement based on camera direction

    const forwardX =
        -Math.sin(cameraYaw);

    const forwardZ =
        -Math.cos(cameraYaw);

    const rightX =
        Math.cos(cameraYaw);

    const rightZ =
        -Math.sin(cameraYaw);


    robot.position.x +=
        (
            forwardX * forward +
            rightX * sideways
        ) * moveSpeed;


    robot.position.z +=
        (
            forwardZ * forward +
            rightZ * sideways
        ) * moveSpeed;


    // Keep robot inside arena

    robot.position.x =
        Math.max(
            -17,
            Math.min(
                17,
                robot.position.x
            )
        );

    robot.position.z =
        Math.max(
            -17,
            Math.min(
                17,
                robot.position.z
            )
        );
}


// ============================================================
// CAMERA UPDATE
// ============================================================

function updateCamera() {

    const cameraX =
        robot.position.x -
        Math.sin(cameraYaw) *
        cameraDistance;

    const cameraZ =
        robot.position.z -
        Math.cos(cameraYaw) *
        cameraDistance;


    camera.position.x =
        cameraX;

    camera.position.z =
        cameraZ;


    camera.position.y =
        robot.position.y +
        5 -
        cameraPitch * 3;


    camera.lookAt(
        robot.position.x,
        robot.position.y + 1.2,
        robot.position.z
    );
}


// ============================================================
// ANIMATION
// ============================================================

let robotTime = 0;


function animate() {

    requestAnimationFrame(
        animate
    );

    robotTime += 0.035;


    // Small idle movement

    robot.position.y =
        1.8 +
        Math.sin(robotTime) *
        0.035;


    // Weapon idle glow

    reactor.scale.setScalar(
        1 +
        Math.sin(robotTime * 2) *
        0.08
    );


    updatePlayer();

    updateCamera();

    renderer.render(
        scene,
        camera
    );
}


animate();


// ============================================================
// RESIZE
// ============================================================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);


// ============================================================
// MOBILE UI CSS
// ============================================================

const mobileStyle =
    document.createElement("style");

mobileStyle.textContent = `

#mobile-controls {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 190px;
    pointer-events: none;
    z-index: 9999;
    display: none;
}

#mobile-joystick {
    position: absolute;
    left: 25px;
    bottom: 25px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: rgba(30, 60, 100, 0.55);
    border: 3px solid rgba(80, 190, 255, 0.8);
    pointer-events: auto;
    touch-action: none;
}

#joystick-knob {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background: rgba(70, 190, 255, 0.9);
    border: 3px solid white;
    transform: translate(-50%, -50%);
}

#mobile-fire {
    position: absolute;
    right: 30px;
    bottom: 38px;
    width: 105px;
    height: 70px;
    border-radius: 22px;
    border: 3px solid rgba(255,255,255,0.8);
    background: rgba(210, 40, 40, 0.8);
    color: white;
    font-size: 20px;
    font-weight: 900;
    pointer-events: auto;
    touch-action: none;
}

@media (pointer: coarse) {

    #mobile-controls {
        display: block;
    }

}

`;

document.head.appendChild(
    mobileStyle
);
