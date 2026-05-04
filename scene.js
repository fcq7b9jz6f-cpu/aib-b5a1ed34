import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const canvas=document.getElementById('world-canvas');
const scene=new THREE.Scene();
scene.fog=new THREE.Fog(0xfff7ed,8,24);
const camera=new THREE.PerspectiveCamera(45,innerWidth/innerHeight,.1,100);camera.position.set(0,1.7,8);
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;
scene.add(new THREE.HemisphereLight(0xffffff,0xff8d63,2.2));const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(4,6,5);scene.add(key);const rim=new THREE.PointLight(0x6e5cff,45,18);rim.position.set(-4,2,4);scene.add(rim);
const group=new THREE.Group();scene.add(group);
const mats=[new THREE.MeshStandardMaterial({color:0xff8d63,roughness:.38,metalness:.25}),new THREE.MeshStandardMaterial({color:0x87f0cf,roughness:.5,metalness:.12}),new THREE.MeshStandardMaterial({color:0x6e5cff,roughness:.32,metalness:.35})];
for(let i=0;i<11;i++){const geo=i%3===0?new THREE.TorusKnotGeometry(.58,.18,96,16):i%3===1?new THREE.IcosahedronGeometry(.82,1):new THREE.BoxGeometry(1.1,1.1,1.1,3,3,3);const mesh=new THREE.Mesh(geo,mats[i%3]);const a=i/11*Math.PI*2;const r=2.1+(i%4)*.72;mesh.position.set(Math.cos(a)*r,(i%5-2)*.48,Math.sin(a)*r-1);mesh.rotation.set(i*.2,i*.37,0);group.add(mesh)}
const starsGeo=new THREE.BufferGeometry();const verts=[];for(let i=0;i<2200;i++){verts.push((Math.random()-.5)*18,(Math.random()-.5)*10,(Math.random()-.5)*18)}starsGeo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));const points=new THREE.Points(starsGeo,new THREE.PointsMaterial({color:0x101018,size:.018,transparent:true,opacity:.42}));scene.add(points);
const controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.enableZoom=false;controls.autoRotate=true;controls.autoRotateSpeed=.7;
let mx=0,my=0;addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5);my=(e.clientY/innerHeight-.5)});
function tick(t){group.rotation.y=t*.00018+mx*.45;group.rotation.x=my*.18;points.rotation.y=t*.00005;controls.update();renderer.render(scene,camera);requestAnimationFrame(tick)}requestAnimationFrame(tick);
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
if(window.gsap&&window.ScrollTrigger){gsap.registerPlugin(ScrollTrigger);gsap.to(group.position,{z:-2,y:-.8,scrollTrigger:{trigger:'#showcase',scrub:true,start:'top bottom',end:'bottom top'}});gsap.from('.cards article',{y:80,opacity:0,stagger:.12,scrollTrigger:{trigger:'.cards',start:'top 70%'}})}
if(window.Lenis){const lenis=new Lenis({lerp:.08});function raf(time){lenis.raf(time);requestAnimationFrame(raf)}requestAnimationFrame(raf)}