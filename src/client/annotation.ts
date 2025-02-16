interface Annotation {
    menu: string;
    key:string
    title: string
    description: string
    position: THREE.Vector3
    lookAt: THREE.Vector3
    camPos:THREE.Vector3
    descriptionDomElement?: HTMLElement
    descriptionDomElementImg?:HTMLElement
    descriptionLoader?:HTMLElement
    otherParts:[]
    subSection:boolean
    
    subSectionVedio:[{
        id:string,
        title:string,
        hotspots_preview:string,
        animation:string
        lookAt:THREE.Vector3,
        class:string
    }]
}