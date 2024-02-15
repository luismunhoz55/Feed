import { useFrame, extend, useLoader } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextureLoader } from "three";

extend({
  OrbitControls,
});

export function Points() {
  const pointsTexture = useLoader(TextureLoader, "/4.png");
  const geometryRef = useRef(null);

  const [sizes, setSizes] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
  });

  window.addEventListener("mousemove", (e) => {
    setCursor({
      x: e.clientX / sizes.width - 0.5,
      y: e.clientY / sizes.height - 0.5,
    });
  });

  const starsCount = 1000 * 3;

  useFrame((state, delta) => {
    // Parallax effect
    const parallaxX = cursor.x;
    const parallaxY = -cursor.y;
    state.camera.position.x +=
      ((parallaxX - state.camera.position.x) / 20) * delta * 50;
    state.camera.position.y +=
      ((parallaxY - state.camera.position.y) / 20) * delta * 50;

    // Points turning around
    // const radius = 5;
    // state.camera.lookAt(0, 0, 0);
    // state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.2) * radius;
    // state.camera.position.z = Math.cos(state.clock.elapsedTime * 0.2) * radius;
  });

  const positions = useMemo(() => {
    const positions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    return positions;
  }, []);

  return (
    <>
      <points>
        <bufferGeometry>
          <bufferAttribute
            ref={geometryRef}
            attach="attributes-position"
            count={starsCount}
            itemSize={3}
            array={positions}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color={0xffffff}
          sizeAttenuation={true}
          alphaMap={pointsTexture}
          transparent
        />
      </points>
    </>
  );
}
