import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@0.138/examples/jsm/loaders/FBXLoader.js";
import { TGALoader } from "https://cdn.jsdelivr.net/npm/three@0.138/examples/jsm/loaders/TGALoader.js";
const tgaLoader = new TGALoader();

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

    this._setupCamera();
    this._setupLight();
    this._setupModel();
    this._setupControls();

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  _setupControls() {
    new OrbitControls(this._camera, this._divContainer);
  }

  _setupModel() {
    const loader = new FBXLoader();
    loader.load("data/KumDori_Baker_High.FBX", (object) => {
      tgaLoader.load("data/KumDori_Baker_Cap_MAT_Base_color.TGA", (texture) => {
        object.traverse((child) => {
          if (child.isMesh) {
            // 모델의 메쉬에 TGA 텍스처를 설정합니다.
            child.material.map = texture;
          }
        });
      });
      tgaLoader.load(
        "data/KumDori_Baker_Cap_MAT_Normal_OpenGL.TGA",
        (texture) => {
          object.traverse((child) => {
            if (child.isMesh) {
              // 모델의 메쉬에 TGA 텍스처를 설정합니다.
              child.material.map = texture;
            }
          });
        }
      );
      tgaLoader.load(
        "data/KumDori_Baker_Cloth_MAT_Base_color.TGA",
        (texture) => {
          object.traverse((child) => {
            if (child.isMesh) {
              // 모델의 메쉬에 TGA 텍스처를 설정합니다.
              child.material.map = texture;
            }
          });
        }
      );
      tgaLoader.load(
        "data/KumDori_Baker_Cloth_MAT_Normal_OpenGL.TGA",
        (texture) => {
          object.traverse((child) => {
            if (child.isMesh) {
              // 모델의 메쉬에 TGA 텍스처를 설정합니다.
              child.material.map = texture;
            }
          });
        }
      );
      tgaLoader.load("data/KumDori_Main_Body_MAT_Base_color.TGA", (texture) => {
        object.traverse((child) => {
          if (child.isMesh) {
            // 모델의 메쉬에 TGA 텍스처를 설정합니다.
            child.material.map = texture;
          }
        });
      });
      tgaLoader.load(
        "data/KumDori_Main_Body_MAT_Normal_OpenGL.TGA",
        (texture) => {
          object.traverse((child) => {
            if (child.isMesh) {
              // 모델의 메쉬에 TGA 텍스처를 설정합니다.
              child.material.map = texture;
            }
          });
        }
      );
      tgaLoader.load("data/KumDori_Main_Head_MAT_Base_color.TGA", (texture) => {
        object.traverse((child) => {
          if (child.isMesh) {
            // 모델의 메쉬에 TGA 텍스처를 설정합니다.
            child.material.map = texture;
          }
        });
      });
      tgaLoader.load("KumDori_Main_Head_MAT_Normal_OpenGL.TGA", (texture) => {
        object.traverse((child) => {
          if (child.isMesh) {
            // 모델의 메쉬에 TGA 텍스처를 설정합니다.
            child.material.map = texture;
          }
        });
      });
      this._scene.add(object);
      this._scene.background = new THREE.Color(0xffffff); // 검은색 배경
      this.position.set(0, 0, 0);
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
  }

  _setupLight() {
    const color = 0xffffff;
    const intensity = 2;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this._camera.add(light);
    // this._scene.add(light);
  }

  update(time) {
    time *= 0.001; // second unit
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
