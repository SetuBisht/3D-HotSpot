/**
 * Imports
*/

//Essentials
import * as THREE from 'three'
// import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'dat.gui'

//3D Mesh
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

//Renderer
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

//Animation
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'
import { gsap } from 'gsap'

//Post Processing
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass.js';

import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js'
import { AnimationAction, Vector3 } from 'three'


/**
 * DOM
*/

//Loader-Wrap

const loading_bar_Element = document.querySelector( '#loading-bar' ) as HTMLInputElement

//Menu-View
const menu_view_Element = document.querySelector( '#menu-view' ) as HTMLInputElement
const view_top_BTN = document.querySelector( '#view-top' ) as HTMLInputElement
const view_left_BTN = document.querySelector( '#view-left' ) as HTMLInputElement
const view_right_BTN = document.querySelector( '#view-right' ) as HTMLInputElement
const view_reset_BTN = document.querySelector( '#view-reset' ) as HTMLInputElement
 view_reset_BTN.style.display="none" 

//Menu-Hotspots
const hotspots_head_Element = document.querySelector( '#hotspots-head' ) as HTMLInputElement
const hotspots_list_top_Element = document.getElementById( 'hotspots-list-top' ) as HTMLDivElement
const hotspots_list_left_Element = document.getElementById( 'hotspots-list-left' ) as HTMLDivElement
const hotspots_list_right_Element = document.getElementById( 'hotspots-list-right' ) as HTMLDivElement

const slider_switch = document.querySelector( '.switch' ) as HTMLUListElement

//Menu-View-Mob
const menu_view_mob_Element = document.querySelector( '#menu-view-mob' ) as HTMLInputElement
const view_mob_top_BTN = document.querySelector( '#view-mob-top' ) as HTMLInputElement
const view_mob_left_BTN = document.querySelector( '#view-mob-left' ) as HTMLInputElement
const view_mob_right_BTN = document.querySelector( '#view-mob-right' ) as HTMLInputElement
const view_mob_reset_BTN = document.querySelector( '#view-mob-reset' ) as HTMLInputElement

//canvas_Element
const canvas_Element = document.querySelector( '.threed_container' ) as HTMLInputElement;
const canvas = document.querySelector( '#webgl' ) as HTMLInputElement;
const scrollMessage=document.querySelector(".scroll-message") as HTMLDivElement;

//headers
const viewHeader=document.querySelector( '#hotspots-head') as HTMLDivElement;

//scrollbutton
const scrollParent=document.querySelector('.scrollController') as HTMLDivElement
const scrollLeft=document.querySelector('.leftButton') as HTMLButtonElement
const scrollRight=document.querySelector('.rightButton') as HTMLButtonElement

//new ui
const detailContainer=document.querySelector( '.hotspot_detail_container' ) as HTMLDivElement
const detail_title=document.querySelector( '.detail_title' ) as HTMLDivElement
const detail_loader=document.querySelector( '.detail_loader' ) as HTMLDivElement
const detail_vedio=document.querySelector( '.detail_vedio' ) as HTMLVideoElement
const detail_close=document.querySelector( '.detail_close' ) as HTMLDivElement
const loading_thumbnail=document.querySelector( '.loading_thumbnail' ) as HTMLImageElement
const landscapeError=document.querySelector( '.landscapeError' ) as HTMLDivElement

//animation
let mixer:any
let clips:any
let animationParent:any
let animationPlay=false
let action:any
//lhModal
let lhmixer:any
let lhclips:any
let lhanimationPlay=false
let lhaction:any

let rhmixer:any
let rhclips:any
let rhanimationPlay=false
let rhaction:any
let testSprite:any;
//new ui

//global Switch
let buttonActive=true;
let viewSlected=false;
let prevSelected:any;
let https://meet.google.com/xhm-avij-skw=false
const switchButton=document.getElementById('switch') as HTMLLabelElement
const globalbutton=document.getElementById("checkbox") as HTMLInputElement;

switchButton.style.display="none"

globalbutton.addEventListener("click",()=>{
     if(!viewSlected){
        alert("Please select a view");
          globalbutton.checked=false;
           return
       }
    globalSwitch()
})

let content_scroll_width:any;
let content_scoll_left:any;
scrollRight.addEventListener("click",()=>{
    if(topView){
         content_scroll_width = hotspots_list_top_Element.scrollWidth;
         content_scoll_left = hotspots_list_top_Element.scrollLeft;
          content_scoll_left += 100;
            if (content_scoll_left >= content_scroll_width) { content_scoll_left = content_scroll_width; }
            hotspots_list_top_Element.scrollLeft = content_scoll_left;
    }
     if(leftView){
         content_scroll_width = hotspots_list_left_Element.scrollWidth;
         content_scoll_left = hotspots_list_left_Element.scrollLeft;
          content_scoll_left += 100;
            if (content_scoll_left >= content_scroll_width) { content_scoll_left = content_scroll_width; }
            hotspots_list_left_Element.scrollLeft = content_scoll_left;
    }
     if(rightView){
         content_scroll_width = hotspots_list_right_Element.scrollWidth;
         content_scoll_left = hotspots_list_right_Element.scrollLeft;
          content_scoll_left += 100;
            if (content_scoll_left >= content_scroll_width) { content_scoll_left = content_scroll_width; }
            hotspots_list_right_Element.scrollLeft = content_scoll_left;
    }
            
})
scrollLeft.addEventListener('click', () => {
 if(topView){
         content_scroll_width = hotspots_list_top_Element.scrollWidth;
         content_scoll_left = hotspots_list_top_Element.scrollLeft;
         content_scoll_left -= 100;
            if (content_scoll_left <= 0) {
                content_scoll_left = 0;
            }
            hotspots_list_top_Element.scrollLeft = content_scoll_left;
    }
     if(leftView){
         content_scroll_width = hotspots_list_left_Element.scrollWidth;
         content_scoll_left = hotspots_list_left_Element.scrollLeft;
          content_scoll_left -= 100;
            if (content_scoll_left <= 0) {
                content_scoll_left = 0;
            }
            hotspots_list_left_Element.scrollLeft = content_scoll_left;
    }
     if(rightView){
         content_scroll_width = hotspots_list_right_Element.scrollWidth;
         content_scoll_left = hotspots_list_right_Element.scrollLeft;
          content_scoll_left -= 100;
            if (content_scoll_left <= 0) {
                content_scoll_left = 0;
            }
            hotspots_list_right_Element.scrollLeft = content_scoll_left;
    }
            
})
/**
 * Variables
 */

//view 
let topView : boolean = false
let leftView : boolean = false
let rightView : boolean = false

//Hotspots
let hotspots_top : { [ key : string ] : Hotspots }
let hotspots_left : { [ key : string ] : Hotspots }
let hotspots_right : { [ key : string ] : Hotspots }
let test:any=[];
const hotspotMarkers_top : THREE.Sprite [] = []
const hotspotMarkers_Left : THREE.Sprite [] = []
const hotspotMarkers_Right : THREE.Sprite [] = []


let combineMarkers : THREE.Sprite [] = []
let markers : any=[]
let hotspotVisible = false
let controlActive=true

//Camera
let isMobileView=false;
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}
let isiOS=iOS()

const windowsizes = {
    
    width : canvas_Element.clientWidth,
    height : canvas_Element.clientHeight
}


let fov = 20
if ( windowsizes.width < windowsizes.height ) {
    fov = 34
} else {
    fov = 20
}

//Environment
let env

//3D Mesh
const sceneMeshes = new Array()

//Renderer
const clock = new THREE.Clock ()
const raycaster = new THREE.Raycaster ()

//JSON Parser
let label : any = []
let resources : any




//Post Processing
let composer : any, effectFXAA : any, outlinePass : any
let outlineArray : any = []
let mainModel : any
const outlineParams = {
    edgeStrength : 5.0,
    edgeGlow : 1.0,
    edgeThickness : 1.0,
    pulsePeriod : 3,
    rotate : false,
    usePatternTexture : false
}

/**
 * Loaders
 */

let switchglobal:any=null;
function globalSwitch(){
 if(globalbutton.checked==true){
      
      if(topView){
        for(let i=0;i<hotspotMarkers_top.length;i++){
          hotspotMarkers_top[i].visible=false
                render()
                
                
            
        }
        if(switchglobal=="LH_MODULE"){
            for(let i=0;i<lhArr.length;i++){
                lhArr[i].visible=true;
                render()
            }
        }
         if(switchglobal=="RH_MODULE"){
            for(let i=0;i<lhArr.length;i++){
                rhArr[i].visible=true;
                render()
            }
        }
        testSprite.visible = false
        showHover=true
        render()
    }
   
//     if(rightView){
//         for(let i=0;i<hotspotMarkers_Right.length;i++){
      
//         hotspotMarkers_Right[i].visible=true
//         hotspotVisible=true
      
//          render()
//     }
//    }
//    if(leftView){
//         for(let i=0;i<hotspotMarkers_Left.length;i++){
      
//         hotspotMarkers_Left[i].visible=true
//         hotspotVisible=true
      
//          render()
//     }
//    }
    // buttonText.innerHTML="ON"
    // buttonActive=false;
    return
    }
    else{
      
     showHover=false
      if(topView){
            if(switchglobal=="LH_MODULE"){
            for(let i=0;i<lhArr.length;i++){
                lhArr[i].visible=false;
                render()
            }
        }
         if(switchglobal=="RH_MODULE"){
            for(let i=0;i<lhArr.length;i++){
                rhArr[i].visible=false;
                render()
            }
        }
           for(let i=0;i<hotspotMarkers_top.length;i++){
            if(hotspotMarkers_top[i].userData.subSection==true){
               hotspotMarkers_top[i].visible=false
                render()
            }
            else{
                  hotspotMarkers_top[i].visible=true
            }
         testSprite.visible = false
        render()
            
        }
    //     for(let i=0;i<hotspotMarkers_top.length;i++){
       
    //     hotspotMarkers_top[i].visible=false
    //     hotspotVisible=false
    //         Object.keys(hotspots_top).forEach((annotation) => {
       
    //     if (hotspots_top[annotation].descriptionDomElement) {
           
    //         (hotspots_top[annotation].descriptionDomElement as HTMLElement).style.display = 'none',
    //         (hotspots_top[annotation].descriptionDomElementImg as HTMLElement).style.display = 'none',
    //         (hotspots_top[annotation].annotationCloseDiv as HTMLElement).style.display = 'none',
    //         (hotspots_top[annotation].annotationFullDiv as HTMLElement).style.display = 'none'
    //         // (document.getElementById('hotspotsPanel') as HTMLElement).style.display = 'none'
            
            
    //     }
    // })
    //      render()
    // }
   }
//     if(rightView){
//         for(let i=0;i<hotspotMarkers_Right.length;i++){
      
//         hotspotMarkers_Right[i].visible=false
//         hotspotVisible=false
//             Object.keys(hotspots_right).forEach((annotation) => {
       
//         if (hotspots_right[annotation].descriptionDomElement) {
           
//             (hotspots_right[annotation].descriptionDomElement as HTMLElement).style.display = 'none',
//             (hotspots_right[annotation].descriptionDomElementImg as HTMLElement).style.display = 'none',
//             (hotspots_right[annotation].annotationCloseDiv as HTMLElement).style.display = 'none',
//             (hotspots_right[annotation].annotationFullDiv as HTMLElement).style.display = 'none'
//             // (document.getElementById('hotspotsPanel') as HTMLElement).style.display = 'none'
            
            
//         }
//     })
//          render()
//     }
//    }
//    if(leftView){
//         for(let i=0;i<hotspotMarkers_Left.length;i++){
      
//         hotspotMarkers_Left[i].visible=false
//         hotspotVisible=false
//             Object.keys(hotspots_left).forEach((annotation) => {
       
//         if (hotspots_left[annotation].descriptionDomElement) {
           
//             (hotspots_left[annotation].descriptionDomElement as HTMLElement).style.display = 'none',
//             (hotspots_left[annotation].descriptionDomElementImg as HTMLElement).style.display = 'none',
//             (hotspots_left[annotation].annotationCloseDiv as HTMLElement).style.display = 'none',
//             (hotspots_left[annotation].annotationFullDiv as HTMLElement).style.display = 'none'
//             // (document.getElementById('hotspotsPanel') as HTMLElement).style.display = 'none'
            
            
//         }
//     })
//          render()
//     }
//    }
    //    buttonText.innerHTML="OFF"
    //    buttonActive=true;
    }
}

const loadmanager = new THREE.LoadingManager( () =>
    {
        window.setTimeout(() =>
        {
       
        loading_bar_Element.style.display = 'none'
      
        gsap.to(loadingmaterial.uniforms.uAlpha, { duration: 2, value: 0})
        }, 500)

        window.setTimeout(() =>
        {
            scene.remove(loadingoverlay);
            loadingoverlay.geometry.dispose();
            loadingoverlay.material.dispose();
            // loadingoverlay = undefined;
        }, 800)

        window.setTimeout(() =>
        {
            // document.body.appendChild(stats.dom)
            menu_view_Element.style.display = 'block'
            // slider_switch.style.display = 'block'

            render()

        }, 1000)
        
        window.setTimeout(() =>
        {
            render()
        }, 100)
        
    },

    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        const progressRatio = itemsLoaded/itemsTotal
        // loading_bar_Element.style.transform = `scaleX(${progressRatio})`
        // loading_logo_Element.style.display = 'block'
        menu_view_Element.style.display = 'none'
        hotspots_head_Element.style.display = 'none'

    }
)

//Texture Loader
const textureLoader = new THREE.TextureLoader( loadmanager )

//Draco Loader
const dracoLoader = new DRACOLoader( loadmanager )

//GLTF Loader
const gltfloader = new GLTFLoader( loadmanager )
gltfloader.setDRACOLoader( dracoLoader );



/**
 * Texture
 */
let hotspot_sprite : any;


/**
 * Scene Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias:true,
    alpha: true
})

renderer.setSize( windowsizes.width, windowsizes.height )

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1;


/**
 * Label Renderer
 */
const labelRenderer = new CSS2DRenderer()

labelRenderer.setSize( windowsizes.width, windowsizes.height )
labelRenderer.domElement.style.position = 'absolute'
labelRenderer.domElement.style.top = '0px'
labelRenderer.domElement.style.pointerEvents = 'none'
document.body.appendChild(labelRenderer.domElement)


/**
 * Scene
 */
const scene = new THREE.Scene()
// scene.background = new THREE.Color( 0xff0000 );


/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
    fov,
    windowsizes.width / windowsizes.height,
    0.1,
    10000
)
camera.position.set( -0.370,2.143,5.557 )


/**
 * Environment
 */
var pmremGenerator = new THREE.PMREMGenerator( renderer );
pmremGenerator.compileCubemapShader();


/**
 * Light
 */
//Hemisphere Light
const hemlight = new THREE.HemisphereLight()
hemlight.color.set(0xffffff)
hemlight.groundColor.set(0xffffff)
hemlight.position.set(0, 0, 0)
hemlight.intensity = 1
scene.add(hemlight)

//Directional Light
const dirlight = new THREE.DirectionalLight()
dirlight.color.set(0xffffff)
dirlight.position.set(5, 10, 7.5)
dirlight.intensity = 10
// scene.add(dirlight)


/**
 * Post Processing
 */

const parameters = {
	minFilter: THREE.LinearFilter,
	magFilter: THREE.LinearFilter,
	format: THREE.RGBAFormat,
    encoding: THREE.sRGBEncoding,
	type: THREE.FloatType
};

let renderTarget = new THREE.WebGLRenderTarget( windowsizes.width, windowsizes.height, parameters );


// composer = new EffectComposer( renderer, renderTarget );
// const renderPass = new RenderPass( scene, camera );


//Outline Pass
outlinePass = new OutlinePass( new THREE.Vector2( windowsizes.width,windowsizes.height), scene, camera );

outlinePass.edgeStrength =outlineParams.edgeStrength;
outlinePass.edgeGlow =outlineParams.edgeGlow;
outlinePass.edgeThickness =outlineParams.edgeThickness;
// outlinePass.pulsePeriod =outlineParams.pulsePeriod;
outlinePass.visibleEdgeColor.set(0x000FFF);
outlinePass.hiddenEdgeColor.set(0x000FFF);
outlinePass.renderToScreen = true;
// let taaRenderPass = new TAARenderPass( scene, camera,new THREE.Color( 0xffffff ),1 );
// 				taaRenderPass.unbiased = false;
//                 taaRenderPass.enabled = true;
//                 taaRenderPass.sampleLevel=3
				// composer.addPass( taaRenderPass );
//FXAA Pass
var pixelRatio = renderer.getPixelRatio();
// effectFXAA = new ShaderPass( FXAAShader );
// effectFXAA.uniforms[ 'resolution' ].value.set( 1 / windowsizes.width, 1 / windowsizes.height );
// effectFXAA.material.uniforms[ 'resolution' ].value.x = 1 / ( windowsizes.width * pixelRatio );
// effectFXAA.material.uniforms[ 'resolution' ].value.y = 1 / ( windowsizes.height * pixelRatio );
// effectFXAA.renderToScreen = true;
const pass = new SMAAPass( windowsizes.width * renderer.getPixelRatio(), windowsizes.height* renderer.getPixelRatio() );
	
// composer.addPass( renderPass );
// composer.addPass( effectFXAA );
// composer.addPass( outlinePass );
// composer.addPass( pass );



let vedioElement=document.querySelector("#backgroundvid") as HTMLVideoElement;	



//JSON Loader
 let lhModal:any;
 let rhModal:any;
 let lhArr:any=[];
 let rhArr:any=[];
const resources_Download = new XMLHttpRequest()
const resources_Download_Mobile = new XMLHttpRequest()
if (isMobile) {
   
    isMobileView=true
    fov = 28
    // windowsizes.height = 500
    resources_Download_Mobile.open('GET', '/data/resources_mobile.json') //Local Path
    // resources_Download_Mobile.open('GET', '/content/dam/royal-enfield/scram-digital-quickstart/json/resources_mobile.json') //AEM Path
    resources_Download_Mobile.onreadystatechange = function () {
if ( resources_Download_Mobile.readyState === 4 ) {
    resources = JSON.parse( resources_Download_Mobile.responseText )

    /**
     * Hotspot Json
    */
    const hotspots_top_Download = new XMLHttpRequest()
    hotspots_top_Download.open('GET', resources.hotspot_top_json)

    const hotspots_left_Download = new XMLHttpRequest()
    hotspots_left_Download.open('GET', resources.hotspot_left_json)

    const hotspots_right_Download = new XMLHttpRequest()
    hotspots_right_Download.open('GET', resources.hotspot_right_json)

    /**
     * Draco Path
    */
    dracoLoader.setDecoderPath( resources.draco_path )

    /**
     * Texture
    */
    hotspot_sprite = textureLoader.load( resources.hotspot_sprite )

    /**
     * Environment
    */

    let bg = new THREE.Color( 0x2a2a2a )

    new RGBELoader().load( resources.env_hdr, function ( texture ) {
        env = pmremGenerator.fromEquirectangular( texture ).texture;

        scene.background = bg //new THREE.Color(0xe5e3e3)
        scene.environment = env

        texture.dispose();
        pmremGenerator.dispose();
    })

    const shadowcatcher_AO = textureLoader.load( resources.shadowcatcher_AO_img )
    shadowcatcher_AO.flipY = true
    const shadowcatcher_ALPHA = textureLoader.load( resources.shadowcatcher_ALPHA_img )
    shadowcatcher_ALPHA.flipY = true

    const shadowcatcher_mat = new THREE.MeshPhysicalMaterial ({
        transparent: true,
        aoMap:shadowcatcher_AO,
        alphaMap:shadowcatcher_ALPHA
    })

    shadowcatcher_mat.color.setHex( 0x252525 ).convertSRGBToLinear()

    var data = {
        color: shadowcatcher_mat.color.getHex(),
        bg_color: bg.getHex()
    }

    // const gui = new GUI()
    // const Floor = gui.addFolder('Floor Color')
    // Floor.addColor(data, 'color').onChange(() => {
    //     shadowcatcher_mat.color.setHex(Number(data.color.toString().replace('#', '0x')))
    //     render()
    // })
    // Floor.close()

    // const background = gui.addFolder('Background Color')
    // background.addColor(data, 'bg_color').onChange(() => {
    //     bg.setHex(Number(data.bg_color.toString().replace('#', '0x')))
    //     render()
    // })
    // background.close()


    /**
     * Shadowcatcher GLB
    */
    gltfloader.load( resources.shadow_model, function (gltf) {

        let shadow = gltf.scene

        shadow.traverse ( function( child ) {
            if ( (child as THREE.Mesh).isMesh ) {

                const m = child as THREE.Mesh

                m.material = shadowcatcher_mat
               
            }
        })

        scene.add(shadow)

        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            
        },
        (error) => {
            console.log('An error happened')
        }
        
    )
 gltfloader.load( resources.LH_model, function (gltf) {
    
        let LH_switch = gltf.scene

        LH_switch.traverse ( function( child ) {
            if ( (child as THREE.Mesh).isMesh ) {
               
            }
        })
    
        scene.add(LH_switch)
        lhModal=LH_switch
        
        lhmixer = new THREE.AnimationMixer( gltf.scene );
        lhmixer.loop= THREE.LoopPingPong
        lhclips = gltf.animations;
          for(let i=0;i<lhModal.children.length;i++){
               
                markers.push(lhModal.children[i])
                if(lhModal.children[i].name=="LH_switch_headlamp_hot"){
                    lhModal.children[i].userData.animation="LH_switch_headlamp_hotAction"
                      lhModal.children[i].userData.class="LH_MODULE"
                }
               if(lhModal.children[i].name=="LH_switch_horn_hot"){
                    lhModal.children[i].userData.animation="LH_switch_horn_hotAction"
                     lhModal.children[i].userData.class="LH_MODULE"
                }
                if(lhModal.children[i].name=="LH_switch_indicator_hot"){
                    lhModal.children[i].userData.animation="LH_switch_indicator_hotAction"
                     lhModal.children[i].userData.class="LH_MODULE"
                }
            }
        
                console.log(lhModal,lhclips,lhmixer)
          
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loadeding')
            
        },
        (error) => {
            console.log('An error happened')
        }
        
    )
     gltfloader.load( resources.RH_model, function (gltf) {

        let RH_switch = gltf.scene

        RH_switch.traverse ( function( child ) {
            if ( (child as THREE.Mesh).isMesh ) {

                const m = child as THREE.Mesh
               
            }
        })
        rhModal=RH_switch
      
        
        scene.add(RH_switch)
         rhmixer = new THREE.AnimationMixer( gltf.scene );
        rhmixer.loop= THREE.LoopPingPong
        rhclips = gltf.animations;
        
        
               
            
             for(let i=0;i<rhModal.children.length;i++){
               
                markers.push(rhModal.children[i])
                 if(rhModal.children[i].name=="RH_switch_enginestop_hot"){
                    rhModal.children[i].userData.animation="RH_switch_enginestop_hotAction"
                      rhModal.children[i].userData.class="RH_MODULE"
                }
               if(rhModal.children[i].name=="RH_switch_estart_hot"){
                    rhModal.children[i].userData.animation="RH_switch_estart_hotAction"
                     rhModal.children[i].userData.class="RH_MODULE"
                }
                if(rhModal.children[i].name=="RH_switch_hazard_hot"){
                    rhModal.children[i].userData.animation="RH_switch_hazard_hotAction"
                     rhModal.children[i].userData.class="RH_MODULE"
                }
               
            }
           console.log("rhModal",rhModal,rhclips,rhmixer)
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            
        },
        (error) => {
            console.log('An error happened')
        }
        
    )
 
    /**
     * Scram411 GLB
    */
    gltfloader.load( resources.scram_model, function (gltf) {

        let Scram411 = gltf.scene

        Scram411.traverse ( function( child ) {
            if ( (child as THREE.Mesh).isMesh ) {
                        
                const m_411 = child as THREE.Mesh

            }
        })

        //JsonParser Top View
        hotspots_top_Download.onreadystatechange = function () {
            if ( hotspots_top_Download.readyState === 4 ) {
                hotspots_top = JSON.parse( hotspots_top_Download.responseText )
                const ul_top = document.createElement( 'UL' ) as HTMLUListElement
                const ulElem_top = hotspots_list_top_Element.appendChild( ul_top )

                hotspots_list_top_Element.style.display="none"

                Object.keys( hotspots_top ).forEach( (a) => {
                    const li_top = document.createElement( 'UL' ) as HTMLLIElement
                    const liElem_top = ulElem_top.appendChild( li_top )
                    const button_top = document.createElement( 'BUTTON' ) as HTMLButtonElement
                    // button.innerHTML = a + ' : ' + hotspots_top[a].title
                    button_top.innerHTML = hotspots_top[a].title
                    button_top.className = 'hotspotsButton'

                    button_top.addEventListener( 'click', function () {
                        gotoAnnotation( hotspots_top[a] ,undefined)
                    })

                    liElem_top.appendChild( button_top )

                    //Sprite Material
                    const hotspot_sprite_Material_top = new THREE.SpriteMaterial ({
                        map: hotspot_sprite,
                        depthTest: false,
                        depthWrite: false,
                        sizeAttenuation: false,
                    })

                    //Sprite Mesh
                    const hotspot_sprite_top = new THREE.Sprite( hotspot_sprite_Material_top )
                    hotspot_sprite_top.scale.set(0.1,0.1,0.1 )
                    hotspot_sprite_top.position.copy( hotspots_top[a].lookAt )
                    hotspot_sprite_top.name = hotspots_top[a].title
                    hotspot_sprite_top.userData.id = a
                    hotspot_sprite_top.visible = false
                     hotspot_sprite_top.userData.subSection = false
                   
                    scene.add( hotspot_sprite_top )
                    // scene.add(closeSprite)

                    hotspotMarkers_top.push( hotspot_sprite_top )
                    combineMarkers.push( hotspot_sprite_top )
                  
                    // Annotation Div
                      if(hotspots_top[a].subSection){
                     for(let i=0;i<hotspots_top[a].subSectionVedio.length;i++){
                    const hotspot_sprite_top = new THREE.Sprite( hotspot_sprite_Material_top )
                    hotspot_sprite_top.scale.set( 0.1,0.1,0.1 )
                   
                      
                    hotspot_sprite_top.position.copy( hotspots_top[a].subSectionVedio[i]?.lookAt )
                     
                    hotspot_sprite_top.name = hotspots_top[a].subSectionVedio[i]?.title
                     
                    hotspot_sprite_top.userData.id =  hotspots_top[a].subSectionVedio[i]?.id
                    hotspot_sprite_top.userData.subSection = true
                    hotspot_sprite_top.userData.animation = hotspots_top[a].subSectionVedio[i]?.animation
                    hotspot_sprite_top.userData.class = hotspots_top[a].subSectionVedio[i]?.class
                    hotspot_sprite_top.visible = false 
            
                     
                     if(hotspots_top[a].subSectionVedio[i]?.class=="LH_MODULE"){
                          
                        lhArr.push( hotspot_sprite_top)

                            for(let i=0;i<lhModal.children.length;i++){
               
         
                        if(lhModal.children[i].name=="LH_switch_headlamp_hot"){
                            lhModal.children[i].userData.button=  hotspots_top[a].subSectionVedio[i]?.title
                       
                        }
                    if(lhModal.children[i].name=="LH_switch_horn_hot"){
                            lhModal.children[i].userData.button=  hotspots_top[a].subSectionVedio[i]?.title
                        }
                        if(lhModal.children[i].name=="LH_switch_indicator_hot"){
                            lhModal.children[i].userData.button=  hotspots_top[a].subSectionVedio[i]?.title
                       
                        }
            }
                    }
                     if(hotspots_top[a].subSectionVedio[i]?.class=="RH_MODULE"){
                        rhArr.push( hotspot_sprite_top)
                           for(let i=0;i<rhModal.children.length;i++){
               
               
                 if(rhModal.children[i].name=="RH_switch_enginestop_hot"){
                     console.log("title",hotspots_top[a].subSectionVedio[i]?.title)
                    rhModal.children[i].userData.button="Engine Switch"
                     
                }
               if(rhModal.children[i].name=="RH_switch_estart_hot"){
                    console.log("title2",hotspots_top[a].subSectionVedio[i]?.title)
                    rhModal.children[i].userData.button="E-Start Switch"
                    
                }
                if(rhModal.children[i].name=="RH_switch_hazard_hot"){
                     console.log("title3",hotspots_top[a].subSectionVedio[i]?.title)
                    rhModal.children[i].userData.button="Hazard Switch"
                }
               
            }
                     }
                    scene.add( hotspot_sprite_top )
                    combineMarkers.push( hotspot_sprite_top )
                    
                    const hotspotsPos_top = document.createElement('div') as HTMLDivElement
                    hotspotsPos_top.className = 'hotspotsPosTop'
                    hotspotsPos_top.id = hotspots_top[a].subSectionVedio[i]?.id
                    document.body.appendChild(hotspotsPos_top)
                    

                    const hotspotsPos = new CSS2DObject( hotspotsPos_top )
                  
                    hotspotsPos.position.copy( hotspots_top[a].subSectionVedio[i]?.lookAt )
                    label.push( hotspotsPos )
                    const hotspotsLabel_top = document.createElement( 'div' )
                    hotspotsLabel_top.className = 'hotspotsLabel'
                  
                    hotspotsLabel_top.innerHTML = hotspots_top[a].subSectionVedio[i].title
                
                    hotspotsPos_top.appendChild( hotspotsLabel_top )
                  
                    hotspots_top[a].descriptionDomElement = hotspotsLabel_top
                    test.push(hotspotsPos_top)
                  
                     }   
                   
                  

                    }
                 
               
                    if(hotspots_top[a].subSection){
                     hotspots_top[a].subSection=true
                    }
                })
            }

            let hoverData = document.querySelectorAll(".hotspotsButton")!
                            
            for(let i=0;i<hoverData.length;i++) {
                hoverData[i].addEventListener("mouseover", function( event ) {
                    if(hoverData[i].innerHTML==hotspotMarkers_top[i].name){
                    
                       
                            hotspotMarkers_top[i].scale.set(0.015, 0.015, 0.015)
                        render()
                       
                       
                    }
                } , false);
                hoverData[i].addEventListener("mouseleave", function( event ) {
                    hotspotMarkers_top[i].scale.set(0.012, 0.012, 0.012)
                    render()
                } , false);
            } 
                            
        }

        //JsonParser Right View
        hotspots_right_Download.onreadystatechange = function () {
            if ( hotspots_right_Download.readyState === 4 ) {
                hotspots_right = JSON.parse( hotspots_right_Download.responseText )
                const ul_right = document.createElement( 'UL') as HTMLUListElement
                const ulElem_right = hotspots_list_right_Element.appendChild( ul_right )

                hotspots_list_right_Element.style.display="none"

                Object.keys ( hotspots_right ).forEach( (a) => {
                    const li_right = document.createElement( 'UL' ) as HTMLLIElement
                    const liElem_right = ulElem_right.appendChild( li_right )
                    const button_right = document.createElement( 'BUTTON' ) as HTMLButtonElement
                    // button.innerHTML = a + ' : ' + hotspots_right[a].title
                    button_right.innerHTML = hotspots_right[a].title
                    button_right.className = 'hotspotsButtonRight'

                    button_right.addEventListener('click', function () {
                        gotoAnnotation( hotspots_right[a],undefined )
                    })

                    liElem_right.appendChild( button_right )

                    //Sprite Material
                    const hotspot_sprite_Material_right = new THREE.SpriteMaterial ({
                        map: hotspot_sprite,
                        depthTest: false,
                        depthWrite: false,
                        sizeAttenuation: false,
                    })

                    //Sprite Mesh
                    const hotspot_sprite_right = new THREE.Sprite( hotspot_sprite_Material_right )
                    hotspot_sprite_right.scale.set(0.1,0.1,0.1 )
                    hotspot_sprite_right.position.copy( hotspots_right[a].lookAt )
                    hotspot_sprite_right.name=hotspots_right[a].title
                    hotspot_sprite_right.userData.id = a
                    hotspot_sprite_right.visible = false
                    
                  
                    scene.add( hotspot_sprite_right )
                

                    hotspotMarkers_Right.push( hotspot_sprite_right )
                    combineMarkers.push( hotspot_sprite_right )
          

                })
            }

            let hoverData=document.querySelectorAll(".hotspotsButtonRight")!
                            
            for(let i=0;i<hoverData.length;i++) {
                hoverData[i].addEventListener("mouseover", function( event ) {
                    if(hoverData[i].innerHTML==hotspotMarkers_Right[i].name){
                        hotspotMarkers_Right[i].scale.set(0.015, 0.015, 0.015)
                        render()
                    }
                } , false);
                hoverData[i].addEventListener("mouseleave", function( event ) {
                    hotspotMarkers_Right[i].scale.set(0.012, 0.012, 0.012)
                    render()
                } , false);
            }                  
        }

        //JsonParser Left View
        hotspots_left_Download.onreadystatechange = function () {
            if ( hotspots_left_Download.readyState === 4 ) {
                hotspots_left = JSON.parse( hotspots_left_Download.responseText )
                const ul_left = document.createElement('UL') as HTMLUListElement
                const ulElem_left = hotspots_list_left_Element.appendChild( ul_left )

                hotspots_list_left_Element.style.display="none"

                Object.keys( hotspots_left ).forEach( (a) => {
                    
                    const li_left = document.createElement( 'UL' ) as HTMLLIElement
                    const liElem_left = ulElem_left.appendChild( li_left )
                    const button_left = document.createElement( 'BUTTON' ) as HTMLButtonElement
                    // button.innerHTML = a + ' : ' + hotspots_right[a].title
                    button_left.innerHTML = hotspots_left[a].title
                    button_left.className = 'hotspotsButtonLeft'

                    button_left.addEventListener( 'click', function () {
                        gotoAnnotation( hotspots_left[a] ,undefined)
                    })

                    liElem_left.appendChild( button_left )

                    //Sprite Material
                    const hotspot_sprite_Material_left = new THREE.SpriteMaterial ({
                        map: hotspot_sprite,
                        depthTest: false,
                        depthWrite: false,
                        sizeAttenuation: false,
                    })

                    //Sprite Mesh
                    const hotspot_sprite_left = new THREE.Sprite( hotspot_sprite_Material_left )
                    hotspot_sprite_left.scale.set(0.1,0.1,0.1)
                    hotspot_sprite_left.position.copy(hotspots_left[a].lookAt)
                    hotspot_sprite_left.name=hotspots_left[a].title
                    hotspot_sprite_left.userData.id = a
                    hotspot_sprite_left.visible = false
            

                    scene.add( hotspot_sprite_left )
                

                    hotspotMarkers_Left.push( hotspot_sprite_left )
                    combineMarkers.push( hotspot_sprite_left )


                    detail_close.addEventListener("pointerdown",crossCamPos)
                    detail_close.addEventListener("touch",crossCamPos)

                
                })
            }

            let hoverData=document.querySelectorAll(".hotspotsButtonLeft")!
                            
             for(let i=0;i<hoverData.length;i++) {
                hoverData[i].addEventListener("mouseover", function( event ) {
                    if(hoverData[i].innerHTML==hotspotMarkers_Left[i].name){
                        hotspotMarkers_Left[i].scale.set(0.015, 0.015, 0.015)
                        render()
                    }
                } , false);
                hoverData[i].addEventListener("mouseleave", function( event ) {
                    hotspotMarkers_Left[i].scale.set(0.012, 0.012, 0.012)
                    render()
                } , false);
            }         
        }
        hotspots_right_Download.send()
        hotspots_top_Download.send()
        hotspots_left_Download.send()
        scene.add(Scram411);
         
        mainModel=Scram411.children
         mixer = new THREE.AnimationMixer( gltf.scene );
         mixer.loop= THREE.LoopPingPong
         clips = gltf.animations;
        switchButton.style.display="none"
        
            
        },
        (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                
        },
        (error) => {
                console.log('An error happened')
        })
    }}
resources_Download_Mobile.send()
  /* your code here */
}else{
  
resources_Download.open('GET', '/data/resources.json') //Local Path
// resources_Download.open('GET', '/content/dam/royal-enfield/scram-digital-quickstart/json/resources.json') //AEM PATH
resources_Download.onreadystatechange = function () {
if ( resources_Download.readyState === 4 ) {
    resources = JSON.parse( resources_Download.responseText )
 gltfloader.load( resources.LH_model, function (gltf) {
    
        let LH_switch = gltf.scene

        LH_switch.traverse ( function( child ) {
            if ( (child as THREE.Mesh).isMesh ) {
               
            }
        })
    
        scene.add(LH_switch)
        lhModal=LH_switch
        
        lhmixer = new THREE.AnimationMixer( gltf.scene );
        lhmixer.loop= THREE.LoopPingPong
        lhclips = gltf.animations;
          for(let i=0;i<lhModal.children.length;i++){
               
                markers.push(lhModal.children[i])
                if(lhModal.children[i].name=="LH_switch_headlamp_hot"){
                    lhModal.children[i].userData.animation="LH_switch_headlamp_hotAction"
                      lhModal.children[i].userData.class="LH_MODULE"
                }
               if(lhModal.children[i].name=="LH_switch_horn_hot"){
                    lhModal.children[i].userData.animation="LH_switch_horn_hotAction"
                     lhModal.children[i].userData.class="LH_MODULE"
                }
                if(lhModal.children[i].name=="LH_switch_indicator_hot"){
                    lhModal.children[i].userData.animation="LH_switch_indicator_hotAction"
                     lhModal.children[i].userData.class="LH_MODULE"
                }
            }
        
                console.log(lhModal,lhclips,lhmixer)
          
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loadeding')
            
        },
        (error) => {
            console.log('An error happened')
        }
        
    )
     gltfloader.load( resources.RH_model, function (gltf) {

        let RH_switch = gltf.scene

        RH_switch.traverse ( function( child ) {
            if ( (child as THREE.Mesh).isMesh ) {

                const m = child as THREE.Mesh
               
            }
        })
        rhModal=RH_switch
      
        
        scene.add(RH_switch)
         rhmixer = new THREE.AnimationMixer( gltf.scene );
        rhmixer.loop= THREE.LoopPingPong
        rhclips = gltf.animations;
        
        
               
            
             for(let i=0;i<rhModal.children.length;i++){
               
                markers.push(rhModal.children[i])
                 if(rhModal.children[i].name=="RH_switch_enginestop_hot"){
                    rhModal.children[i].userData.animation="RH_switch_enginestop_hotAction"
                      rhModal.children[i].userData.class="RH_MODULE"
                }
               if(rhModal.children[i].name=="RH_switch_estart_hot"){
                    rhModal.children[i].userData.animation="RH_switch_estart_hotAction"
                     rhModal.children[i].userData.class="RH_MODULE"
                }
                if(rhModal.children[i].name=="RH_switch_hazard_hot"){
                    rhModal.children[i].userData.animation="RH_switch_hazard_hotAction"
                     rhModal.children[i].userData.class="RH_MODULE"
                }
               
            }
           console.log("rhModal",rhModal,rhclips,rhmixer)
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            
        },
        (error) => {
            console.log('An error happened')
        }
        
    )

    

    /**
     * Hotspot Json
    */
    const hotspots_top_Download = new XMLHttpRequest()
    hotspots_top_Download.open('GET', resources.hotspot_top_json)

    const hotspots_left_Download = new XMLHttpRequest()
    hotspots_left_Download.open('GET', resources.hotspot_left_json)

    const hotspots_right_Download = new XMLHttpRequest()
    hotspots_right_Download.open('GET', resources.hotspot_right_json)

    /**
     * Draco Path
    */
    dracoLoader.setDecoderPath( resources.draco_path )

    /**
     * Texture
    */
    hotspot_sprite = textureLoader.load( resources.hotspot_sprite )

    /**
     * Environment
    */

    let bg = new THREE.Color( 0x2a2a2a )

    new RGBELoader().load( resources.env_hdr, function ( texture ) {
        env = pmremGenerator.fromEquirectangular( texture ).texture;

        scene.background = bg //new THREE.Color(0xe5e3e3)
        scene.environment = env

        texture.dispose();
        pmremGenerator.dispose();
    })

    const shadowcatcher_AO = textureLoader.load( resources.shadowcatcher_AO_img )
    shadowcatcher_AO.flipY = true
    const shadowcatcher_ALPHA = textureLoader.load( resources.shadowcatcher_ALPHA_img )
    shadowcatcher_ALPHA.flipY = true

    const shadowcatcher_mat = new THREE.MeshPhysicalMaterial ({
        transparent: true,
        aoMap:shadowcatcher_AO,
        alphaMap:shadowcatcher_ALPHA
    })

    shadowcatcher_mat.color.setHex( 0x252525 ).convertSRGBToLinear()

    var data = {
        color: shadowcatcher_mat.color.getHex(),
        bg_color: bg.getHex()
    }

    // const gui = new GUI()
    // const Floor = gui.addFolder('Floor Color')
    // Floor.addColor(data, 'color').onChange(() => {
    //     shadowcatcher_mat.color.setHex(Number(data.color.toString().replace('#', '0x')))
    //     render()
    // })
    // Floor.close()

    // const background = gui.addFolder('Background Color')
    // background.addColor(data, 'bg_color').onChange(() => {
    //     bg.setHex(Number(data.bg_color.toString().replace('#', '0x')))
    //     render()
    // })
    // background.close()


    /**
     * Shadowcatcher GLB
    */
    gltfloader.load( resources.shadow_model, function (gltf) {

        let shadow = gltf.scene

        shadow.traverse ( function( child ) {
            if ( (child as THREE.Mesh).isMesh ) {

                const m = child as THREE.Mesh

                m.material = shadowcatcher_mat
               
            }
        })

        scene.add(shadow)

        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            
        },
        (error) => {
            console.log('An error happened')
        }
        
    )

    //LH_switch_headlamp
    //LH_switch_turnsignal
    //LH_switch_horn
    // gltfloader.load( resources.LH_model, function (gltf) {

    //     let LH_switch = gltf.scene

    //     LH_switch.traverse ( function( child ) {
    //         if ( (child as THREE.Mesh).isMesh ) {

    //             const m = child as THREE.Mesh
               
    //         }
    //     })

    //     scene.add(LH_switch)

    //     },
    //     (xhr) => {
    //         console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            
    //     },
    //     (error) => {
    //         console.log('An error happened')
    //     }
        
    // )

    // //RH_switch_engineswitch
    // gltfloader.load( resources.RH_model, function (gltf) {

    //     let RH_switch = gltf.scene

    //     RH_switch.traverse ( function( child ) {
    //         if ( (child as THREE.Mesh).isMesh ) {

    //             const m = child as THREE.Mesh
               
    //         }
    //     })

    //     scene.add(RH_switch)

    //     },
    //     (xhr) => {
    //         console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            
    //     },
    //     (error) => {
    //         console.log('An error happened')
    //     }
        
    // )

    /**
     * Scram411 GLB
    */
    gltfloader.load( resources.scram_model, function (gltf) {
     animationParent=gltf
        let Scram411 = gltf.scene
   
        Scram411.traverse ( function( child ) {
            if ( (child as THREE.Mesh).isMesh ) {
                        
                const m_411 = child as THREE.Mesh

            }
        })

        //JsonParser Top View
        hotspots_top_Download.onreadystatechange = function () {
            if ( hotspots_top_Download.readyState === 4 ) {
                hotspots_top = JSON.parse( hotspots_top_Download.responseText )
                const ul_top = document.createElement( 'UL' ) as HTMLUListElement
                ul_top.style.padding="0px"
                const ulElem_top = hotspots_list_top_Element.appendChild( ul_top )

                hotspots_list_top_Element.style.display="none"

                Object.keys( hotspots_top ).forEach( (a) => {
                   
                    const li_top = document.createElement( 'UL' ) as HTMLLIElement
                     li_top.style.padding="0px"
                    const liElem_top = ulElem_top.appendChild( li_top )
                    const button_top = document.createElement( 'BUTTON' ) as HTMLButtonElement
                    // button.innerHTML = a + ' : ' + hotspots_top[a].title
                    button_top.innerHTML = hotspots_top[a].title
                    button_top.className = 'hotspotsButton'

                    button_top.addEventListener( 'click', function () {
                      
                        if(isswitchView){
                         prevSelected=hotspots_top[a]
                         gotoAnnotation( hotspots_top[a],undefined )
                        }
                       
                    })

                    liElem_top.appendChild( button_top )

                    //Sprite Material
                    const hotspot_sprite_Material_top = new THREE.SpriteMaterial ({
                        map: hotspot_sprite,
                        depthTest: false,
                        depthWrite: false,
                        sizeAttenuation: false,
                    })

                    //Sprite Mesh
                    const hotspot_sprite_top = new THREE.Sprite( hotspot_sprite_Material_top )
                    hotspot_sprite_top.scale.set( 0.012, 0.012, 0.012 )
                    hotspot_sprite_top.position.copy( hotspots_top[a].lookAt )
                    hotspot_sprite_top.name = hotspots_top[a].title
                    hotspot_sprite_top.userData.id = a
                    hotspot_sprite_top.visible = false
                    hotspot_sprite_top.userData.subSection = false
               
                    
                  

                    scene.add( hotspot_sprite_top )
                  
                    hotspotMarkers_top.push( hotspot_sprite_top )
                    combineMarkers.push( hotspot_sprite_top )
                    detail_close.addEventListener( "click",crossCamPos )
                  

                    //Annotation Div
                   
                    if(hotspots_top[a].subSection){
                     for(let i=0;i<hotspots_top[a].subSectionVedio.length;i++){
                    const hotspot_sprite_top = new THREE.Sprite( hotspot_sprite_Material_top )
                    hotspot_sprite_top.scale.set( 0.012, 0.012, 0.012 )
                  
                      
                    hotspot_sprite_top.position.copy( hotspots_top[a].subSectionVedio[i]?.lookAt )
                     
                    hotspot_sprite_top.name = hotspots_top[a].subSectionVedio[i]?.title
                     
                    hotspot_sprite_top.userData.id =  hotspots_top[a].subSectionVedio[i]?.id
                    hotspot_sprite_top.userData.subSection = true
                    hotspot_sprite_top.userData.animation = hotspots_top[a].subSectionVedio[i]?.animation
                    hotspot_sprite_top.userData.class = hotspots_top[a].subSectionVedio[i]?.class
                    hotspot_sprite_top.visible = false 
                      if(hotspots_top[a].subSectionVedio[i]?.class=="LH_MODULE"){
                          
                        lhArr.push( hotspot_sprite_top)

                            for(let i=0;i<lhModal.children.length;i++){
               
         
                        if(lhModal.children[i].name=="LH_switch_headlamp_hot"){
                            lhModal.children[i].userData.button=  hotspots_top[a].subSectionVedio[i]?.title
                       
                        }
                    if(lhModal.children[i].name=="LH_switch_horn_hot"){
                            lhModal.children[i].userData.button=  hotspots_top[a].subSectionVedio[i]?.title
                        }
                        if(lhModal.children[i].name=="LH_switch_indicator_hot"){
                            lhModal.children[i].userData.button=  hotspots_top[a].subSectionVedio[i]?.title
                       
                        }
            }
                    }
                     if(hotspots_top[a].subSectionVedio[i]?.class=="RH_MODULE"){
                        rhArr.push( hotspot_sprite_top)
                           for(let i=0;i<rhModal.children.length;i++){
               
               
                 if(rhModal.children[i].name=="RH_switch_enginestop_hot"){
                     console.log("title",hotspots_top[a].subSectionVedio[i]?.title)
                    rhModal.children[i].userData.button="Engine Switch"
                     
                }
               if(rhModal.children[i].name=="RH_switch_estart_hot"){
                    console.log("title2",hotspots_top[a].subSectionVedio[i]?.title)
                    rhModal.children[i].userData.button="E-Start Switch"
                    
                }
                if(rhModal.children[i].name=="RH_switch_hazard_hot"){
                     console.log("title3",hotspots_top[a].subSectionVedio[i]?.title)
                    rhModal.children[i].userData.button="Hazard Switch"
                }
               
            }
                     }
                    // hotspotMarkers_top.push( hotspot_sprite_top )
                    scene.add( hotspot_sprite_top )
                    combineMarkers.push( hotspot_sprite_top )
                    
                    const hotspotsPos_top = document.createElement('div') as HTMLDivElement
                    hotspotsPos_top.className = 'hotspotsPosTop'
                    hotspotsPos_top.id = hotspots_top[a].subSectionVedio[i]?.id
                    document.body.appendChild(hotspotsPos_top)
                    

                    const hotspotsPos = new CSS2DObject( hotspotsPos_top )
                  
                    hotspotsPos.position.copy( hotspots_top[a].subSectionVedio[i]?.lookAt )
                    label.push( hotspotsPos )
                    const hotspotsLabel_top = document.createElement( 'div' )
                    hotspotsLabel_top.className = 'hotspotsLabel'
                  
                    hotspotsLabel_top.innerHTML = hotspots_top[a].subSectionVedio[i].title
                
                    hotspotsPos_top.appendChild( hotspotsLabel_top )
                 
                    hotspots_top[a].descriptionDomElement = hotspotsLabel_top
                    test.push(hotspotsPos_top)
                  
                     }   
                   
                  

                    }
                   
               

                })
            }

            let hoverData = document.querySelectorAll(".hotspotsButton")!
            
                 
            for(let i=0;i<hoverData.length;i++) {
                hoverData[i].addEventListener("mouseover", function( event ) {
                   
                   
                    for(let j=0;j<hotspotMarkers_top.length;j++) {
                if(hoverData[i].innerHTML==hotspotMarkers_top[j].name){
                   
                       
                            hotspotMarkers_top[j].scale.set(0.015, 0.015, 0.015)
                        render()
                       
                       
                    }
                    }
                   
                } , false);
                 hoverData[i].addEventListener("mouseleave", function( event ) {
                       for(let j=0;j<hotspotMarkers_top.length;j++) {
                        hotspotMarkers_top[j].scale.set(0.012, 0.012, 0.012)
                         render()
                       }
                   
                } , false);
            }                  
        }

        //JsonParser Right View
        hotspots_right_Download.onreadystatechange = function () {
            if ( hotspots_right_Download.readyState === 4 ) {
                hotspots_right = JSON.parse( hotspots_right_Download.responseText )
                const ul_right = document.createElement( 'UL') as HTMLUListElement
                 ul_right.style.padding="0px"
                const ulElem_right = hotspots_list_right_Element.appendChild( ul_right )

                hotspots_list_right_Element.style.display="none"

                Object.keys ( hotspots_right ).forEach( (a) => {
                    const li_right = document.createElement( 'UL' ) as HTMLLIElement
                    li_right.style.padding="0px"
                    const liElem_right = ulElem_right.appendChild( li_right )
                    const button_right = document.createElement( 'BUTTON' ) as HTMLButtonElement
                    // button.innerHTML = a + ' : ' + hotspots_right[a].title
                    button_right.innerHTML = hotspots_right[a].title
                    button_right.className = 'hotspotsButtonRight'

                    button_right.addEventListener('click', function () {
                        if(isswitchView){
                         gotoAnnotation( hotspots_right[a],undefined )
                        }
                        
                    })

                    liElem_right.appendChild( button_right )

                    //Sprite Material
                    const hotspot_sprite_Material_right = new THREE.SpriteMaterial ({
                        map: hotspot_sprite,
                        depthTest: false,
                        depthWrite: false,
                        sizeAttenuation: false,
                    })

                    //Sprite Mesh
                    const hotspot_sprite_right = new THREE.Sprite( hotspot_sprite_Material_right )
                    hotspot_sprite_right.scale.set( 0.012, 0.012, 0.012 )
                    hotspot_sprite_right.position.copy( hotspots_right[a].lookAt )
                    hotspot_sprite_right.name=hotspots_right[a].title
                    hotspot_sprite_right.userData.id = a
                    hotspot_sprite_right.visible = false
                    
                  

                    scene.add( hotspot_sprite_right )
                 

                    hotspotMarkers_Right.push( hotspot_sprite_right )
                    combineMarkers.push( hotspot_sprite_right )
               


                    detail_close.addEventListener("click",crossCamPos)

                })
            }

            let hoverData=document.querySelectorAll(".hotspotsButtonRight")!
                            
            for(let i=0;i<hoverData.length;i++) {
                hoverData[i].addEventListener("mouseover", function( event ) {
                    if(hoverData[i].innerHTML==hotspotMarkers_Right[i].name){
                        hotspotMarkers_Right[i].scale.set(0.015, 0.015, 0.015)
                        render()
                    }
                } , false);
                hoverData[i].addEventListener("mouseleave", function( event ) {
                    hotspotMarkers_Right[i].scale.set(0.012, 0.012, 0.012)
                    render()
                } , false);
            }                  
        }

        //JsonParser Left View
        hotspots_left_Download.onreadystatechange = function () {
            if ( hotspots_left_Download.readyState === 4 ) {
                hotspots_left = JSON.parse( hotspots_left_Download.responseText )
                
                const ul_left = document.createElement('UL') as HTMLUListElement
                ul_left.style.padding="0px"
                const ulElem_left = hotspots_list_left_Element.appendChild( ul_left )

                hotspots_list_left_Element.style.display="none"

                Object.keys( hotspots_left ).forEach( (a) => {
                    
                    const li_left = document.createElement( 'UL' ) as HTMLLIElement
                     li_left.style.padding="0px"
                    const liElem_left = ulElem_left.appendChild( li_left )
                    const button_left = document.createElement( 'BUTTON' ) as HTMLButtonElement
                    // button.innerHTML = a + ' : ' + hotspots_right[a].title
                    button_left.innerHTML = hotspots_left[a].title
                    button_left.className = 'hotspotsButtonLeft'

                    button_left.addEventListener( 'click', function () {
                        if(isswitchView){
                          gotoAnnotation( hotspots_left[a],undefined )
                        }
                      
                    })

                    liElem_left.appendChild( button_left )

                    //Sprite Material
                    const hotspot_sprite_Material_left = new THREE.SpriteMaterial ({
                        map: hotspot_sprite,
                        depthTest: false,
                        depthWrite: false,
                        sizeAttenuation: false,
                    })

                    //Sprite Mesh
                    const hotspot_sprite_left = new THREE.Sprite( hotspot_sprite_Material_left )
                    hotspot_sprite_left.scale.set(0.012, 0.012, 0.012)
                    hotspot_sprite_left.position.copy(hotspots_left[a].lookAt)
                    hotspot_sprite_left.name=hotspots_left[a].title
                    hotspot_sprite_left.userData.id = a
                    hotspot_sprite_left.visible = false
                  

                    scene.add( hotspot_sprite_left )
                 

                    hotspotMarkers_Left.push( hotspot_sprite_left )
                    combineMarkers.push( hotspot_sprite_left )
                   
                     detail_close.addEventListener("click",crossCamPos)
                  
                })
            }

            let hoverData=document.querySelectorAll(".hotspotsButtonLeft")!
                            
             for(let i=0;i<hoverData.length;i++) {
                hoverData[i].addEventListener("mouseover", function( event ) {
                    if(hoverData[i].innerHTML==hotspotMarkers_Left[i].name){
                        hotspotMarkers_Left[i].scale.set(0.015, 0.015, 0.015)
                        render()
                    }
                } , false);
                hoverData[i].addEventListener("mouseleave", function( event ) {
                    hotspotMarkers_Left[i].scale.set(0.012, 0.012, 0.012)
                    render()
                } , false);
            }         
        }
        hotspots_right_Download.send()
        hotspots_top_Download.send()
        hotspots_left_Download.send()
        
         scene.add(Scram411);
         mixer = new THREE.AnimationMixer( gltf.scene );
         mixer.loop= THREE.LoopPingPong
         clips = gltf.animations;
        mainModel=Scram411.children
        switchButton.style.display="none"
 
            
        },
        (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                
        },
        (error) => {
                console.log('An error happened')
        })
    }}
resources_Download.send()
}





/**
 * Test Mesh
 */
const box = new THREE.BoxBufferGeometry
const mat = new THREE.MeshStandardMaterial
const boxx = new THREE.Mesh(box,mat)
// scene.add(boxx)


/**
 * Buttons
 */
//ToScreen Position
function toScreenPosition(obj:any) {
    var vector = new THREE.Vector3()

    // TODO: need to update this when resize window
    var widthHalf =  windowsizes.width
    var heightHalf =  windowsizes.height

    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld)
    camera.updateMatrixWorld(); 
    vector.project(camera)
    vector.x = (vector.x + 1) / 2 * widthHalf;
    vector.y = -(vector.y - 1) / 2 * heightHalf;

    return { 
        x: vector.x,
        y: vector.y
    }
    
}

//Hotspot Visiblity
const showHotspot = () => {
   if(topView){
        for(let i=0;i<hotspotMarkers_top.length;i++){
      if(hotspotMarkers_top[i].userData.subSection==false){
         
        hotspotMarkers_top[i].visible=true
        hotspotVisible=true
      }
    }
   }
    if(rightView){
        for(let i=0;i<hotspotMarkers_Right.length;i++){
      
        hotspotMarkers_Right[i].visible=true
        hotspotVisible=true
    }
   }
   if(leftView){
        for(let i=0;i<hotspotMarkers_Left.length;i++){
      
        hotspotMarkers_Left[i].visible=true
        hotspotVisible=true
    }
   }
}

const hideHotspot = () => {
     for(let i=0;i<lhArr.length;i++){
                lhArr[i].visible=false;
                render()
            }
        
         
            for(let i=0;i<lhArr.length;i++){
                rhArr[i].visible=false;
                render()
            }
        for(let i=0;i<hotspotMarkers_top.length;i++){
        
        hotspotMarkers_top[i].visible=false
        hotspotVisible=false}
    
   
    
        for(let i=0;i<hotspotMarkers_Right.length;i++){
       
        hotspotMarkers_Right[i].visible=false
        hotspotVisible=false}
   
   
        for(let i=0;i<hotspotMarkers_Left.length;i++){
       
        hotspotMarkers_Left[i].visible=false
        hotspotVisible=false}
   
}

//Reset CamPos
const resetCamPos=()=>{
    
   
     for(let i=0;i<outlineArray.length;i++){
         outlineArray.pop()
     }
     
          
     hideHotspot()
     
     hotspots_list_top_Element.style.display="none"
     hotspots_head_Element.style.display="none"
     
      
       
            hideHotspot()
            
            hotspots_list_right_Element.style.display="none"
            hotspots_head_Element.style.display="none"
     
    
            hideHotspot()
            
            hotspots_list_left_Element.style.display="none"
            hotspots_head_Element.style.display="none"
     
    
        controls.target.set( 0, 0.6, 0 )
    // controls.target.set(0, 0.6, 0)

      new TWEEN.Tween(camera.position)
            .to(
                {
                    x: -0.370,
                    y:  2.143,
                    z: 5.557,
                },
                1200
            )
            .easing(TWEEN.Easing.Cubic.Out)
            .onStart(() => {
	
        menu_view_Element.style.display = 'none'

        controls.maxAzimuthAngle = Infinity
        controls.minAzimuthAngle = Infinity

       controls.enabled = false;
	   })
       .onComplete(() => {
	
           menu_view_Element.style.display = 'block'
        controls.enabled = true;
        isswitchView=true
	})
            .start()
}

const crossCamPos=()=>{
   
   
      
    let parent= document.querySelectorAll(".hotspotsLabel")!
    for(let i=0;i<parent.length;i++){
        //@ts-ignore
        parent[i].style.display="none" 
    }

    globalbutton.checked=false
    subactive=false
     showHover=false
     switchglobal=null
     animationPlay=false
     lhanimationPlay=false
     rhanimationPlay=false
     lhswithModal=false;
     rhswithModal=false
    
     mixer?.stopAllAction()
   
     lhmixer?.stopAllAction()
  
     rhmixer?.stopAllAction()
     switchButton.style.display="none"
     
    if(topView){
              const button=document.querySelectorAll(".hotspotsButton")!
       for(let i=0;i<button.length;i++){
           //@ts-ignore
           
           
               button[i].classList.remove("selected")
           
       }
            for(let i=0;i<lhArr.length;i++){
                lhArr[i].visible=false;
                render()
            }
        
         
            for(let i=0;i<lhArr.length;i++){
                rhArr[i].visible=false;
                render()
            }
        
        for(let i=0;i<hotspotMarkers_top.length;i++){
          
               hotspotMarkers_top[i].visible=true
           
            
        }
     
      
    }
    if(rightView){
              const button=document.querySelectorAll(".hotspotsButtonRight")!
       for(let i=0;i<button.length;i++){
           //@ts-ignore
           
           
               button[i].classList.remove("selected")
           
       }
         for(let i=0;i<hotspotMarkers_Right.length;i++){
            
                hotspotMarkers_Right[i].visible=true
                
            
        }
    }
    if(leftView){
              const button=document.querySelectorAll(".hotspotsButtonLeft")!
       for(let i=0;i<button.length;i++){
           //@ts-ignore
           
           
               button[i].classList.remove("selected")
           
       }
         for(let i=0;i<hotspotMarkers_Left.length;i++){
            
                hotspotMarkers_Left[i].visible=true
               
            
        }
    }

    menu_view_Element.style.display = 'block'
  
     for(let i=0;i<=outlineArray.length+1;i++){
      
         outlineArray.pop()
     }
    prevSelected=null
    
     let cameraTarget:any;
     let tweenTarget:any
     if(topView){
      cameraTarget= new Vector3(-0.38,1.1,0)
      tweenTarget=new Vector3( 1.847,2.765,-0.024 )
     }
    if(leftView){
      cameraTarget= new Vector3( 0, 0.6, 0)
      tweenTarget=new Vector3( 0.038,0.932,5.793 )
     }
     if(rightView){
      cameraTarget= new Vector3( 0, 0.6, 0)
      tweenTarget=new Vector3( -0.038,0.932,-5.793 )
     }
       detail_vedio.pause()
       detailContainer.style.visibility="hidden"
       detail_loader.style.visibility="hidden"
       detail_vedio.style.visibility = 'hidden'
       detail_close.style.visibility = 'hidden'
      
    //  if(topView){
    //    detail_vedio.pause()
    //    detailContainer.style.visibility="hidden"
    //    detail_loader.style.visibility="hidden"
    //    detail_vedio.style.visibility = 'hidden'
    // // for(let i=0;i<topVed.length;i++){
    // //   topVed[i].pause()
    // //  }
    // //      Object.keys(hotspots_top).forEach((annotation) => {
        
    // //     if (hotspots_top[annotation].descriptionDomElement) {
            
    // //         (hotspots_top[annotation].descriptionDomElement as HTMLElement).style.display = 'none',
    // //         (hotspots_top[annotation].descriptionDomElementImg as HTMLElement).style.display = 'none',
    // //         (hotspots_top[annotation].annotationCloseDiv as HTMLElement).style.display = 'none',
    // //         (hotspots_top[annotation].annotationFullDiv as HTMLElement).style.display = 'none'
    // //         // (document.getElementById('hotspotsPanel') as HTMLElement).style.display = 'none'
    // //     }
    // // })
    //  }
    //  if(rightView){
    //       cameraTarget.set(  0, 0.6, 0 )
    //       tweenTarget.set( -0.038,0.932,-5.793 )
    //       for(let i=0;i<rightVed.length;i++){
    //       rightVed[i].pause()
    //      }
    //         Object.keys(hotspots_right).forEach((annotation) => {
                    
    //                 if (hotspots_right[annotation].descriptionDomElement) {
                        
    //                     ;(hotspots_right[annotation].descriptionDomElement as HTMLElement).style.display = 'none',
    //                     (hotspots_right[annotation].descriptionDomElementImg as HTMLElement).style.display = 'none',
    //                     (hotspots_right[annotation].annotationCloseDiv as HTMLElement).style.display = 'none',
    //                     (hotspots_right[annotation].annotationFullDiv as HTMLElement).style.display = 'none'
    //                     // (document.getElementById('hotspotsPanel') as HTMLElement).style.display = 'none'
    //                 }
    //             })
    //  }
    //   if(leftView){
    //      cameraTarget.set( 0, 0.6, 0 )
    //      tweenTarget.set( 0.038,0.932,5.793 )
    //        for(let i=0;i<leftVed.length;i++){
    //        leftVed[i].pause()
    //        }
    //     Object.keys(hotspots_left).forEach((annotation) => {
                
    //             if (hotspots_left[annotation].descriptionDomElement) {
                    
    //                 ;(hotspots_left[annotation].descriptionDomElement as HTMLElement).style.display = 'none',
    //                 (hotspots_left[annotation].descriptionDomElementImg as HTMLElement).style.display = 'none',
    //                 (hotspots_left[annotation].annotationCloseDiv as HTMLElement).style.display = 'none',
    //                  (hotspots_left[annotation].annotationFullDiv as HTMLElement).style.display = 'none'
    //                 // (document.getElementById('hotspotsPanel') as HTMLElement).style.display = 'none'
    //             }
    //         })
    //  }
    
    //  hideHotspot()
     
    //  hotspots_list_top_Element.style.display="none"
    //  hotspots_head_Element.style.display="none"
     controls.target.set(cameraTarget.x,cameraTarget.y,cameraTarget.z)
     camera.position.set(tweenTarget.x,tweenTarget.y,tweenTarget.z)
     menu_view_Element.style.display = 'block'
             controls.enabled = true;

    //   new TWEEN.Tween(camera.position)
    //         .to(
    //                 x: tweenTarget.x,
    //             {
    //                 y: tweenTarget.y,
    //                 z: tweenTarget.z,
    //             },
    //             1200
    //         )
    //         .easing(TWEEN.Easing.Cubic.Out)
    //         .onStart(() => {
	//           menu_view_Element.style.display = 'none'
    //           controls.enabled = false;
	//           })
    //         .onComplete(() => {
	// 	     menu_view_Element.style.display = 'block'
    //          controls.enabled = true;
	//          })
    //         .start()
    // for(let i=0;i<markers.length;i++){
    //      markers.pop()
    //  }
}
const closeAll=()=>{
       for(let i=0;i<outlineArray.length;i++){
         outlineArray.pop()
     }
       
       
     hideHotspot()
     
     hotspots_list_top_Element.style.display="none"
     hotspots_head_Element.style.display="none"
     
      
        
            hideHotspot()
            
            hotspots_list_right_Element.style.display="none"
            hotspots_head_Element.style.display="none"
     
    
       
            hideHotspot()
            
            hotspots_list_left_Element.style.display="none"
            hotspots_head_Element.style.display="none"
}
const closeAllSideBar=()=>{
    hideHotspot()
    
    hotspots_list_top_Element.style.display = "none" 
    hotspots_list_left_Element.style.display = "none" 
    hotspots_list_right_Element.style.display = "none" 
    
     hotspots_head_Element.style.display = "none" 
}
let isswitchView=true
//Top View Button
view_top_BTN.addEventListener("click",(e)=>{
    if(!topView){
        if(isswitchView){
   for(let i=0;i<combineMarkers.length;i++){
      
                combineMarkers[i].scale.set(0.012,0.012,0.012)
                 render()
            }
           showHover=false
    prevSelected=null
     view_reset_BTN.style.display="block" 
       switchButton.style.display="none"
    viewSlected=true
    topView=true;
    leftView=false;
    rightView=false;
    closeAllSideBar()
    hideHotspot()
    closeAll()
    globalbutton.checked=false
    // buttonText.innerHTML="ON"
    // buttonActive=false;
    if (hotspots_list_top_Element.style.display == "block" ) {
        hotspots_list_top_Element.style.display = "block" 
        hotspots_head_Element.style.display = "block" 
        camera.position.set(1.847,2.765,-0.024)
        controls.target.set(-0.38,1.1,0)
        controls.maxAzimuthAngle = Infinity
        controls.minAzimuthAngle = Infinity

    } else {
        hotspots_list_top_Element.style.display = "block" 
        hotspots_head_Element.style.display = "block" 
        camera.position.set(1.847,2.765,-0.024)
        controls.target.set( -0.38,1.1,0 )
        controls.maxAzimuthAngle = Infinity
        controls.minAzimuthAngle = Infinity
    }
     viewHeader.innerHTML = "TOP VIEW"
     viewHeader.style.marginRight="1.5em"

     showHotspot()
     
    view_top_BTN.style.backgroundColor = "#d3a118"
     view_left_BTN.style.backgroundColor = ""
      view_right_BTN.style.backgroundColor = ""
    }
     
    }
})

view_mob_top_BTN.addEventListener("click",(e)=>{
   if(!topView){
        showHover=false
    if(isswitchView){
          if(window.innerWidth>window.innerHeight){
            scrollParent.style.visibility="hidden";

        }else{
          scrollParent.style.visibility="hidden";
        }
        hotspots_list_top_Element.scrollLeft=0
       hotspots_list_left_Element.scrollLeft=0
       hotspots_list_right_Element.scrollLeft=0
       detailContainer.style.visibility="hidden"
       detail_loader.style.visibility="hidden"
       detail_vedio.style.visibility = 'hidden'
       detail_close.style.visibility = 'hidden'
       scrollMessage.style.display="none";
       
       

     prevSelected=null
     switchButton.style.display="none"
    // buttonText.innerHTML="ON"
    // buttonActive=false;
      globalbutton.checked=false
    topView=true;
    leftView=false;
    rightView=false;
    closeAllSideBar()
    hideHotspot()
    closeAll() 
    viewSlected=true
    if (hotspots_list_top_Element.style.display == "block" ) {
        hotspots_list_top_Element.style.display = "none" 
        hotspots_head_Element.style.display = "none" 
        camera.position.set(1.847,2.765,-0.024)
        controls.target.set(-0.38,1.1,0)
        controls.maxAzimuthAngle = Infinity
        controls.minAzimuthAngle = Infinity
    } else {
        hotspots_list_top_Element.style.display = "none" 
        hotspots_head_Element.style.display = "none" 
        camera.position.set(1.847,2.765,-0.024)
        controls.target.set( -0.38,1.1,0 )
        controls.maxAzimuthAngle = Infinity
        controls.minAzimuthAngle = Infinity
    }
    viewHeader.innerHTML = "TOP VIEW"
        showHotspot()
      viewHeader.style.marginRight="unset"
      view_mob_top_BTN.style.color="#ffb200"
      view_mob_left_BTN.style.color="#f5f5f5"
      view_mob_right_BTN.style.color="#f5f5f5"
    }
   }
  
})

//Left View Button
view_left_BTN.addEventListener("click",(e)=>{
if(!leftView){
        showHover=false
    if(isswitchView){
 for(let i=0;i<combineMarkers.length;i++){
      
                combineMarkers[i].scale.set(0.012,0.012,0.012)
                render()
            }
     prevSelected=null
     view_reset_BTN.style.display="block" 
       switchButton.style.display="none"
     viewSlected=true
    //  buttonText.innerHTML="ON"
      globalbutton.checked=false
    buttonActive=false;
    topView=false;
    leftView=true;
    rightView=false;
    hideHotspot()
    closeAllSideBar()
     closeAll()
    
    if ( hotspots_list_left_Element.style.display == "block" ) {
        hotspots_list_left_Element.style.display = "block" 
        hotspots_head_Element.style.display = "block" 
        camera.position.set( 0.038,0.932,5.793)
        controls.target.set( 0, 0.6, 0 )
        controls.maxAzimuthAngle = Math.PI/2 - .5
        controls.minAzimuthAngle = -Math.PI/2 + .5
    } else {
        hotspots_list_left_Element.style.display = "block" 
        hotspots_head_Element.style.display = "block" 
        camera.position.set( 0.038,0.932,5.793)
        controls.target.set( 0, 0.6, 0 )
        controls.maxAzimuthAngle = Math.PI/2 - .5
        controls.minAzimuthAngle = -Math.PI/2 + .5
    }
    
viewHeader.innerHTML = "LEFT VIEW"
  viewHeader.style.marginRight=" 1.2em"
  view_top_BTN.style.backgroundColor = ""
     view_left_BTN.style.backgroundColor = "#d3a118"
     view_right_BTN.style.backgroundColor = ""
    showHotspot()
    }
}
    
})
view_mob_left_BTN.addEventListener("click",(e)=>{
if(!leftView){
        showHover=false
    
    if(isswitchView){
          if(window.innerWidth>window.innerHeight){
            scrollParent.style.visibility="hidden";

        }else{
          scrollParent.style.visibility="hidden";
        }
        hotspots_list_top_Element.scrollLeft=0
       hotspots_list_left_Element.scrollLeft=0
       hotspots_list_right_Element.scrollLeft=0

 detailContainer.style.visibility="hidden"
       detail_loader.style.visibility="hidden"
       detail_vedio.style.visibility = 'hidden'
       detail_close.style.visibility = 'hidden'
        scrollMessage.style.display="none";
         
     prevSelected=null
     switchButton.style.display="none"
     viewSlected=true
    //  buttonText.innerHTML="ON"
      globalbutton.checked=false
    buttonActive=false;
    topView=false;
    leftView=true;
    rightView=false;
    hideHotspot()
    closeAllSideBar()
     closeAll()
    
    if ( hotspots_list_left_Element.style.display == "block" ) {
        hotspots_list_left_Element.style.display = "none" 
        hotspots_head_Element.style.display = "none" 
        camera.position.set( 0.038,0.932,5.793)
        controls.target.set( 0, 0.6, 0 )
        controls.maxAzimuthAngle = Math.PI/2 - .5
        controls.minAzimuthAngle = -Math.PI/2 + .5
    } else {
        hotspots_list_left_Element.style.display = "none" 
        hotspots_head_Element.style.display = "none" 
        camera.position.set( 0.038,0.932,5.793)
        controls.target.set( 0, 0.6, 0 )
        controls.maxAzimuthAngle = Math.PI/2 - .5
        controls.minAzimuthAngle = -Math.PI/2 + .5
    }
 
viewHeader.innerHTML = "LEFT VIEW"
  viewHeader.style.marginRight="unset"
    showHotspot()
    
      view_mob_left_BTN.style.color="#ffb200"
        view_mob_top_BTN.style.color="#f5f5f5"
      view_mob_right_BTN.style.color="#f5f5f5"
    }
}
    
})

//Right View Button
view_right_BTN.addEventListener("click",(e)=>{
  if(!rightView){
        showHover=false
    if(isswitchView){
       for(let i=0;i<combineMarkers.length;i++){
      
                combineMarkers[i].scale.set(0.012,0.012,0.012)
                render()
            }
     detailContainer.style.visibility="hidden"
       detail_loader.style.visibility="hidden"
       detail_vedio.style.visibility = 'hidden'
       detail_close.style.visibility = 'hidden'
     prevSelected=null
    view_reset_BTN.style.display="block" 
     viewSlected=true
    //  buttonText.innerHTML="ON"
      globalbutton.checked=false
    buttonActive=false;
    topView=false;
    leftView=false;
    rightView=true;
    closeAllSideBar()
    hideHotspot()
    closeAll()
    if (hotspots_list_right_Element.style.display == "block" ) {
        hotspots_list_right_Element.style.display = "block" 
        hotspots_head_Element.style.display = "block" 
        camera.position.set( -0.038,0.932,-5.793)
        controls.target.set( 0, 0.6, 0 )
        controls.maxAzimuthAngle = -Math.PI/2 - .5
        controls.minAzimuthAngle = +Math.PI/2 + .5
    } else {
        hotspots_list_right_Element.style.display = "block" 
        hotspots_head_Element.style.display = "block" 
        camera.position.set( -0.038,0.932,-5.793)
        controls.target.set( 0, 0.6, 0 )
        controls.maxAzimuthAngle = -Math.PI/2 - .5
        controls.minAzimuthAngle = +Math.PI/2 + .5
    }
   
viewHeader.innerHTML = "RIGHT VIEW"
  viewHeader.style.marginRight="1em"
    switchButton.style.display="none"
   showHotspot()
    view_top_BTN.style.backgroundColor = ""
     view_left_BTN.style.backgroundColor = ""
      view_right_BTN.style.backgroundColor = "#d3a118"   
    }
  }
   
})
view_mob_right_BTN.addEventListener("click",(e)=>{
if(!rightView){
        showHover=false
    if(isswitchView){
        if(window.innerWidth>window.innerHeight){
            scrollParent.style.visibility="hidden";

        }else{
          scrollParent.style.visibility="hidden";
        }
        hotspots_list_top_Element.scrollLeft=0
       hotspots_list_left_Element.scrollLeft=0
       hotspots_list_right_Element.scrollLeft=0
       detailContainer.style.visibility="hidden"
       detail_loader.style.visibility="hidden"
       detail_vedio.style.visibility = 'hidden'
       detail_close.style.visibility = 'hidden'
        scrollMessage.style.display="none"
         
     prevSelected=null
    switchButton.style.display="none"
     viewSlected=true
    topView=false;
    //  buttonText.innerHTML="ON"
    // buttonActive=false;
       globalbutton.checked=false
    leftView=false;
    rightView=true;
    closeAllSideBar()
    hideHotspot()
    closeAll()
    if (hotspots_list_right_Element.style.display == "block" ) {
        hotspots_list_right_Element.style.display = "none" 
        hotspots_head_Element.style.display = "none" 
        camera.position.set( -0.038,0.932,-5.793)
        controls.target.set( 0, 0.6, 0 )
        controls.maxAzimuthAngle = -Math.PI/2 - .5
        controls.minAzimuthAngle = Math.PI/2 + .5
    } else {
        hotspots_list_right_Element.style.display = "none" 
        hotspots_head_Element.style.display = "none" 
        camera.position.set( -0.038,0.932,-5.793)
        controls.target.set( 0, 0.6, 0 )
        controls.maxAzimuthAngle = -Math.PI/2 - .5
        controls.minAzimuthAngle = Math.PI/2 + .5
    }
   viewHeader.innerHTML = "RIGHT VIEW"
  viewHeader.style.marginRight="unset"
   showHotspot()
    view_mob_top_BTN.style.color="#f5f5f5"
    view_mob_left_BTN.style.color="#f5f5f5"
    view_mob_right_BTN.style.color="#ffb200"
    }
}
    
})

//Reset View Button
view_reset_BTN.addEventListener("click",(e)=>{
       showHover=false
     isswitchView=false
      for(let i=0;i<combineMarkers.length;i++){
      
                combineMarkers[i].scale.set(0.012,0.012,0.012)
                render()
            }
            
       detailContainer.style.visibility="hidden"
       detail_loader.style.visibility="hidden"
       detail_vedio.style.visibility = 'hidden'
       detail_close.style.visibility = 'hidden'
       prevSelected=null
  
    // buttonText.innerHTML="OFF"
    // buttonActive=true;
      globalbutton.checked=false
    topView=false;
    leftView=false;
    rightView=false;
    closeAllSideBar()
    hideHotspot()
    viewSlected=false
    if( hotspots_list_top_Element.style.display=="block"||hotspots_list_right_Element.style.display=="block"||hotspots_list_left_Element.style.display=="block" ) {
        // hotspots_list_top_Element.style.display="none" 
        // hotspots_head_Element.style.display="none" 
        // camera.position.set( -1.766, 0.953, 1.554 )
        // controls.target.set(0, 0.6, 0)
        resetCamPos ()
    } else {
        // hotspots_list_top_Element.style.display="none" 
        // hotspots_head_Element.style.display="none" 
        // camera.position.set( -1.766, 0.953, 1.554 )
        // controls.target.set(0, 0.6, 0)
        resetCamPos ()
    }
   

    if ( hotspotVisible ){
        hideHotspot()

    } else {
        hideHotspot()

    }
    switchButton.style.display="none"
     view_top_BTN.style.backgroundColor = ""
     view_left_BTN.style.backgroundColor = ""
     view_right_BTN.style.backgroundColor = ""
    view_reset_BTN.style.display="none"
})
view_mob_reset_BTN.addEventListener("click",(e)=>{
   if(isswitchView){
        isswitchView=false
        hotspots_list_top_Element.scrollLeft=0
        hotspots_list_left_Element.scrollLeft=0
        hotspots_list_right_Element.scrollLeft=0
       detailContainer.style.visibility="hidden"
       detail_loader.style.visibility="hidden"
       detail_vedio.style.visibility = 'hidden'
       detail_close.style.visibility = 'hidden'
       scrollMessage.style.display="none"
        scrollParent.style.visibility="hidden";
       
       prevSelected=null
    //  buttonText.innerHTML="OFF"
    //  buttonActive=true;
    globalbutton.checked=false
    switchButton.style.display="none"
    topView=false;
    leftView=false;
    rightView=false;
     viewSlected=false
    closeAllSideBar()
    hideHotspot()
     view_mob_top_BTN.style.color="#f5f5f5"
    view_mob_left_BTN.style.color="#f5f5f5"
    view_mob_right_BTN.style.color="#f5f5f5"
    if( hotspots_list_top_Element.style.display=="block"||hotspots_list_right_Element.style.display=="block"||hotspots_list_left_Element.style.display=="block" ) {
        // hotspots_list_top_Element.style.display="none" 
        // hotspots_head_Element.style.display="none" 
        // camera.position.set( -1.766, 0.953, 1.554 )
        // controls.target.set(0, 0.6, 0)
        resetCamPos ()
    } else {
        // hotspots_list_top_Element.style.display="none" 
        // hotspots_head_Element.style.display="none" 
        // camera.position.set( -1.766, 0.953, 1.554 )
        // controls.target.set(0, 0.6, 0)
        resetCamPos ()
    }
 

    if ( hotspotVisible ){
        hideHotspot()

    } else {
        hideHotspot()

    }
   }
  
})


/**
 * Raycast
 */

//inputs
let t:any;
const changeVedioSorce=(name:any,rare:any) =>{
    console.log("name",name)
     isswitchView=false
       const hotspotsButton = document.querySelectorAll(".hotspotsButton")

const hotspotsButtonLeft = document.querySelectorAll(".hotspotsButtonLeft" ) 
const hotspotsButtonRight =document.querySelectorAll(".hotspotsButtonRight")
    hotspotsButtonRight.forEach((a:any)=>{a.style.color="grey"; a.style.pointerEvents="none"})
    hotspotsButton.forEach((a:any)=>{a.style.color="grey";  a.style.pointerEvents="none"})
    hotspotsButtonLeft.forEach((a:any)=>{a.style.color="grey";  a.style.pointerEvents="none"})
    
    if(prevSelected==null){
        return
    }
  
    if(prevSelected?.subSection==true){
       detail_vedio.pause()
        
       detailContainer.style.visibility="hidden"
       detail_loader.style.visibility="hidden"
       detail_vedio.style.visibility = 'hidden'
       detail_close.style.visibility = 'hidden'
       
      
       detailContainer.style.visibility="visible"
       detail_loader.style.visibility="visible"
        for(let j=0;j<prevSelected.subSectionVedio.length;j++){
             if(name==prevSelected.subSectionVedio[j].id){
            detail_title.innerHTML=prevSelected.subSectionVedio[j].title
                    // @ts-ignore
                    detail_vedio.childNodes[1].src=prevSelected.subSectionVedio[j].hotspots_preview
                      loading_thumbnail.src=prevSelected.subSectionVedio[j]?.thumbnail
                     
                    setTimeout(() =>{
                        detail_vedio.load();
                        // detail_vedio.play()
                      t=  setTimeout(() =>{
                        detail_loader.style.visibility="hidden"
                        detail_vedio.style.visibility = 'visible'
                        detail_close.style.visibility = 'visible'

                        },300)
                        hotspotsButtonRight.forEach((a:any)=>{a.style.color="white"; a.style.pointerEvents="all"})
                        hotspotsButton.forEach((a:any)=>{a.style.color="white";a.style.pointerEvents="all"})
                        hotspotsButtonLeft.forEach((a:any)=>{a.style.color="white";a.style.pointerEvents="all"})
                        isswitchView=true
                    },1500)
             }
        
        }
      
     
      
        } 

        
            
    if(lhanimation){
    lhmixer?.stopAllAction()
    lhanimation=false
    }
    if(rhanimation){
    rhmixer?.stopAllAction()
    rhanimation=false
    }
       
            lhanimationPlay=false  
            rhanimationPlay=false
            animationPlay=false
   
          if(rare.userData.animation){
              
            if(rare.userData.class=="LH_MODULE"){
                
          for(let i=0;i<lhArr.length;i++){
         
              if(rare.userData.button==lhArr[i].name){
                  console.log("name",rare.userData.button,lhArr[i].name)
            lhArr[i].visible=false;
                render()
              }
               else{
                   lhArr[i].visible=true;
               }
            }
                 lhmixer?.stopAllAction()
            
                lhanimationPlay=true
                lhanimation=true
                console.log("running",lhclips) 
            let  lhclip = THREE.AnimationClip.findByName( lhclips, rare.userData.animation);
            
                lhaction = lhmixer.clipAction( lhclip );
                lhaction.play()
                console.log("run",lhaction,lhmixer)
        
        //  setTimeout(() =>{   lhaction.play();},2000)  
            }
               if(rare.userData.class=="RH_MODULE"){
                    rhmixer?.stopAllAction()
                     for(let i=0;i<rhArr.length;i++){
         
              if(rare.userData.button==rhArr[i].name){
                  console.log("name",rare.userData.button,rhArr[i].name)
            rhArr[i].visible=false;
                render()
              }
               else{
                   rhArr[i].visible=true;
               }
            }
              
        rhanimationPlay=true
         rhanimation=true
     
      let  rhclip = THREE.AnimationClip.findByName( rhclips, rare.userData.animation);
     
         rhaction = rhmixer.clipAction( rhclip );
          console.log("runr",rhaction,rhmixer,rhclips)
            console.log("running",rare.userData,rhclip,rhaction)
          rhaction.play()
        //  setTimeout(() =>{   lhaction.play();},2000)  
            }
        
      return
            }else{
                rhanimation=true
                 lhmixer?.stopAllAction()
                  rhmixer?.stopAllAction()
                lhanimationPlay=false;
                rhanimationPlay=false
            }
    }
    

var  timerId:any;
var  debounceFunction  =  function (func:any, delay:any) {
	// Cancels the setTimeout method execution
	clearTimeout(timerId)

	// Executes the func after delay time.
	timerId  =  setTimeout(func, delay)
}
       let k:any=[]
      
       
let rect = renderer.domElement.getBoundingClientRect();
renderer.domElement.addEventListener('click', onClick, false)
function onClick(event: MouseEvent) {
    raycaster.setFromCamera(
        {
            x: ( ( event.clientX - rect.left ) / ( rect. right - rect.left ) ) * 2 - 1,
            y: - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1,
        },
        camera
    )
             
      
            if(topView){
                if(k.length==0){
               k=   markers.concat(hotspotMarkers_top);
                }
             
                // markers=hotspotMarkers_top
           
            
            }
            else if(rightView){
                markers=hotspotMarkers_Right
            }
            else if(leftView){
                markers=hotspotMarkers_Left
            }
            
    const intersects = raycaster.intersectObjects(topView?k:markers, true)
   
    if (intersects.length > 0) {
        if(isswitchView){
            if(lhswithModal||rhswithModal){
                if(intersects[0].object.type==="Mesh"){
                        
                        debounceFunction(changeVedioSorce(intersects[0].object.name,intersects[0].object), 200)
                        console.log(intersects[0].object)
                        //  gotoAnnotation(,intersects[intersects.length-1].object.userData)
                        
                        return 
          }
            }
     
          if(topView){
              if(intersects.length>1){
                  
                     prevSelected=hotspots_top[intersects[intersects.length-1].object.userData.id]
                
                gotoAnnotation(hotspots_top[intersects[intersects.length-1].object.userData.id],intersects[intersects.length-1].object.userData)
                return
               }
          }
        if (intersects[0].object.userData && intersects[0].object.userData.id) {
            if(topView){
              
               if(intersects.length>1){
                  
                     prevSelected=hotspots_top[intersects[intersects.length-1].object.userData.id]
               
                gotoAnnotation(hotspots_top[intersects[intersects.length-1].object.userData.id],intersects[intersects.length-1].object.userData)
                return
               }
                prevSelected=hotspots_top[intersects[0].object.userData.id]
               
                gotoAnnotation(hotspots_top[intersects[0].object.userData.id],intersects[0].object.userData)
               
            }
            if(rightView){
                gotoAnnotation(hotspots_right[intersects[0].object.userData.id],intersects[0].object.userData)
            }
            if(leftView){
                gotoAnnotation(hotspots_left[intersects[0].object.userData.id],intersects[0].object.userData)
            }
           
        }
        }
    
    }

}
renderer.domElement.addEventListener('touchend', onTouch, false)
function onTouch(event: TouchEvent) {
    //  event.preventDefault();
 raycaster.setFromCamera(
        {
           
    
             x:  (event.changedTouches[0].clientX  /windowsizes.width) * 2 - 1,

             y: -(event.changedTouches[0].clientY/ windowsizes.height) * 2 + 1,
        },
        camera
    )
    

             

          let k:any=[]
            if(topView){
            if(k.length==0){
               k=   markers.concat(hotspotMarkers_top);
                }
         
           
            
            }
            else if(rightView){
                markers=hotspotMarkers_Right
            }
            else if(leftView){
                markers=hotspotMarkers_Left
            }
          
    const intersects = raycaster.intersectObjects(topView?k:markers, true)
  
    if (intersects.length > 0) {
           if(isswitchView){
              if(intersects[0].object.type==="Mesh"){
         
           debounceFunction(changeVedioSorce(intersects[0].object.name,intersects[0].object), 200)
         

         
        return 
      }
         if(topView){
              if(intersects.length>1){
                  
                     prevSelected=hotspots_top[intersects[intersects.length-1].object.userData.id]
                
                gotoAnnotation(hotspots_top[intersects[intersects.length-1].object.userData.id],intersects[intersects.length-1].object.userData)
                return
               }
          }
        if (intersects[0].object.userData && intersects[0].object.userData.id) {
        if(topView){
                 
              
                 prevSelected=hotspots_top[intersects[0].object.userData.id]
              
                 gotoAnnotation(hotspots_top[intersects[0].object.userData.id],intersects[0].object.userData)
               
            }
            if(rightView){
                gotoAnnotation(hotspots_right[intersects[0].object.userData.id],intersects[0].object.userData)
            }
            if(leftView){
                gotoAnnotation(hotspots_left[intersects[0].object.userData.id],intersects[0].object.userData)
            }
           
        }  
           }
     
    }

}


/**
 * Move Controls
 */
renderer.domElement.addEventListener('dblclick', onDoubleClick, false)
function onDoubleClick(event: MouseEvent) {
    raycaster.setFromCamera(
        {
            x: ( ( event.clientX - rect.left ) / ( rect. right - rect.left ) ) * 2 - 1,
            y: - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1,
        },
        camera
    )

    const intersects = raycaster.intersectObjects(sceneMeshes, true)

    if (intersects.length > 0) {
        const p = intersects[0].point

        new TWEEN.Tween(controls.target)
            .to(
                {
                    x: p.x,
                    y: p.y,
                    z: p.z,
                },
                1200
            )
            .easing(TWEEN.Easing.Cubic.Out)
             .onStart(() => {
	
        menu_view_Element.style.display = 'none'

       controls.enabled = false;
	   })
       .onComplete(() => {

           menu_view_Element.style.display = 'block'
        controls.enabled = true;
	})
            .start( )
    }
}

 let newIntersect:any=null
 let toShow:any=null
 renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );

function onDocumentMouseMove( event:MouseEvent ) 
{ raycaster.setFromCamera(
        {
            x: ( ( event.clientX - rect.left ) / ( rect. right - rect.left ) ) * 2 - 1,
            y: - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1,
        },
        camera
    )

 if(topView||leftView||rightView){
 let intersects = raycaster.intersectObjects(combineMarkers, false)
     
      
    if (intersects.length > 0) {
         newIntersect= intersects[0].object
       
        if(newIntersect){
            if(newIntersect.userData.subSection==true){
                // if(){}
                if(showHover){
                let parent= document.getElementById(newIntersect.userData.id) as HTMLDivElement
              
                toShow=parent.childNodes[0]
                toShow.style.display="block"
                }
             
            }
        intersects[0].object.scale.set(0.015,0.015,0.015);
        
        render()
        }
      
    }else // there are no intersections
	{
  
	
		if ( newIntersect !== null ) {
             newIntersect?.scale?.set(0.012, 0.012, 0.012);
		      newIntersect=null;
                if(toShow!==null){
            toShow.style.display="none"
            toShow=null;
            }
            
			
		      render()
	}
        }
           
 }
   
}

/**
 * Move Camera
 */
let lhswithModal=false
let rhswithModal=false
let clip:any
let mixeranimation=false;
let lhanimation=false;
let rhanimation=false
let subactive=false
const  selectSideBar=(a:any)=>{

   if(topView){
         const button=document.querySelectorAll(".hotspotsButton")!
       for(let i=0;i<button.length;i++){
           //@ts-ignore
           
           
               button[i].classList.remove("selected")
           
       }
       
       for(let i=0;i<button.length;i++){
           //@ts-ignore
           
           if(button[i].innerText===a){
               button[i].classList.add("selected")
           }
           else{
               button[i].classList.remove("selected")
           }
       }
   }
   if(leftView){
       const button=document.querySelectorAll(".hotspotsButtonLeft")!
         for(let i=0;i<button.length;i++){
           //@ts-ignore
           
           
               button[i].classList.remove("selected")
           
       }
       for(let i=0;i<button.length;i++){
           //@ts-ignore
           
           if(button[i].innerText===a){
               button[i].classList.add("selected")
           }
           else{
               button[i].classList.remove("selected")
           }
       }
   }
      if(rightView){
          const button=document.querySelectorAll(".hotspotsButtonRight")!
            for(let i=0;i<button.length;i++){
           //@ts-ignore
           
           
               button[i].classList.remove("selected")
           
       }
       
       for(let i=0;i<button.length;i++){
           //@ts-ignore
           
           if(button[i].innerText===a){
               button[i].classList.add("selected")
           }
           else{
               button[i].classList.remove("selected")
           }
       }
   }
}
function gotoAnnotation(a: any,rare:any): void {
    selectSideBar(a.title)
    console.log("rare",rare)
    let parent= document.querySelectorAll(".hotspotsLabel")!
    for(let i=0;i<parent.length;i++){
        //@ts-ignore
        parent[i].style.display="none" 
    }
   for(let i=0;i<lhArr.length;i++){
                lhArr[i].visible=false;
                render()
            }
        
         
            for(let i=0;i<lhArr.length;i++){
                rhArr[i].visible=false;
                render()
            }
            showHover=false
    const hotspotsButton = document.querySelectorAll(".hotspotsButton")

const hotspotsButtonLeft = document.querySelectorAll(".hotspotsButtonLeft" ) 
const hotspotsButtonRight =document.querySelectorAll(".hotspotsButtonRight")
    hotspotsButtonRight.forEach((a:any)=>{a.style.color="grey"; a.style.pointerEvents="none"})
    hotspotsButton.forEach((a:any)=>{a.style.color="grey";  a.style.pointerEvents="none"})
    hotspotsButtonLeft.forEach((a:any)=>{a.style.color="grey";  a.style.pointerEvents="none"})
    if(mixeranimation){
        mixer?.stopAllAction()
        mixeranimation=false
    }
    
    if(lhanimation){
    lhmixer?.stopAllAction()
    lhanimation=false
    }
    if(rhanimation){
    rhmixer?.stopAllAction()
    rhanimation=false
    }
   
   
  
     rhmixer?.stopAllAction()
      if(isMobileView){
            isswitchView=false
        }
        else{
            isswitchView=false
            menu_view_Element.style.display = 'none'
        }
        showHover=false
        loading_thumbnail.src=a?.thumbnail
      
        lhanimationPlay=false  
        rhanimationPlay=false
        animationPlay=false
   
          if(rare?.subSection){
              
            if(rare.class=="LH_MODULE"){
                 lhmixer?.stopAllAction()
            
                lhanimationPlay=true
                lhanimation=true
                    
            let  lhclip = THREE.AnimationClip.findByName( lhclips, rare.animation);
            console.log(lhaction)
                lhaction = mixer.clipAction( lhclip );
        
         setTimeout(() =>{   lhaction.play();},2000)  
            }
               if(rare.class=="RH_MODULE"){
                    rhmixer?.stopAllAction()
              
        rhanimationPlay=true
     
      let  rhclip = THREE.AnimationClip.findByName( rhclips, rare.animation);
     
         rhaction = mixer.clipAction( rhclip );
        
         setTimeout(() =>{   lhaction.play();},2000)  
            }
        
      return
            }else{
                rhanimation=true
                 lhmixer?.stopAllAction()
                  rhmixer?.stopAllAction()
                lhanimationPlay=false;
                rhanimationPlay=false
            }
      
    // Object.keys(hotspots_top).forEach((annotation) => {
    //    (hotspots_top[annotation].descriptionLoader as HTMLElement).style.display = 'none'
    // })
    //  Object.keys(hotspots_left).forEach((annotation) => {
    //    (hotspots_left[annotation].descriptionLoader as HTMLElement).style.display = 'none'
    // })
    //  Object.keys(hotspots_right).forEach((annotation) => {
    //    (hotspots_right[annotation].descriptionLoader as HTMLElement).style.display = 'none'
    // })
//    a.descriptionDomElementImg.style.border = "none"
        camera.position.set(a.camPos.x,a.camPos.y,a.camPos.z)
        controls.target.set( a.lookAt.x,a.lookAt.y,a.lookAt.z )
    // new TWEEN.Tween(camera.position)
    //     .to(
    //         {
    //             x: a.camPos.x,
    //             y: a.camPos.y,
    //             z: a.camPos.z,
    //         },
    //         1200
    //     )
    //     .easing(TWEEN.Easing.Cubic.Out)
    //     .onStart(() => {
	//
    //     menu_view_Element.style.display = 'none'
    //     isswitchView=false
    //     controls.enabled = false;
	//    })
    //    .onComplete(() => {
	// 
       
    //     controls.enabled = true;
	// })
    //     .start()

    // new TWEEN.Tween(controls.target)
    //     .to(
    //         {
    //             x: a.lookAt.x,
    //             y: a.lookAt.y,
    //             z: a.lookAt.z,
    //         },
    //         1200
    //     )
    //    .onStart(() => {
	// 	
    //     menu_view_Element.style.display = 'none'

    //    controls.enabled = false;
	//    })
    //    .onComplete(() => {
		
    //     // a.annotationCloseDiv.style.display = 'block',
    //     // a.annotationFullDiv.style.display = 'block'
    //     controls.enabled = true;
	// })
    //     .easing(TWEEN.Easing.Cubic.Out)
    //     .start()

  
    if ( a?.outline ) {
         for ( var i = 0, l = outlineArray.length; i < l; i ++ ) {
             outlineArray.pop()
         }
     
            for ( var i = 0, l = mainModel.length; i < l; i ++ ) {

           
             
            if ( mainModel[i].userData?.name==a?.outline ) {
            
                let highlightedObj=mainModel[i]
                outlineArray.push(highlightedObj)
                outlinePass.selectedObjects = outlineArray
              
            }
        }
    }else{
        
         for ( var i = 0, l = outlineArray.length; i < l; i ++ ) {
             outlineArray.pop()
         }
    }
     if(topView){
        for(let i=0;i<hotspotMarkers_top.length;i++){
            
                hotspotMarkers_top[i].visible=true
                render()
            
        }

     for(let i=0;i<hotspotMarkers_top.length;i++){
       
            if(a.title==hotspotMarkers_top[i].name){
                testSprite=hotspotMarkers_top[i]
                hotspotMarkers_top[i].visible=false
                render()
            }
        }
    }
    if(rightView){
           for(let i=0;i<hotspotMarkers_Right.length;i++){
            
                hotspotMarkers_Right[i].visible=true
                render()
            
        }
        for(let i=0;i<hotspotMarkers_Right.length;i++){
            if(a.title==hotspotMarkers_Right[i].name){
                hotspotMarkers_Right[i].visible=false
                render()
            }
        }
    //      for(let i=0;i<rightVed.length;i++){
    //    rightVed[i]?.pause()
    //    rightVed[i].childNodes[0].setAttribute('src',"")
    //    rightVed[i].currentTime = 0;
  
    //     }
    //      a.descriptionLoader.style.display = 'block'
    //     for(let i=0;i<rightVed.length;i++){
            
    //     if(rightVed[i].id==a.title){
    //    
    //       rightVed[i].childNodes[0].setAttribute('src', a.hotspots_preview)
    //         // @ts-ignore
             
    //        setTimeout(() =>{
            
    //          rightVed[i].load();
    //          a.descriptionLoader.style.display = 'none'
    //         //  a.descriptionDomElementImg.style.border = "0.2em solid #e1c039",
    //          rightVed[i].play()
    //        },1500)
          
    //     }
    //     }
    //     Object.keys(hotspots_right).forEach((annotation) => {
        
    //     if (hotspots_right[annotation].descriptionDomElement) {
          
    //         (hotspots_right[annotation].descriptionDomElement as HTMLElement).style.display = 'none',
    //         (hotspots_right[annotation].descriptionDomElementImg as HTMLElement).style.display = 'none',
    //         (hotspots_right[annotation].annotationCloseDiv as HTMLElement).style.display = 'none',
    //         (hotspots_right[annotation].annotationFullDiv as HTMLElement).style.display = 'none'
    //         // (document.getElementById('hotspotsPanel') as HTMLElement).style.display = 'none'
    //     }
    // })
    // if (a.descriptionDomElement) {
     
    //     a.descriptionDomElement.style.display = 'block',
    //     a.descriptionDomElementImg.style.display = 'block'
    //     // a.annotationCloseDiv.style.display = 'block'
    //     // a.annotationFullDiv.style.display = 'block'

        
    //     // (document.getElementById('hotspotsPanel') as HTMLElement).style.display = 'block'
    // }
    }
    if(leftView){
           for(let i=0;i<hotspotMarkers_Left.length;i++){
            
                hotspotMarkers_Left[i].visible=true
                render()
            
        }
           for(let i=0;i<hotspotMarkers_Left.length;i++){
            if(a.title==hotspotMarkers_Left[i].name){
                hotspotMarkers_Left[i].visible=false
                render()
            }
        }
    }
    if(a.subSection){
        //  for(let i=0;i<hotspotMarkers_top.length;i++){
               
        //         hotspotMarkers_top[i].visible=false
        //         render()
            
        // }
         
  if(a.title=="1. LH Switch Module"){
     
          switchglobal=a.subSectionVedio[0].class
        
           switchButton.style.display="none"
         
         
           lhswithModal=true;
        
         for(let i=0;i<hotspotMarkers_top.length;i++){
             if(hotspotMarkers_top[i].userData.class=="LH_MODULE"){
            
                   hotspotMarkers_top[i].visible=false
                    render()
            }
            if(hotspotMarkers_top[i].userData.class=="RH_MODULE"){
            
                   hotspotMarkers_top[i].visible=false
                    render()
            }
         }
         for ( var i = 0, l = outlineArray.length; i < l; i ++ ) {
             outlineArray.pop()
         }
     
            for ( var i = 0, l = lhModal.children.length; i < l; i ++ ) {

           
             
            
                let highlightedObj=lhModal.children[i]
                outlineArray.push(highlightedObj)
                outlinePass.selectedObjects = outlineArray
              
            
        }
            if(topView){
          for(let i=0;i<hotspotMarkers_top.length;i++){
                hotspotMarkers_top[i].visible=false
                        render()
                        
                        
                    
                }
        if(switchglobal=="LH_MODULE"){
            for(let i=0;i<lhArr.length;i++){
                lhArr[i].visible=true;
                render()
            }
        }
         if(switchglobal=="RH_MODULE"){
            for(let i=0;i<lhArr.length;i++){
                rhArr[i].visible=true;
                render()
            }
        }
        testSprite.visible = false
        showHover=true
        render()
    }
    }else if(a.title=="4. RH Switch Module"){
          switchglobal=a.subSectionVedio[0].class
        
           switchButton.style.display="none"
        
         rhswithModal=true;
         for(let i=0;i<hotspotMarkers_top.length;i++){
             if(hotspotMarkers_top[i].userData.class=="RH_MODULE"){
            
                   hotspotMarkers_top[i].visible=false
                    render()
            }
              if(hotspotMarkers_top[i].userData.class=="LH_MODULE"){
            
                   hotspotMarkers_top[i].visible=false
                    render()
            }
         }    
         for ( var i = 0, l = outlineArray.length; i < l; i ++ ) {
             outlineArray.pop()
         }
     
            for ( var i = 0, l = rhModal.children.length; i < l; i ++ ) {

           
           
                let highlightedObj=rhModal.children[i]
                outlineArray.push(highlightedObj)
                outlinePass.selectedObjects = outlineArray
              
    }
               if(topView){
                for(let i=0;i<hotspotMarkers_top.length;i++){
                hotspotMarkers_top[i].visible=false
                        render()
                        
                        
                    
                }
                if(switchglobal=="LH_MODULE"){
                    for(let i=0;i<lhArr.length;i++){
                        lhArr[i].visible=true;
                        render()
                    }
                }
                if(switchglobal=="RH_MODULE"){
                    for(let i=0;i<lhArr.length;i++){
                        rhArr[i].visible=true;
                        render()
                    }
                }
                testSprite.visible = false
                showHover=true
                render()
    }
    }else{
          switchglobal=null
         for ( var i = 0, l = outlineArray.length; i < l; i ++ ) {
             outlineArray.pop()
         }
     }
    }
    else{
         for(let i=0;i<hotspotMarkers_top.length;i++){
               if(hotspotMarkers_top[i].userData.subSection==true){
                hotspotMarkers_top[i].visible=false
                render()
               }
                
            
        } 
    //      for(let i=0;i<outlineArray.length;i++){
    //      outlineArray.pop()
    //  }
     switchButton.style.display="none"
     globalbutton.checked=false
    }
       detailContainer.style.visibility="hidden"
       detail_loader.style.visibility="hidden"
       detail_vedio.style.visibility = 'hidden'
       detail_close.style.visibility = 'hidden'
    
    

    if(a.animation){
       mixeranimation=true
    //      animationPlay=false
    //     clips.forEach( function ( clip:any ) {
    //     mixer.clipAction( clip ).stopAllAction();
    // } );
       mixer?.stopAllAction()
        animationPlay=true
      for(let i=0;i<a.animation.length;i++){
        clip = THREE.AnimationClip.findByName( clips, a.animation[i]);
       
         action = mixer.clipAction( clip );
        
         setTimeout(() =>{   action.play();},2000)
      }
      
        // render()
    }else{
        animationPlay=false
        lhanimationPlay=false;
        rhanimationPlay=false
         mixer?.stopAllAction()
    }

      
      
       detailContainer.style.visibility="hidden"
       detail_loader.style.visibility="hidden"
       detail_vedio.style.visibility = 'hidden'
       detail_close.style.visibility = 'hidden'

       detail_title.innerHTML=a.description
       detailContainer.style.visibility="visible"
       detail_loader.style.visibility="visible"
       // @ts-ignore
       detail_vedio.childNodes[1].src=a.hotspots_preview
        setTimeout(() =>{
            detail_vedio.load();
            // detail_vedio.play()
             setTimeout(() =>{
                
                  
              detail_loader.style.visibility="hidden"
              detail_vedio.style.visibility = 'visible'
              detail_close.style.visibility = 'visible'
            

             },300)
    hotspotsButtonRight.forEach((a:any)=>{a.style.color="white"; a.style.pointerEvents="all"})
    hotspotsButton.forEach((a:any)=>{a.style.color="white";a.style.pointerEvents="all"})
    hotspotsButtonLeft.forEach((a:any)=>{a.style.color="white";a.style.pointerEvents="all"})
              isswitchView=true
           },1500)

   
        
    //          for(let i=0;i<leftVed.length;i++){
    //    leftVed[i]?.pause()
    //    leftVed[i].childNodes[0].setAttribute('src',"")
    //    leftVed[i].currentTime = 0;
  
    //     }
    //      a.descriptionLoader.style.display = 'block'
    //     for(let i=0;i<leftVed.length;i++){
            
    //     if(leftVed[i].id==a.title){
    //      
    //       leftVed[i].childNodes[0].setAttribute('src', a.hotspots_preview)
    //         // @ts-ignore
             
    //        setTimeout(() =>{
            
    //          leftVed[i].load();
    //          a.descriptionLoader.style.display = 'none'
    //         //  a.descriptionDomElementImg.style.border = "0.2em solid #e1c039",
    //          leftVed[i].play()
    //        },1500)
          
    //     }
    //     }
    //     Object.keys(hotspots_left).forEach((annotation) => {
       
    //     if (hotspots_left[annotation].descriptionDomElement) {
           
    //         (hotspots_left[annotation].descriptionDomElement as HTMLElement).style.display = 'none',
    //         (hotspots_left[annotation].descriptionDomElementImg as HTMLElement).style.display = 'none',
    //         (hotspots_left[annotation].annotationCloseDiv as HTMLElement).style.display = 'none',
    //         (hotspots_left[annotation].annotationFullDiv as HTMLElement).style.display = 'none'
    //         // (document.getElementById('hotspotsPanel') as HTMLElement).style.display = 'none'
    //     }
    // })
    // if (a.descriptionDomElement) {
        
    //     a.descriptionDomElement.style.display = 'block',
    //     a.descriptionDomElementImg.style.display = 'block'
        // a.annotationCloseDiv.style.display = 'block'
        // a.annotationFullDiv.style.display = 'block'
        // (document.getElementById('hotspotsPanel') as HTMLElement).style.display = 'block'
    
    
    //set values
    // controls.maxAzimuthAngle=a.maxAzimuthAngle;
    // controls.minAzimuthAngle=a.minAzimuthAngle;
    // controls.minDistance=a.minDistance;
    // controls.maxDistance=a.maxDistance;
    // controls.maxPolarAngle=a.maxPolarAngle;
    // controls.minPolarAngle=a.minPolarAngle
    
}


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


/**
 * Controls
 */
const controls = new OrbitControls(camera, renderer.domElement)

controls.enablePan = false

controls.maxDistance = 7
controls.minDistance = 0.5
// controls.dampingFactor = 0.03
// controls.enableDamping = true
controls.minPolarAngle = 0
controls.maxPolarAngle =  Math.PI * 0.5

controls.target.set( 0, 0.6, 0)

controls.addEventListener('change', render)

window.addEventListener("scroll", (e)=>{
 rect = renderer.domElement.getBoundingClientRect();
});
/**
 * Responsive
 */
window.addEventListener('resize', onWindowResize, false)
let resize=false
function onWindowResize() {
  resize=true

   
    render()
}
let isLandscape=false
  window.addEventListener('orientationchange', function (e) {
  
      let k=document.querySelector("#webgl") as HTMLCanvasElement
    
       t
      
      //@ts-ignore
  switch(e.target.screen.orientation.angle) {  
      case -90: case 90:
           landscapeError.style.visibility="visible"
            for(let i=0;i<=combineMarkers?.length;i++){
                
                combineMarkers[i]?.scale.set(0.02,0.02,0.02)
            }
       
             scrollParent.style.visibility="hidden";
            var disp = document.body.style.display;
            document.body.style.display = 'none';
            var trick = document.body.offsetHeight;
            document.body.style.display = disp;
            
            var disp1 = k.style.display;
            k.style.display = 'none';
            var trick1 = k.offsetHeight;
            k.style.display = disp1;
            windowsizes.height= canvas_Element.clientHeight
            resize=true;
            isLandscape=true
           
            render()
            
       
           
       
        

        break; 
      default:
            landscapeError.style.visibility="hidden"
           for(let i=0;i<=combineMarkers?.length;i++){
                combineMarkers[i]?.scale.set(0.015,0.015,0.015)
            }
              if(topView||leftView||rightView){
                 scrollParent.style.visibility="hidden";
             }else{
                 scrollParent.style.visibility="hidden";
             }
            let k1=document.querySelector("#webgl") as HTMLElement
            var originalBodyStyle = getComputedStyle(document.body).getPropertyValue('display');
            document.body.style.display='none';

            var originalBodyStyle1 = getComputedStyle(k1).getPropertyValue('display');
            k1.style.display='none';
             isLandscape=false
            setTimeout(function () {
                document.body.style.display = originalBodyStyle;
                k1.style.display = originalBodyStyle1;
                windowsizes.height= canvas_Element.clientHeight
                resize=true;
                render()
            }, 10);
          
    
   
        break; 
    }
     
 

  });

 
/**
 * Stats
 */
// const stats = Stats()


/**
 * Render Loop
 */
function render() {

   if(resize){
        windowsizes.width = canvas_Element.clientWidth
        windowsizes.height = canvas_Element.clientHeight
        
        camera.aspect = windowsizes.width / windowsizes.height
   

        renderer.setSize( windowsizes.width, windowsizes.height )

        labelRenderer.setSize( windowsizes.width, windowsizes.height )
        camera.updateProjectionMatrix()
        renderTarget.width= windowsizes.width
        renderTarget.height= windowsizes.height
        rect = renderer.domElement.getBoundingClientRect();
        resize=false
    
    
   }
   if(isMobileView){
      

 if (window.matchMedia("(orientation: landscape)").matches) {
     
    for(let i=0;i<combineMarkers?.length;i++){
                combineMarkers[i]?.scale.set(0.03,0.03,0.03)
            }
              scrollParent.style.visibility="hidden";
      }else{
       if(topView||leftView||rightView){
                for(let i=0;i<combineMarkers?.length;i++){
                combineMarkers[i]?.scale.set(0.015,0.015,0.015)
            }
                scrollParent.style.visibility="hidden";
       }
       
   }
   }
  

    labelRenderer.render(scene, camera)
    renderer.render(scene, camera)
    // composer.render()
      
   if(animationPlay){
         landscapeError.style.visibility="hidden"
         var delta = clock.getDelta();
          mixer.update(delta);
          
    }
      if(lhanimationPlay){
       
         var delta = clock.getDelta();
          lhmixer.update(delta);
          
    }
      if(rhanimationPlay){
        
         var delta = clock.getDelta();
          rhmixer.update(delta);
          
    }
    //  let x = window.matchMedia("(min-width: 1025px)")
    //   if(x.matches){
    //        menu_view_Element.style.display="none"
    //   }
  
     

}


const tick = () =>
{
  
    const elapsedTime = clock.getElapsedTime()
   
   
    controls.update()
    // stats.update()
    TWEEN.update()
       
   
    setTimeout( function() {
      
    requestAnimationFrame(tick)
    if(animationPlay){
          render()
    }
    if(lhanimationPlay){
        console.log("lhanimationPlay",lhanimationPlay)
      render()
    }
    if(rhanimationPlay){
         console.log("rhanimationPlay",rhanimationPlay)
         render()
    }

    }, 1000 / 30 );
   
      
  

    
    
 
}

tick()