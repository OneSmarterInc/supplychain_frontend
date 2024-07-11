import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function HQBuilding(props) {
  const { nodes, materials } = useGLTF("/RUMAH_3.glb");
  return (
    <group {...props} dispose={null} scale={[2, 2, 2]}>
      <group
        position={[-0.235, 23.481, -0.323]}
        rotation={[-0.001, -0.018, -0.035]}
        scale={[2.188, 2.068, 2.358]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_1.geometry}
          material={materials.Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_2.geometry}
          material={materials["Material.007"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_3.geometry}
          material={materials["Material.006"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_4.geometry}
          material={materials["Material.009"]}
        />
      </group>
      <group
        position={[3.622, 21.371, -0.876]}
        rotation={[3.141, 0.018, -3.107]}
        scale={0.159}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.PINTU_1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials.PINTU_2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_2.geometry}
          material={materials.PINTU_3}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={nodes.Cube002.material}
        position={[5.142, 21.666, 0.05]}
        scale={[1.736, 0.888, 0.888]}
      />
      <group
        position={[3.981, 23.637, -2.596]}
        rotation={[-0.001, -0.018, -1.606]}
        scale={0.659}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube007.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube007_1.geometry}
          material={materials["KACA.001"]}
        />
      </group>
      <group
        position={[4.061, 27.204, 0.919]}
        rotation={[-0.001, -0.018, -1.606]}
        scale={0.637}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube010.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube010_1.geometry}
          material={materials.KACA}
        />
      </group>
      <group
        position={[4.101, 27.202, -1.379]}
        rotation={[-0.001, -0.018, -1.606]}
        scale={0.637}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube011.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube011_1.geometry}
          material={materials.KACA}
        />
      </group>
      <group
        position={[4.123, 27.201, -2.657]}
        rotation={[-0.001, -0.018, -1.606]}
        scale={0.637}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube012.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube012_1.geometry}
          material={materials.KACA}
        />
      </group>
      <group
        position={[2.334, 23.855, -4.346]}
        rotation={[1.105, 1.532, -2.677]}
        scale={0.659}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube013.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube013_1.geometry}
          material={materials["KACA.001"]}
        />
      </group>
      <group
        position={[-0.673, 23.96, -4.399]}
        rotation={[1.105, 1.532, -2.677]}
        scale={0.659}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube014.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube014_1.geometry}
          material={materials["KACA.001"]}
        />
      </group>
      <group
        position={[2.45, 27.169, -4.348]}
        rotation={[1.105, 1.532, -2.677]}
        scale={0.659}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_1.geometry}
          material={materials["KACA.001"]}
        />
      </group>
      <group
        position={[-0.557, 27.274, -4.401]}
        rotation={[1.105, 1.532, -2.677]}
        scale={0.659}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_1.geometry}
          material={materials["KACA.001"]}
        />
      </group>
      <group
        position={[0.61, 23.909, 2.109]}
        rotation={[1.57, -0.035, 0.018]}
        scale={0.572}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_1.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_2.geometry}
          material={materials["Material.005"]}
        />
      </group>
      <group
        position={[0.731, 27.338, 2.108]}
        rotation={[1.57, -0.035, 0.018]}
        scale={0.572}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002_1.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002_2.geometry}
          material={materials["Material.005"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stairs.geometry}
        material={materials.Stairs_material}
        position={[4.986, 20.705, 0.063]}
        rotation={[1.105, 1.532, -1.106]}
        scale={[1.79, 1, 1.441]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={nodes.Cube003.material}
        position={[4.896, 20.874, 0.018]}
        scale={[0.853, 0.508, 0.868]}
      />
    </group>
  );
}

useGLTF.preload("/RUMAH_3.glb");