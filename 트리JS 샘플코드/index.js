import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import fontData from './Do Hyeon_Regular.json'

//#1. 장면, 카메라 렌더 생성
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 )
const renderer = new THREE.WebGLRenderer()

let _width = window.innerWidth
let _height = window.innerHeight

//#2. 렌더러 설정(크기,색,그림자)
renderer.setClearColor(new THREE.Color('#248079'))
renderer.setSize( _width, _height )
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

//#3. 조명 설정 
const light = new THREE.AmbientLight('#009c6b', .15)
const shadowLight = new THREE.DirectionalLight('#009c6b', .85)
shadowLight.position.set(200, 200, 200)
shadowLight.castShadow = true
const backLight = new THREE.DirectionalLight('#009c6b', 0.15)
backLight.position.set(-100, 200, 50)
backLight.castShadow = true
scene.add(backLight)
scene.add(light)
scene.add(shadowLight)

//#4. 카메라 설정 및 적용
camera.position.set(-6, 4, 8)
camera.lookAt(new THREE.Vector3(0, 0, 0))
document.getElementById('viwer').appendChild( renderer.domElement )

//#5. 땅------------------------------------
const landing = [
    {x : 8, y : 0, depth : 0.25 * 2, width : 8.15, height: 3, sColor : '#a5ce66', eColor : '#7a9a4e'},
    {x :-2.95, y : 0, depth : 0.25 * 2, width : 5.85, height: 3, sColor : '#a5ce66', eColor : '#7a9a4e'},
    {x : 1.95, y : 0.25, z : -1, depth : 0.125 * 2, width : 3.75, height: 5, sColor : '#0edce6', eColor : '#114f92'}
]
landing.forEach( (item, idx) => {
    const geometry = new THREE.BoxGeometry(item.width, item.height, item.depth)
    const material = new THREE.MeshPhongMaterial( { 
        color: item.sColor,
        emissive: item.eColor,
        shininess: 35,
        wireframe: false
    })
    const cube = new THREE.Mesh( geometry, material )
    cube.position.x = item.x
    cube.position.y = item.y
    if(item.z) cube.position.z = item.z
    cube.name =`lending${idx}`
    cube.rotateX(5)

    if(idx < 2) cube.receiveShadow = true
    scene.add( cube )
})


//#6. 강물------------------------------------
let water = {maxY : -0.3, minY : -3, minX : 0.05, maxX : 3.65}
const rainAttr = { depth : 0.1, width : 0.1, height: 0.05, sColor : '#0edce6', eColor : '#114f92' }
let raining = []

for(let i=0;i < 125;i++){
    raining.push(
        {
            x : ranMinMax(water.minX, water.maxX),
            y : ranMinMax(water.minY, water.maxY),
            z : 1.8,
            speed : ran(0.0085), 
            ...rainAttr
        }
    )
}
raining.forEach( (item, idx) => {
    const geometry = new THREE.BoxGeometry(item.width, item.height, item.depth)
    const material = new THREE.MeshPhongMaterial( { 
        color: item.sColor,
        emissive: item.eColor,
        shininess: 35,
        wireframe: false,
    })
    const cube = new THREE.Mesh( geometry, material )
    cube.position.x = item.x
    cube.position.y = item.y
    cube.position.z = item.z
    cube.rotateX(5)
    cube.userData = {
        'speed' : item.speed,
        ...item
    }
    cube.name = 'raining' + idx
    scene.add( cube )
})

//#7. 나무------------------------------------
const treeArrayDefault = {width : 0.3, height : 0.3, depth : 0.75, color : [['#549c52','#471b1f'], ['#03781f','#306949']]}
let treeArray= [
    {x : -5.25, y : 0.65, z : -0.45, ...treeArrayDefault},
    {x : -4, y : 0.65, z : -0.45, ...treeArrayDefault},
    {x : -5.25, y : 0.25, z : 1, ...treeArrayDefault},
    {x : -4, y : 0.25, z : 1, ...treeArrayDefault},
    {x : -2.5, y : 0.25, z : 1, ...treeArrayDefault},
    {x : -1, y : 0.25, z : 1, ...treeArrayDefault},
    {x : -2.5, y : 0.65, z : -0.45, ...treeArrayDefault},
    {x : -1, y : 0.65, z : -0.45, ...treeArrayDefault},
    {x : 5, y : 0.25, z : 1, ...treeArrayDefault},
    {x : 7.5, y : 0.25, z : 1, ...treeArrayDefault},    
    {x : 10, y : 0.25, z : 1, ...treeArrayDefault},    
    {x : 5, y : 0.65, z : -0.45, ...treeArrayDefault},
    {x : 7.5, y : 0.65, z : -0.45, ...treeArrayDefault},    
    {x : 10, y : 0.65, z : -0.45, ...treeArrayDefault}       
]
treeArray.forEach(item => {
    const group = new THREE.Group()
    let idx = 0
    while(idx < 2){
        let moreNum = 0
        if(idx == 1) {
            moreNum = 0.35
        }
        const geometry = new THREE.BoxGeometry(item.width + moreNum, item.height + moreNum, item.depth)
        const material = new THREE.MeshPhongMaterial( { 
            color: item.color[idx][0],
            emissive: item.color[idx][1],
            shininess: 55,
            wireframe: false
        })
        const cube = new THREE.Mesh( geometry, material )
        cube.castShadow = true
        cube.receiveShadow = true        
        cube.position.x = item.x
        cube.position.y = item.y  + moreNum
        cube.position.z = item.z + moreNum/4
        cube.rotateX(5)        
        group.add( cube )
        idx = idx + 1    
    }
    scene.add( group )
})

//#8. 하트 구름 
let hearArr = [
    {x : ranMinMax(-6, -5), y : 3, z : ranMinMax(-1, 4), rotateZ : ranMinMax(0.1, 4), scale : ranMinMax( 0.0009,  0.0065), color : getRandomColor(), speed : ran(0.0005)},
    {x : ranMinMax(-5, -4), y : 3, z : ranMinMax(-1, 4), rotateZ : ranMinMax(0.1, 4), scale : ranMinMax( 0.0009,  0.0065), color : getRandomColor(), speed : ran(0.0005)},
    {x : ranMinMax(-4, -3), y : 3, z : ranMinMax(-1, 4), rotateZ : ranMinMax(0.1, 4), scale : ranMinMax( 0.0009,  0.0065), color : getRandomColor(), speed : ran(0.0005)},
    {x : ranMinMax(-3, -2), y : 3, z : ranMinMax(-1, 4), rotateZ : ranMinMax(0.1, 4), scale : ranMinMax( 0.0009,  0.0065), color : getRandomColor(), speed : ran(0.0005)},
    {x : ranMinMax(-2, -1), y : 3, z : ranMinMax(-1, 4), rotateZ : ranMinMax(0.1, 4), scale : ranMinMax( 0.0009,  0.0065), color : getRandomColor(), speed : ran(0.0005)},
    {x : ranMinMax(-6, -4), y : 3, z : ranMinMax(-1, 4), rotateZ : ranMinMax(0.1, 4), scale : ranMinMax( 0.0009,  0.0065), color : getRandomColor(), speed : ran(0.0005)}
]
hearArr.forEach( item => {
    heartMaker(item)  
})
let cloudTimer = setInterval(() => {  //4.5초마다 구름 추가
    let cloud = {x : ranMinMax(-6, -5.5), y : 3, z : ranMinMax(-1, 4), rotateZ : ranMinMax(0.1, 4), scale : ranMinMax( 0.0009,  0.0065), color : getRandomColor(), speed : ran(0.0005)}
    heartMaker(cloud)
}, 4500)
function heartMaker(item){
    let shapes = new THREE.Shape( )
    shapes.moveTo( 25, 25 )
    shapes.bezierCurveTo( 25, 25, 20, 0, 0, 0 )
    shapes.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 )
    shapes.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 )
    shapes.bezierCurveTo( 60, 77, 80, 55, 80, 35 )
    shapes.bezierCurveTo( 80, 35, 80, 0, 50, 0 )
    shapes.bezierCurveTo( 35, 0, 25, 25, 25, 25 )
    let geometry = new THREE.ExtrudeGeometry( shapes, {            
        polygonOffset: false,depth: 3,bevelEnabled: true,bevelSegments: 2,
        steps:2,bevelSize:1,bevelThickness: 2,opacity: 1} )
    let mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: item.color,emissive : item.color, shininess: 255, opacity : 0.75, transparent: true } ) )
    mesh.name = 'cloud'
    mesh.userData.speed = item.speed
    mesh.scale.set(item.scale, item.scale, item.scale)
    mesh.rotateX(5)
    mesh.rotateZ(item.rotateZ) 
    mesh.position.set(item.x, item.y, item.z) 
    scene.add(mesh)        
}

//#9. 1차 랜더링
renderer.render( scene, camera )

//#10. 마우스 줌인, 줌아웃, 드래그 대응
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = true

//#11. 클릭 이벤트
window.addEventListener( 'click', function ( event ) {
    let x = (event.clientX / window.innerWidth) * 2 - 1
    let y = -(event.clientY / window.innerHeight) * 2 + 1
    let dir = new THREE.Vector3(x, y, -1)
    dir.unproject(camera)    
    let ray = new THREE.Raycaster(camera.position, dir.sub(camera.position).normalize())
    scene.children.forEach(sphere=>{ 
        if(sphere.type ==='Group'){
            sphere.children.forEach(child => {
                let intersects = ray.intersectObject(child)
                if ( intersects.length > 0 && intersects[0].object  && intersects[0].object.userData.className ==='gogo' ) {
                    window.open('https://lts0606.tistory.com', '_blank')
                } else if ( intersects.length > 0 && intersects[0].object  && intersects[0].object.userData.className ==='copy' ) {
                    let text = "lts06069@naver.com"
                    copyToClipboard(text).then(function() {
                        $('#liveToast').addClass('show')
                        setTimeout(function(){
                            $('#liveToast').removeClass('show')
                        },1750)
                    }, function(err) {
                        console.error('Async: Could not copy text: ', err)
                    })
                }
            })
        }
    })
})

//#12. 마우스 움직임 이벤트(CSS 커서효과)
window.addEventListener( 'mousemove', function (event){
    let mouse = new THREE.Vector2()
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1
    let ray = new THREE.Raycaster()
    ray.setFromCamera( mouse, camera )
    scene.children.forEach(sphere=>{ 
        if(sphere.type ==='Group'){
            sphere.children.forEach(child => {
                let intersects = ray.intersectObject(child)
                if ( intersects.length > 0 && intersects[0].object && intersects[0].object.userData.className ==='gogo' ) {
                    $('html,body').css('cursor', 'pointer')
                } else if ( intersects.length > 0 && intersects[0].object  && intersects[0].object.userData.className ==='copy' ) {
                    $('html,body').css('cursor', 'pointer')
                }
            })
        } else {
            $('html,body').css('cursor', 'default')
        }
    })      
})

//#13. 텍스트 생성
function TextMaker (text, x, y, z,textColor, clks){
    let font = new THREE.FontLoader().parse(fontData)
    let textGeometry = new THREE.TextGeometry(text,{font : font, size: 0.2,height: 0.03})
    const textMesh = new THREE.Mesh( textGeometry, new THREE.MeshPhongMaterial( { color: textColor, emissive : textColor, shininess: 255, wireframe: false } ) )
    textMesh.position.set(x,y,z+1)
    textMesh.name = text
    textMesh.userData.className = clks ? clks : 'text'
    textMesh.userData.data = text
    return textMesh
}
let group = new THREE.Group()
group.add(  TextMaker('안녕하세요.', 0-1, 1, 2+0.25, '#000000') )
group.add(  TextMaker('\n방문해주셔서', 0-1, 1, 2+0.25, '#000000') )
group.add(  TextMaker('\n감사합니다.', 1.35-1, 1, 2+0.25, '#000000') )
group.add(  TextMaker('\n\n좋은하루', 0-1, 1, 2+0.25, '#000000') )
group.add(  TextMaker('\n\n보내세요!', 0.91-1, 1, 2+0.25, '#000000') )
group.lookAt(-6, 4, 8)
group.userData.txtName ='yesItsme'
scene.add(group)
group = new THREE.Group()
group.add(TextMaker('\n\n\n홈페이지:', 0-1, 1, 2+0.25, '#ffc8c8', 'gogo') )
group.add(TextMaker('\n\n\nhttps://lts0606.tistory.com', 1-1, 1, 2+0.25, '#ffc8c8', 'gogo') )
group.add(TextMaker('\n\n\n\n메일:', 0-1, 1, 2+0.25, '#ffc8c8', 'copy') )
group.add(TextMaker('\n\n\n\nlts06069@naver.com', 0.55-1, 1, 2+0.25, '#ffc8c8', 'copy') )
group.lookAt(-6, 4, 8)
group.userData.txtName ='yesItsme'
scene.add(group)   

//#14. 에니메이션 함수
function animate() {
	requestAnimationFrame( animate )
    scene.children.forEach(arg=>{
        if(arg.name.indexOf('raining') > -1){
            let y = arg.position.y - arg.userData.speed
            if(y <= water.minY){
                y = water.maxY
                arg.position.setX(ranMinMax(water.minX, water.maxX))    
            }
            arg.position.setY(y)
        } else if(arg.name.indexOf('cloud') > -1){
            let x = arg.position.x + arg.userData.speed 
            if(x >= 6.7){
                scene.remove(arg)
            }
            arg.position.setX(x)
        } 
    })    
    controls.update()
    renderer.render( scene, camera )
}

animate()

//#15. 일반함수 : 랜덤1
function ran(max) {
    return Math.random() * (max) + 0.005
}  

//#16. 일반함수 : 랜덤2
function ranMinMax(min,max) {
    return Math.random() * (max - min) + min
}  

//#17. 일반함수 : 클립보드 복사
function copyToClipboard(textToCopy) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(textToCopy)
    } else {
        let textArea = document.createElement("textarea")
        textArea.value = textToCopy
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        textArea.style.top = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        return new Promise((res, rej) => {
            document.execCommand('copy') ? res() : rej()
            textArea.remove()
        })
    }
}

//# 일반함수 : 랜덤 컬러
function getRandomColor() {
    let letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}


