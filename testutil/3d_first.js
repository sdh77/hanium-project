import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@0.138/examples/jsm/loaders/FBXLoader.js";
import { TGALoader } from "https://cdn.jsdelivr.net/npm/three@0.138/examples/jsm/loaders/TGALoader.js";

const loader = new FBXLoader();
const tgaLoader = new TGALoader();
const tgaTexturePathsLow = [
  // "data/KumDori_Main_Body_MAT_Base_color.TGA",
  // "data/KumDori_Baker_Cloth_MAT_Base_color.TGA",
  // "data/KumDori_Main_Head_MAT_Base_color.TGA",
  // "data/KumDori_Baker_Cap_MAT_Base_color.TGA",
  "data/KumDori_Main_Body_MAT_Base_color.png",
  "data/KumDori_Baker_Cloth_MAT_Base_color.png",
  "data/KumDori_Main_Head_MAT_Base_color.png",
  "data/KumDori_Baker_Cap_MAT_Base_color.png",
];

class App {
  constructor() {
    const divContainer = document.querySelector("#webgl-container");
    this._divContainer = divContainer;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    divContainer.appendChild(renderer.domElement);

    this._renderer = renderer;

    const scene = new THREE.Scene();
    this._scene = scene;

    this._loadedTextures = 0;
    this._textures = []; // _textures 배열 초기화
    Promise.all(
      tgaTexturePathsLow.map((tgaTexturePath) => {
        return new Promise((resolve, reject) => {
          tgaLoader.load(
            tgaTexturePath,
            (texture) => {
              this._loadedTextures++;
              this._textures.push(texture); // 배열에 텍스처 추가
              resolve(texture);
            },
            undefined,
            reject
          );
        });
      })
    )
      .then((textures) => {
        // 모든 텍스처 로딩이 완료된 후에 모델 렌더링을 시작
        this._textures = textures; // textures 배열로 설정
        this.render();
      })
      .catch((error) => {
        console.error("Error loading TGA textures:", error);
      });

    this._setupCamera();
    this._setupLight();
    this._setupModel();
    this._setupControls();

    window.onresize = this.resize.bind(this);
    this.resize();

    this._loadedTextures = 0;

    Promise.all(
      tgaTexturePathsLow.map((tgaTexturePath) => {
        return new Promise((resolve, reject) => {
          tgaLoader.load(
            tgaTexturePath,
            (texture) => {
              this._loadedTextures++;
              resolve(texture);
            },
            undefined,
            reject
          );
        });
      })
    )
      .then((textures) => {
        // 모든 텍스처 로딩이 완료된 후에 모델 렌더링을 시작
        this._textures = textures;
        this.render();
      })
      .catch((error) => {
        console.error("Error loading TGA textures:", error);
      });
  }

  _setupControls() {
    this._controls = new OrbitControls(this._camera, this._divContainer);
  }

  _zoomFit(object3D, camera, viewMode, bFront) {
    const box = new THREE.Box3().setFromObject(object3D);
    const sizeBox = box.getSize(new THREE.Vector3()).length();
    const centerBox = box.getCenter(new THREE.Vector3());

    let offsetX = 0,
      offsetY = 0,
      offsetZ = 0;
    viewMode === "X"
      ? (offsetX = 1)
      : viewMode === "Y"
      ? (offsetY = 1)
      : (offsetZ = 1);

    if (!bFront) {
      offsetX *= -1;
      offsetY *= -1;
      offsetZ *= -1;
    }
    camera.position.set(
      centerBox.x + offsetX,
      centerBox.y + offsetY,
      centerBox.z + offsetZ
    );

    const halfSizeModel = sizeBox * 0.5;
    const halfFov = THREE.Math.degToRad(camera.fov * 0.5);
    const distance = halfSizeModel / Math.tan(halfFov);
    const direction = new THREE.Vector3()
      .subVectors(camera.position, centerBox)
      .normalize();
    const position = direction.multiplyScalar(distance).add(centerBox);

    camera.position.copy(position);
    camera.near = sizeBox / 100;
    camera.far = sizeBox * 100;

    camera.updateProjectionMatrix();

    camera.lookAt(centerBox.x, centerBox.y, centerBox.z);
    this._controls.target.set(centerBox.x, centerBox.y, centerBox.z);
  }

  _setupModel() {
    const material = new THREE.MeshNormalMaterial();

    this._clock = new THREE.Clock();
    let index = 0;
    loader.load("data/KumDori_Baker_High.FBX", (lowPolyObject) => {
      lowPolyObject.traverse((child) => {
        if (child.isMesh) {
          let texture;
          console.dir(child.material); //fbx에 저장되어있는 텍스처 위치..
          console.log(this._textures); //fbx텍스터파일
          for (let i = 0; i < child.material.length; i++) {
            if (child.material[i].name === "KumDori_Main_Body_MAT19") {
              const textureIndex = 0; // 원하는 텍스처 인덱스 설정
              const material = new THREE.MeshMatcapMaterial({
                map: this._textures[textureIndex],
              });
              child.material[i] = material; // 메터리얼 변경
              console.log(textureIndex);
            } else if (child.material[i].name === "KumDori_Baker_Cloth_MAT5") {
              const textureIndex = 2; // 원하는 텍스처 인덱스 설정
              const material = new THREE.MeshMatcapMaterial({
                map: this._textures[textureIndex],
              });
              child.material[i] = material;
              console.log(textureIndex);
            } else if (child.material[i].name === "KumDori_Main_Head_MAT19") {
              const textureIndex = 1; // 원하는 텍스처 인덱스 설정
              const material = new THREE.MeshMatcapMaterial({
                map: this._textures[textureIndex],
              });
              child.material[i] = material;
              console.log(textureIndex);
            } else if (child.material[i].name === "KumDori_Baker_Cap_MAT5") {
              const textureIndex = 3; // 원하는 텍스처 인덱스 설정
              const material = new THREE.MeshMatcapMaterial({
                map: this._textures[textureIndex],
              });
              child.material[i] = material;
              console.log(textureIndex);
            }
          }
        }
      });

      this._scene.add(lowPolyObject);
      this._zoomFit(lowPolyObject, this._camera, "Z", true);
      this._scene.background = new THREE.Color(0xffffff);
    });
  }

  _setupCamera() {
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    camera.position.z = 2;
    this._camera = camera;

    this._scene.add(this._camera);
  }

  _setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 10, 10);

    this._scene.add(light);
  }

  update(time) {
    time *= 0.001; // second unit

    const delta = this._clock.getDelta();
    // this._mixer와 관련된 부분은 주석 처리
    // ...

    this._controls.update();
  }

  render() {
    if (this._loadedTextures < tgaTexturePathsLow.length) {
      // 아직 텍스처 로딩이 완료되지 않았다면 재귀적으로 render 호출
      requestAnimationFrame(() => this.render());
      return;
    }

    this._renderer.render(this._scene, this._camera);
    this.update();
  }

  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }
}

window.onload = function () {
  new App();
};
