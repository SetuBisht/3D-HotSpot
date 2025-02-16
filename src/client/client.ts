//Essentials
import * as THREE from 'three'
import { Vector3 } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//UI
import { GUI } from 'dat.gui'

//3D Mesh
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

//Renderer
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

//Animation

import { AnimationAction } from 'three'

//Post Processing
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js'

/*

CODE START HERE

*/

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
        console.log(gl,"gl")
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
    console.log(deviceInfo, "deviceInfo")
}
getDeviceIfo()

//Device Info End//


//Three.js Scene Start//
//-------------------->>>>

//Renderer-->
const renderer = new THREE.WebGLRenderer({
    // canvas: canvas,
    antialias:true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding
renderer.physicallyCorrectLights = true
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1
document.body.appendChild(renderer.domElement)

//Scene-->
const scene = new THREE.Scene()
// scene.background = new THREE.Color( 0xff0000 )

//Camera-->
const camera = new THREE.PerspectiveCamera(
    38,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 3

//Controls-->
const controls = new OrbitControls( camera, renderer.domElement );


var action
let mixer: THREE.AnimationMixer
var model: THREE.Object3D<THREE.Event> | THREE.Group | THREE.AnimationObjectGroup
var gltfnew: GLTF
//Lights-->

//Mesh-->
//Cube//
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})
const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)

const globalParser=()=>{
const resources_Download = new XMLHttpRequest()
resources_Download.open('GET', '/res/json/resources.json') 
let resources = {
    mobile_model:"",
    desktop_model :"" ,
    tablet_model : "",
    unknown_model : "",
    anim_test: ""
}
resources_Download.onreadystatechange = function () {
if ( resources_Download.readyState === 4 ) {
    resources = JSON.parse( resources_Download.responseText )
 
   let model_route=""
   if(deviceInfo.mobile.isMobile){
      model_route = resources.mobile_model 
   }else if(deviceInfo.desktop.isDesktop) {
     model_route = resources.anim_test 
   }else{
     model_route = resources.unknown_model 
   }
     console.log(model_route,"resources")

    //HDRI-->
    var pmremGenerator = new THREE.PMREMGenerator( renderer );
    pmremGenerator.compileCubemapShader();

    new RGBELoader().load( './res/env/studio_small_08.hdr' , function ( texture ) {
        let env = pmremGenerator.fromEquirectangular( texture ).texture;

        // scene.background = bg //new THREE.Color(0xe5e3e3)
        scene.environment = env

        texture.dispose();
        pmremGenerator.dispose();
    })
   //GLTF//
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath( '/js/libs/draco/' )

    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)
    loader.load( model_route ,
        function (gltf) {
            gltfnew = gltf
            model = gltf.scene
            gltf.scene.traverse(function (child) {
                if ((child as THREE.Mesh).isMesh) {
                    const m = (child as THREE.Mesh)
                }
            })
            scene.add(gltf.scene)
            mixer = new THREE.AnimationMixer(model)
            action = mixer.clipAction(gltf.animations[1])
            action.play()
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )
    }}
resources_Download.send()
}
globalParser()
const sceneMeshes = new Array()
const raycaster = new THREE.Raycaster ()
const intersects = raycaster.intersectObjects(sceneMeshes, true)
window.addEventListener('click', onClick, false)
function onClick () {
    if (intersects[0].object.name == 'Suzanne') {
	    mixer = new THREE.AnimationMixer( model );
		action = mixer.clipAction( gltfnew.animations[ 0 ] );
		action.play();
    }
}

//Three.js Scene End//


//MISC//
//-------------------->>>>

//Event Handlers-->
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

//MISC//


//Render Function//
//-------------------->>>>
var clock = new THREE.Clock()
function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    var delta = clock.getDelta();
    if (mixer !== null) {
        mixer.update(delta);
      };
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()

//Render Function//

/*

CODE END HERE

*/