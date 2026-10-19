"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import type { HotspotView, RoomObjectKind, Vec3 } from "@/lib/content/types";

type RoomCanvasProps = {
  hotspots: readonly HotspotView[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

const wood = "#6f4e37";
const woodDark = "#4a3428";
const shelfWood = "#8d6a4a";
const wall = "#f7f1e6";
const floor = "#c4a484";

export function RoomCanvas({ hotspots, activeId, onSelect }: RoomCanvasProps) {
  useEffect(() => {
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0.35, 1.72, 4.55], fov: 38 }}
      gl={{ antialias: true, powerPreference: "default" }}
      frameloop="demand"
    >
      <color attach="background" args={["#e7dfd1"]} />
      <ambientLight intensity={0.62} />
      <directionalLight position={[2.8, 4.8, 3.4]} intensity={1.2} />
      <directionalLight position={[-2.4, 2.2, -1]} intensity={0.28} color="#d5e7ef" />
      <RoomShell />
      {hotspots.map((hotspot) => (
        <HotspotObject
          key={hotspot.id}
          hotspot={hotspot}
          active={hotspot.id === activeId}
          onSelect={onSelect}
        />
      ))}
      <OrbitControls
        makeDefault
        enablePan={false}
        minPolarAngle={0.9}
        maxPolarAngle={1.38}
        minAzimuthAngle={-0.85}
        maxAzimuthAngle={0.85}
        minDistance={3.3}
        maxDistance={6.8}
        target={[0.1, 1.15, -0.2]}
      />
    </Canvas>
  );
}

function RoomShell() {
  return (
    <group>
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[6.7, 0.12, 5.5]} />
        <meshStandardMaterial color={floor} roughness={0.86} />
      </mesh>
      <mesh position={[0, 1.35, -2.74]}>
        <boxGeometry args={[6.7, 2.7, 0.1]} />
        <meshStandardMaterial color={wall} roughness={0.92} />
      </mesh>
      <mesh position={[-3.35, 1.35, 0]}>
        <boxGeometry args={[0.1, 2.7, 5.5]} />
        <meshStandardMaterial color="#f3ecdf" roughness={0.92} />
      </mesh>
      <mesh position={[3.35, 1.35, 0]}>
        <boxGeometry args={[0.1, 2.7, 5.5]} />
        <meshStandardMaterial color="#efe6d8" roughness={0.92} />
      </mesh>
      <mesh position={[0.2, 0.01, 0.7]} rotation={[-Math.PI / 2, 0, 0.1]}>
        <circleGeometry args={[1.15, 32]} />
        <meshStandardMaterial color="#a3543c" roughness={0.95} />
      </mesh>
    </group>
  );
}

function HotspotObject({
  hotspot,
  active,
  onSelect,
}: {
  hotspot: HotspotView;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const lit = hovered || active;

  return (
    <group
      position={hotspot.position}
      rotation={hotspot.rotation}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(hotspot.id);
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "";
      }}
    >
      <ObjectMesh kind={hotspot.object} lit={lit} />
    </group>
  );
}

function ObjectMesh({ kind, lit }: { kind: RoomObjectKind; lit: boolean }) {
  if (kind === "desk") return <Desk lit={lit} />;
  if (kind === "shelf") return <Shelf lit={lit} />;
  return <WindowMesh lit={lit} />;
}

function Solid({
  position,
  args,
  color,
  lit,
}: {
  position: Vec3;
  args: Vec3;
  color: string;
  lit: boolean;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial
        color={color}
        roughness={0.74}
        emissive={lit ? "#9a3412" : "#000000"}
        emissiveIntensity={lit ? 0.28 : 0}
      />
    </mesh>
  );
}

function Desk({ lit }: { lit: boolean }) {
  const legs: Vec3[] = [
    [-0.62, 0.36, -0.28],
    [0.62, 0.36, -0.28],
    [-0.62, 0.36, 0.28],
    [0.62, 0.36, 0.28],
  ];

  return (
    <group>
      <Solid position={[0, 0.74, 0]} args={[1.55, 0.08, 0.78]} color={wood} lit={lit} />
      {legs.map((position) => (
        <Solid
          key={position.join(":")}
          position={position}
          args={[0.08, 0.72, 0.08]}
          color={woodDark}
          lit={lit}
        />
      ))}
      <mesh position={[0.46, 1.05, 0.02]}>
        <cylinderGeometry args={[0.018, 0.02, 0.42, 10]} />
        <meshStandardMaterial
          color="#2b241d"
          emissive={lit ? "#9a3412" : "#000000"}
          emissiveIntensity={lit ? 0.2 : 0}
        />
      </mesh>
      <mesh position={[0.46, 1.28, 0.02]}>
        <coneGeometry args={[0.16, 0.16, 16]} />
        <meshStandardMaterial
          color="#f4efe4"
          roughness={0.55}
          emissive={lit ? "#9a3412" : "#000000"}
          emissiveIntensity={lit ? 0.18 : 0}
        />
      </mesh>
    </group>
  );
}

function Shelf({ lit }: { lit: boolean }) {
  const books: Array<{ position: Vec3; args: Vec3; color: string }> = [
    { position: [-0.34, 0.42, 0], args: [0.08, 0.42, 0.28], color: "#7f1d1d" },
    { position: [-0.22, 0.38, 0], args: [0.07, 0.34, 0.28], color: "#1e3a4c" },
    { position: [-0.12, 0.46, 0], args: [0.09, 0.5, 0.28], color: "#3f6212" },
    { position: [0.18, 1.16, 0], args: [0.08, 0.36, 0.28], color: "#9a3412" },
    { position: [0.3, 1.12, 0], args: [0.1, 0.3, 0.28], color: "#44403c" },
  ];

  return (
    <group>
      <Solid position={[0, 0.72, 0]} args={[0.12, 1.44, 0.42]} color={shelfWood} lit={lit} />
      <Solid position={[0.72, 0.72, 0]} args={[0.12, 1.44, 0.42]} color={shelfWood} lit={lit} />
      <Solid position={[0.36, 0.18, 0]} args={[0.9, 0.06, 0.42]} color={wood} lit={lit} />
      <Solid position={[0.36, 0.72, 0]} args={[0.9, 0.06, 0.42]} color={wood} lit={lit} />
      <Solid position={[0.36, 1.28, 0]} args={[0.9, 0.06, 0.42]} color={wood} lit={lit} />
      {books.map((book) => (
        <Solid
          key={book.position.join(":")}
          position={book.position}
          args={book.args}
          color={book.color}
          lit={lit}
        />
      ))}
    </group>
  );
}

function WindowMesh({ lit }: { lit: boolean }) {
  return (
    <group>
      <Solid position={[0, 0, 0]} args={[1.55, 1.15, 0.08]} color="#f7f4ee" lit={lit} />
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[1.28, 0.9]} />
        <meshStandardMaterial
          color="#b7d4de"
          roughness={0.25}
          metalness={0.05}
          emissive={lit ? "#9a3412" : "#8fb8c4"}
          emissiveIntensity={lit ? 0.35 : 0.18}
        />
      </mesh>
      <Solid position={[0, 0, 0.07]} args={[0.04, 0.9, 0.03]} color="#f7f4ee" lit={lit} />
      <Solid position={[0, 0, 0.07]} args={[1.28, 0.04, 0.03]} color="#f7f4ee" lit={lit} />
    </group>
  );
}
