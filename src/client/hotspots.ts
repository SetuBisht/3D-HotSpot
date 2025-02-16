interface Hotspots {
    menu : string;
    title : string
    description : string
    position : THREE.Vector3
    lookAt : THREE.Vector3
    camPos : THREE.Vector3
    descriptionDomElement? : HTMLElement
    descriptionDomElementImg? : HTMLElement
    annotationCloseDiv? : HTMLElement
    annotationFullDiv? : HTMLElement
    descriptionLoader?: HTMLElement
    hotspots_preview : string
    descriptionDomElementArr:[]
    subSection:boolean,
    animation:string
    subSectionVedio:[{id:string,title:string,hotspots_preview:string,lookAt:THREE.Vector3,animation:string,class:string}]
}