/**
 * Imports
*/

// Essentials //
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

// Loaders //
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

//Animation
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'
import { gsap } from 'gsap'
import { Power4, Power1, Expo, Back, Sine, Circ } from "gsap"
import { Sprite } from 'three'

/*
CODE START HERE
*/

// DOM -------------------->>>>

// Loader
const loader_wrap = document.querySelector( '#loader-wrap' ) as HTMLInputElement
const loading_text = document.querySelector( '#loading-text' ) as HTMLInputElement
const loading_image = document.querySelector( '#loading-image' ) as HTMLInputElement

// Structure
// const bodytag = document.querySelector( '#body' ) as HTMLInputElement
// const explore3d__container = document.querySelector( '#Explore3D-wrap' ) as HTMLInputElement
const canvas_wrapper = document.querySelector( '.threed_container' ) as HTMLInputElement
const canvas = document.querySelector( '#webgl' ) as HTMLInputElement

// Navigation
const hotspot_menu_head = document.querySelector( '#hotspots-head' ) as HTMLInputElement
const menu_hotspots = document.querySelector( '#menu-hotspots' ) as HTMLInputElement
const view_menu = document.querySelector( '#menu-view' ) as HTMLInputElement

// Buttons
const top_BTN = document.querySelector( '#view-top' ) as HTMLInputElement
const left_BTN = document.querySelector( '#view-left' ) as HTMLInputElement
const right_BTN = document.querySelector( '#view-right' ) as HTMLInputElement
const reset_BTN = document.querySelector( '#view-reset' ) as HTMLInputElement
const close_BTN = document.querySelector( '#detail_close' ) as HTMLInputElement

// Mobile Buttons
// const menu_view_mob_Element = document.querySelector( '#menu-view-mob' ) as HTMLInputElement
const view_mob_top_BTN = document.querySelector( '#view-mob-top' ) as HTMLInputElement
const view_mob_left_BTN = document.querySelector( '#view-mob-left' ) as HTMLInputElement
const view_mob_right_BTN = document.querySelector( '#view-mob-right' ) as HTMLInputElement
const view_mob_reset_BTN = document.querySelector( '#view-mob-reset' ) as HTMLInputElement

// Hotspot
const detailContainer = document.querySelector( '.hotspot_detail_container' ) as HTMLDivElement
const detail_title = document.querySelector( '.detail_title' ) as HTMLDivElement
// const detail_close = document.querySelector( '.detail_close' ) as HTMLDivElement
const hotspot_media_1 = document.querySelector( '#hotspot-media-1' ) as HTMLImageElement
const hotspot_media_2 = document.querySelector( '#hotspot-media-2' ) as HTMLImageElement
const guide_text = document.querySelector( '.tooltip-right-left' ) as HTMLImageElement
const hover_line = document.querySelector( '.annotationButton' ) as HTMLDivElement

guide_text.style.display = 'none'

// Variables -------------------->>>>

// Essential
const windowsizes = {
    width : canvas_wrapper.clientWidth,
    height : canvas_wrapper.clientHeight
}
let resources : any

// Camera
let topView: boolean = false
let leftView: boolean = false
let rightView: boolean = false

let top_cam_pos: THREE.Vector3
let top_ctrl_trgt: THREE.Vector3

let left_cam_pos: THREE.Vector3
let left_ctrl_trgt: THREE.Vector3

let right_cam_pos: THREE.Vector3
let right_ctrl_trgt: THREE.Vector3

// Raycast
let intersects: any
let newIntersect: any = null
let newIntersect2: any = null
const raycaster = new THREE.Raycaster ()
// const raycaster2 = new THREE.Raycaster ()
let selectedField: any = null

// const mouse = new THREE.Vector2()
// const sceneMeshes = new Array()

// Hotspot
let annotations: any
let annotationSprite: any
// let annotationLabel: any
// let toHideSprite: any

// const annotationMarkers: THREE.Sprite[] = []
let topSprite: THREE.Sprite [] = []
let leftSprite: THREE.Sprite [] = []
let rightSprite: THREE.Sprite [] = []

// Audio
let listener: any
let sound: any

// GLTF
let outline_top: THREE.Group | THREE.Object3D<THREE.Event>
let outline_left: THREE.Group | THREE.Object3D<THREE.Event>
let outline_right: THREE.Group | THREE.Object3D<THREE.Event>

let anim_top: THREE.Group | THREE.Object3D<THREE.Event>
let anim_left: THREE.Group | THREE.Object3D<THREE.Event>
let anim_right: THREE.Group | THREE.Object3D<THREE.Event>

let static_mesh: THREE.Group | THREE.Object3D<THREE.Event>
var tester: any
// Outline
// Outline Array
let outlineArray_top = new Array()
let outlineArray_left = new Array()
let outlineArray_right = new Array()

// Top
var outline_text_left: any
var outline_text_right: any

var outline_beam: any
var outline_cluster: any
var outline_engine: any
var outline_hazard: any
var outline_horn: any
var outline_ignition: any
var outline_indicator: any
var outline_info: any
var outline_tank: any
var outline_tripper: any
var outline_usb: any

// Left
var outline_LTF: any
var outline_left_side: any
var outline_seat: any
var outline_LBL: any
var outline_gear: any
var outline_side_stand: any

// Right
var outline_RTF: any
var outline_right_side: any
var outline_horn: any
var outline_RBL: any
var outline_break: any
var outline_center_stand: any

// Animation
const anim_helpers = new Array()

let previousTime = 0
var clock = new THREE.Clock()

let mixer: THREE.AnimationMixer | null = null
let mixer2: THREE.AnimationMixer | null = null
let mixer3: THREE.AnimationMixer | null = null

var act_top_1_high: THREE.AnimationAction
var mesh_high: any
var act_top_1_pass: THREE.AnimationAction
var mesh_pass: any
var act_top_1_horn: THREE.AnimationAction
var act_top_1_neutral: THREE.AnimationAction
var mesh_neutral: any
var act_top_1_right: THREE.AnimationAction
var mesh_right: any
var act_top_1_left: THREE.AnimationAction
var mesh_left: any

var act_top_2_info: THREE.AnimationAction

var act_top_3_usb: THREE.AnimationAction

var act_top_4_01: THREE.AnimationAction
var act_top_4_02: THREE.AnimationAction
var act_top_4_03: THREE.AnimationAction
var act_top_4_04: THREE.AnimationAction
var act_top_4_05: THREE.AnimationAction
var act_top_4_06: THREE.AnimationAction
var act_top_4_07: THREE.AnimationAction
var act_top_4_08: THREE.AnimationAction
var act_top_4_09: THREE.AnimationAction
var act_top_4_10: THREE.AnimationAction
var act_top_4_11: THREE.AnimationAction
var act_top_4_12: THREE.AnimationAction
var act_top_4_13: THREE.AnimationAction
var act_top_4_14: THREE.AnimationAction
var act_top_4_15: THREE.AnimationAction
var act_top_4_16: THREE.AnimationAction
var act_top_4_17: THREE.AnimationAction

var act_top_7_stop: THREE.AnimationAction
var mesh_stop: any
var act_top_7_start: THREE.AnimationAction
var mesh_start: any
var act_top_7_hazard: THREE.AnimationAction

var act_top_8_01: THREE.AnimationAction
var act_top_8_02: THREE.AnimationAction
var act_top_8_03: THREE.AnimationAction
var act_top_8_04: THREE.AnimationAction
var act_top_8_05: THREE.AnimationAction
var act_top_8_06: THREE.AnimationAction
var mesh_key: any
var mesh_decal: any

// Left
var act_left_2_01: THREE.AnimationAction
var act_left_2_02: THREE.AnimationAction
var act_left_2_03: THREE.AnimationAction
var act_left_2_04: THREE.AnimationAction
var mesh_allen: any
var act_left_2_05: THREE.AnimationAction

var act_left_5_01: THREE.AnimationAction
var act_left_5_02: THREE.AnimationAction
var act_left_5_03: THREE.AnimationAction
var act_left_5_04: THREE.AnimationAction

var act_left_6_01: THREE.AnimationAction

var act_left_7_01: THREE.AnimationAction

// Right
var act_right_3_01: THREE.AnimationAction
var act_right_3_02: THREE.AnimationAction
var act_right_3_03: THREE.AnimationAction
var act_right_3_04: THREE.AnimationAction
var act_right_3_05: THREE.AnimationAction
var mesh_side_key: any
var act_right_3_06: THREE.AnimationAction
var mesh_side_decal: any

var act_right_5_01: THREE.AnimationAction
var act_right_5_02: THREE.AnimationAction

var act_right_6_01: THREE.AnimationAction

// Misc
let isRest = false
let openFiled: any
let isHover: boolean = true
let k: { [x: string]: any }
let ulElem: any
let circleTexture : any
let rect: DOMRect
let toShow: any = null
let resize=false

//Device Info Start//
//-------------------->>>>

let deviceInfo = {
    mobile: {
        type: "",
        isMobile: false

    },
    desktop: {
        browser: "",
        isDesktop: false
    },
    pixelRatio: 0,
    orientation: "",
    pixelResolution: {
        width: 0,
        height: 0,
    },
    isWebGlSupported: {
        type:"",
        isSupported:true
    }
      }
function detectWebGLContext() {
// Create canvas element. The canvas is not added to the
// document itself, so it is never displayed in the
// browser window.
const canvas = document.createElement("canvas");
// Get WebGLRenderingContext from canvas element.
const gl = canvas.getContext('webgl')
|| canvas.getContext("experimental-webgl");
// console.log(gl,"gl")
const gl2 = canvas.getContext('webgl2')  || canvas.getContext("experimental-webgl2");
// Report the result.
if (gl && gl instanceof WebGLRenderingContext) {
deviceInfo.isWebGlSupported.type = "webgl1"
deviceInfo.isWebGlSupported.isSupported = true
}else if(gl2 ){
deviceInfo.isWebGlSupported.type = "webgl2"
deviceInfo.isWebGlSupported.isSupported = true
} else {
deviceInfo.isWebGlSupported.type = "none"
deviceInfo.isWebGlSupported.isSupported = false

}
}
console.log(detectWebGLContext())

const getDeviceIfo = () => {
let userAgent = navigator.userAgent;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
deviceInfo.mobile.isMobile = true
deviceInfo.desktop.isDesktop = false
if (/windows phone/i.test(userAgent)) {
deviceInfo.mobile.type ="Windows Phone";
}

if (/android/i.test(userAgent)) {
deviceInfo.mobile.type ="Android";
}


if (/iPad|iPhone|iPod/.test(userAgent) ) {
deviceInfo.mobile.type = "iOS";
}
if (screen.availHeight > screen.availWidth) {
deviceInfo.orientation = "portrait "
} else {
deviceInfo.orientation = "landScape"
}
}else{
deviceInfo.mobile.isMobile = false,
deviceInfo.desktop.isDesktop = true
if (userAgent.match(/chrome|chromium|crios/i)) {
    deviceInfo.desktop.browser = "chrome";
} else if (userAgent.match(/firefox|fxios/i)) {
    deviceInfo.desktop.browser = "firefox";
} else if (userAgent.match(/safari/i)) {
    deviceInfo.desktop.browser = "safari";
} else if (userAgent.match(/opr\//i)) {
    deviceInfo.desktop.browser = "opera";
} else if (userAgent.match(/edg/i)) {
    deviceInfo.desktop.browser = "edge";
} else {
    deviceInfo.desktop.browser  = "No browser detection";
}
if (window.innerHeight > window.innerWidth) {
deviceInfo.orientation = "portrait "
}else{
deviceInfo.orientation = "landScape"
}
}

deviceInfo.pixelRatio= window.devicePixelRatio
detectWebGLContext()

deviceInfo.pixelResolution.width= window.screen.availWidth
deviceInfo.pixelResolution.height = window.screen.availHeight
// console.log(deviceInfo, "deviceInfo")
}
getDeviceIfo()

//Device Info End//

// Initial Properties -------------------->>>>
reset_BTN.style.visibility = "hidden"
detailContainer.remove()

// Loader Manager -------------------->>>>
const loadmanager = new THREE.LoadingManager( () =>
    {
        window.setTimeout(() =>
        {
            loader_wrap.style.zIndex = '1'
            loading_text.style.display = 'none'
            
            if ( windowsizes.width < windowsizes.height ) {
                loading_image.style.width = '80%'
            } else {
                loading_image.style.width = '40%'
            }

            loading_image.style.opacity = '0.2'
      
            gsap.to(loadingmaterial.uniforms.uAlpha, {
                duration: 2,
                value: 0
            })
        }, 500)

        window.setTimeout(() =>
        {
            scene.remove(loadingoverlay);
            loadingoverlay.geometry.dispose();
            loadingoverlay.material.dispose();
        }, 800)

        window.setTimeout(() =>
        {
            new TWEEN.Tween(static_mesh.position)
            .to(
                {
                    x: 0,
                    y: 0,
                    z: 0,
                },
                1200
            )
            .easing(TWEEN.Easing.Cubic.Out)
            .onStart( () => {
                controls.enabled = false
            })
            .onComplete( () => {
                controls.enabled = true
            })
            .start()

            new TWEEN.Tween(anim_top.position)
            .to(
                {
                    x: 0,
                    y: 0,
                    z: 0,
                },
                1200
            )
            .easing(TWEEN.Easing.Cubic.Out)
            .start()

            new TWEEN.Tween(anim_left.position)
            .to(
                {
                    x: 0,
                    y: 0,
                    z: 0,
                },
                1200
            )
            .easing(TWEEN.Easing.Cubic.Out)
            .start()

            new TWEEN.Tween(anim_right.position)
            .to(
                {
                    x: 0,
                    y: 0,
                    z: 0,
                },
                1200
            )
            .easing(TWEEN.Easing.Cubic.Out)
            .start()

        }, 1000)

        window.setTimeout(() =>
        {
            view_menu.style.display = 'block'
        }, 1500)
        
    },

    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        view_menu.style.display = 'none'
    }
)

// Three.js Scene Start Here -------------------->>>>

// Scene //
const scene = new THREE.Scene()
// scene.background = new THREE.Color( 0xff0000 )

// Renderer //
const renderer = new THREE.WebGLRenderer({
    canvas : canvas,
    antialias : true,
    alpha : true
})
renderer.setSize(windowsizes.width, windowsizes.height)
renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding
renderer.physicallyCorrectLights = true
renderer.toneMapping = THREE.ACESFilmicToneMapping
// renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 2.5
// renderer.autoClear = true

// Camera //
var fov = 20
if (windowsizes.width < windowsizes.height) {
    fov = 32
} else {
    fov = 20
}

const camera = new THREE.PerspectiveCamera(
    fov,
    windowsizes.width / windowsizes.height,
    0.1,
    10000
)
camera.position.set(5.696689653856482,1.8719833878370915,0.4564932426325203)

// Controls //
const controls = new OrbitControls(camera, renderer.domElement)
controls.enabled = true
controls.enablePan = false
cam_default()

function cam_default() {
    controls.target.set(0,0.60,0)
    controls.enableZoom = true
    controls.maxPolarAngle =  Math.PI * 0.5
    controls.minPolarAngle = 0
    controls.maxDistance = 6
    controls.minDistance = 3
    controls.maxAzimuthAngle = Infinity
    controls.minAzimuthAngle = Infinity
}

function cam_topview() {
    controls.enableZoom = false
    controls.maxDistance = 3
    controls.minDistance = 1
    controls.maxAzimuthAngle = Infinity
    controls.minAzimuthAngle = Infinity
}

function cam_leftview() {
    controls.enablePan = false
    controls.target.set(0,0.60,0)
    controls.enableZoom = true
    controls.maxDistance = 6
    controls.minDistance = 3
    controls.maxAzimuthAngle = Math.PI/2 + 1
    controls.minAzimuthAngle = -Math.PI/2 + 2
}

function cam_rightview() {
    controls.target.set(0,0.60,0)
    controls.enableZoom = true
    controls.maxDistance = 6
    controls.minDistance = 3
    controls.maxAzimuthAngle = -Math.PI/2 + 1
    controls.minAzimuthAngle = Math.PI/2 + 2
}

function cam_hotspot() {
    controls.enableZoom = true
    controls.enablePan = false
    controls.maxDistance = 10
    controls.minDistance = 0.1
}

// Light //

// Geometry //
var outlineMaterial1 = new THREE.MeshBasicMaterial( { color: 0x004BBE, side: THREE.BackSide} )
var outlineMaterial2 = new THREE.MeshBasicMaterial( { color: 0x004BBE } )
outlineMaterial1.toneMapped = false
outlineMaterial2.toneMapped = false
const sphere_helper = new THREE.SphereGeometry()
const box_helper = new THREE.BoxGeometry()
const helper_material = new THREE.MeshStandardMaterial({
    color: 0x00C9FF,
    transparent: true,
    opacity: 0,
    roughness: 0,
    metalness: 0
})

const highbeam_helper = new THREE.Mesh( sphere_helper , helper_material )
highbeam_helper.scale.set(0.008, 0.018, 0.005)
highbeam_helper.position.set(0.224, 1.060, 0.286)
highbeam_helper.rotation.set(0.53983033764, 0.035430183815, 0.1322959573)
scene.add( highbeam_helper )
highbeam_helper.name="highbeam_helper"
anim_helpers.push(highbeam_helper)

const pass_helper = new THREE.Mesh( sphere_helper , helper_material )
pass_helper.scale.set(0.008, 0.018, 0.005)
pass_helper.position.set(0.204, 1.056, 0.292)
pass_helper.rotation.set(0.62971479412, 0.61191243575, -0.44628068973)
scene.add( pass_helper )
pass_helper.name="pass_helper"
anim_helpers.push(pass_helper)

// const pass_helper = new THREE.Mesh( sphere_helper , helper_material )
// pass_helper.scale.set(0.005, 0.005, 0.005)
// pass_helper.position.set(0.204, 1.044, 0.293)
// scene.add( pass_helper )
// pass_helper.name="pass_helper"
// anim_helpers.push(pass_helper)

const left_helper = new THREE.Mesh( box_helper , helper_material )
left_helper.scale.set(0.016, 0.022, 0.005)
left_helper.position.set(0.230, 1.028, 0.284)
left_helper.rotation.set(-0.46216319, 0.3843215, 0.1516691)
scene.add( left_helper )
left_helper.name="left_helper"
anim_helpers.push(left_helper)

const right_helper = new THREE.Mesh( box_helper , helper_material )
right_helper.scale.set(0.016, 0.022, 0.005)
right_helper.position.set(0.199, 1.027, 0.298)
right_helper.rotation.set(-0.46216319, 0.3843215, 0.1516691)
scene.add( right_helper )
right_helper.name="right_helper"
anim_helpers.push(right_helper)

const center_helper = new THREE.Mesh( sphere_helper , helper_material )
center_helper.scale.set(0.006, 0.009, 0.006)
center_helper.position.set(0.211, 1.023, 0.284)
scene.add( center_helper )
center_helper.name="center_helper"
anim_helpers.push(center_helper)

const horn_helper = new THREE.Mesh( sphere_helper , helper_material )
horn_helper.scale.set(0.014, 0.005, 0.008)
horn_helper.position.set(0.226, 1.001, 0.304)
scene.add( horn_helper )
horn_helper.name="horn_helper"
anim_helpers.push(horn_helper)

const info_helper = new THREE.Mesh( sphere_helper , helper_material )
info_helper.scale.set(0.006, 0.006, 0.006)
info_helper.position.set(0.241, 1.065, 0.336)
scene.add( info_helper )
info_helper.name="info_helper"
anim_helpers.push(info_helper)

const usb_helper = new THREE.Mesh( sphere_helper , helper_material )
usb_helper.scale.set(0.015, 0.012, 0.013)
usb_helper.position.set(0.192, 1.010, 0.371)
scene.add( usb_helper )
usb_helper.name="usb_helper"
anim_helpers.push(usb_helper)

const cluster_helper = new THREE.Mesh( sphere_helper , helper_material )
cluster_helper.scale.set(0.050, 0.050, 0.050)
cluster_helper.position.set(0.046, 1.028, 0.507)
scene.add( cluster_helper )
cluster_helper.name="cluster_helper"
anim_helpers.push(cluster_helper)

const tripper_helper = new THREE.Mesh( sphere_helper , helper_material )
tripper_helper.scale.set(0.028, 0.028, 0.028)
tripper_helper.position.set(-0.053, 1.015, 0.482)
scene.add( tripper_helper )
tripper_helper.name="tripper_helper"
anim_helpers.push(tripper_helper)

const ignition_helper = new THREE.Mesh( sphere_helper , helper_material )
ignition_helper.scale.set(0.023, 0.023, 0.023)
ignition_helper.position.set(-0.008, 1.001, 0.445)
scene.add( ignition_helper )
ignition_helper.name="ignition_helper"
anim_helpers.push(ignition_helper)

const start_helper = new THREE.Mesh( sphere_helper , helper_material )
start_helper.scale.set(0.006, 0.017, 0.005)
start_helper.position.set(-0.203, 1.059, 0.299)
start_helper.rotation.set(0.6492625, -0.52761303, 0.46443211)
scene.add( start_helper )
start_helper.name="start_helper"
anim_helpers.push(start_helper)

const kill_helper = new THREE.Mesh( sphere_helper , helper_material )
kill_helper.scale.set(0.007, 0.017, 0.005)
kill_helper.position.set(-0.223, 1.063, 0.291)
kill_helper.rotation.set(0.46670104, -0.64821528, -0.20001473)
scene.add( kill_helper )
kill_helper.name="kill_helper"
anim_helpers.push(kill_helper)

const hazard_helper = new THREE.Mesh( box_helper , helper_material )
hazard_helper.scale.set(0.033, 0.022, 0.005)
hazard_helper.position.set(-0.204, 1.029, 0.291)
hazard_helper.rotation.set(-0.30089476, -0.40945424, -0.08237954)
scene.add( hazard_helper )
hazard_helper.name="hazard_helper"
anim_helpers.push(hazard_helper)

const tank_helper = new THREE.Mesh( box_helper , helper_material )
tank_helper.scale.set(0.060, 0.020, 0.080)
tank_helper.position.set(0.000, 0.946, 0.175)
scene.add( tank_helper )
tank_helper.name="tank_helper"
anim_helpers.push(tank_helper)

// Left
const left_side = new THREE.Mesh( box_helper , helper_material )
left_side.scale.set(0.100, 0.149, 0.273)
left_side.position.set(0.123, 0.586, -0.209)
scene.add( left_side )
left_side.name="left_side"
anim_helpers.push(left_side)

const side_stand = new THREE.Mesh( box_helper , helper_material )
side_stand.scale.set(0.020, 0.025, 0.165)
side_stand.position.set(0.183, 0.210, -0.227)
scene.add( side_stand )
side_stand.name="side_stand"
anim_helpers.push(side_stand)

const gear_helper = new THREE.Mesh( box_helper , helper_material )
gear_helper.scale.set(0.045, 0.021, 0.021)
gear_helper.position.set(0.221, 0.268, 0.001)
scene.add( gear_helper )
gear_helper.name="gear_helper"
anim_helpers.push(gear_helper)

// Right
const right_side = new THREE.Mesh( box_helper , helper_material )
right_side.scale.set(0.006, 0.032, 0.035)
right_side.position.set(-0.142, 0.480, -0.216)
scene.add( right_side )
right_side.name="right_side"
anim_helpers.push(right_side)

const center_stand = new THREE.Mesh( box_helper , helper_material )
center_stand.scale.set(0.161, 0.036, 0.271)
center_stand.position.set(0.044, 0.195, -0.211)
scene.add( center_stand )
center_stand.name="center_stand"
anim_helpers.push(center_stand)

const brake_helper = new THREE.Mesh( box_helper , helper_material )
brake_helper.scale.set(0.047, 0.020, 0.055)
brake_helper.position.set(-0.225, 0.275, 0.004)
scene.add( brake_helper )
brake_helper.name="brake_helper"
anim_helpers.push(brake_helper)

// Loading Overlay
const loadinggeometry = new THREE.PlaneBufferGeometry(2, 2, 1 , 1)
const loadingmaterial = new THREE.ShaderMaterial ({
    transparent: true,
    uniforms: {
        uAlpha: { value: 1 }
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})

const loadingoverlay = new THREE.Mesh(loadinggeometry, loadingmaterial)
scene.add( loadingoverlay )

// JSON Parsor
const globalParser = () => {
    const resources_Download = new XMLHttpRequest()
    resources_Download.open('GET', '/data/resources_local.json') // Local
    resources_Download.onreadystatechange = function () {
        if ( resources_Download.readyState === 4 ) {
            resources = JSON.parse( resources_Download.responseText )

            // Texture //
            circleTexture = new THREE.TextureLoader().load( resources.Sprite )

            // HDRI //
            var pmremGenerator = new THREE.PMREMGenerator( renderer );
            pmremGenerator.compileCubemapShader();
            new RGBELoader().load( resources.HDRI , function ( texture ) {
                let env = pmremGenerator.fromEquirectangular( texture ).texture;

                // scene.background = new THREE.Color(0xe5e3e3)
                scene.environment = env

                texture.dispose();
                pmremGenerator.dispose();
            })

            // Audio //
            listener = new THREE.AudioListener()
            camera.add( listener )

            sound = new THREE.Audio( listener );

            // GLTF //
            const dracoLoader = new DRACOLoader(loadmanager)
            dracoLoader.setDecoderPath( resources.DRACO )

            const loader = new GLTFLoader(loadmanager)
            loader.setDRACOLoader(dracoLoader)

            // Outline Top Mesh
            loader.load( resources.Top_outline ,
                function (gltf) {
                    outline_top = gltf.scene
                    outline_top.traverse(function (child) {
                        if ((child as THREE.Mesh).isMesh) {
                            const m = (child as THREE.Mesh)
                            m.material = outlineMaterial1
                            outline_beam = outline_top.getObjectByName("beam_outline")
                            outline_beam.userData.id="1. LH Switch Module"

                            outline_horn = outline_top.getObjectByName("horn_outline")
                            outline_horn.userData.id="1. LH Switch Module"

                            outline_indicator = outline_top.getObjectByName("indicator_outline")
                            outline_indicator.userData.id="1. LH Switch Module"

                            outline_text_left = outline_top.getObjectByName("text_left_outline")
                            outline_text_left.userData.id="1. LH Switch Module"

                            outline_info = outline_top.getObjectByName("info_outline")
                            outline_info.userData.id="2. Info Button"

                            outline_usb = outline_top.getObjectByName("usb_outline")
                            outline_usb.userData.id="3. Charger Port"

                            outline_cluster = outline_top.getObjectByName("cluster_outline")
                            outline_cluster.userData.id="4. Instrument Cluster"

                            outline_tripper = outline_top.getObjectByName("tripper_outline")
                            outline_tripper.userData.id="5. Tripper"

                            outline_ignition = outline_top.getObjectByName("ignition_outline")
                            outline_ignition.userData.id="6. Ignition Key"

                            outline_engine = outline_top.getObjectByName("engine_outline")
                            outline_engine.userData.id="7. RH Switch Module"

                            outline_hazard = outline_top.getObjectByName("hazard_outline")
                            outline_hazard.userData.id="7. RH Switch Module"

                            outline_text_right = outline_top.getObjectByName("text_right_outline")
                            outline_text_right.userData.id="7. RH Switch Module"

                            outline_tank = outline_top.getObjectByName("tank_outline")
                            outline_tank.userData.id="8. Fuel Tank Cap"

                            outline_text_left.material = outlineMaterial2
                            outline_text_right.material = outlineMaterial2
                        }
                    })
                    scene.add(outline_top)                    
                    outline_top.children.forEach((outline,index) => {
                       outline.visible=false
                       outlineArray_top.push(outline)
                    })
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )

            // Outline Left Mesh
            loader.load( resources.left_outline ,
                function (gltf) {
                    outline_left = gltf.scene
                    outline_left.traverse(function (child) {
                        if ((child as THREE.Mesh).isMesh) {
                            const m = (child as THREE.Mesh)
                            m.material = outlineMaterial1
                            outline_LTF = outline_left.getObjectByName("indi_front_left")
                            outline_LTF.userData.id="1. Left Trafficator Front"

                            outline_left_side = outline_left.getObjectByName("left_outline")
                            outline_left_side.userData.id="2. Left Side Panel"

                            outline_seat = outline_left.getObjectByName("seat_outline")
                            outline_seat.userData.id="3. Seat"

                            outline_LBL = outline_left.getObjectByName("indi_back_left")
                            outline_LBL.userData.id="4. Left Trafficator Rear"

                            outline_gear = outline_left.getObjectByName("gear_outline")
                            outline_gear.userData.id="5. Gear Change Pedal"

                            outline_side_stand = outline_left.getObjectByName("side_outline")
                            outline_side_stand.userData.id="6. Side Stand"

                            outline_center_stand = outline_left.getObjectByName("center_outline")
                            outline_center_stand.userData.id="7. Center Stand"
                        }
                    })
                    scene.add(outline_left)

                    outline_left.children.forEach((outline,index) => {
                        outline.visible=false
                        outlineArray_left.push(outline)
                    })
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )

            // Outline Right Mesh
            loader.load( resources.right_outline ,
                function (gltf) {
                    outline_right = gltf.scene
                    outline_right.traverse(function (child) {
                        if ((child as THREE.Mesh).isMesh) {
                            const m = (child as THREE.Mesh)
                            m.material = outlineMaterial1
                            outline_RTF =outline_right.getObjectByName("indi_front_right")
                            outline_RTF.userData.id="1. Right Trafficator Front"

                            outline_horn = outline_right.getObjectByName("horner_outline")
                            outline_horn.userData.id="2. Horn"

                            outline_right_side = outline_right.getObjectByName("right_outline")
                            outline_right_side.userData.id="3. Right Side Panel"

                            outline_RBL = outline_right.getObjectByName("indi_back_right")
                            outline_RBL.userData.id="4. Right Trafficator Rear"

                            outline_break = outline_right.getObjectByName("right_break")
                            outline_break.userData.id="5. Brake Pedal"

                        }
                    })
                    scene.add(outline_right)
                    
                    outline_right.children.forEach((outline,index) => {
                        outline.visible=false
                        outlineArray_right.push(outline)
                    })
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )

            // Anim Top Mesh
            loader.load( resources.Top_Anim ,
                function (gltf) {
                    anim_top = gltf.scene
                    anim_top.traverse(function (child) {
                        if ((child as THREE.Mesh).isMesh) {
                            const m = (child as THREE.Mesh)
                            mesh_high = anim_top.getObjectByName("J1C_handle_left_high_beam")
                            mesh_pass = anim_top.getObjectByName("J1C_handle_left_low_beam")
                            mesh_neutral = anim_top.getObjectByName("J1C_indicator_neutral")
                            mesh_right = anim_top.getObjectByName("J1C_indicator_right")
                            mesh_left = anim_top.getObjectByName("J1C_indicator_left")

                            mesh_start = anim_top.getObjectByName("J1C_handle_right_switch_start")
                            mesh_stop = anim_top.getObjectByName("J1C_handle_right_switch_stop")

                            mesh_key = anim_top.getObjectByName("J1C_fuel_tank_cap_key")
                            mesh_decal = anim_top.getObjectByName("J1C_fuel_tank_cap_key_decal")

                            mesh_key.visible = false
                            mesh_decal.visible = false
                        }
                    })
                    scene.add(anim_top)
                    anim_top.position.z = -2
                    mixer = new THREE.AnimationMixer(anim_top)
                    mixer.addEventListener('finished', function (e) {
                        guide_text.style.display = 'block'
                        guide_text.style.position = 'relative'
                        guide_text.style.right = '15px'
                        if ( tester == 'highbeam_helper' || tester == 'pass_helper') {
                            hotspot_media_1.src = annotations[0][0].media.a1
                            hotspot_media_2.src = annotations[0][0].media.a2
                            hotspot_media_1.style.display = "block"
                            hotspot_media_2.style.display = "block"
                        }
                        if ( tester == 'hazard_helper') {
                            hotspot_media_1.src = annotations[0][0].media.f1
                            hotspot_media_2.src = annotations[0][0].media.f2
                            hotspot_media_1.style.display = "block"
                            hotspot_media_2.style.display = "block"
                        }
                        tester = null
                        if (sound.isPlaying == true ){
                            sound.stop()
                        }
                        onOultineAnimation()
                    })
                    console.log(gltf.animations)
                    console.log("Load Hua")

                    // 01 LH Switch Module
                    // Beam
                    act_top_1_high = mixer.clipAction(gltf.animations[0])
                    act_top_1_pass = mixer.clipAction(gltf.animations[1])
                    // Horn
                    act_top_1_horn = mixer.clipAction(gltf.animations[2])
                    // Indicator
                    act_top_1_neutral = mixer.clipAction(gltf.animations[3])
                    act_top_1_right = mixer.clipAction(gltf.animations[4])
                    act_top_1_left = mixer.clipAction(gltf.animations[5])

                    // 02 Info Button
                    act_top_2_info = mixer.clipAction(gltf.animations[6])

                    // 03 Charging Port
                    act_top_3_usb = mixer.clipAction(gltf.animations[7])

                    // 04 Instrument Cluster
                    act_top_4_12 = mixer.clipAction(gltf.animations[8])
                    act_top_4_13 = mixer.clipAction(gltf.animations[9])
                    act_top_4_14 = mixer.clipAction(gltf.animations[10])
                    act_top_4_15 = mixer.clipAction(gltf.animations[11])
                    act_top_4_16 = mixer.clipAction(gltf.animations[12])
                    act_top_4_17 = mixer.clipAction(gltf.animations[13])
                    act_top_4_11 = mixer.clipAction(gltf.animations[14])

                    // 05 Tripper
                    act_top_4_01 = mixer.clipAction(gltf.animations[15])
                    act_top_4_02 = mixer.clipAction(gltf.animations[22])
                    act_top_4_03 = mixer.clipAction(gltf.animations[23])
                    act_top_4_04 = mixer.clipAction(gltf.animations[24])

                    // 06 Ignition Key
                    act_top_4_05 = mixer.clipAction(gltf.animations[16])
                    act_top_4_06 = mixer.clipAction(gltf.animations[17])
                    act_top_4_07 = mixer.clipAction(gltf.animations[18]) 
                    act_top_4_08 = mixer.clipAction(gltf.animations[19])
                    act_top_4_09 = mixer.clipAction(gltf.animations[20])
                    act_top_4_10 = mixer.clipAction(gltf.animations[21])

                    // 07 RH Switch Module
                    // Engine
                    act_top_7_stop = mixer.clipAction(gltf.animations[25])
                    act_top_7_start = mixer.clipAction(gltf.animations[26])
                    // Hazard
                    act_top_7_hazard = mixer.clipAction(gltf.animations[27])

                    // 08 Fuel Cap
                    act_top_8_01 = mixer.clipAction(gltf.animations[28])
                    act_top_8_02 = mixer.clipAction(gltf.animations[29])
                    act_top_8_03 = mixer.clipAction(gltf.animations[30]) 
                    act_top_8_04 = mixer.clipAction(gltf.animations[31]) 
                    act_top_8_05 = mixer.clipAction(gltf.animations[32]) 
                    act_top_8_06 = mixer.clipAction(gltf.animations[33]) 
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )

            // Anim Left Mesh
            loader.load( resources.Left_Anim ,
                function (gltf) {
                    anim_left = gltf.scene
                    anim_left.traverse(function (child) {
                        if ((child as THREE.Mesh).isMesh) {
                            const m = (child as THREE.Mesh)
                            mesh_allen = anim_left.getObjectByName("J1C_bodywork_side_panel_key")
                            mesh_allen.visible = false
                        }
                    })
                    scene.add(anim_left)
                    anim_left.position.z = -2
                    mixer2 = new THREE.AnimationMixer(anim_left)
                    mixer2.addEventListener('finished', function (e) {
                        guide_text.style.display = 'block'
                        guide_text.style.position = 'relative'
                        guide_text.style.right = '15px'
                        onOultineAnimation()    
                    })
                    console.log(gltf.animations)

                    // 02 Side Panel
                    act_left_2_01 = mixer2.clipAction(gltf.animations[0])
                    act_left_2_02 = mixer2.clipAction(gltf.animations[1])
                    act_left_2_03 = mixer2.clipAction(gltf.animations[2])
                    act_left_2_04 = mixer2.clipAction(gltf.animations[3])
                    act_left_2_05 = mixer2.clipAction(gltf.animations[4])

                    // 05 Gear
                    act_left_5_01 = mixer2.clipAction(gltf.animations[6])
                    act_left_5_02 = mixer2.clipAction(gltf.animations[7])
                    act_left_5_03 = mixer2.clipAction(gltf.animations[8])
                    act_left_5_04 = mixer2.clipAction(gltf.animations[9])

                    // 06 Side Stand
                    act_left_6_01 = mixer2.clipAction(gltf.animations[5])

                    
                    // 06 Center Stand
                    act_left_7_01 = mixer2.clipAction(gltf.animations[10])
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )

            // Anim Right Mesh
            loader.load( resources.Right_Anim ,
                function (gltf) {
                    anim_right = gltf.scene
                    anim_right.traverse(function (child) {
                        if ((child as THREE.Mesh).isMesh) {
                            const m = (child as THREE.Mesh)
                            mesh_side_key = anim_right.getObjectByName("J1C_handle_key002")
                            mesh_side_key.visible = false
                            mesh_side_decal = anim_right.getObjectByName("J1C_handle_key_decal_1002")
                            mesh_side_decal.visible = false
                        }
                    })
                    scene.add(anim_right)
                    anim_right.position.z = -2
                    mixer3 = new THREE.AnimationMixer(anim_right)
                    mixer3.addEventListener('finished', function (e) {
                        guide_text.style.display = 'block'
                        guide_text.style.position = 'relative'
                        guide_text.style.right = '15px'
                        onOultineAnimation()
                    })
                    console.log(gltf.animations)

                    // 03 Right Side Panel
                    act_right_3_01 = mixer3.clipAction(gltf.animations[0])
                    act_right_3_02 = mixer3.clipAction(gltf.animations[1])
                    act_right_3_03 = mixer3.clipAction(gltf.animations[2])
                    act_right_3_04 = mixer3.clipAction(gltf.animations[3])
                    act_right_3_05 = mixer3.clipAction(gltf.animations[4])
                    act_right_3_06 = mixer3.clipAction(gltf.animations[5])

                    // 05 Brake Pedal
                    act_right_5_01 = mixer3.clipAction(gltf.animations[6])
                    act_right_5_02 = mixer3.clipAction(gltf.animations[7])

                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
            
            // Static Mesh
            loader.load( resources.Hunter350 ,
                function (gltf) {
                    static_mesh = gltf.scene
                    static_mesh.traverse(function (child) {
                        if ((child as THREE.Mesh).isMesh) {
                            const m = (child as THREE.Mesh)
                            // if ( m.name == 'hunter350_indicator_front_glass_medium')
                            // {
                            //     m.material = material
                            // }
                        }
                    })

                    // Hotspot Parsor //
                    const annotationsDownload = new XMLHttpRequest()
                     annotationsDownload.open('GET', '/data/annotations.json') // Local
                    // annotationsDownload.open('GET', '/content/dam/re-platform-images/digital-quickstart/hunter/explore/hotspot/data/annotations.json') // AEM
                    annotationsDownload.onreadystatechange = function () {
                        if (annotationsDownload.readyState === 4) {
                            annotations = JSON.parse(annotationsDownload.responseText)
                            const annotationsPanel = document.getElementById( 'hotspots-list' ) as HTMLDivElement
                            const ul = document.createElement('UL') as HTMLUListElement
                            ul.className = 'ulremove'
                            ulElem = annotationsPanel.appendChild(ul)

                            top_BTN.addEventListener("click",(e) => {
                                selectedField=null
                                reset_BTN.style.visibility = "visible"
                                guide_text.style.display = 'none'

                                topView = true
                                leftView = false
                                rightView = false
                                isHover = true

                                if(topView) {

                                    cam_topview()

                                    top_cam_pos = annotations[3][0].camPos
                                    top_ctrl_trgt = annotations[3][0].lookAt
                                    camera.position.copy(top_cam_pos)
                                    controls.target.copy(top_ctrl_trgt)

                                    top_BTN.style.backgroundColor = "#d3a118"
                                    left_BTN.style.backgroundColor = ""
                                    right_BTN.style.backgroundColor = ""

                                    hotspot_menu_head.innerHTML = 'TOP VIEW'
                                    canvas_wrapper.appendChild(menu_hotspots)

                                    detailContainer.remove()

                                    const list = document.getElementsByClassName('ulremove')[0] as any

                                    if (list.hasChildNodes()) {
                                        while (list.lastElementChild) {
                                            list.removeChild(list.lastElementChild)
                                        }
                                    }

                                    Object.keys(annotations[0]).forEach((a) => {
                                        const li = document.createElement('li') as HTMLLIElement
                                        li.className = 'liremove'
                                        const liElem = ulElem.appendChild(li)
                                        const button = document.createElement('BUTTON') as HTMLButtonElement
                                        button.innerHTML = annotations[0][a].title
                                        button.className = 'annotationButton'
                                        button.id = annotations[0][a].title
                                        button.addEventListener('click', function () {
                                            selectedField=null
                                            selectedField = annotations[0][a].description
                                            if (openFiled) {
                                                openFiled.classList.remove("selected")
                                            }
                                            openFiled = document.getElementById(`${annotations[0][a].title}`) as any
                                            openFiled?.classList?.add("selected")
                                            gotoAnnotation(annotations[0][a])
                                        })
                                        liElem.appendChild(button)

                                        //Sprite Material
                                        const annotationSpriteMaterial = new THREE.SpriteMaterial({
                                            map: circleTexture,
                                            depthTest: false,
                                            depthWrite: false,
                                            sizeAttenuation: false,
                                        })
                                        annotationSpriteMaterial.toneMapped = false


                                        if (topSprite.length<8) {
                                            //Sprite Mesh
                                            annotationSprite = new THREE.Sprite(annotationSpriteMaterial)
                                            annotationSprite.scale.set(0.015, 0.015, 0.015)
                                            annotationSprite.position.copy(annotations[0][a].lookAt)
                                            annotationSprite.userData.id = a
                                            annotationSprite.userData.name=annotations[0][a].title
                                            scene.add(annotationSprite)
                                            topSprite.push(annotationSprite)
                                        }
                            
                                        for(let i=0;i<topSprite.length;i++) {
                                            topSprite[i].visible=true
                                        }

                                        for(let i=0;i<leftSprite.length;i++) {
                                            leftSprite[i].visible=false
                                        }

                                        for(let i=0;i<rightSprite.length;i++) {
                                            rightSprite[i].visible=false
                                        }

                                        let hoverData=document.querySelectorAll(".annotationButton")!
                                        
                                        for(let i=0;i<hoverData.length;i++) {
                                            hoverData[i].addEventListener("mouseenter", function( event ) {
                                                
                                                if(hoverData[i].innerHTML==topSprite[i].userData.name) {
                                                    topSprite[i].scale.set(0.020, 0.020, 0.020)
                                                }

                                            } , false);

                                            hoverData[i].addEventListener("mouseout", function( event ) {
                                                topSprite[i].scale.set(0.015, 0.015, 0.015)
                                            } , false);
                                        }

                                    })
                                }
                            })

                            left_BTN.addEventListener("click",(e) => {
                                selectedField=null
                                reset_BTN.style.visibility="visible"
                                guide_text.style.display = 'none'

                                topView=false
                                leftView=true
                                rightView=false
                                isHover=true

                                if(leftView) {

                                    cam_leftview()

                                    left_cam_pos = annotations[3][1].camPos
                                    left_ctrl_trgt = annotations[3][1].lookAt
                                    camera.position.copy(left_cam_pos)
                                    controls.target.copy(left_ctrl_trgt)

                                    top_BTN.style.backgroundColor = ""
                                    left_BTN.style.backgroundColor = "#d3a118"
                                    right_BTN.style.backgroundColor = ""

                                    hotspot_menu_head.innerHTML = 'LEFT VIEW'
                                    canvas_wrapper.appendChild(menu_hotspots)

                                    detailContainer.remove()

                                    const list = document.getElementsByClassName('ulremove')[0] as any

                                    if (list.hasChildNodes()) {
                                        while (list.lastElementChild) {
                                            list.removeChild(list.lastElementChild);
                                        }
                                    }

                                    Object.keys(annotations[1]).forEach((a) => {
                                        const li = document.createElement('li') as HTMLLIElement
                                        li.className = 'liremove'
                                        const liElem = ulElem.appendChild(li)
                                        const button = document.createElement('BUTTON') as HTMLButtonElement
                                        button.innerHTML = annotations[1][a].title
                                        button.className = 'annotationButton'
                                        button.id = annotations[1][a].title
                                        button.addEventListener('click', function () {
                                            selectedField = null
                                            selectedField = annotations[1][a].description
                                                if(openFiled) {
                                                    openFiled.classList.remove("selected")
                                                }
                                            openFiled = document.getElementById(`${annotations[1][a].title}`) as any
                                            openFiled?.classList?.add("selected")
                                            gotoAnnotation(annotations[1][a])
                                        })
                                        liElem.appendChild(button)

                                        //Sprite Material
                                        const annotationSpriteMaterial = new THREE.SpriteMaterial({
                                            map: circleTexture,
                                            depthTest: false,
                                            depthWrite: false,
                                            sizeAttenuation: false,
                                        })
                                        annotationSpriteMaterial.toneMapped = false


                                        if (leftSprite.length<7) {
                                            //Sprite Mesh
                                            annotationSprite = new THREE.Sprite(annotationSpriteMaterial)
                                            annotationSprite.scale.set(0.015, 0.015, 0.015)
                                            annotationSprite.position.copy(annotations[1][a].lookAt)
                                            annotationSprite.userData.id = a
                                            annotationSprite.userData.name=annotations[1][a].title
                                            scene.add(annotationSprite)
                                            leftSprite.push(annotationSprite)
                                        }

                                        for(let i=0;i<topSprite.length;i++) {
                                            topSprite[i].visible=false
                                        }

                                        for(let i=0;i<leftSprite.length;i++) {
                                            leftSprite[i].visible=true
                                        }

                                        for(let i=0;i<rightSprite.length;i++) {
                                            rightSprite[i].visible=false
                                        }

                                        let hoverData=document.querySelectorAll(".annotationButton")!
                                        for(let i=0;i<hoverData.length;i++) {
                                            hoverData[i].addEventListener("mouseover", function( event ) {

                                                if(hoverData[i].innerHTML==leftSprite[i].userData.name){
                                                    leftSprite[i].scale.set(0.020, 0.020, 0.020)
                                                }

                                            } , false);

                                            hoverData[i].addEventListener("mouseleave", function( event ) {
                                                leftSprite[i].scale.set(0.015, 0.015, 0.015)
                                            } , false);
                                        }
                                    })
                                }
                            })

                            right_BTN.addEventListener("click",(e) => {
                                selectedField=null
                                reset_BTN.style.visibility="visible"
                                guide_text.style.display = 'none'

                                topView = false
                                leftView = false
                                rightView = true
                                isHover = true
                                
                                if(rightView) {
                                    
                                    cam_rightview()

                                    right_cam_pos = annotations[3][2].camPos
                                    right_ctrl_trgt = annotations[3][2].lookAt
                                    camera.position.copy(right_cam_pos)
                                    controls.target.copy(right_ctrl_trgt)

                                    top_BTN.style.backgroundColor = ""
                                    left_BTN.style.backgroundColor = ""
                                    right_BTN.style.backgroundColor = "#d3a118"

                                    hotspot_menu_head.innerHTML = 'RIGHT VIEW'
                                    canvas_wrapper.appendChild(menu_hotspots)

                                    detailContainer.remove()

                                    const list = document.getElementsByClassName('ulremove')[0] as any

                                    if (list.hasChildNodes()) {
                                        while (list.lastElementChild) {
                                            list.removeChild(list.lastElementChild)
                                        }
                                    }

                                    Object.keys(annotations[2]).forEach((a) => {
                                        const li = document.createElement('li') as HTMLLIElement
                                        li.className = 'liremove'
                                        const liElem = ulElem.appendChild(li)
                                        const button = document.createElement('BUTTON') as HTMLButtonElement
                                        button.innerHTML = annotations[2][a].title
                                        button.className = 'annotationButton'
                                        button.id = annotations[2][a].title
                                        button.addEventListener('click', function () {
                                            selectedField=null
                                            selectedField=annotations[2][a].description
                                                if(openFiled) {
                                                    openFiled.classList.remove("selected")
                                                }
                                            openFiled = document.getElementById(`${annotations[2][a].title}`) as any
                                            openFiled?.classList?.add("selected")
                                            gotoAnnotation(annotations[2][a])
                                        })
                                        liElem.appendChild(button)

                                        //Sprite Material
                                        const annotationSpriteMaterial = new THREE.SpriteMaterial({
                                            map: circleTexture,
                                            depthTest: false,
                                            depthWrite: false,
                                            sizeAttenuation: false,
                                        })
                                        annotationSpriteMaterial.toneMapped = false


                                        if (rightSprite.length<5) {
                                            //Sprite Mesh
                                            annotationSprite = new THREE.Sprite(annotationSpriteMaterial)
                                            annotationSprite.scale.set(0.015, 0.015, 0.015)
                                            annotationSprite.position.copy(annotations[2][a].lookAt)
                                            annotationSprite.userData.id = a
                                            annotationSprite.userData.name=annotations[2][a].title
                                            scene.add(annotationSprite)
                                            rightSprite.push(annotationSprite)
                                        }

                                        for(let i=0;i<topSprite.length;i++){
                                            topSprite[i].visible=false
                                        }

                                        for(let i=0;i<leftSprite.length;i++){
                                            leftSprite[i].visible=false
                                        }

                                        for(let i=0;i<rightSprite.length;i++){
                                            rightSprite[i].visible=true
                                        }
                    
                                        let hoverData=document.querySelectorAll(".annotationButton")!
                                        for(let i=0;i<hoverData.length;i++) {
                                            hoverData[i].addEventListener("mouseover", function( event ) {

                                                if(hoverData[i].innerHTML==rightSprite[i].userData.name) {
                                                    rightSprite[i].scale.set(0.020, 0.020, 0.020)
                                                }

                                            } , false);

                                            hoverData[i].addEventListener("mouseleave", function( event ) {
                                                rightSprite[i].scale.set(0.015, 0.015, 0.015)
                                            } , false);
                                        }
                                    })
                                }
                            })

                            view_mob_top_BTN.addEventListener("click",(e) => {
                                selectedField=null
                                guide_text.style.display = 'none'
                                selectedField=null
                                animationID=null
                                newIntersect = null
                                newIntersect2 = null

                                topView=true
                                leftView=false
                                rightView=false
                                isRest=true
                                mesh_key.visible = false
                                mesh_decal.visible = false
                                mesh_allen.visible = false
                                mesh_side_key.visible = false
                                mesh_side_decal.visible = false
                                mixer?.stopAllAction()
                                mixer2?.stopAllAction()
                                mixer3?.stopAllAction()
                                outlineArray_top.forEach((oultine,index) => {
                                    oultine.visible = false
                                })
                                outlineArray_left.forEach((oultine,index) => {
                                    oultine.visible = false
                                })
                                outlineArray_right.forEach((oultine,index) => {
                                    oultine.visible = false
                                })

                                if(topView) {

                                    cam_topview()

                                    top_cam_pos = annotations[3][0].camPos
                                    top_ctrl_trgt = annotations[3][0].lookAt
                                    camera.position.copy(top_cam_pos)
                                    controls.target.copy(top_ctrl_trgt)

                                    view_mob_top_BTN.style.color =" #ffb200"
                                    view_mob_left_BTN.style.color = "#f5f5f5"
                                    view_mob_right_BTN.style.color = "#f5f5f5"

                                    canvas_wrapper.appendChild(menu_hotspots)

                                    detailContainer.remove()

                                    const list = document.getElementsByClassName('ulremove')[0] as any

                                    if (list.hasChildNodes()) {
                                        while (list.lastElementChild) {
                                            list.removeChild(list.lastElementChild);
                                        }
                                    }

                                    Object.keys(annotations[0]).forEach((a) => {
                                        const li = document.createElement('li') as HTMLLIElement
                                        li.className = 'liremove'
                                        const liElem = ulElem.appendChild(li)
                                        const button = document.createElement('BUTTON') as HTMLButtonElement
                                        button.innerHTML = annotations[0][a].title
                                        button.className = 'annotationButton'
                                        button.id = annotations[0][a].title
                                        button.addEventListener('click', function () {
                                            selectedField = null
                                            selectedField = annotations[0][a].description
                                                if(openFiled) {
                                                    openFiled.classList.remove("selected")
                                                }
                                            openFiled = document.getElementById(`${annotations[0][a].title}`) as any
                                            openFiled?.classList?.add("selected")
                                            gotoAnnotation(annotations[0][a])
                                        })

                                        //Sprite Material
                                        const annotationSpriteMaterial = new THREE.SpriteMaterial({
                                            map: circleTexture,
                                            depthTest: false,
                                            depthWrite: false,
                                            sizeAttenuation: false,
                                        })
                                        annotationSpriteMaterial.toneMapped = false


                                        if (topSprite.length<8) {
                                            //Sprite Mesh
                                            annotationSprite = new THREE.Sprite(annotationSpriteMaterial)
                                            annotationSprite.scale.set(0.015, 0.015, 0.015)
                                            annotationSprite.position.copy(annotations[0][a].lookAt)
                                            annotationSprite.userData.id = a
                                            annotationSprite.userData.name=annotations[0][a].title
                                            scene.add(annotationSprite)
                                            topSprite.push(annotationSprite)
                                        }

                                        for(let i=0;i<topSprite.length;i++) {
                                            topSprite[i].visible=true
                                        }
                                        for(let i=0;i<leftSprite.length;i++) {
                                            leftSprite[i].visible=false
                                        }
                                        for(let i=0;i<rightSprite.length;i++) {
                                            rightSprite[i].visible=false
                                        }

                                        let hoverData=document.querySelectorAll(".annotationButton")!

                                        for(let i=0;i<hoverData.length;i++) {
                                            hoverData[i].addEventListener("mouseover", function( event ) {

                                                if(hoverData[i].innerHTML==topSprite[i].userData.name) {
                                                    topSprite[i].scale.set(0.020, 0.020, 0.020)
                                                }
                                            } , false)

                                            hoverData[i].addEventListener("mouseleave", function( event ) {
                                                topSprite[i].scale.set(0.015, 0.015, 0.015)
                                            } , false)
                                        }
                                    })
                                }
                            })

                            view_mob_left_BTN.addEventListener("click",(e) => {
                                guide_text.style.display = 'none'
                                selectedField=null
                                animationID=null
                                newIntersect = null
                                newIntersect2 = null

                                mesh_key.visible = false
                                mesh_decal.visible = false
                                mesh_allen.visible = false
                                mesh_side_key.visible = false
                                mesh_side_decal.visible = false
                                mixer?.stopAllAction()
                                mixer2?.stopAllAction()
                                mixer3?.stopAllAction()
                                outlineArray_top.forEach((oultine,index) => {
                                    oultine.visible = false
                                })
                                outlineArray_left.forEach((oultine,index) => {
                                    oultine.visible = false
                                })
                                outlineArray_right.forEach((oultine,index) => {
                                    oultine.visible = false
                                })
                                topView=false
                                leftView=true
                                rightView=false
                                isRest=true

                                for(let i=0;i<topSprite.length;i++) {
                                    topSprite[i].visible=true
                                }
                                for(let i=0;i<leftSprite.length;i++) {
                                    leftSprite[i].visible=false
                                }
                                for(let i=0;i<rightSprite.length;i++) {
                                    rightSprite[i].visible=false
                                }
                            
                                if(leftView) {

                                    cam_leftview()

                                    left_cam_pos = annotations[3][1].camPos
                                    left_ctrl_trgt = annotations[3][1].lookAt
                                    camera.position.copy(left_cam_pos)
                                    controls.target.copy(left_ctrl_trgt)

                                    view_mob_left_BTN.style.color="#ffb200"
                                    view_mob_top_BTN.style.color="#f5f5f5"
                                    view_mob_right_BTN.style.color="#f5f5f5"

                                    canvas_wrapper.appendChild(menu_hotspots)

                                    detailContainer.remove()

                                    const list = document.getElementsByClassName('ulremove')[0] as any

                                    if (list.hasChildNodes()) {
                                        while (list.lastElementChild) {
                                            list.removeChild(list.lastElementChild);
                                        }
                                    }
                                    Object.keys(annotations[1]).forEach((a) => {
                                        const li = document.createElement('li') as HTMLLIElement
                                        li.className = 'liremove'
                                        const liElem = ulElem.appendChild(li)
                                        const button = document.createElement('BUTTON') as HTMLButtonElement
                                        button.innerHTML = annotations[1][a].title
                                        button.className = 'annotationButton'
                                        button.id = annotations[1][a].title
                                        button.addEventListener('click', function () {
                                            selectedField = null
                                            selectedField = annotations[1][a].description
                                                if(openFiled) {
                                                    openFiled.classList.remove("selected")
                                                }
                                            openFiled = document.getElementById(`${annotations[1][a].title}`) as any
                                            openFiled?.classList?.add("selected")
                                            gotoAnnotation(annotations[1][a])
                                        })

                                        //Sprite Material
                                        const annotationSpriteMaterial = new THREE.SpriteMaterial({
                                            map: circleTexture,
                                            depthTest: false,
                                            depthWrite: false,
                                            sizeAttenuation: false,
                                        })
                                        annotationSpriteMaterial.toneMapped = false


                                        if (leftSprite.length<7){
                                            //Sprite Mesh
                                            annotationSprite = new THREE.Sprite(annotationSpriteMaterial)
                                            annotationSprite.scale.set(0.015, 0.015, 0.015)
                                            annotationSprite.position.copy(annotations[1][a].lookAt)
                                            annotationSprite.userData.id = a
                                            annotationSprite.userData.name=annotations[1][a].title
                                            scene.add(annotationSprite)
                                            leftSprite.push(annotationSprite)
                                        }

                                        for(let i=0;i<topSprite.length;i++) {
                                            topSprite[i].visible=false
                                        }

                                        for(let i=0;i<leftSprite.length;i++) {
                                            leftSprite[i].visible=true
                                        }

                                        for(let i=0;i<rightSprite.length;i++) {
                                            rightSprite[i].visible=false
                                        }

                                        let hoverData=document.querySelectorAll(".annotationButton")!

                                        for(let i=0;i<hoverData.length;i++) {
                                            hoverData[i].addEventListener("mouseover", function( event ) {

                                                if(hoverData[i].innerHTML==leftSprite[i].userData.name) {
                                                    leftSprite[i].scale.set(0.020, 0.020, 0.020)
                                                }
                                            } , false);

                                            hoverData[i].addEventListener("mouseleave", function( event ) {
                                                leftSprite[i].scale.set(0.015, 0.015, 0.015)
                                            } , false);
                                        }
                                    })
                                }
                            })

                            view_mob_right_BTN.addEventListener("click",(e) => {
                                guide_text.style.display = 'none'
                                selectedField=null
                                animationID=null
                                newIntersect = null
                                newIntersect2 = null
                                
                                mesh_key.visible = false
                                mesh_decal.visible = false
                                mesh_allen.visible = false
                                mesh_side_key.visible = false
                                mesh_side_decal.visible = false
                                mixer?.stopAllAction()
                                mixer2?.stopAllAction()
                                mixer3?.stopAllAction()
                                outlineArray_top.forEach((oultine,index) => {
                                    oultine.visible = false
                                })
                                outlineArray_left.forEach((oultine,index) => {
                                    oultine.visible = false
                                })
                                outlineArray_right.forEach((oultine,index) => {
                                    oultine.visible = false
                                })

                                topView=false
                                leftView=false
                                rightView=true
                                isRest=true

                                if(rightView) {

                                    cam_rightview()

                                    right_cam_pos = annotations[3][2].camPos
                                    right_ctrl_trgt = annotations[3][2].lookAt
                                    camera.position.copy(right_cam_pos)
                                    controls.target.copy(right_ctrl_trgt)

                                    view_mob_top_BTN.style.color="#f5f5f5"
                                    view_mob_left_BTN.style.color="#f5f5f5"
                                    view_mob_right_BTN.style.color="#ffb200"

                                    canvas_wrapper.appendChild(menu_hotspots)

                                    detailContainer.remove()

                                    const list = document.getElementsByClassName('ulremove')[0] as any

                                    if (list.hasChildNodes()) {
                                        while (list.lastElementChild) {
                                            list.removeChild(list.lastElementChild);
                                        }
                                    }

                                    Object.keys(annotations[2]).forEach((a) => {
                                        const li = document.createElement('li') as HTMLLIElement
                                        li.className = 'liremove'
                                        const liElem = ulElem.appendChild(li)
                                        const button = document.createElement('BUTTON') as HTMLButtonElement
                                        button.innerHTML = annotations[2][a].title
                                        button.className = 'annotationButton'
                                        button.id = annotations[2][a].title
                                        button.addEventListener('click', function () {
                                            selectedField=null
                                            selectedField=annotations[2][a].description
                                                if(openFiled) {
                                                    openFiled.classList.remove("selected")
                                                }
                                            openFiled = document.getElementById(`${annotations[2][a].title}`) as any
                                            openFiled?.classList?.add("selected")
                                            gotoAnnotation(annotations[2][a])
                                        })

                                        //Sprite Material
                                        const annotationSpriteMaterial = new THREE.SpriteMaterial({
                                            map: circleTexture,
                                            depthTest: false,
                                            depthWrite: false,
                                            sizeAttenuation: false,
                                        })

                                        annotationSpriteMaterial.toneMapped = false

                                        if (rightSprite.length<5){
                                        //Sprite Mesh
                                            annotationSprite = new THREE.Sprite(annotationSpriteMaterial)
                                            annotationSprite.scale.set(0.015, 0.015, 0.015)
                                            annotationSprite.position.copy(annotations[2][a].lookAt)
                                            annotationSprite.userData.id = a
                                            annotationSprite.userData.name=annotations[2][a].title
                                            scene.add(annotationSprite)
                                            rightSprite.push(annotationSprite)
                                        }

                                        for(let i=0;i<topSprite.length;i++) {
                                            topSprite[i].visible=false
                                        }
                                        for(let i=0;i<leftSprite.length;i++) {
                                            leftSprite[i].visible=false
                                        }
                                        for(let i=0;i<rightSprite.length;i++) {
                                            rightSprite[i].visible=true
                                        }
            
                                    })
                                }
                            })

                            reset_BTN.addEventListener("click",(e) => {
                                guide_text.style.display = 'none'
                                selectedField=null
                                animationID=null

                                topView=false
                                leftView=false
                                rightView=false
                                isHover=false

                                goSelection=null
                                
                                top_BTN.style.backgroundColor = ""
                                left_BTN.style.backgroundColor = ""
                                right_BTN.style.backgroundColor = ""
            
                                menu_hotspots?.remove()
                                detailContainer?.remove()
            
                                const reset_btn_object = annotations[3][3]

                                gsap.to(camera.position, {
                                    x: reset_btn_object.camPos.x,
                                    y: reset_btn_object.camPos.y,
                                    z: reset_btn_object.camPos.z,
                                    duration: 1.5,
                                    ease: Power1.easeOut,
                                    onUpdate: function() {
                                        controls.target.set(reset_btn_object.lookAt.x,reset_btn_object.lookAt.y,reset_btn_object.lookAt.z)
                                    },
                                    onStart: () => {
                                        controls.enabled = false;
                                        close_BTN.style.visibility="hidden"
                                        top_BTN.disabled = true
                                        left_BTN.disabled = true
                                        right_BTN.disabled = true
                                    },
                                    onComplete: () => {
                                        controls.enabled = true
                                        close_BTN.style.visibility="visible"
                                        top_BTN.disabled = false
                                        left_BTN.disabled = false
                                        right_BTN.disabled = false
                                    }
                            
                                })
                                
                                cam_default()

                                const list = document.getElementsByClassName('ulremove')[0] as any
            
                                for(let i=0;i<topSprite.length;i++) {
                                    topSprite[i].visible=false
                                }
                                for(let i=0;i<leftSprite.length;i++) {
                                    leftSprite[i].visible=false
                                }
                                for(let i=0;i<rightSprite.length;i++) {
                                    rightSprite[i].visible=false
                                }
            
                                reset_BTN.style.visibility="hidden"
                            })

                            view_mob_reset_BTN.addEventListener("click",(e) => {
                                var reset_btn_object = annotations[3][3]
                                gsap.to(camera.position, {
                                    x: reset_btn_object.camPos.x,
                                    y: reset_btn_object.camPos.y,
                                    z: reset_btn_object.camPos.z,
                                    duration: 1.5,
                                    ease: Power1.easeOut,
                                    onUpdate: function() {
                                        controls.target.set(reset_btn_object.lookAt.x,reset_btn_object.lookAt.y,reset_btn_object.lookAt.z)
                                    },
                                    onStart: () => {
                                        controls.enabled = false
                                        view_menu.style.display = 'none'
                                        view_mob_top_BTN.disabled = true
                                        view_mob_left_BTN.disabled = true
                                        view_mob_right_BTN.disabled = true
                                        view_mob_reset_BTN.disabled = true
                                    },
                                    onComplete: () => {
                                        controls.enabled = true
                                        view_menu.style.display = 'block'
                                        view_mob_top_BTN.disabled = false
                                        view_mob_left_BTN.disabled = false
                                        view_mob_right_BTN.disabled = false
                                        view_mob_reset_BTN.disabled = false
                                    }
                            
                                })
                                guide_text.style.display = 'none'
                                mesh_key.visible = false
                                mesh_decal.visible = false
                                mesh_allen.visible = false
                                mesh_side_key.visible = false
                                mesh_side_decal.visible = false
                                mixer?.stopAllAction()
                                mixer2?.stopAllAction()
                                mixer3?.stopAllAction()
                                outlineArray_top.forEach((oultine,index) => {
                                    oultine.visible = false
                                })
                                outlineArray_left.forEach((oultine,index) => {
                                    oultine.visible = false
                                })
                                outlineArray_right.forEach((oultine,index) => {
                                    oultine.visible = false
                                })
                                if(isRest) {
                                    selectedField=null
                                    animationID=null
                                    newIntersect = null
                                    newIntersect2 = null
                                    topView=false
                                    leftView=false
                                    rightView=false
                                    isHover=true
                                    newIntersect?.scale?.set(0.015, 0.015, 0.015)

                                    goSelection=null
 
                                    view_mob_top_BTN.style.color="#f5f5f5"
                                    view_mob_left_BTN.style.color="#f5f5f5"
                                    view_mob_right_BTN.style.color="#f5f5f5"

                                    menu_hotspots.remove()
                                    detailContainer.remove()

                                    

                                    if (toShow) {
                                        toShow.classList.remove("selected")
                                    }
                                
                                    if (openFiled) {
                                        openFiled.classList.remove("selected")
                                    }
                                    
                                    if (topView) {                              
                                        topSprite.forEach((val,index) => {
                                            topSprite[index].visible = false
                                        })
                                
                                        outlineArray_top.forEach((oultine,index) => {
                                            oultine.visible = false
                                        })
                                    }
                                    
                                    if (leftView) {
                                        outlineArray_left.forEach((oultine,index) => {
                                            oultine.visible = false
                                        })

                                        leftSprite.forEach((val,index) => {
                                            leftSprite[index].visible = false
                                        })
                                    }
                                
                                    if (rightView) {
                                        outlineArray_right.forEach((oultine,index) => {
                                            oultine.visible=false
                                        })
                                
                                        rightSprite.forEach((val,index) => {
                                            rightSprite[index].visible=false
                                        })
                                    }



                                    cam_default()

                                    const list = document.getElementsByClassName('ulremove')[0] as any

                                    for(let i=0;i<leftSprite.length;i++) {
                                        leftSprite[i].visible=false
                                    }
                                    for(let i=0;i<rightSprite.length;i++) {
                                        rightSprite[i].visible=false
                                    }
                                    for(let i=0;i<topSprite.length;i++) {
                                        topSprite[i].visible=false
                                    }

                                    isRest=false
                                    
                                }

                            })

                            close_BTN.addEventListener("click",(e) => {
                                guide_text.style.display = 'none'
                                animationID=null
                                isHover=true

                                crossCamPos()
                                sound.stop()

                            })
                        }
                    }
                    annotationsDownload.send()
                    scene.add(static_mesh)
                    static_mesh.position.z = -2
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
        }
    }
    resources_Download.send()
}
globalParser()

// Hotspot Raycast -------------------->>>>
rect = renderer.domElement.getBoundingClientRect()

// Click Event
renderer.domElement.addEventListener('click', onClick, false)
function onClick(event: MouseEvent) {
    raycaster.setFromCamera(
        {
            x:  ( ( event.clientX - rect.left ) / ( rect. right - rect.left ) ) * 2 - 1,
            y: -( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1,
        },
        camera
    )

    if (topView) {
        intersects = raycaster.intersectObjects(topSprite, true)
    }

    if (leftView) {
        intersects = raycaster.intersectObjects(leftSprite, true)
    }

    if (rightView) {
        intersects = raycaster.intersectObjects(rightSprite, true)
    }
   
    if (intersects?.length > 0) {
        if (topView || leftView || rightView) {
            if (intersects[0].object.userData && intersects[0].object.userData.id) {
                if(openFiled) {
                    openFiled.classList.remove("selected")
                }
                openFiled = document.getElementById(`${intersects[0].object.userData.name}`) as any
                openFiled?.classList?.add("selected")
                isHover=false
            }
        }
        selectedField=null

        if (topView) {
            selectedField=null
            selectedField=annotations[0][intersects[0].object.userData.id].description
            gotoAnnotation(annotations[0][intersects[0].object.userData.id])
        }

        if (leftView) {
            selectedField=null
            selectedField=annotations[1][intersects[0].object.userData.id].description
            gotoAnnotation(annotations[1][intersects[0].object.userData.id])  
        }

        if (rightView) {
            selectedField=null
            selectedField=annotations[2][intersects[0].object.userData.id].description
            gotoAnnotation(annotations[2][intersects[0].object.userData.id]) 
        }
    }
}

// Touch Event
let animationID:any
renderer.domElement.addEventListener('touchend', onTouch, false)
function onTouch(event: TouchEvent) {
    raycaster.setFromCamera(
        {
             x:  (event.changedTouches[0].clientX  /windowsizes.width) * 2 - 1,
             y: -(event.changedTouches[0].clientY/ windowsizes.height) * 2 + 1,
        },
        camera
    )

    if (topView) {
        intersects = raycaster.intersectObjects(topSprite, true)
    }

    if (leftView) {
        intersects = raycaster.intersectObjects(leftSprite, true)
    }

    if (rightView) {
        intersects = raycaster.intersectObjects(rightSprite, true)
    }
   
    if ( topView || leftView || rightView ) {
    if (intersects.length > 0) {
        if(topView || leftView || rightView) {
            if (intersects[0].object.userData && intersects[0].object.userData.id) {
                openFiled=document.getElementById(`${intersects[0].object.userData.name}`) as any
                openFiled?.classList?.add("selected")
                isHover=false
            }
        }

        if (topView) {
            gotoAnnotation(annotations[0][intersects[0].object.userData.id])
        }

        if (leftView) {
            gotoAnnotation(annotations[1][intersects[0].object.userData.id])
        }

        if (rightView) {
            gotoAnnotation(annotations[2][intersects[0].object.userData.id])
        }
    }
}
}

// Outline Off
const offOultineAnimation=() => {
    outlineArray_top.forEach((oultine,index) => {
        oultine.visible=false
    })
    
    outlineArray_left.forEach((oultine,index) => {
        oultine.visible=false
    })

    outlineArray_right.forEach((oultine,index) => {
        oultine.visible=false
    })
}

// Outline On
const onOultineAnimation=() => {
    outlineArray_top.forEach((oultine,index) => {
        if(oultine.userData.id==animationID) {
            oultine.visible=true
        }
    })

    outlineArray_left.forEach((oultine,index) => {
        if(oultine.userData.id==animationID) {
            oultine.visible=true
        }
    })

    outlineArray_right.forEach((oultine,index) => {
        if(oultine.userData.id==animationID) {
            oultine.visible=true
        }
    })
}

// Move Camera & Controls
let goSelection: any = null

function gotoAnnotation(a: any): void {
    if (sound.isPlaying == true ){
        sound.stop()
    }
    console.log(detail_title.innerHTML)
    // if (detail_title.innerHTML == "LH Switch Module") {
    //     console.log(detail_title.innerHTML)
    //     guide_text.style.display = 'none'
    // }

    mesh_key.visible = false
    mesh_decal.visible = false
    mesh_allen.visible = false
    mesh_side_key.visible = false
    mesh_side_decal.visible = false

    if(goSelection == null) {
       goSelection = a.description
    } else if(selectedField == goSelection) {
        return
    }

    goSelection = a.description

    setTimeout(() => {
        animationID = a.title
        console.log("Click Now")
    }, 1200)

    cam_hotspot()
    mixer?.stopAllAction()
    mixer2?.stopAllAction()
    mixer3?.stopAllAction()
    controls.enabled = false

    detail_title.innerHTML = a.description
    detailContainer.style.visibility = "visible"
    view_menu.remove()
    canvas_wrapper.appendChild(detailContainer)

    outlineArray_top.forEach((oultine,index) => {
        oultine.visible=false
    })

    outlineArray_left.forEach((oultine,index)=>{
        oultine.visible=false
    })

    outlineArray_right.forEach((oultine,index)=>{
        oultine.visible=false
    })

    if (topView) {
        controls.enableZoom = true
        guide_text.style.display = 'block'
        guide_text.style.position = 'relative'
        guide_text.style.right = '15px'
        if (a.description =="LH Switch Module") {
                hotspot_media_1.src = annotations[0][0].media.a1
                        hotspot_media_2.src = annotations[0][0].media.a2
                        hotspot_media_1.style.display = "block"
                        hotspot_media_2.style.display = "block"
                        // if (windowsizes.width<windowsizes.height) {
                        //     hotspot_media_1.src = ""
                        //     hotspot_media_2.src = ""
                        //     hotspot_media_1.style.display = "none"
                        //     hotspot_media_2.style.display = "none"
                        // }
        } else {
                hotspot_media_1.src = ""
                hotspot_media_2.src = ""
                hotspot_media_1.style.display = "none"
                hotspot_media_2.style.display = "none"
        }

        topSprite.forEach((val,index) => {
            if (a.title == val.userData.name) {
                topSprite[index].visible=false
            } else {
               topSprite[index].visible=true
            }
        })

        outlineArray_top.forEach((oultine,index) => {
            if (oultine.userData.id == a.title) {
                oultine.visible=true
            }
        })
    }

    if(leftView) {
        controls.enableZoom = false
        guide_text.style.display = 'block'
        guide_text.style.position = 'relative'
        guide_text.style.right = '15px'

        if(a.description == "Left Trafficator Front" || a.description == "Left Trafficator Rear" || a.description == "Seat") {
            guide_text.style.display = 'none'
        }
        if(a.description == "Side Stand") {
                hotspot_media_1.src = annotations[1][5].media.a2
                hotspot_media_2.src = annotations[1][5].media.a1
                hotspot_media_1.style.display = "block"
                hotspot_media_2.style.display = "none"
                // if (windowsizes.width<windowsizes.height) {
                //     hotspot_media_1.src = ""
                //     hotspot_media_2.src = ""
                //     hotspot_media_1.style.display = "none"
                //     hotspot_media_2.style.display = "none"
                // }
        } else if (a.description=="Center Stand") {
               hotspot_media_1.src = annotations[1][5].media.a1
               hotspot_media_2.src = annotations[1][5].media.a2
               hotspot_media_1.style.display = "block"
               hotspot_media_2.style.display = "none"
               // if (windowsizes.width<windowsizes.height) {
               //     hotspot_media_1.src = ""
               //     hotspot_media_2.src = ""
               //     hotspot_media_1.style.display = "none"
               //     hotspot_media_2.style.display = "none"
               // }
       } else {
           hotspot_media_1.src = ""
           hotspot_media_2.src = ""
           hotspot_media_1.style.display = "none"
           hotspot_media_2.style.display = "none"
       }

        leftSprite.forEach((val,index) => {
            if (a.title == val.userData.name) {
                leftSprite[index].visible=false
            } else {
                leftSprite[index].visible=true
            }
        })

        outlineArray_left.forEach((oultine,index) => {
            if (oultine.userData.id == a.title) {
                oultine.visible = true
            }
        })
    }

    if(rightView) {
        controls.enableZoom = false
        guide_text.style.display = 'block'
        guide_text.style.position = 'relative'
        guide_text.style.right = '15px'

        if(a.description == "Right Trafficator Front" || a.description == "Right Trafficator Rear" || a.description == "Horn") {
            guide_text.style.display = 'none'
        }

        hotspot_media_1.src = ""
        hotspot_media_2.src = ""
        hotspot_media_1.style.display = "none"
        hotspot_media_2.style.display = "none"

        rightSprite.forEach((val,index) => {
            if (a.title == val.userData.name) {
                rightSprite[index].visible=false
            } else {
                rightSprite[index].visible=true
            }
        })   

        outlineArray_right.forEach((oultine,index) => {
            if (oultine.userData.id == a.title) {
                oultine.visible = true
            }
        })
    }

    gsap.to(camera.position, {
        x: a.camPos.x,
        y: a.camPos.y,
        z: a.camPos.z,
        duration:1.5,
        ease: Power1.easeOut,
        onUpdate: function() {
            controls.target.set(a.lookAt.x,a.lookAt.y,a.lookAt.z)
        },
        onStart: () => {

            controls.enabled = false;
            close_BTN.style.visibility="hidden"
            view_mob_top_BTN.disabled = true
            view_mob_left_BTN.disabled = true
            view_mob_right_BTN.disabled = true
            view_mob_reset_BTN.disabled = true

        },
        onComplete: () => {
            controls.enabled = true
            close_BTN.style.visibility="visible"
            view_mob_top_BTN.disabled = false
            view_mob_left_BTN.disabled = false
            view_mob_right_BTN.disabled = false
            view_mob_reset_BTN.disabled = false
            controls.maxDistance = 1.5
            controls.minDistance = 0.35
        }

    })
}

// Close Hotspot
const crossCamPos = () => {
    guide_text.style.display = 'none'
    mesh_key.visible = false
    mesh_decal.visible = false
    mesh_allen.visible = false
    mesh_side_key.visible = false
    mesh_side_decal.visible = false
    if (sound.isPlaying == true ){
        sound.stop()
    }

    newIntersect = null
    newIntersect2 = null
    selectedField=null
    goSelection=null

    newIntersect?.scale?.set(0.015, 0.015, 0.015)
    view_menu.style.display = 'block'
    detailContainer.remove()
    canvas_wrapper.appendChild(view_menu)
    annotationSprite.scale.set(0.015, 0.015, 0.015)
    mixer?.stopAllAction()
    mixer2?.stopAllAction()
    mixer3?.stopAllAction()

    if (toShow) {
        toShow.classList.remove("selected")
    }

    if (openFiled) {
        openFiled.classList.remove("selected")
    }
    
    if (topView) {
        camera.position.copy(top_cam_pos)
        controls.target.copy(top_ctrl_trgt)

        cam_topview()
        
        topSprite.forEach((val,index) => {
            topSprite[index].visible = true
        })

        outlineArray_top.forEach((oultine,index) => {
            oultine.visible = false
        })

        // outlineArray_left.forEach((oultine,index) => {
        //     oultine.visible = false
        // })

        // outlineArray_right.forEach((oultine,index) => {
        //     oultine.visible = false
        // })
   
    }
    
    if (leftView) {
        outlineArray_left.forEach((oultine,index) => {
            oultine.visible = false
        })

        camera.position.copy(left_cam_pos)
        controls.target.copy(left_ctrl_trgt)
        cam_leftview()

        leftSprite.forEach((val,index) => {
            leftSprite[index].visible = true
        })
    }

    if (rightView) {
        outlineArray_right.forEach((oultine,index) => {
            oultine.visible=false
        })

        camera.position.copy(right_cam_pos)
        controls.target.copy(right_ctrl_trgt)
        cam_rightview()

        rightSprite.forEach((val,index) => {
            rightSprite[index].visible=true
        })
    }
}

// Hotspot Hover
renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
function onDocumentMouseMove( event:MouseEvent ) {
    raycaster.setFromCamera (
        {
            x: ( ( event.clientX - rect.left ) / ( rect. right - rect.left ) ) * 2 - 1,
            y: -( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1,
        },
        camera
    )

    if(deviceInfo.mobile.isMobile == false ) {
        if ( topView || leftView || rightView ) {
            if (topView) {
                intersects = raycaster.intersectObjects(topSprite, false)
            }
            if (leftView) {
                intersects = raycaster.intersectObjects(leftSprite, false)
            }
            if (rightView) {
                intersects = raycaster.intersectObjects(rightSprite, false)
            }
            if (intersects.length > 0) {
                newIntersect = intersects[0].object
                if (newIntersect) {
                    if (toShow == null) {
                        toShow = document.getElementById(newIntersect.userData.name) as any
                        toShow.classList.add("selected")
                    }
                    if (newIntersect2 == null) {
                    }
                    if(deviceInfo.mobile.isMobile == false){
                        intersects[0].object.scale.set(0.020,0.020,0.020)
                        // hover_line.style.borderBottom = "2px solid rgb(255, 200, 0)"
                        newIntersect2 = newIntersect
                    }

                }
            } else if ( newIntersect !== null ) {
                newIntersect?.scale?.set(0.015, 0.015, 0.015)
                newIntersect=null
                newIntersect2=null
                if (toShow !== null) {
                    if (isHover) {
                        toShow.classList.remove("selected")
                        toShow = null
                    }
                }
            }
        }
    }
}
// Helper Hover
// window.addEventListener('mousemove', (event) =>
// {
//     mouse.x = event.clientX / windowsizes.width * 2 - 1
//     mouse.y = -(event.clientY / windowsizes.height) * 2 + 1

//     var raycaster = new THREE.Raycaster();
//     raycaster.setFromCamera( mouse, camera );
//     var intersects = raycaster.intersectObjects( tankhelpertest );

//     // if(intersects.length > 0) {
//     //     bodytag.style.cursor = "pointer";
//     // } else {
//     //     bodytag.style.cursor = "default";
//     // }
// })

renderer.domElement.addEventListener( 'click', onDocumentMouseClick, false );
function onDocumentMouseClick( event:MouseEvent ) {
    raycaster.setFromCamera (
        {
            x: ( ( event.clientX - rect.left ) / ( rect. right - rect.left ) ) * 2 - 1,
            y: -( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1,
        },
        camera
    )

    if (animationID!=null) {
        intersects = raycaster.intersectObjects(anim_helpers)
    }

    if (topView) {
        if (intersects.length > 0) {
            mixer?.stopAllAction()
            mixer2?.stopAllAction()
            mixer3?.stopAllAction()
            if (animationID == "1. LH Switch Module") {
                if (intersects[0].object.name === 'highbeam_helper') {
                    if (sound.isPlaying == true ){
                        sound.stop()
                    }
                    tester = 'highbeam_helper'
                    console.log(intersects[0].object.name)
                    offOultineAnimation()
                    if (animationID == "1. LH Switch Module") {
                            hotspot_media_1.src = annotations[0][0].media.c1
                            hotspot_media_2.src = annotations[0][0].media.c2
                            hotspot_media_1.style.display = "block"
                            hotspot_media_2.style.display = "block"
                            // if (windowsizes.width<windowsizes.height) {
                            //     hotspot_media_1.src = ""
                            //     hotspot_media_2.src = ""
                            //     hotspot_media_1.style.display = "none"
                            //     hotspot_media_2.style.display = "none"
                            // }
                        mesh_high.visible = true
                        mesh_pass.visible = false
                        act_top_1_high.play().reset()
                        act_top_1_high.loop = THREE.LoopOnce
                        if (act_top_1_high.isRunning() == true ) {
                            guide_text.style.display = 'none'
                        }
                    }
                }
                else if (intersects[0].object.name === 'pass_helper') {
                    if (sound.isPlaying == true ){
                        sound.stop()
                    }
                    tester = 'pass_helper'
                    console.log(intersects[0].object.name)
                    console.log(anim_helpers)
                    offOultineAnimation()
                    if (animationID == "1. LH Switch Module") {
                            hotspot_media_1.src = annotations[0][0].media.c1
                            hotspot_media_2.src = annotations[0][0].media.c2
                            hotspot_media_1.style.display = "block"
                            hotspot_media_2.style.display = "block"
                            // if (windowsizes.width<windowsizes.height) {
                            //     hotspot_media_1.src = ""
                            //     hotspot_media_2.src = ""
                            //     hotspot_media_1.style.display = "none"
                            //     hotspot_media_2.style.display = "none"
                            // }
                        mesh_high.visible = false
                        mesh_pass.visible = true
                        act_top_1_pass.play().reset()
                        act_top_1_pass.loop = THREE.LoopOnce
                        if (act_top_1_pass.isRunning() == true ) {
                            guide_text.style.display = 'none'
                        }
                    }
                
                }
                else if (intersects[0].object.name === 'horn_helper') {
                    if (sound.isPlaying == true ){
                        sound.stop()
                    }
                    console.log(intersects[0].object.name)
                    offOultineAnimation()
                    if (animationID == "1. LH Switch Module") {
                            hotspot_media_1.src = annotations[0][0].media.b1
                            hotspot_media_2.src = annotations[0][0].media.b2
                            hotspot_media_1.style.display = "block"
                            hotspot_media_2.style.display = "none"
                            // if (windowsizes.width<windowsizes.height) {
                            //     hotspot_media_1.src = ""
                            //     hotspot_media_2.src = ""
                            //     hotspot_media_1.style.display = "none"
                            //     hotspot_media_2.style.display = "none"
                            // }
                            const audioLoader = new THREE.AudioLoader()
                            audioLoader.load( resources.Start_audio , function( buffer ) {
                                sound.setBuffer( buffer )
                                sound.setLoop( false )
                                sound.setVolume( 0.5 )
                                sound.play()
                            })
                        act_top_1_horn.play().reset()
                        act_top_1_horn.loop = THREE.LoopOnce
                        if (act_top_1_horn.isRunning() == true ) {
                            guide_text.style.display = 'none'
                        }
                    }
            }
                else if (intersects[0].object.name === 'left_helper') {
                    if (sound.isPlaying == true ){
                        sound.stop()
                    }
                    offOultineAnimation()
                    if (animationID == "1. LH Switch Module") {
                            hotspot_media_1.src = annotations[0][0].media.d1
                            hotspot_media_2.src = annotations[0][0].media.d2
                            hotspot_media_1.style.display = "block"
                            hotspot_media_2.style.display = "block"
                            // if (windowsizes.width<windowsizes.height) {
                            //     hotspot_media_1.src = ""
                            //     hotspot_media_2.src = ""
                            //     hotspot_media_1.style.display = "none"
                            //     hotspot_media_2.style.display = "none"
                            // }
                        mesh_left.visible = true
                        mesh_right.visible = false
                        mesh_neutral.visible = false
                        act_top_1_left.play().reset()
                        act_top_1_left.loop = THREE.LoopOnce
                        if (act_top_1_left.isRunning() == true ) {
                            guide_text.style.display = 'none'
                        }
                    }
                
                }
                else if (intersects[0].object.name === 'right_helper') {
                    if (sound.isPlaying == true ){
                        sound.stop()
                    }
                    offOultineAnimation()
                    if (animationID == "1. LH Switch Module") {
                        // guide_text.style.display = 'none'
                            hotspot_media_1.src = annotations[0][0].media.e1
                            hotspot_media_2.src = annotations[0][0].media.e2
                            hotspot_media_1.style.display = "block"
                            hotspot_media_2.style.display = "block"
                            // if (windowsizes.width<windowsizes.height) {
                            //     hotspot_media_1.src = ""
                            //     hotspot_media_2.src = ""
                            //     hotspot_media_1.style.display = "none"
                            //     hotspot_media_2.style.display = "none"
                            // }
                        mesh_left.visible = false
                        mesh_right.visible = true
                        mesh_neutral.visible = false
                        act_top_1_right.play().reset()
                        act_top_1_right.loop = THREE.LoopOnce
                        if (act_top_1_right.isRunning() == true ) {
                            guide_text.style.display = 'none'
                        }
                    }
                
                }
                else if (intersects[0].object.name === 'center_helper') {
                    if (sound.isPlaying == true ){
                        sound.stop()
                    }
                    offOultineAnimation()
                    if (animationID == "1. LH Switch Module") {
                            hotspot_media_1.src = annotations[0][0].media.f1
                            hotspot_media_2.src = annotations[0][0].media.f2
                            hotspot_media_1.style.display = "block"
                            hotspot_media_2.style.display = "block"
                            // if (windowsizes.width<windowsizes.height) {
                            //     hotspot_media_1.src = ""
                            //     hotspot_media_2.src = ""
                            //     hotspot_media_1.style.display = "none"
                            //     hotspot_media_2.style.display = "none"
                            // }
                        mesh_left.visible = false
                        mesh_right.visible = false
                        mesh_neutral.visible = true
                        act_top_1_neutral.play().reset()
                        act_top_1_neutral.loop = THREE.LoopOnce
                        if (act_top_1_neutral.isRunning() == true ) {
                            guide_text.style.display = 'none'
                        }
                    }
                
                }
        }

            else if (animationID == "2. Info Button") {
            if (intersects[0].object.name === 'info_helper') {
                if (sound.isPlaying == true ){
                    sound.stop()
                }
                offOultineAnimation()
                if (animationID == "2. Info Button") {
                    act_top_2_info.play().reset()
                    act_top_2_info.loop = THREE.LoopOnce
                    if (act_top_2_info.isRunning() == true ) {
                        guide_text.style.display = 'none'
                    }
                }
            }
            }
            else if (animationID == "3. Charger Port") {
            if (intersects[0].object.name === 'usb_helper') {
                if (sound.isPlaying == true ){
                    sound.stop()
                }
                offOultineAnimation()
                if (animationID == "3. Charger Port") {
                    act_top_3_usb.play().reset()
                    act_top_3_usb.loop = THREE.LoopOnce
                    if (act_top_3_usb.isRunning() == true ) {
                        guide_text.style.display = 'none'
                    }
                }
            }
            }
            else if (animationID == "4. Instrument Cluster") {
                    if (intersects[0].object.name === 'cluster_helper') {
                        if (sound.isPlaying == true ){
                            sound.stop()
                        }
                    console.log("cluster_helper daba")
                    offOultineAnimation()
                    act_top_4_12.play().reset()
                    act_top_4_13.play().reset()
                    act_top_4_14.play().reset()
                    act_top_4_15.play().reset()
                    act_top_4_16.play().reset()
                    act_top_4_17.play().reset()
                    act_top_4_11.play().reset()

                    act_top_4_17.loop = THREE.LoopOnce
                    act_top_4_12.loop = THREE.LoopOnce
                    act_top_4_13.loop = THREE.LoopOnce
                    act_top_4_14.loop = THREE.LoopOnce
                    act_top_4_15.loop = THREE.LoopOnce
                    act_top_4_16.loop = THREE.LoopOnce
                    act_top_4_17.loop = THREE.LoopOnce
                    act_top_4_11.loop = THREE.LoopOnce
                    if (act_top_4_17.isRunning() == true || act_top_4_11.isRunning() == true) {
                        guide_text.style.display = 'none'
                    }
                }
            }
            else if (animationID == "5. Tripper") {
                    if (intersects[0].object.name === 'tripper_helper') {
                        if (sound.isPlaying == true ){
                            sound.stop()
                        }
                        console.log("tripper_helper tripper")
                        offOultineAnimation()
                        act_top_4_01.play().reset()
                        act_top_4_01.loop = THREE.LoopOnce
                        act_top_4_02.play().reset()
                        act_top_4_02.loop = THREE.LoopOnce
                        act_top_4_03.play().reset()
                        act_top_4_03.loop = THREE.LoopOnce
                        act_top_4_04.play().reset()
                        act_top_4_04.loop = THREE.LoopOnce
                        if (act_top_4_01.isRunning() == true || act_top_4_04.isRunning() == true) {
                            guide_text.style.display = 'none'
                        }
                }
            }
            else if (animationID == "6. Ignition Key") {
                    if (intersects[0].object.name === 'ignition_helper') {
                        if (sound.isPlaying == true ){
                            sound.stop()
                        }
                    console.log("ignition_helper tripper")
                    offOultineAnimation()
                    act_top_4_12.play().reset()
                    act_top_4_13.play().reset()
                    act_top_4_14.play().reset()
                    act_top_4_15.play().reset()
                    act_top_4_16.play().reset()
                    act_top_4_17.play().reset()
                    act_top_4_11.play().reset()

                    act_top_4_17.loop = THREE.LoopOnce
                    act_top_4_12.loop = THREE.LoopOnce
                    act_top_4_13.loop = THREE.LoopOnce
                    act_top_4_14.loop = THREE.LoopOnce
                    act_top_4_15.loop = THREE.LoopOnce
                    act_top_4_16.loop = THREE.LoopOnce
                    act_top_4_17.loop = THREE.LoopOnce
                    act_top_4_11.loop = THREE.LoopOnce

                    act_top_4_01.play().reset()
                    act_top_4_01.loop = THREE.LoopOnce
                    act_top_4_02.play().reset()
                    act_top_4_02.loop = THREE.LoopOnce
                    act_top_4_03.play().reset()
                    act_top_4_03.loop = THREE.LoopOnce
                    act_top_4_04.play().reset()
                    act_top_4_04.loop = THREE.LoopOnce

                    act_top_4_05.play().reset()
                    act_top_4_05.loop = THREE.LoopOnce
                    act_top_4_06.play().reset()
                    act_top_4_06.loop = THREE.LoopOnce
                    act_top_4_07.play().reset()
                    act_top_4_07.loop = THREE.LoopOnce
                    act_top_4_08.play().reset()
                    act_top_4_08.loop = THREE.LoopOnce
                    act_top_4_09.play().reset()
                    act_top_4_09.loop = THREE.LoopOnce
                    act_top_4_10.play().reset()
                    act_top_4_10.loop = THREE.LoopOnce
                    if (act_top_4_11.isRunning() == true || act_top_4_17.isRunning() == true) {
                        guide_text.style.display = 'none'
                    }
                }
            }
            else if (animationID == "7. RH Switch Module") {
            if (intersects[0].object.name === 'start_helper') {
                if (sound.isPlaying == true ){
                    sound.stop()
                }
                offOultineAnimation()
                if (animationID == "7. RH Switch Module") {
                        hotspot_media_1.src = annotations[0][0].media.c1
                        hotspot_media_2.src = annotations[0][0].media.c2
                        hotspot_media_1.style.display = "none"
                        hotspot_media_2.style.display = "none"
                        // if (windowsizes.width<windowsizes.height) {
                        //     hotspot_media_1.src = ""
                        //     hotspot_media_2.src = ""
                        //     hotspot_media_1.style.display = "none"
                        //     hotspot_media_2.style.display = "none"
                        // }
                        const audioLoader = new THREE.AudioLoader()
                        audioLoader.load( resources.Start_audio , function( buffer ) {
                            sound.setBuffer( buffer )
                            sound.setLoop( false )
                            sound.setVolume( 0.5 )
                            sound.play()
                        })
                    mesh_start.visible = true
                    mesh_stop.visible = false
                    act_top_7_start.play().reset()
                    act_top_7_start.loop = THREE.LoopOnce
                    if (act_top_7_start.isRunning() == true) {
                        guide_text.style.display = 'none'
                    }
                }
            }
            
            else if (intersects[0].object.name === 'kill_helper') {
                if (sound.isPlaying == true ){
                    sound.stop()
                }
                offOultineAnimation()
                if (animationID == "7. RH Switch Module") {
                        hotspot_media_1.src = annotations[0][0].media.c1
                        hotspot_media_2.src = annotations[0][0].media.c2
                        hotspot_media_1.style.display = "none"
                        hotspot_media_2.style.display = "none"
                        // if (windowsizes.width<windowsizes.height) {
                        //     hotspot_media_1.src = ""
                        //     hotspot_media_2.src = ""
                        //     hotspot_media_1.style.display = "none"
                        //     hotspot_media_2.style.display = "none"
                        // }
                    const audioLoader = new THREE.AudioLoader()
                    audioLoader.load( resources.Stop_audio, function( buffer ) {
                        sound.setBuffer( buffer )
                        sound.setLoop( false )
                        sound.setVolume( 0.5 )
                        sound.play()
                    })
                    mesh_start.visible = false
                    mesh_stop.visible = true
                    act_top_7_stop.play().reset()
                    act_top_7_stop.loop = THREE.LoopOnce
                    if (act_top_7_stop.isRunning() == true) {
                        guide_text.style.display = 'none'
                    }
                }
            }
            
            else if (intersects[0].object.name === 'hazard_helper') {
                if (sound.isPlaying == true ){
                    sound.stop()
                }
                offOultineAnimation()
                if (animationID == "7. RH Switch Module") {
                    tester = 'hazard_helper'
                        hotspot_media_1.src = annotations[0][0].media.g1
                        hotspot_media_2.src = annotations[0][0].media.g2
                        hotspot_media_1.style.display = "block"
                        hotspot_media_2.style.display = "block"
                        // if (windowsizes.width<windowsizes.height) {
                        //     hotspot_media_1.src = ""
                        //     hotspot_media_2.src = ""
                        //     hotspot_media_1.style.display = "none"
                        //     hotspot_media_2.style.display = "none"
                        // }
                    act_top_7_hazard.play().reset()
                    act_top_7_hazard.loop = THREE.LoopOnce
                    if (act_top_7_hazard.isRunning() == true) {
                        guide_text.style.display = 'none'
                    }
                }
            }
        }
            else if (animationID == "8. Fuel Tank Cap") {
            if (intersects[0].object.name === 'tank_helper') {
                if (sound.isPlaying == true ){
                    sound.stop()
                }
                console.log("Tank")
                offOultineAnimation()
                if (animationID == "8. Fuel Tank Cap") {
                    mesh_key.visible = true
                    mesh_decal.visible = true
                    act_top_8_02.play().reset()
                    act_top_8_02.loop = THREE.LoopOnce
                    act_top_8_03.play().reset()
                    act_top_8_03.loop = THREE.LoopOnce
                    act_top_8_04.play().reset()
                    act_top_8_04.loop = THREE.LoopOnce
                    act_top_8_05.play().reset()
                    act_top_8_05.loop = THREE.LoopOnce
                    act_top_8_06.play().reset()
                    act_top_8_06.loop = THREE.LoopOnce
                    act_top_8_01.play().reset()
                    act_top_8_01.loop = THREE.LoopOnce
                    if (act_top_8_02.isRunning() == true || act_top_8_06.isRunning() == true ) {
                        guide_text.style.display = 'none'
                    }
                }
            }
        }
        }
    }
    
    if (leftView) {
        if (intersects.length > 0) {
            mixer?.stopAllAction
            mixer2?.stopAllAction
            mixer3?.stopAllAction
            if (animationID == "2. Left Side Panel") {
            if (intersects[0].object.name === 'left_side') {
                if (sound.isPlaying == true ){
                    sound.stop()
                }
                console.log("2. Left Side Panel")
                 offOultineAnimation()
                    mesh_allen.visible = true
                    act_left_2_01.play().reset()
                    act_left_2_01.loop = THREE.LoopOnce
                    act_left_2_02.play().reset()
                    act_left_2_02.loop = THREE.LoopOnce
                    act_left_2_03.play().reset()
                    act_left_2_03.loop = THREE.LoopOnce
                    act_left_2_04.play().reset()
                    act_left_2_04.loop = THREE.LoopOnce
                    act_left_2_05.play().reset()
                    act_left_2_05.loop = THREE.LoopOnce
                    if (act_left_2_01.isRunning() == true || act_left_2_05.isRunning() == true ) {
                        guide_text.style.display = 'none'
                    }
                }
            }
            else if (animationID == "6. Side Stand") {

            if (intersects[0].object.name === 'side_stand') {
                if (sound.isPlaying == true ){
                    sound.stop()
                }
                console.log("6. Side Stand")
                offOultineAnimation()
                    guide_text.style.display = 'none'
                    act_left_6_01.play().reset()
                    act_left_6_01.loop = THREE.LoopOnce
                    if (act_left_6_01.isRunning() == true) {
                        guide_text.style.display = 'none'
                    }
                }
            }
            else if (animationID == "5. Gear Change Pedal") {
                if (intersects[0].object.name === 'gear_helper') {
                    if (sound.isPlaying == true ){
                        sound.stop()
                    }
                console.log("5. Gear Change Pedal")
                offOultineAnimation()
                    act_left_5_01.play().reset()
                    act_left_5_01.loop = THREE.LoopOnce
                    act_left_5_02.play().reset()
                    act_left_5_02.loop = THREE.LoopOnce
                    act_left_5_03.play().reset()
                    act_left_5_03.loop = THREE.LoopOnce
                    act_left_5_04.play().reset()
                    act_left_5_04.loop = THREE.LoopOnce
                    if (act_left_5_01.isRunning() == true || act_left_5_04.isRunning() == true ) {
                        guide_text.style.display = 'none'
                    }
                }
            }
            else if (animationID == "7. Center Stand") {
            if (intersects[0].object.name === 'center_stand') {
                if (sound.isPlaying == true ){
                    sound.stop()
                }
                console.log("hua")
                offOultineAnimation()
                    guide_text.style.display = 'none'
                    act_left_7_01.play().reset()
                    act_left_7_01.loop = THREE.LoopOnce
                }
            }
        }
    }

    if (rightView) {
        if (intersects.length > 0) {
            mixer?.stopAllAction
            mixer2?.stopAllAction
            mixer3?.stopAllAction

            if (intersects[0].object.name === 'right_side') {
                if (sound.isPlaying == true ){
                    sound.stop()
                }
                offOultineAnimation()
                if (animationID == "3. Right Side Panel") {
                    mesh_side_key.visible = true
                    mesh_side_decal.visible = true
                    act_right_3_01.play().reset()
                    act_right_3_01.loop = THREE.LoopOnce
                    act_right_3_02.play().reset()
                    act_right_3_02.loop = THREE.LoopOnce
                    act_right_3_03.play().reset()
                    act_right_3_03.loop = THREE.LoopOnce
                    act_right_3_04.play().reset()
                    act_right_3_04.loop = THREE.LoopOnce
                    act_right_3_05.play().reset()
                    act_right_3_05.loop = THREE.LoopOnce
                    act_right_3_06.play().reset()
                    act_right_3_06.loop = THREE.LoopOnce
                    if (act_right_3_01.isRunning() == true || act_right_3_06.isRunning() == true ) {
                        guide_text.style.display = 'none'
                    }
                }
            }
            else if (intersects[0].object.name === 'brake_helper') {
                if (sound.isPlaying == true ){
                    sound.stop()
                }
                offOultineAnimation()
                if (animationID == "5. Brake Pedal") {
                    act_right_5_01.play().reset()
                    act_right_5_01.loop = THREE.LoopOnce
                    act_right_5_02.play().reset()
                    act_right_5_02.loop = THREE.LoopOnce
                    if (act_right_5_01.isRunning() == true || act_right_5_02.isRunning() == true ) {
                        guide_text.style.display = 'none'
                    }
                }
            }
        }
    }
}

// EventListener -------------------->>>>
window.addEventListener("scroll", (e) => {
    rect = renderer.domElement.getBoundingClientRect()
})

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    resize = true
    camera.aspect = windowsizes.width / windowsizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(windowsizes.width, windowsizes.height)
}

// Stats -------------------->>>>
const stats = Stats()
// document.body.appendChild(stats.dom)


// Render -------------------->>>>
function render() {
    if (resize) {
        windowsizes.width = canvas_wrapper.clientWidth
        windowsizes.height = canvas_wrapper.clientHeight
        camera.aspect = windowsizes.width / windowsizes.height
        renderer.setSize( windowsizes.width, windowsizes.height )
        camera.updateProjectionMatrix()
        rect = renderer.domElement.getBoundingClientRect()
        resize=false
    }
    renderer.render(scene, camera)
}

// Animate -------------------->>>>
const animate = () => {
    requestAnimationFrame(animate)
    const elapsedTime = clock.getElapsedTime()
    const delta = elapsedTime - previousTime
    previousTime = elapsedTime


    controls.update()
    TWEEN.update()
    stats.update()

    if (mixer !== null) {
        mixer.update(delta)
    }
    if (mixer2 !== null) {
        mixer2.update(delta)
    }
    if (mixer3 !== null) {
        mixer3.update(delta)
    }
    
    render ()
    
    if (resize) {
        // rect = renderer.domElement.getBoundingClientRect()
        resize = false
    }
    
}

animate()