import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@0.138/examples/jsm/loaders/FBXLoader.js";
import { TGALoader } from "https://cdn.jsdelivr.net/npm/three@0.138/examples/jsm/loaders/TGALoader.js";

const hellobtn = document.querySelector(".hello");
const shakeEyebtn = document.querySelector(".shakeEye");
const shackHeadbtn = document.querySelector(".shackHead");
const leftHeadbtn = document.querySelector(".leftHead");
const rightHeadbtn = document.querySelector(".rightHead");
const jumpbtn = document.querySelector(".jump");
const shakeEarbtn = document.querySelector(".shakeEar");
const loader = new FBXLoader();
const tgaLoader = new TGALoader();

const tgaTexture = [
  "JS/data/shef/KumDori_Main_Body_MAT_Base_color.TGA",
  "JS/data/shef/KumDori_Baker_Cloth_MAT_Base_color.TGA",
  "JS/data/shef/KumDori_Main_Head_MAT_Base_color.TGA",
  "JS/data/shef/KumDori_Baker_Cap_MAT_Base_color.TGA",
];
class App {
  constructor() {
    const divContainer = document.querySelector("#webgl-container");
    this._divContainer = divContainer;

    // stopAllAnimations 에서 사용할 배열 초기화. (모든 동작 넣어놓은 배열)
    this._animationActions = [];

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); //alpha: true -> 배경화면 투명
    renderer.setPixelRatio(window.devicePixelRatio);
    divContainer.appendChild(renderer.domElement);

    this._renderer = renderer;

    const scene = new THREE.Scene();
    this._scene = scene;
    /********************************** */
    this._loadedTextures = 0;
    this._textures = []; // _textures 배열 초기화
    Promise.all(
      tgaTexture.map((tgaTexturePath) => {
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
    /************************ */

    this._setupCamera();
    this._setupLight();
    this._setupModel();
    this._setupControls();

    window.onresize = this.resize.bind(this);
    this.resize();
    this._loadedTextures = 0;
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
  _texture_set() {}
  _setupModel() {
    this._clock = new THREE.Clock();

    loader.load("JS/data/shef/shef.FBX", (object) => {
      object.traverse((child) => {
        if (child.isMesh) {
          let texture;
          console.dir(child.material); //fbx에 저장되어있는 텍스처 위치..
          console.log(this._textures); //fbx텍스터파일
          /*
          0: 몸통(노랑)
          1: 옷(하양)
          2: 머리(얼룩 노랑)
          3: 모자(하양)
          */
          for (let i = 0; i < child.material.length; i++) {
            if (child.material[i].name === "KumDori_Main_Body_MAT19") {
              const textureIndex = 0; // 원하는 텍스처 인덱스 설정
              const material = new THREE.MeshMatcapMaterial({
                map: this._textures[textureIndex],
              });
              child.material[i] = material; // 메터리얼 변경
              console.log(textureIndex);
            } else if (child.material[i].name === "KumDori_Baker_Cloth_MAT5") {
              const textureIndex = 1; // 원하는 텍스처 인덱스 설정
              const material = new THREE.MeshMatcapMaterial({
                map: this._textures[textureIndex],
              });
              child.material[i] = material;
              console.log(textureIndex);
            } else if (child.material[i].name === "KumDori_Main_Head_MAT19") {
              const textureIndex = 2; // 원하는 텍스처 인덱스 설정
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

      this._mixer = new THREE.AnimationMixer(object);

      console.log(object.animations);
      // console.dir(object.animations[0]);
      // 고개 도리도리 (default)
      const dorido = object.animations[1];
      const doridoAction = this._mixer.clipAction(dorido);
      this._animationActions.push(doridoAction);
      document.addEventListener("doridos", () => {
        this.stopAllAnimations();
        doridoAction.play();
      });
      // 안녕
      const hellodo = object.animations[2];
      const hellodoAction = this._mixer.clipAction(hellodo);
      hellodoAction.loop = THREE.LoopOnce; //애니메이션 1회만 실행하는 설정이야!
      this._animationActions.push(hellodoAction);
      document.addEventListener("hellodos", () => {
        this.stopAllAnimations();
        hellodoAction.play();
      });
      // 잠들기
      const eyeShack = object.animations[3];
      const eyeShackAction = this._mixer.clipAction(eyeShack);
      this._animationActions.push(eyeShackAction);
      shakeEyebtn.addEventListener("click", () => {
        this.stopAllAnimations();
        eyeShackAction.play();
        before = 0;
      });
      document.addEventListener("closeEyes", () => {
        this.stopAllAnimations();
        eyeShackAction.play();
      });
      // 귀 쫑긋
      const eardo = object.animations[4];
      const eardoAction = this._mixer.clipAction(eardo);
      this._animationActions.push(eardoAction);
      document.addEventListener("eardos", () => {
        this.stopAllAnimations();
        eardoAction.play();
      });
      // 말하기? --> 고개 이상하게 까닥거림
      const speakdo = object.animations[5];
      const speakdoAction = this._mixer.clipAction(speakdo);
      this._animationActions.push(speakdoAction);
      document.addEventListener("speakdos", () => {
        this.stopAllAnimations();
        speakdoAction.play();
      });
      // 깜짝놀람 --> 고개 뒤로 까닥거림
      const suprizedo = object.animations[6];
      const suprizedoAction = this._mixer.clipAction(suprizedo);
      this._animationActions.push(suprizedoAction);
      document.addEventListener("suprizedos", () => {
        this.stopAllAnimations();
        suprizedoAction.play();
      });
      // 점프
      const jumpdo = object.animations[7];
      const jumpdoAction = this._mixer.clipAction(jumpdo);
      this._animationActions.push(jumpdoAction);
      document.addEventListener("jumpdos", () => {
        this.stopAllAnimations();
        jumpdoAction.play();
      });
      // 갸우뚱
      const headRdo = object.animations[8];
      const headRdoAction = this._mixer.clipAction(headRdo);
      this._animationActions.push(headRdoAction);
      document.addEventListener("headRdos", () => {
        this.stopAllAnimations();
        headRdoAction.play();
      });

      /*
      const earShack = object.animations[1];
      const earShackAction = this._mixer.clipAction(earShack);
      earShackAction.play();
      shakeEarbtn.addEventListener("click", function () {
        stopAllAnimations();
        earShackAction.play();
        before = 1;
      });
      const headShack = object.animations[2];
      const headShackAction = this._mixer.clipAction(headShack);
      shackHeadbtn.addEventListener("click", function () {
        stopAllAnimations();
        headShackAction.play();
        before = 2;
      });
      const jump = object.animations[3];
      const jumpAction = this._mixer.clipAction(jump);
      jumpbtn.addEventListener("click", function () {
        stopAllAnimations();
        jumpAction.play();
        before = 3;
      });
      const headLeft = object.animations[4];
      const headLeftAction = this._mixer.clipAction(headLeft);
      headLeftAction.loop = THREE.LoopOnce;

      leftHeadbtn.addEventListener("click", function () {
        stopAllAnimations();
        headLeftAction.play();
        before = 4;
      });
      const hello = object.animations[5];
      const helloAction = this._mixer.clipAction(hello);
      helloAction.loop = THREE.LoopOnce;
      helloAction.play();

      hellobtn.addEventListener("click", function () {
        stopAllAnimations();
        helloAction.play();
        before = 5;
      });
      const headRight = object.animations[6];
      const headRightAction = this._mixer.clipAction(headRight);
      headRightAction.loop = THREE.LoopOnce;

      rightHeadbtn.addEventListener("click", function () {
        stopAllAnimations();
        headRightAction.play();
        before = 6;
      });

      // 애니메이션 클립의 길이를 수정 (예: 0.5초로 제한)
      // const desiredAnimationLength = 3;
      // clip.duration = desiredAnimationLength;

      // helloAction.play();
      /*
      helloAction.loop = THREE.LoopOnce;

      helloAction.play();

      // 애니메이션이 완료되면 이벤트를 처리할 수 있습니다.
      helloAction.addEventListener("finished", function () {
        earShackAction.play();
      });
      */

      // action.setEffectiveTimeScale(0.001);
      const frameInterval = 5; // 2배로 느린 프레임 간격
      this._mixer.timeScale = 1 / frameInterval;
      this._scene.add(object);
      this._zoomFit(object, this._camera, "Z", true);
      // this._scene.background = new THREE.Color(0x76758a);

      this._clock = new THREE.Clock();
    });
  }

  stopAllAnimations() {
    this._animationActions.forEach((action) => {
      action.stop();
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
    const intensity = 2;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    //this._scene.add(light);
    this._camera.add(light);
  }

  update(time) {
    time *= 0.001; // second unit

    const delta = this._clock.getDelta();
    if (this._mixer) this._mixer.update(delta);
  }

  render(time) {
    this._renderer.render(this._scene, this._camera);
    this.update(time);

    requestAnimationFrame(this.render.bind(this));
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
