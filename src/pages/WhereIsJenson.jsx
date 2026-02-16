import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useTexture, Html } from '@react-three/drei'; // Added Html import
import * as THREE from 'three';
import './WhereIsJenson.css';

// Keep using the import if the file is in src, or use '/earth-daymap.jpg' if in public
import earthTextureUrl from './earth-daymap.jpg'; 

const JENSON_PASSWORD = '6969';
const INDIA_LAT = 21.0;
const INDIA_LON = 78.0;

function latLonToXYZ(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return {
    x: -radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
}

function Earth() {
  const { x, y, z } = latLonToXYZ(INDIA_LAT, INDIA_LON, 1.015);
  
  // Safe texture loading
  let texture;
  try {
    texture = useLoader(THREE.TextureLoader, earthTextureUrl);
  } catch (e) {
    texture = null;
  }

  return (
    <group rotation={[0, (-INDIA_LON * Math.PI) / 180, 0]}>
      {/* 1. THE EARTH */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          color="white"
          metalness={0.1}
          roughness={0.5}
          emissiveMap={texture}
          emissive="white"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* 2. THE RED MARKER */}
      <mesh position={[x, y, z]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#c41e3a" toneMapped={false} />
      </mesh>

      {/* 3. THE JENSON UI (Now safely inside the 3D scene) */}
      <Html position={[x, y, z]} center occlude>
        <div className="jenson-arrow-wrap" style={{ position: 'relative', left: '0',top: '0' }}>
          <div className="jenson-arrow" />
          <img src="/jenson/jenson.png" alt="Jenson" className="jenson-photo" />
        </div>
      </Html>
    </group>
  );
}

function GlobeScene() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLightQlCt position={[5, 5, 5]} intensity={4.0} />
      <directionalLight position={[-3, -2, 2]} intensity={1.0} />
      <Earth />
      <OrbitControls enableZoom={true} enablePan={false} minDistance={1.5} maxDistance={4} />
    </>
  );
}

// ... (Rest of the file: Loader, WhereIsJenson, HackingCoords remains mostly the same) ...

export default function WhereIsJenson() {
  const [password, setPassword] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [wrongAttempt, setWrongAttempt] = useState(false);

  // REMOVED: const [indiaPos, setIndiaPos] ... (This caused the crash)

  const handleKey = (digit) => {
    if (password.length >= 4) return;
    setWrongAttempt(false);
    setPassword((p) => p + digit);
  };

  const handleBackspace = () => setPassword((p) => p.slice(0, -1));

  const handleSubmit = () => {
    if (password === JENSON_PASSWORD) {
      setAccessGranted(true);
      setWrongAttempt(false);
    } else {
      setWrongAttempt(true);
      setPassword('');
    }
  };

  if (!accessGranted) {
    // ... (Your existing lock screen code) ...
    return (
      <div className="jenson-page jenson-lock">
        <div className="jenson-scanlines" aria-hidden="true" />
        <div className="jenson-noise" aria-hidden="true" />
        <div className="jenson-lock-content">
          <div className="jenson-badge">CLASSIFIED</div>
          <h1 className="jenson-title">RESTRICTED ACCESS</h1>
          <p className="jenson-sub">Enter clearance code</p>
          <div className="jenson-dots">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={password.length > i ? 'filled' : ''}>•</span>
            ))}
          </div>
          <div className="jenson-keypad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((d) => (
              <button key={d} type="button" className="jenson-key" onClick={() => handleKey(String(d))}>{d}</button>
            ))}
            <button type="button" className="jenson-key jenson-key-back" onClick={handleBackspace}>⌫</button>
            <button type="button" className="jenson-key jenson-key-go" onClick={handleSubmit}>GO</button>
          </div>
          {wrongAttempt && <p className="jenson-error">ACCESS DENIED</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="jenson-page jenson-globe">
      <div className="jenson-scanlines subtle" aria-hidden="true" />
      <div className="jenson-grid-overlay" aria-hidden="true" />
      <div className="jenson-globe-header">
        <span className="jenson-badge small">CLASSIFIED</span>
        <h1>LIVE SATELLITE TRACKING</h1>
        <p className="jenson-subtitle">TARGET ACQUIRED · ENCRYPTED FEED</p>
      </div>
      <div className="jenson-layout">
        <div className="jenson-terminal">
          <div className="jenson-terminal-header">
            <span>/// SYS.TRACK</span>
            <span className="jenson-blink">_</span>
          </div>
          <div className="jenson-terminal-body">
            <HackingCoords />
          </div>
        </div>
        <div className="jenson-canvas-wrap">
          <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }} gl={{ antialias: true }}>
            <Suspense fallback={null}>
              <GlobeScene />
            </Suspense>
          </Canvas>
          {/* REMOVED: The external Jenson div. It is now inside the Canvas via <Html> */}
        </div>
      </div>
      <p className="jenson-location">TARGET: JENSON · INDIA · COORDINATES LOCKED</p>
    </div>
  );
}

function HackingCoords() {
  const [lines, setLines] = useState([]);
  const [currentLat, setCurrentLat] = useState('21.');
  const [currentLon, setCurrentLon] = useState('78.');

  useEffect(() => {
    const realLat = INDIA_LAT;
    const realLon = INDIA_LON;
    const fakeLines = [
      'INIT SATELLITE LINK...',
      'DECRYPTING COORDINATES...',
      'BYPASSING FIREWALL 7/7',
      'ACCESS GRANTED',
      'TRACKING VECTOR: ACTIVE',
    ];
    let lineIndex = 0;
    const addLine = () => {
      setLines((prev) => [...prev.slice(-8), fakeLines[lineIndex % fakeLines.length]]);
      lineIndex += 1;
    };
    const t1 = setInterval(addLine, 600);
    const t2 = setInterval(() => {
      if (Math.random() > 0.35) {
        setCurrentLat((realLat + (Math.random() - 0.5) * 0.08).toFixed(4));
        setCurrentLon((realLon + (Math.random() - 0.5) * 0.08).toFixed(4));
      }
    }, 350);
    return () => {
      clearInterval(t1);
      clearInterval(t2);
    };
  }, []);

  return (
    <>
      {lines.map((l, i) => <div key={i} className="jenson-term-line">&gt; {l}</div>)}
      <div className="jenson-term-coords"><span>LAT</span> {currentLat}</div>
      <div className="jenson-term-coords"><span>LON</span> {currentLon}</div>
      <div className="jenson-term-coords alt">ALT 0.0km · PRECISION 0.00m</div>
      <div className="jenson-term-cursor">&gt; _</div>
    </>
  );
}