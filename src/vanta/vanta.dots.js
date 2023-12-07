import {
  BufferGeometry,
  DynamicDrawUsage,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Vector3,
} from "three";

import { VantaBase } from "./_base.js";
import { rn } from "./helpers.js";

class Effect extends VantaBase {
  static initClass() {
    this.prototype.defaultOptions = {
      color: 0xff8820,
      color2: 0xff8820,
      backgroundColor: 0x222222,
      size: 3,
      spacing: 35,
      showLines: true,
    };
  }

  onInit() {
    let camera = (this.camera = new PerspectiveCamera(
      50,
      this.width / this.height,
      0.1,
      5000,
    ));
    camera.position.x = 0;
    camera.position.y = 250;
    camera.position.z = 50;
    camera.tx = 0;
    camera.ty = 50;
    camera.tz = 350;
    camera.lookAt(0, 0, 0);
    this.scene.add(camera);

    let starsGeometry = (this.starsGeometry = new BufferGeometry());
    let i, j, k, l, star, starsMaterial, starField;
    let space = this.options.spacing;
    const points = [];

    for (i = k = -30; k <= 30; i = ++k) {
      for (j = l = -30; l <= 30; j = ++l) {
        star = new Vector3();
        star.x = i * space + space / 2;
        star.y = rn(0, 5) - 150;
        star.z = j * space + space / 2;
        points.push(star);
      }
    }
    starsGeometry.setFromPoints(points);

    starsMaterial = new PointsMaterial({
      color: this.options.color,
      size: this.options.size,
    });
    starField = this.starField = new Points(starsGeometry, starsMaterial);
    this.scene.add(starField);

    if (this.options.showLines) {
      let material = new LineBasicMaterial({
        color: this.options.color2,
      });
      let linesGeo = new BufferGeometry();
      const points = [];
      for (i = 0; i < 200; i++) {
        let f1 = rn(40, 60);
        let f2 = f1 + rn(12, 20);
        // https://math.stackexchange.com/questions/1585975/how-to-generate-random-points-on-a-sphere
        let z = rn(-1, 1);
        let r = Math.sqrt(1 - z * z);
        let theta = rn(0, Math.PI * 2);
        let y = Math.sin(theta) * r;
        let x = Math.cos(theta) * r;
        points.push(new Vector3(x * f1, y * f1, z * f1));
        points.push(new Vector3(x * f2, y * f2, z * f2));
      }
      linesGeo.setFromPoints(points);
      this.linesMesh = new LineSegments(linesGeo, material);
      this.scene.add(this.linesMesh);
    }

    // this.geometry = new BoxGeometry( 10, 10, 10 );
    // this.material = new MeshLambertMaterial({
    //   color: this.options.color,
    //   emissive: this.options.color,
    //   emissiveIntensity: 0.75
    // });
    // this.cube = new Mesh( this.geometry, this.material );
    // this.scene.add(this.cube);

    // const c = this.camera = new PerspectiveCamera( 75, this.width/this.height, 0.1, 1000 );
    // c.position.z = 30;
    // this.scene.add(c);

    // const light = new HemisphereLight( 0xffffff, this.options.backgroundColor , 1 );
    // this.scene.add(light);
  }

  onUpdate() {
    const starsGeometry = this.starsGeometry;
    const starField = this.starField;

    for (
      let j = 0;
      j < starsGeometry.attributes.position.array.length;
      j += 3
    ) {
      const x = starsGeometry.attributes.position.array[j];
      const y = starsGeometry.attributes.position.array[j + 1];
      const z = starsGeometry.attributes.position.array[j + 2];
      // let i = starsGeometry.vertices[j]
      const newY = y + 0.1 * Math.sin(z * 0.02 + x * 0.015 + this.t * 0.02);
      starsGeometry.attributes.position.array[j + 1] = newY;
    }

    starsGeometry.attributes.position.setUsage(DynamicDrawUsage);
    starsGeometry.computeVertexNormals();
    starsGeometry.attributes.position.needsUpdate = true;

    const c = this.camera;
    const rate = 0.003;
    c.position.x += (c.tx - c.position.x) * rate;
    c.position.y += (c.ty - c.position.y) * rate;
    c.position.z += (c.tz - c.position.z) * rate;
    c.lookAt(0, 0, 0);

    if (this.linesMesh) {
      this.linesMesh.rotation.z += 0.002;
      this.linesMesh.rotation.x += 0.0008;
      this.linesMesh.rotation.y += 0.0005;
      // starField.rotation.y += (this.mouseX * 0.1 - starField.rotation.y) * 0.01
    }
  }

  onMouseMove(x, y) {
    this.camera.tx = (x - 0.5) * 100; // -50 to 50
    this.camera.ty = 50 + y * 50; // 50 to 100
  }

  onRestart() {
    this.scene.remove(this.starField);
  }
}

Effect.initClass();

export { Effect as Dots };
