import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const ModelViewer = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const w = container.clientWidth
    const h = container.clientHeight
    console.log('[ModelViewer] container size:', w, h)

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000)
    camera.position.set(0, 0, 5)

    // Renderer — transparent bg so it inherits page background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.4
    container.appendChild(renderer.domElement)

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1))

    const key = new THREE.DirectionalLight(0xfff1e0, 1.5)
    key.position.set(5, 8, 5)
    // key.castShadow = true;
    // renderer.shadowMap.enabled = true;
    scene.add(key)

    const fill = new THREE.DirectionalLight(0xe0f0ff, 0.8)
    fill.position.set(-5, 2, -3)
    scene.add(fill)

    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
    scene.add(hemi);

    // const back = new THREE.DirectionalLight(0xffffff, 0.3);
    // back.position.set(0, 5, -5);
    // scene.add(back);

    // OrbitControls — rotate only, no pan, no zoom
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enablePan = false
    controls.enableZoom = false
    controls.enableDamping = true
    controls.dampingFactor = 0.06
    // Full 360° horizontal, restrict vertical so model can't flip upside-down
    controls.minPolarAngle = Math.PI * 0.15  // ~27° from top
    controls.maxPolarAngle = Math.PI * 0.6  // ~112° — just past horizontal, can't see underneath
    controls.target.set(0, 0, 0)

    // Load GLTF from public/3dModel/
    const loader = new GLTFLoader()
    loader.load(
      '/3dModel/Lex3d.gltf',
      (gltf) => {
        const model = gltf.scene
        scene.add(model)

        // Compute world-space bounds AFTER adding to scene so matrices are correct
        model.updateMatrixWorld(true)
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)

        // Scale FIRST, then offset position by scaled center.
        // If you set position first then scale, child node translations get
        // multiplied by the new scale and push geometry off-screen.
        const scale = 3.75 / maxDim
        model.scale.setScalar(scale)
        model.position.set(
          -center.x * scale,
          -center.y * scale,
          -center.z * scale
        )

        // Pull camera back to frame the normalized (3-unit tall) model
        const fov = camera.fov * (Math.PI / 180)
        const fitDistance = (3 / 2) / Math.tan(fov / 2) * 1.6
        camera.position.set(0, 0, fitDistance)
        controls.update()
      },
      undefined,
      (err) => console.error('[ModelViewer] load error:', err)
    )

    // Render loop
    let rafId
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const onResize = () => {
      const nw = container.clientWidth
      const nh = container.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(container)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      controls.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '70%' }} />
}

export default ModelViewer
