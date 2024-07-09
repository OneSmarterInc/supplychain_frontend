import React, { useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { Link, useNavigate } from "react-router-dom";

// Ground component
function Ground({
  position,
  width,
  height,
  label,
  color,
  onClick = () => {},
  isSelected,
}) {
  return (
    <>
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          onClick(); // Ensure onClick is defined and callable
        }}
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={isSelected ? "yellow" : color} />
      </mesh>
      <Text
        position={[position[0], position[1] + 0.1, position[2]]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={6}
        color="white"
      >
        {label}
      </Text>
    </>
  );
}

// Box component
function Box({
  position,
  color,
  label,
  onClick = () => {},
  width,
  height,
  depth,
}) {
  return (
    <group position={position}>
      <mesh
        castShadow
        onClick={(e) => {
          e.stopPropagation();
          onClick(); // Ensure onClick is defined and callable
        }}
      >
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(width, height, depth)]} />
        <lineBasicMaterial color="black" />
      </lineSegments>
      <Text
        position={[0, height / 2 + 1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={5}
        color="white"
      >
        {label}
      </Text>
    </group>
  );
}

// Modal component
function Modal({ title, content, onClose }) {
  const formattedContent = content.replace(/\n/g, "<br/>");
  return (
    <div className="modal fixed flex justify-end p-5 h-40 top-0 left-0 z-40 w-screen">
      <div className="bg-blue-gray-500 min-w-96 p-2 flex justify-between items-start">
        <div className="modal-content ">
          <h2 className="text-xl text-teal-50">{title}</h2>
          <p
            className="text-lg text-yellow-100"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />
        </div>
        <span
          className="close hover:cursor-pointer hover:text-white hover:bg-red-500 px-1 rounded text-red-400 text-xl "
          onClick={onClose}
        >
          &times;
        </span>
      </div>
      <div className="text-3xl"> </div>
    </div>
  );
}

// Sidebar component
function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  return (
    <div
      className={`fixed left-0 z-40 px-4  top-0  w-60  h-screen bg-blue-gray-600 ${
        isOpen ? "open" : "hidden"
      } text-white`}
    >
      <div className="w-full flex justify-between items-center my-5">
        <h2 className="text-xl ">Head Quarters</h2>
        <button
          className="mx-4 text-red-500 text-2xl hover:text-white hover:bg-red-500 px-1 rounded"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
      <ul className="flex flex-col space-y-3 my-6 items-start">
        <li className="hover:bg-blue-gray-800 hover:cursor-pointer w-full p-2 rounded-md">
          <p onClick={() => navigate("/forecast")}>Forecast</p>
        </li>
        <li className="hover:bg-blue-gray-800 hover:cursor-pointer w-full p-2 rounded-md">
          <p onClick={() => navigate("/service")}>Service</p>
        </li>
      </ul>
    </div>
  );
}

// Camera Controls component
function CameraControls({
  targetPosition,
  targetLookAt,
  isManualControl,
  setIsManualControl,
}) {
  const { camera, gl } = useThree();

  useEffect(() => {
    const handleUserInteraction = () => {
      setIsManualControl(true);
    };

    gl.domElement.addEventListener("mousedown", handleUserInteraction);
    gl.domElement.addEventListener("wheel", handleUserInteraction);

    return () => {
      gl.domElement.removeEventListener("mousedown", handleUserInteraction);
      gl.domElement.removeEventListener("wheel", handleUserInteraction);
    };
  }, [gl.domElement, setIsManualControl]);

  useFrame(() => {
    if (!isManualControl) {
      camera.position.lerp(new THREE.Vector3(...targetPosition), 0.1);
      camera.lookAt(new THREE.Vector3(...targetLookAt));
    }
  });

  return null;
}

function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isManualControl, setIsManualControl] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const regions = {
    "Region 1": {
      position: [0, 0, 0],
      cameraPosition: [50, 50, 50],
      cameraLookAt: [0, 0, 0],
    },
    "Region 2": {
      position: [120, 0, 0],
      cameraPosition: [200, 70, 140],
      cameraLookAt: [0, 20, -60],
    },
    "Region 3": {
      position: [0, 0, -120],
      cameraPosition: [130, 60, 50],
      cameraLookAt: [0, 0, -120],
    },
    Surface: {
      position: [0, -1, -75],
      cameraPosition: [50, 50, -25],
      cameraLookAt: [0, 0, -75],
    },
  };

  const initialCameraPosition = [50, 50, 50];
  const initialCameraLookAt = [0, 0, 0];

  const [cameraPosition, setCameraPosition] = useState(initialCameraPosition);
  const [cameraLookAt, setCameraLookAt] = useState(initialCameraLookAt);

  const handleBoxClick = (title, content) => {
    setModalContent({ title, content });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRegionClick = (region) => {
    if (selectedRegion === region && !isManualControl) {
      setIsManualControl(true); // Allow free movement if the same region is clicked again
    } else {
      setSelectedRegion(region);
      setCameraPosition(regions[region].cameraPosition);
      setCameraLookAt(regions[region].cameraLookAt);
      setIsManualControl(false);
    }
  };

  const handleHQClick = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div style={{ height: "100vh", width: "100vw", background: "skyblue" }}>
      {isModalOpen && (
        <Modal
          title={modalContent.title}
          content={modalContent.content}
          onClose={closeModal}
        />
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <Canvas shadows camera={{ position: initialCameraPosition, fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 20, 10]} castShadow />

        <CameraControls
          targetPosition={cameraPosition}
          targetLookAt={cameraLookAt}
          isManualControl={isManualControl}
          setIsManualControl={setIsManualControl}
        />

        <Ground
          position={[0, 0, 0]}
          width={100}
          height={100}
          label="Region 1"
          color={"grey"}
          onClick={() => handleRegionClick("Region 1")}
          isSelected={selectedRegion === "Region 1"}
        />
        <Box
          position={[-40, 15, -40]}
          color="skyblue"
          label="Head Quarters"
          onClick={handleHQClick}
          width={20}
          height={30}
          depth={20}
        />

        <Ground
          position={[120, -1, 0]}
          width={100}
          height={100}
          label="Region 2"
          color={"grey"}
          onClick={() => handleRegionClick("Region 2")}
          isSelected={selectedRegion === "Region 2"}
        />
        <Box
          position={[150, 4, 0]}
          color="blue"
          label="Crossdocking"
          onClick={() =>
            handleBoxClick("Crossdocking", "Carrier: I,J,K,L,M,N in Region 2")
          }
          width={30}
          height={10}
          depth={30}
        />

        <Ground
          position={[0, 0, -120]}
          width={100}
          height={100}
          label="Region 3"
          color={"grey"}
          onClick={() => handleRegionClick("Region 3")}
          isSelected={selectedRegion === "Region 3"}
        />
        <Box
          position={[30, 3, -120]}
          color="blue"
          label="Crossdocking"
          onClick={() =>
            handleBoxClick("Crossdocking", "Carrier: I,J,K,L,M,N in Region 3")
          }
          width={30}
          height={10}
          depth={30}
        />

        <Ground
          position={[0, -1, -75]}
          width={10}
          height={100}
          label="Surface"
          color={"grey"}
        />

        <Ground
          position={[60, -2, 102]}
          width={3000}
          height={3000}
          label=""
          color={"lightgreen"}
        />
        <Box
          position={[-10, 3.75, 35]}
          color="white"
          label="Manufacturing Plant"
          onClick={() =>
            handleBoxClick("Manufacturing Plant", "first shift : 48955 units")
          }
          width={70}
          height={10}
          depth={20}
        />

        <Box
          position={[-10, 3, 22]}
          color="white"
          label=""
          onClick={() =>
            handleBoxClick("Manufacturing Plant", "first shift : 48955 units")
          }
          width={70}
          height={7.5}
          depth={6}
        />

        <Box
          position={[-30, 2.5, 4]}
          color="white"
          label="Inventory"
          onClick={() =>
            handleBoxClick("Inventory", "Alpha: 56700 | Beta : 432468")
          }
          width={30}
          height={7.5}
          depth={30}
        />

        <Box
          position={[120, 2.5, -35]}
          color="red"
          label="Distribution Center (owned)"
          onClick={() =>
            handleBoxClick(
              "Distribution Center",
              "Selected Suppliers are : \n Supplier D."
            )
          }
          width={70}
          height={10}
          depth={20}
        />

        <Box
          position={[0, 2.5, -155]}
          color="red"
          label="Distribution Center (sourced)"
          onClick={() =>
            handleBoxClick(
              "Distribution Center Outsourced",
              "Selected Suppliers are : \n Supplier D"
            )
          }
          width={70}
          height={10}
          depth={20}
        />

        <OrbitControls
          enableZoom={true}
          zoomSpeed={1.2}
          enablePan={true}
          panSpeed={0.8}
          enableRotate={true}
          rotateSpeed={0.8}
          maxPolarAngle={Math.PI / 2} // Limit vertical rotation to prevent going below ground
          minPolarAngle={0} // Prevent flipping the camera upside down
        />
      </Canvas>
    </div>
  );
}

export default LandingPage;
