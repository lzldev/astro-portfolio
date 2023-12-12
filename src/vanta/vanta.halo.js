import { LinearFilter, WebGLRenderTarget, RGBAFormat as RGBFormat } from "three"
import { ShaderBase } from "./_shaderBase.js"

class Halo extends ShaderBase {
  constructor(userOptions) {
    super(userOptions)
  }

  getDefaultOptions() {
    return {
      baseColor: 0x001a59,
      color2: 0xf2e735,
      backgroundColor: 0x131a43,
      amplitudeFactor: 1.0,
      ringFactor: 1.0,
      rotationFactor: 1.0,
      xOffset: 0,
      yOffset: 0,
      size: 1.0,
      speed: 1.0,
      mouseEase: true,
      scaleMobile: window.devicePixelRatio,
      scale: window.devicePixelRatio,
      scaleMobile: 1,
      scale: 1,
    }
  }

  onInit() {
    const pars = {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      format: RGBFormat,
    }
    const ww = (this.width * window.devicePixelRatio) / this.scale
    const hh = (this.height * window.devicePixelRatio) / this.scale
    this.bufferTarget = new WebGLRenderTarget(ww, hh, pars)
    this.bufferFeedback = new WebGLRenderTarget(ww, hh, pars)
  }
  initBasicShader(fragmentShader, vertexShader) {
    super.initBasicShader(fragmentShader, vertexShader)
    this.uniforms.iBuffer = {
      type: "t",
      value: this.bufferTarget.texture,
    }
  }
  onUpdate() {
    this.uniforms.iBuffer.value = this.bufferFeedback.texture

    const renderer = this.renderer
    if (!renderer || renderer === null || !this.scene || !this.camera) {
      throw "null [onUpdate]"
    }
    renderer.setRenderTarget(this.bufferTarget)
    // renderer.clear();
    renderer.render(this.scene, this.camera)
    renderer.setRenderTarget(null)
    renderer.clear()

    // Swap, to prevent shader using the same input as output
    let temp = this.bufferTarget
    this.bufferTarget = this.bufferFeedback
    this.bufferFeedback = temp
  }

  onResize() {
    if (this.bufferTarget) {
      const ww = (this.width * window.devicePixelRatio) / this.scale
      const hh = (this.height * window.devicePixelRatio) / this.scale

      this.bufferTarget.setSize(ww, hh)
      this.bufferFeedback.setSize(ww, hh)
    }
  }

  onDestroy() {
    this.bufferTarget = null
    this.bufferFeedback = null
  }
}

import HaloShader from "./shaders/halo3.frag?raw"
Halo.prototype.fragmentShader = HaloShader
export { Halo }
