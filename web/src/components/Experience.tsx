import { Canvas } from "@react-three/fiber";
import { Points } from "./Points";

export function Experience() {
  return (
    <div className="fixed z-[-1] top-0 left-0 w-full h-full">
      <Canvas>
        <Points />
      </Canvas>
    </div>
  );
}
