// ====== 可直接使用的 OrbitControls（非module版本） ======

THREE.OrbitControls = function ( object, domElement ) {

  this.object = object;
  this.domElement = ( domElement !== undefined ) ? domElement : document;

  this.enabled = true;

  this.target = new THREE.Vector3();

  this.minDistance = 0;
  this.maxDistance = Infinity;

  this.enableDamping = false;
  this.dampingFactor = 0.05;

  this.rotateSpeed = 1.0;
  this.zoomSpeed = 1.2;

  this.panSpeed = 0.3;

  const scope = this;

  let state = 'none';
  let start = new THREE.Vector2();
  let end = new THREE.Vector2();

  function onMouseDown(event) {
    state = 'rotate';
    start.set(event.clientX, event.clientY);
  }

  function onMouseMove(event) {
    if (!scope.enabled) return;
    if (state === 'rotate') {
      end.set(event.clientX, event.clientY);
      const dx = (end.x - start.x) * 0.005;
      const dy = (end.y - start.y) * 0.005;

      scope.object.rotation.y -= dx * scope.rotateSpeed;
      scope.object.rotation.x -= dy * scope.rotateSpeed;

      start.copy(end);
    }
  }

  function onMouseUp() {
    state = 'none';
  }

  function onWheel(event) {
    if (!scope.enabled) return;

    const delta = event.deltaY > 0 ? 1 : -1;
    scope.object.position.z += delta * scope.zoomSpeed;
  }

  this.domElement.addEventListener('mousedown', onMouseDown);
  this.domElement.addEventListener('mousemove', onMouseMove);
  this.domElement.addEventListener('mouseup', onMouseUp);
  this.domElement.addEventListener('wheel', onWheel);

  this.update = function () {};

};