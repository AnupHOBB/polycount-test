import * as THREE from './node_modules/three/src/Three.js'
import * as ENGINE from './engine/Engine.js'
import {GLTFLoader} from './node_modules/three/examples/jsm/loaders/GLTFLoader.js'
import {DRACOLoader} from './node_modules/three/examples/jsm/loaders/DRACOLoader.js'

const MODEL = './assets/WyzeAirPurifier.glb'

window.onload = () => 
{
    let loader = new ENGINE.AssetLoader()
    let dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath(ENGINE.DRACO_DECODER_PATH)
    let gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)
    loader.addLoader('Model', MODEL, gltfLoader)
    loader.execute(p=>{}, assetMap => 
    {
        let sceneManager = new ENGINE.SceneManager(document.querySelector('canvas'), true)
        let cameraManager = new ENGINE.StaticCameraManager('Camera', 50)
        sceneManager.register(cameraManager)
        sceneManager.setActiveCamera('Camera')
        let ambientLight = new ENGINE.AmbientLight('AmbientLight', new THREE.Color(1, 1, 1), 1)
        sceneManager.register(ambientLight)
        let input = new ENGINE.InputManager('Input', document.querySelector('canvas'))
        sceneManager.register(input)
        cameraManager.registerInput(input)
        let model = new ENGINE.MeshModel('Model', assetMap.get('Model'), true)
        model.setPosition(0, -0.25, -1)
        sceneManager.register(model)

        /* let model2 = new ENGINE.MeshModel('Model', assetMap.get('Model'), true)
        model2.setPosition(0.2, -0.1, -0.5)
        sceneManager.register(model2) */
        alert("READY")
    })
}

/*
    HobbWebConfiguratorForWebPage total triangles : 160,056

    //DID NOT WORK// urban-barn-sofa.glb : 133,792
    
    WyzeAirPurifier.glb : 59,654
    PatioUmbrella.glb : 56,653
    IngridChair.glb : 45,196
    ArmChair.glb : 42,008
    TanLeatherSofa.glb : 31,191
    urban-barn-sofa-3.glb : 29,487
    urban-barn-sofa-4.glb : 25,695
    Dryer.glb : 13,677
    DecorItemVase.glb : 6,044
*/