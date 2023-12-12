import { VantaBase } from "./_base.js"
import {
  Camera,
  Color,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  Vector3,
} from "three"

class ShaderBase extends VantaBase {
  constructor(userOptions) {
    Color.prototype.toVector = function () {
      return new Vector3(this.r, this.g, this.b)
    }

    super(userOptions)
    this.updateUniforms = this.updateUniforms.bind(this)
  }
  init() {
    this.mode = "shader"
    this.uniforms = {
      iTime: {
        type: "f",
        value: 1.0,
      },
      iResolution: {
        type: "v2",
        value: new Vector2(1, 1),
      },
      iDpr: {
        type: "f",
        value: window.devicePixelRatio || 1,
      },
      iMouse: {
        type: "v2",
        value: new Vector2(this.mouseX || 0, this.mouseY || 0),
      },
    }
    super.init()
    if (this.fragmentShader) {
      this.initBasicShader()
    }
  }
  setOptions(userOptions) {
    super.setOptions(userOptions)
    this.updateUniforms()
  }
  initBasicShader(
    fragmentShader = this.fragmentShader,
    vertexShader = this.vertexShader,
  ) {
    if (!vertexShader) {
      vertexShader =
        "uniform float uTime;\nuniform vec2 uResolution;\nvoid main() {\n  gl_Position = vec4( position, 1.0 );\n}"
    }
    this.updateUniforms()
    if (typeof this.valuesChanger === "function") {
      this.valuesChanger() // Some effects define this themselves
    }
    const material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })
    const texPath = this.options.texturePath
    if (texPath) {
      this.uniforms.iTex = {
        type: "t",
        value: new TextureLoader().load(texPath),
      }
    }
    const mesh = new Mesh(new PlaneGeometry(2, 2), material)
    this.scene.add(mesh)
    this.camera = new Camera()
    this.camera.position.z = 1
  }

  updateUniforms() {
    const newUniforms = {}
    let k, v
    for (k in this.options) {
      v = this.options[k]
      if (k.toLowerCase().indexOf("color") !== -1) {
        newUniforms[k] = {
          type: "v3",
          value: new Color(v).toVector(),
        }
      } else if (typeof v === "number") {
        newUniforms[k] = {
          type: "f",
          value: v,
        }
      }
    }
    return Object.assign(this.uniforms, newUniforms)
  }
  resize() {
    super.resize()
    this.uniforms.iResolution.value.x = this.width / this.scale
    this.uniforms.iResolution.value.y = this.height / this.scale
  }
}

export { ShaderBase }
