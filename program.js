const backgrounds = [
    "Akira.jpeg",
    "Akira2.jpeg",
    "anime_red.jpg",
    "anime1.jpg",
    "asukara.jpeg",
    "aya_and_the_witch.jpg",
    "Blood_Blockade_Battlefront.png",
    "Blood_Blockade_Battlefront2.png",
    "botw.jpg",
    "botw2.jpg",
    "cherryblossoms.jpg",
    "cow_boy_bepop.jpg",
    "fruits_basket.jpg",
    "garden_of_worlds.jpeg",
    "garden_of_worlds2.png",
    "ghibli.jpg",
    "ghibli_totoro.png",
    "ghibli2.jpg",
    "grimgar.jpeg",
    "grimgar2.jpeg",
    "grimgar3.jpeg",
    "howls_castle2.jpeg",
    "howls_moving_castle.jpg",
    "jirachi.png",
    "kaguya2.jpeg",
    "king_arthur.png",
    "madoka_magica.jpeg",
    "my_hero.png",
    "naruto_field.jpg",
    "naruto_hokages.png",
    "persona.jpg",
    "pixel_80s.jpg",
    "pixel_cherry.jpg",
    "pixel_coffee.jpg",
    "pixel_colorful.jpg",
    "pixel_country_road.png",
    "pixel_country_side.jpg",
    "pixel_dojo.jpg",
    "pixel_fall.png",
    "pixel_fuji.jpg",
    "pixel_ghost.jpg",
    "pixel_japan.png",
    "pixel_jungle.jpg",
    "pixel_lake.png",
    "pixel_night.jpg",
    "pixel_town.jpg",
    "pixel_train.jpg",
    "pixel_white.jpg",
    "pixel_winter.png",
    "pokemon.jpg",
    "pokemon_classic.png",
    "princess_kaguya.jpeg",
    "psycho_pass.jpg",
    "psycho_pass2.jpeg",
    "psycho_pass3.jpeg",
    "psycho_pass4.jpeg",
    "space_dandy.png",
    "space_dandy2.jpeg",
    "space_dandy3.jpeg",
    "space_dandy4.jpeg",
    "space_dandy5.jpeg",
    "tenkon_kinkreet.jpeg",
    "tenkon_kinkreet2.jpeg",
    "tenkon_kinkreet3.jpeg",
    "undertale.jpg",
    "undertale_snow.png",
];
let background = 0;
let backgroundLoaded = 0;

/**
 * colin + karlee
 * frameWidth: 32
 * frameHeight: 48
 */
const sprites = {
    dova: {
        skins: {
            default: {
                width: 64,
                height: 64,
                frames: [1, 5, 9, 13],
                scale: 1.5
            },
            gray: {
                height: 117,
                width: 165,
                frames: [0, 1, 2],
                scale: 1 / 2,
                offset: -10
            },
            nyan: {
                height: 20,
                width: 58.8,
                frames: [0, 1, 2, 3, 4],
                scale: 1.5,
                offset: -10
            },
            sleeping: {
                height: 160,
                width: 192.5,
                frames: [0, 1, 2, 3],
                scale: 1 / 2,
                offset: -10
            },
            tiger: {
                height: 56,
                width: 56,
                scale: 2
            }
        },
        sprite: null,
        skin: 0,
        position: 0
    },
    colin: {
        skins: {
            bw: {},
            cloak: {},
            pirate: {},
            blue: {}
        },
        sprite: null,
        skin: 0,
        position: 1
    },
    karlee: {
        skins: {
            gold: {},
            beige: {},
            pink: {},
            red: {}
        },
        sprite: null,
        skin: 0,
        position: 2
    }
};

const defaultScale = 3;
const defaultHeight = 48;
const defaultWidth = 32;
const defaultOffset = -30;

$(function () {
    new Phaser.Game({
        width: "100%",
        height: "100%",
        transparent: false,
        disableContextMenu: true,
        pixelArt: true,
        fps: 30,
        type: Phaser.AUTO,
        scene: {
            preload: preload,
            create: create
        }
    });
});

function preload() {
    let scene = new Phaser.Scene();
    scene = this;

    Object.keys(sprites).forEach(key => {
        Object.keys(sprites[key].skins).forEach(k => {
            const skin = sprites[key].skins[k];
            scene.load.spritesheet(`${key}-${k}`, `/journey/sprites/${key}/${key}_${k}.png`, {
                frameWidth: skin.width ? skin.width : defaultWidth,
                frameHeight: skin.height ? skin.height : defaultHeight
            });
        });
    });

    loadBackgrounds(scene, true);
}



function loadBackgrounds(scene, init){
    if(backgroundLoaded >= backgrounds.length){
        return init ? null : scene.load.start();
    }
    scene.load.image(backgrounds[backgroundLoaded], `/journey/backgrounds/${backgrounds[backgroundLoaded]}`);
    backgroundLoaded = backgroundLoaded + 1;
    if(backgroundLoaded >= backgrounds.length){
        return init ? null : scene.load.start();
    }
    scene.load.image(backgrounds[backgroundLoaded], `/journey/backgrounds/${backgrounds[backgroundLoaded]}`);
    backgroundLoaded = backgroundLoaded + 1;
    if(backgroundLoaded >= backgrounds.length){
        return init ? null : scene.load.start();
    }
    scene.load.image(backgrounds[backgroundLoaded], `/journey/backgrounds/${backgrounds[backgroundLoaded]}`);
    backgroundLoaded = backgroundLoaded + 1;
    return init ? null : scene.load.start();
}

function create() {
    let scene = new Phaser.Scene();
    scene = this;
    const camera = scene.cameras.main;

    scene.input.dragDistanceThreshold = 25;

    //x #s - default y = 500
    const positions = [.25, .5, .75];

    Object.keys(sprites).forEach(key => {
        const config = sprites[key];
        const skins = Object.keys(config.skins);
        skins.forEach(k => {
            const skin = config.skins[k];
            scene.anims.create({
                key: `walk-${key}-${k}`,
                frameRate: skin.framerate ? skin.framerate : 4,
                repeat: -1,
                frames: scene.anims.generateFrameNumbers(`${key}-${k}`, {
                    frames: skin.frames ? skin.frames : [8, 9, 10, 11]
                })
            });
        });

        function addSprite() {
            const skin = config.skins[skins[config.skin]];
            config.sprite = scene.add.sprite(positions[config.position] * window.innerWidth,
                    ((defaultOffset + (skin.offset ? skin.offset : 0)) + window.innerHeight) - ((skin.height ? skin.height : defaultHeight) * (skin.scale ? skin.scale : 6)) / 2, `${key}-${skins[config.skin]}`).play(`walk-${key}-${skins[config.skin]}`)
                .setScale(skin.scale ? skin.scale : defaultScale)
                .setInteractive({
                    draggable: true
                }).on("pointerup", function () {
                    config.sprite.destroy(true);
                    //toggle skin on config, wrap to 0 if index == length
                    config.skin = config.skin + 1;
                    if (config.skin === skins.length) {
                        config.skin = 0;
                    }
                    addSprite();
                })
                .on('dragend', function (pointer) {
                    if (pointer.downX < pointer.upX) {
                        //move to right
                        config.position = config.position + 1;
                        if (config.position === 3) {
                            config.position = 0;
                        }
                    } else {
                        //move to left
                        config.position = config.position - 1;
                        if (config.position === -1) {
                            config.position = 2;
                        }
                    }
                    //find sprite with current position and swap
                    Object.values(sprites).forEach(c => {
                        if (c.position === config.position && c.sprite !== config.sprite) {
                            c.position = pointer.downX < pointer.upX ? c.position - 1 : c.position + 1;
                            if (c.position === 3) {
                                c.position = 0;
                            }
                            if (c.position === -1) {
                                c.position = 2;
                            }
                            c.sprite.destroy(true);
                            c.addSprite();
                        }
                    });
                    config.sprite.destroy(true);
                    addSprite();
                });
            scene.input.setDraggable(config.sprite);
        }
        config.addSprite = addSprite;
        addSprite();
    });

    //scene.scale.startFullscreen();

    /**
     * characters move right to x * 1.3 then snap back to x
     * camera pans 1.3 x out then snaps back to x with new background
     */
    let bg = null;

    function addBackground() {
        bg = scene.add.image(window.innerWidth / 2, window.innerHeight / 2, backgrounds[background]).setDisplaySize(window.innerWidth * 1.3, window.innerHeight).setDepth(-1);
        camera.pan(window.innerWidth * 1.3 / 2, window.innerHeight / 2, 10000, "Sine.easeInOut", false, function (cam, progress) {
            Object.keys(sprites).forEach(key => {
                const config = sprites[key];
                const skins = Object.keys(config.skins);
                const skin = config.skins[skins[config.skin]];
                const diff = (window.innerWidth * 1.3 / 2) - (window.innerWidth / 2);
                config.sprite.setPosition((positions[config.position] * window.innerWidth) + (diff * progress),
                    ((defaultOffset + (skin.offset ? skin.offset : 0)) + window.innerHeight) - ((skin.height ? skin.height : defaultHeight) * (skin.scale ? skin.scale : defaultScale)) / 2);
            });

            if (progress === 1) {
                background = background + 1;
                if (background === backgrounds.length) {
                    background = 0;
                }
                camera.setPosition(0, 0);
                camera.centerOn(window.innerWidth / 2, window.innerHeight / 2);
                camera.setScroll(0, 0);
                Object.keys(sprites).forEach(key => {
                    const config = sprites[key];
                    const skins = Object.keys(config.skins);
                    const skin = config.skins[skins[config.skin]];
                    config.sprite.setPosition((positions[config.position] * window.innerWidth),
                        ((defaultOffset + (skin.offset ? skin.offset : 0)) + window.innerHeight) - ((skin.height ? skin.height : defaultHeight) * (skin.scale ? skin.scale : defaultScale)) / 2);
                });
                setTimeout(() => {
                    bg.destroy(true);
                    addBackground();
                    setTimeout(() => {
                        loadBackgrounds(scene);
                    });
                });
            }
        });
    }
    camera.setPosition(0, 0);
    camera.centerOn(window.innerWidth / 2, window.innerHeight / 2);
    camera.setScroll(0, 0);
    addBackground();
}