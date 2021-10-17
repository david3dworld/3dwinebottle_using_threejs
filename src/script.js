import * as THREE from "https://cdn.skypack.dev/three@0.129.0";

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/DRACOLoader.js';
import * as dat from 'https://cdn.skypack.dev/dat.gui';
import Stats from 'https://cdn.skypack.dev/stats.js';
import threeDracoloader from 'https://cdn.skypack.dev/three-dracoloader';

//import { EffectComposer } from 'https://assets.codepen.io/6947663/EffectComposer.js'

//////// stats

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)


////////// BASE

// Debug
const gui = new dat.GUI()
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// XYZ
//const helper = new THREE.AxesHelper(50)
//scene.add(helper)




////////// LOADERS

const cubeTextureLoader = new THREE.CubeTextureLoader()

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath( 'https://cdn.jsdelivr.net/npm/three@0.129.0/examples/js/libs/draco/' );

const gltfLoader = new GLTFLoader()



/// UPDATE ALL MATERIALS

const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            //child.material.envMap = environmentMap
            child.material.envMapIntensity = debugObject.envMapIntensity
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
    
        }
    })
}




////////// ENVIRONMENT MAP


const environmentMap = cubeTextureLoader.load([
    'https://assets.codepen.io/6947663/px.png',
    'https://assets.codepen.io/6947663/nx.png',
    'https://assets.codepen.io/6947663/py.png',
    'https://assets.codepen.io/6947663/ny.png',
    'https://assets.codepen.io/6947663/pz.png',
    'https://assets.codepen.io/6947663/nz.png'
])


environmentMap.encoding = THREE.sRGBEncoding

//const colorfd = new THREE.Color( '#010101' )
//scene.background = colorfd

scene.environment = environmentMap


debugObject.envMapIntensity = 7
gui.add(debugObject, 'envMapIntensity').min(0).max(10).step(0.001).onChange(updateAllMaterials)





////////////////////////////////////////////////////// OBJECTS






//////////// GRAINS DE RAISIN



const groupegrain = new THREE.Group()
const groupegrain2 = new THREE.Group()
const groupegrain3 = new THREE.Group()

scene.add(groupegrain)
scene.add(groupegrain2)
scene.add(groupegrain3)



/// GRAIN DE RAISIN

gltfLoader.load(
  'https://assets.codepen.io/6947663/GRAIN_01.glb',
  (gltf2) =>
  {
      gltf2.scene.scale.set(0.1, 0.1, 0.1)
      gltf2.scene.position.set(0, 0, 0)
      gltf2.scene.rotation.x = Math.PI * 1
      gltf2.scene.rotation.y = Math.PI * 1
      gltf2.scene.rotation.z = Math.PI * 1
   

      const grain1 = gltf2.scene
      const grain2 = gltf2.scene.clone()
      const grain3 = gltf2.scene.clone()

      scene.add(grain1)
      scene.add(grain2)
      scene.add(grain3)
      
      groupegrain.add(grain1)
      scene.add(groupegrain)

      groupegrain2.add(grain2)
      scene.add(groupegrain)

      groupegrain3.add(grain3)
      scene.add(groupegrain)


      

      //gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

      //updateAllMaterials()
      
  }
)








/////// BOUTEILLES



////////// TEXTURES BRANAIRE DUCRU

const textureLoader = new THREE.TextureLoader()
const bouteillecolor = textureLoader.load('https://assets.codepen.io/6947663/branairecolor.jpg')
bouteillecolor.flipY = false
bouteillecolor.encoding = THREE.sRGBEncoding

const textureLoader2 = new THREE.TextureLoader()
const bouteillenormal = textureLoader2.load('https://assets.codepen.io/6947663/branairenormal.png')
bouteillenormal.flipY = false
bouteillenormal.encoding = THREE.sRGBEncoding

const textureLoader3 = new THREE.TextureLoader()
const bouteilleroughness = textureLoader3.load('https://assets.codepen.io/6947663/branairemetal.jpg')
bouteilleroughness.flipY = false
bouteilleroughness.encoding = THREE.sRGBEncoding



////////// TEXTURES BATAILLEY

const textureLoaderA = new THREE.TextureLoader()
const bouteillecolorA = textureLoaderA.load('https://assets.codepen.io/6947663/batailleycolor.png')
bouteillecolorA.flipY = false
bouteillecolorA.encoding = THREE.sRGBEncoding

const textureLoaderB = new THREE.TextureLoader()
const bouteillenormalB = textureLoaderB.load('https://assets.codepen.io/6947663/batailleynormal.png')
bouteillenormalB.flipY = false
bouteillenormalB.encoding = THREE.sRGBEncoding

const textureLoaderC = new THREE.TextureLoader()
const bouteilleroughnessC = textureLoaderC.load('https://assets.codepen.io/6947663/batailleymetal.png')
bouteilleroughnessC.flipY = false
bouteilleroughnessC.encoding = THREE.sRGBEncoding



////////// MATERIALS BOUTEILLES


/// material bouteille Branaire-Ducru

const material1 = new THREE.MeshStandardMaterial
material1.roughness = 1
material1.metalness = 1
material1.map = bouteillecolor
material1.normalMap = bouteillenormal
material1.roughnessMap = bouteilleroughness
material1.metalnessMap = bouteilleroughness
material1.wireframe = false
//material1.aoMap = bouteilleroughness


// material bouteille Batailley

const material2 = new THREE.MeshStandardMaterial
material2.roughness = 1
material2.metalness = 1
material2.reflectivity = 0
material2.map = bouteillecolorA
material2.normalMap = bouteillenormalB
material2.roughnessMap = bouteilleroughnessC
material2.metalnessMap = bouteilleroughnessC
material2.wireframe = false
//material2.aoMap = bouteilleroughnessC


// material3

const material3 = new THREE.MeshStandardMaterial
material3.roughness = 0
material3.metalness = 0.9
const color3 = new THREE.Color( 'green' )
material3.color = color3
material3.wireframe = false



/// GROUPS


const groupebouteille = new THREE.Group();
scene.add(groupebouteille);
groupebouteille.position.x = 0;
groupebouteille.position.y = 0;
groupebouteille.position.z = 0;

const groupebouteille2 = new THREE.Group();
scene.add(groupebouteille2);
//groupebouteille2.position.x = 3;
//groupebouteille2.position.y = 0.2;
//groupebouteille2.position.z = 0;



const groupebouteille3 = new THREE.Group();
scene.add(groupebouteille3);
groupebouteille3.position.x = -2;
groupebouteille3.position.y = 1;
groupebouteille3.position.z = -0.5;


const groupebouteille4 = new THREE.Group();
scene.add(groupebouteille4);
groupebouteille4.position.x = 4.5;
groupebouteille4.position.y = 1;
groupebouteille4.position.z = 3;





/// LOADER GLTF BOUTEILLE BASE


//dracoLoader.setDecoderPath('/draco/')
gltfLoader.setDRACOLoader(dracoLoader)

gltfLoader.load(
    'https://assets.codepen.io/6947663/BRANAIRE_COMPRESSED.glb',
    (gltf) =>
    {
        gltf.scene.scale.set(0.1, 0.1, 0.1)
        gltf.scene.position.set(0, -1.3, 0)
        gltf.scene.rotation.y = Math.PI * 1.22
        gltf.scene.rotation.x = Math.PI * 0.015
        

  // Store model's scene graph here
  const bouteille = new Map();

  // Creates models with shared materials/geometry
  const cloneModel = (model, material) => {
    if (!model) return;

    // Create root and copy root transforms
    const root = new THREE.Object3D();
    root.scale.copy(model.scale);
    root.position.copy(model.position);
    root.quaternion.copy(model.quaternion);

    // Clone model scene graph
    gltf.scene.traverse((object) => {
      if (object.isMesh) {
        // Cache object if not already
        if (!bouteille.get(object.uuid)) bouteille.set(object.uuid, object);

        // Get shared properties
        const { geometry, scale, position, quaternion, name, userData } = bouteille.get(
          object.uuid
        );

        // Create clone that re-uses those shared properties
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.copy(scale);
        mesh.position.copy(position);
        mesh.quaternion.copy(quaternion);
        mesh.name = name;
        mesh.userData = userData;

        // Recursively repeat on children
        const children = object.children.map(cloneModel);
        children.forEach((child) => mesh.add(child));

        // Add clone to root
        root.add(mesh);
      }
    });

    return root;
  };


  const bouteille1 = cloneModel(
    gltf.scene,
    material2
  );

  const bouteille2 = cloneModel(
    gltf.scene,
    material1
  );
  

  const bouteille3 = cloneModel(
    gltf.scene,
    material3
  );

  const bouteille4 = cloneModel(
    gltf.scene,
    material3
  );

  scene.add(bouteille1);
  scene.add(bouteille2);
  scene.add(bouteille3);
  scene.add(bouteille4);

  groupebouteille.add(bouteille1);
  scene.add(groupebouteille);

  groupebouteille2.add(bouteille2);
  scene.add(groupebouteille2);


  groupebouteille3.add(bouteille3);
  scene.add(groupebouteille3);
  groupebouteille3.visible = false

  groupebouteille4.add(bouteille4);
  scene.add(groupebouteille4);
  groupebouteille4.visible = false


  updateAllMaterials();
});




////////// LIGHTS

const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 15
directionalLight.intensity = 1
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(5, 1, 0.5)
scene.add(directionalLight)

gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001).name('lightX')
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001).name('lightY')
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001).name('lightZ')


/*
//////////////////// PARTICLES

// Geometry

const particlesGeometry = new THREE.BufferGeometry()
const count = 500

// Multiply by 3 because each position is composed of 3 values (x, y, z)
const positions = new Float32Array(count * 3)

// Multiply by 3 for same reason
for(let i = 0; i < count * 3; i++) 
{   
    // Math.random() - 0.5 to have a random value between -0.5 and +0.5
    positions[i] = (Math.random() - 0.5) * 10
}

// Create the Three.js BufferAttribute and specify that each information is composed of 3 values
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))


// Material
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02,
  sizeAttenuation: true
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

*/



/// SIZES

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})




////////// CAMERA

// Base camera
const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 0.01, 100)
camera.position.set(0, -1, - 5)

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true



console.log(camera)





////////// RENDERER

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha : true,
})


//renderer.autoClear = true
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
//renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



gui
    .add(renderer, 'toneMapping', {
        No: THREE.NoToneMapping,
        Linear: THREE.LinearToneMapping,
        Reinhard: THREE.ReinhardToneMapping,
        Cineon: THREE.CineonToneMapping,
        ACESFilmic: THREE.ACESFilmicToneMapping
    })
    .onFinishChange(() =>
    {
        renderer.toneMapping = Number(renderer.toneMapping)
        updateAllMaterials()
    })
gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)







////////////////// POST PROCESSING


const renderTarget = new THREE.WebGLRenderTarget(
  800,
  600,
  {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      encoding: THREE.sRGBEncoding
      
  }
)

/*

const effectcomposer = new Effectcomposer (renderer, renderTarget)

const renderPass = new RenderPass (scene, camera)
effectcomposer.addPass(renderPass)

effectcomposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
effectcomposer.setSize(sizes.width, sizes.height)



const smaaPass = new SMAAPass ()
smaaPass.enabled = false
effectcomposer.addPass(smaaPass)



const target = new THREE.Vector3(0, 0, 0)
const lens = camera.position
const lensok = lens

const distance = target.distanceTo( lens )

const bokehsettings = {
  focus : (distance), aperture : 0.005,  maxblur : 0.2,
  width: sizes.width, height : sizes.height
}

const bokehPass = new BokehPass(scene, camera, bokehsettings)

bokehPass.enabled = false
effectcomposer.addPass(bokehPass)

const fxaa = new ShaderPass(FXAAShader)
effectcomposer.addPass(fxaa)
fxaa.enabled = false


/*


const renderTargetParameters = {
	minFilter: THREE.LinearFilter,
	magFilter: THREE.LinearFilter,
	stencilBuffer: false
};

// save pass
const savePass = new SavePass(
	new THREE.WebGLRenderTarget())


// blend pass 

const blendPass = ShaderPass(new BlendShader, "tDiffuse1");
blendPass.uniforms["tDiffuse2"].value = savePass.renderTarget.texture;
blendPass.uniforms["mixRatio"].value = 0.8;

// output pass
const outputPass = new ShaderPass(CopyShader);
outputPass.renderToScreen = true;

// adding passes to composer
effectcomposer.addPass(renderPass);
effectcomposer.addPass(blendPass);
effectcomposer.addPass(savePass);
effectcomposer.addPass(outputPass);



/*

//

const fxaaPass = new ShaderPass( FXAAShader );
const copyPass = new ShaderPass( CopyShader );

const effectcomposer1 = new EffectComposer( renderer );
effectcomposer1.addPass( renderPass );
effectcomposer1.addPass( copyPass );


//

const pixelRatio = renderer.getPixelRatio();

//fxaaPass.material.uniforms['resolution'].value.x = 1 / ( container.offsetWidth * pixelRatio );
//fxaaPass.material.uniforms['resolution'].value.y = 1 / ( container.offsetHeight * pixelRatio );

const effectcomposer2 = new EffectComposer( renderer );
effectcomposer2.addPass( renderPass );
effectcomposer2.addPass( fxaaPass );

//

window.addEventListener( 'resize', onWindowResize );




/*

const dotScreenPass = new DotScreenPass()
dotScreenPass.enabled = false
effectComposer.addPass(dotScreenPass)


const glitchPass = new GlitchPass()
glitchPass.enabled = false
effectComposer.addPass(glitchPass)




const adaptivetone = new AdaptiveToneMappingPass
adaptivetone.enabled = false
effectComposer.addPass(adaptivetone)







/*

/// REFLECTION


const floorGeometry = new THREE.PlaneGeometry(50, 50, 1, 1)

const groundReflector = new ReflectorForSSRPass(floorGeometry, {
            clipBias: 0.0003,
            textureWidth: window.innerWidth,
            textureHeight: window.innerHeight,
            color: 0x888888,
            useDepthTexture: false,
        })

        groundReflector.material.depthWrite = false;
        groundReflector.rotation.x = - Math.PI / 2;
        groundReflector.position.y = -310;
        groundReflector.visible = false;

        scene.add(groundReflector)
        
        


const ssrPass = new SSRPass({
    renderer,
    scene,
    camera,
    width: innerWidth,
    height: innerHeight,
    encoding: THREE.sRGBEncoding,
    groundReflector: groundReflector,
    selects: groupebouteille // it is marble mesh but not work
})

ssrPass.enabled = true
//ssrPass.distanceAttenuation = 10
//ssrPass.maxDistance = 2
ssrPass.blur = 20

effectComposer.addPass(ssrPass)

*/



gui.closed = true




////////// ANIMATE


const clock = new THREE.Clock()

const tick = () =>
{

  stats.begin()

    const elapsedTime = clock.getElapsedTime()


    // animation objects


    groupebouteille.rotation.x = 0* elapsedTime
    groupebouteille.rotation.y = 0.55 * elapsedTime
    groupebouteille.rotation.z = 0 * elapsedTime



    groupebouteille2.position.x = Math.cos( elapsedTime / 3 ) *1
    //groupebouteille2.position.y = (Math.sin( elapsedTime / 3 ) *0.4) 
    groupebouteille2.position.z = Math.sin( elapsedTime / 3 ) *1 

    groupebouteille2.rotation.x = 0* elapsedTime 
    groupebouteille2.rotation.y = 0.6* elapsedTime 
    groupebouteille2.rotation.z = (0* elapsedTime) +0.1

    


    //groupegrain.position.x = (Math.cos( elapsedTime / 1 ) *1) +0
    //groupegrain.position.y = (Math.sin( elapsedTime / 3 ) *0.4) 
    //groupegrain.position.z = (Math.sin( elapsedTime / 1 ) *1) +0

    groupegrain.position.x = Math.cos( elapsedTime / 3 ) *2
    groupegrain.position.y = Math.sin( elapsedTime / 3 ) *1 
    groupegrain.position.z = Math.sin( elapsedTime / 3 ) *1.8

    groupegrain.rotation.x = (0.3* elapsedTime) 
    groupegrain.rotation.y = (0.5* elapsedTime ) 
    groupegrain.rotation.z = (0.5* elapsedTime)





    //groupegrain2.position.x = (Math.cos( elapsedTime / 1 ) *1) +0
    //groupegrain2.position.y = (Math.sin( elapsedTime / 3 ) *0.4) 
    //groupegrain2.position.z = (Math.sin( elapsedTime / 1 ) *1) +0

    groupegrain2.position.x = Math.cos( elapsedTime / 3 ) *3
    //groupegrain2.position.y = Math.sin( elapsedTime / 3 ) *1 
    groupegrain2.position.z = Math.sin( elapsedTime / 3 ) *1.8

    groupegrain2.rotation.x = Math.cos (0.3* elapsedTime) 
    groupegrain2.rotation.y = (0.5* elapsedTime ) 
    groupegrain2.rotation.z = (0.5* elapsedTime)





    //groupegrain3.position.x = (Math.cos( elapsedTime / 1 ) *1) +0
    //groupegrain3.position.y = (Math.sin( elapsedTime / 3 ) *0.4) 
    //groupegrain3.position.z = (Math.sin( elapsedTime / 1 ) *1) +0

    groupegrain3.position.z = Math.cos( elapsedTime / 6 ) *1.6
    groupegrain3.position.y = Math.sin( elapsedTime / 3 ) *1.5 
    groupegrain3.position.x = Math.sin( elapsedTime / 6 ) *1.5

    groupegrain3.rotation.x = (0.3* elapsedTime) 
    groupegrain3.rotation.y = (0.5* elapsedTime ) 
    groupegrain3.rotation.z = (0.5* elapsedTime)


   



    // Update controls
    controls.update()

    
    
    
    
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    // Render
    renderer.render(scene, camera)

    
    //effectcomposer.render()
    
    
    stats.end()
    
    
  }

tick()



console.log(renderer.info)

