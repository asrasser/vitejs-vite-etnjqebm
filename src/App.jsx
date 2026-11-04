// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  Info,
  Check,
  Play,
  CheckCircle2,
  AlertTriangle,
  Hexagon,
} from 'lucide-react';

// --- LANDING SCREEN ---
const LandingScreen = ({ onStart }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setIsLoading(true);
    setTimeout(() => {
      onStart();
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center bg-white z-50 overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at center, #475569 2px, transparent 2px),
          linear-gradient(to right, #e2e8f0 1px, transparent 1px),
          linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        backgroundPosition: '-20px -20px, 0 0, 0 0',
      }}
    >
      {/* Floating Parallax Squares */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[15%] left-[10%] w-6 h-6 bg-black rounded-sm"
      ></motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[20%] right-[15%] w-10 h-10 bg-black rounded-sm"
      ></motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[20%] left-[15%] w-12 h-12 bg-slate-200/60 rounded-sm backdrop-blur-sm"
      ></motion.div>
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[30%] right-[25%] w-8 h-8 bg-slate-200/60 rounded-sm backdrop-blur-sm"
      ></motion.div>

      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[15%] right-[10%] w-14 h-14 bg-slate-400 rounded-sm"
      ></motion.div>

      {/* Main Center Card */}
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-[90%] max-w-[600px] bg-white border border-slate-300 rounded-2xl p-12 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-t-[4px] border-t-black"
      >
        <h1 className="text-[28px] md:text-[32px] font-bold text-black mb-0 font-cairo">
          حاسبة الجيب وجيب التمام
        </h1>
        <h2 className="text-[18px] font-bold text-[#334155] mt-4 font-sans tracking-wide">
          Sine & Cosine Calculator
        </h2>
        <p className="text-[14px] text-[#94a3b8] mt-2 font-cairo">
          أداة هندسية تفاعلية لحساب أطوال الأضلاع والزوايا بدقة
        </p>

        <div style={{ perspective: '1000px' }} className="mt-8">
          <motion.button
            whileHover={{
              scale: 1.02,
              rotateX: 5,
              rotateY: -5,
              boxShadow: '0 15px 25px -5px rgba(0,0,0,0.3)',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            onClick={handleStart}
            disabled={isLoading}
            className="bg-black text-white rounded-full px-8 py-3 flex items-center justify-center gap-2 font-sans font-medium w-32 h-[48px]"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <>
                Start
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 14 4 9 9 4"></polyline>
                  <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
                </svg>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- SELECT SHAPE SCREEN ---
const SelectShapeScreen = ({ onSelect }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 p-6 z-40 overflow-y-auto"
  >
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 font-cairo">
      Select Shape / اختر الشكل
    </h2>

    <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full justify-center">
      {/* CARD 1: Triangular Room */}
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        onClick={() => onSelect('room')}
        className="flex-1 cursor-pointer bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 rounded-3xl p-6 transition-all group shadow-xl hover:shadow-[0_20px_50px_rgba(16,185,129,0.2)] flex flex-col items-center text-center"
      >
        {/* Photorealistic representation placeholder (SVG icon styled realistically) */}
        <div className="w-full aspect-video rounded-2xl bg-slate-900 mb-6 overflow-hidden relative shadow-inner border border-slate-800 flex items-center justify-center">
          <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <svg
            className="w-32 h-32 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] transform group-hover:scale-110 transition-transform duration-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 21l9-18 9 18H3z" />
            <path d="M12 12v9" />
            <path d="M7 13l5-9" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2 font-cairo group-hover:text-emerald-400 transition-colors">
          Triangular Room
        </h3>
        <p className="text-slate-400 font-cairo text-lg">
          غرفة مثلثة - احسب جدار مجهول
        </p>
      </motion.div>

      {/* CARD 2: Other Shapes (Disabled) */}
      <motion.div className="flex-1 bg-slate-800/30 border border-slate-700/50 rounded-3xl p-6 opacity-60 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-6 right-6 bg-slate-700 text-slate-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Soon
        </div>
        <div className="w-full aspect-video rounded-2xl bg-slate-900/50 mb-6 flex items-center justify-center border border-slate-800/50">
          <Hexagon className="w-24 h-24 text-slate-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-300 mb-2 font-cairo">
          Other
        </h3>
        <p className="text-slate-500 font-cairo text-lg">
          أشكال أخرى - قادم قريبا
        </p>
      </motion.div>
    </div>
  </motion.div>
);

// --- FORM SCREEN (In the sky) ---
const FormScreen = ({ onSubmit }) => {
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [A, setA] = useState('');
  const [error, setError] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    if (!b || !c || !A) {
      setError(true);
      setTimeout(() => setError(false), 600); // Reset shake
      return;
    }
    setIsCalculating(true);
    setTimeout(() => {
      onSubmit(Number(b), Number(c), Number(A));
      setIsCalculating(false);
    }, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 flex flex-col items-center justify-center z-30 overflow-y-auto"
      style={{
        background:
          'linear-gradient(180deg, #1e3a8a 0%, #60a5fa 50%, #f0f9ff 100%)',
      }}
    >
      {/* Decorative Clouds (CSS) */}
      <div className="absolute top-20 left-10 w-40 h-12 bg-white/20 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-60 h-20 bg-white/30 rounded-full blur-2xl"></div>

      <motion.div
        animate={
          error
            ? { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } }
            : {}
        }
        className="relative z-10 w-full max-w-lg p-8 md:p-12 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_30px_60px_rgba(0,0,0,0.15)] flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-2 font-cairo drop-shadow-sm">
          أدخل قياسات الغرفة
        </h2>
        <div className="bg-slate-900/10 px-6 py-3 rounded-xl mb-8 font-mono text-slate-800 font-bold border border-slate-900/10 backdrop-blur-sm">
          a² = b² + c² - 2bc·cos(A)
        </div>

        <div className="w-full space-y-6">
          <div className="space-y-2">
            <label className="text-slate-800 font-bold font-cairo flex items-center justify-between">
              <span>الضلع b (متر)</span>
              <span className="text-slate-700/60 font-mono">Side b</span>
            </label>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder="مثال: 7"
              className="w-full bg-white/50 border-2 border-white/40 focus:border-blue-500 rounded-xl px-5 py-4 text-xl font-mono text-slate-900 outline-none transition-all placeholder:text-slate-400 shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <label className="text-slate-800 font-bold font-cairo flex items-center justify-between">
              <span>الضلع c (متر)</span>
              <span className="text-slate-700/60 font-mono">Side c</span>
            </label>
            <input
              type="number"
              value={c}
              onChange={(e) => setC(e.target.value)}
              placeholder="مثال: 5"
              className="w-full bg-white/50 border-2 border-white/40 focus:border-blue-500 rounded-xl px-5 py-4 text-xl font-mono text-slate-900 outline-none transition-all placeholder:text-slate-400 shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <label className="text-slate-800 font-bold font-cairo flex items-center justify-between">
              <span>الزاوية المحصورة A (درجة)</span>
              <span className="text-slate-700/60 font-mono">Angle A°</span>
            </label>
            <input
              type="number"
              value={A}
              onChange={(e) => setA(e.target.value)}
              placeholder="مثال: 60"
              className="w-full bg-white/50 border-2 border-white/40 focus:border-blue-500 rounded-xl px-5 py-4 text-xl font-mono text-slate-900 outline-none transition-all placeholder:text-slate-400 shadow-inner"
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 text-red-600 font-bold font-cairo flex items-center gap-2 bg-red-100/80 px-4 py-2 rounded-lg">
            <AlertTriangle className="w-5 h-5" />
            الرجاء إدخال جميع القيم
          </div>
        )}

        <div style={{ perspective: '1000px' }} className="mt-10 w-full">
          <motion.button
            whileHover={{
              scale: 1.02,
              rotateX: 4,
              rotateY: -4,
              boxShadow: '0 15px 30px -5px rgba(0,0,0,0.15)',
            }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCalculate}
            disabled={isCalculating}
            style={{ border: '1.5px solid #e2e8f0' }}
            className="relative w-full bg-white text-black font-bold text-[16px] py-[14px] rounded-[12px] shadow-sm flex items-center justify-center transition-shadow font-sans"
          >
            <div className="absolute top-[-1.5px] right-[-1.5px] w-[4px] h-[4px] bg-black"></div>
            <div className="absolute bottom-[-1.5px] left-[-1.5px] w-[4px] h-[4px] bg-black"></div>

            {isCalculating ? (
              <svg width="24" height="24" viewBox="0 0 24 24">
                <motion.path
                  d="M12 3 L21 19 L3 19 Z"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 0.33, 0.33, 0.66, 0.66, 1, 1] }}
                  transition={{ duration: 0.6, repeat: 2, ease: 'linear' }}
                />
              </svg>
            ) : (
              'Calculate'
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- LOADING SCREEN ---
const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-50"
  >
    <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
      <svg
        className="absolute inset-0 w-full h-full text-slate-800"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="50,15 90,85 10,85" />
      </svg>
      <motion.svg
        className="absolute inset-0 w-full h-full text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        <polygon points="50,15 90,85 10,85" />
      </motion.svg>
    </div>
    <h2 className="text-xl text-white font-mono tracking-widest uppercase">
      Building 3D World...
    </h2>
  </motion.div>
);

// --- 3D WORLD COMPONENT ---
// Photorealistic Blender Style with Step-by-Step Animation
const ThreeWorld = ({ b, c, A_deg, onComplete, finalResult }) => {
  const mountRef = useRef(null);
  const labelBRef = useRef(null);
  const labelCRef = useRef(null);
  const labelARef = useRef(null);
  const labelResultRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE SETUP - Photorealistic settings
    const scene = new THREE.Scene();

    // Beautiful Sky gradient texture
    const createSkyTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#1e3a8a'); // Deep sky blue
      grad.addColorStop(0.5, '#60a5fa'); // Mid blue
      grad.addColorStop(1, '#f0f9ff'); // Horizon glow
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 2, 512);
      return new THREE.CanvasTexture(canvas);
    };
    scene.background = createSkyTexture();
    scene.fog = new THREE.FogExp2('#e0f2fe', 0.015);

    let screenW = window.innerWidth;
    let screenH = window.innerHeight;

    // CAMERA
    const aspect = screenW / screenH;
    const frustumSize = 25;
    // We use Orthographic for the blueprint look, transitioning to slight orbit
    const camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      1000
    );
    camera.position.set(0, 20, 20);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(screenW, screenH);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Cinematic tone mapping
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.domElement.style.display = 'block';
    mountRef.current.appendChild(renderer.domElement);

    // CINEMATIC LIGHTING (Cycles style)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(-15, 25, 15);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.left = -20;
    dirLight.shadow.camera.right = 20;
    dirLight.shadow.camera.top = 20;
    dirLight.shadow.camera.bottom = -20;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // TEXTURE GENERATION (No external URLs needed)
    const createNoiseTexture = (r, g, b_val, noiseIntensity, scale = 1) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = `rgb(${r},${g},${b_val})`;
      ctx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 3000; i++) {
        ctx.fillStyle = `rgba(0,0,0,${Math.random() * noiseIntensity})`;
        ctx.fillRect(Math.random() * 256, Math.random() * 256, scale, scale);
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * noiseIntensity})`;
        ctx.fillRect(Math.random() * 256, Math.random() * 256, scale, scale);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      return tex;
    };

    const grassTex = createNoiseTexture(45, 76, 30, 0.15, 2);
    grassTex.repeat.set(20, 20);
    const concreteTex = createNoiseTexture(160, 160, 160, 0.1, 1);

    // MATERIALS (PBR)
    const concreteMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      map: concreteTex,
      roughness: 0.9,
      metalness: 0.1,
    });

    const glowingMaterial = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x22c55e,
      emissiveIntensity: 1.5,
      roughness: 0.2,
    });

    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d5c2a,
      map: grassTex,
      roughness: 1,
      metalness: 0,
      transparent: true,
      opacity: 0,
    });

    const woodMaterial = new THREE.MeshStandardMaterial({
      color: 0x5c4033,
      roughness: 0.9,
      metalness: 0.1,
    });

    // GROUND
    const groundGeo = new THREE.PlaneGeometry(300, 300);
    const ground = new THREE.Mesh(groundGeo, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // --- MATH & COORDINATES ---
    const A_rad = (A_deg * Math.PI) / 180;

    // Origin at Angle A
    const p1 = new THREE.Vector3(0, 0, 0);
    // Wall C goes along X
    const p2 = new THREE.Vector3(c, 0, 0);
    // Wall B goes by Angle A
    const p3 = new THREE.Vector3(b * Math.cos(-A_rad), 0, b * Math.sin(-A_rad));

    // Center scene for camera
    const centerX = (p1.x + p2.x + p3.x) / 3;
    const centerZ = (p1.z + p2.z + p3.z) / 3;
    const offset = new THREE.Vector3(-centerX, 0, -centerZ);

    const r1 = p1.clone().add(offset);
    const r2 = p2.clone().add(offset);
    const r3 = p3.clone().add(offset);

    const wallHeight = 2.5;
    const wallThickness = 0.4;

    const wallsGroup = new THREE.Group();
    scene.add(wallsGroup);

    // Helper: Build walls
    const createWall = (vStart, vEnd, mat) => {
      const length = vStart.distanceTo(vEnd);
      // Extend geometry slightly so corners overlap seamlessly
      const geo = new THREE.BoxGeometry(
        length + wallThickness,
        wallHeight,
        wallThickness
      );
      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const midPoint = new THREE.Vector3()
        .addVectors(vStart, vEnd)
        .multiplyScalar(0.5);
      mesh.position.set(midPoint.x, wallHeight / 2, midPoint.z);

      const angle = Math.atan2(vStart.z - vEnd.z, vStart.x - vEnd.x);
      mesh.rotation.y = -angle;

      mesh.scale.y = 0.001;
      wallsGroup.add(mesh);
      return mesh;
    };

    // The 3 walls
    const meshB = createWall(r1, r3, concreteMaterial);
    const meshC = createWall(r1, r2, concreteMaterial);
    const meshA = createWall(r2, r3, glowingMaterial);

    // Angle A Arc
    const arcPoints = [];
    const arcRadius = Math.min(b, c) * 0.3 + 0.5;
    for (let i = 0; i <= 20; i++) {
      const theta = (i / 20) * -A_rad;
      arcPoints.push(
        new THREE.Vector3(
          r1.x + arcRadius * Math.cos(theta),
          0.1,
          r1.z + arcRadius * Math.sin(theta)
        )
      );
    }
    const arcCurve = new THREE.CatmullRomCurve3(arcPoints);
    const arcGeo = new THREE.TubeGeometry(arcCurve, 20, 0.08, 8, false);
    const arcMesh = new THREE.Mesh(arcGeo, glowingMaterial);
    arcMesh.scale.setScalar(0.001);
    scene.add(arcMesh);

    // Architectural Additions (Door & Roof)
    const doorGeo = new THREE.BoxGeometry(0.9, 2.0, wallThickness + 0.1);
    const door = new THREE.Mesh(doorGeo, woodMaterial);
    const wallCMid = r1.clone().lerp(r2, 0.5);
    door.position.set(wallCMid.x, 2.0 / 2, wallCMid.z);
    door.castShadow = true;
    door.visible = false;
    scene.add(door);

    const roofShape = new THREE.Shape();
    roofShape.moveTo(r1.x, r1.z);
    roofShape.lineTo(r2.x, r2.z);
    roofShape.lineTo(r3.x, r3.z);
    roofShape.lineTo(r1.x, r1.z);
    const roofGeo = new THREE.ShapeGeometry(roofShape);
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.9,
      side: THREE.DoubleSide,
    });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.rotation.x = Math.PI / 2;
    roof.position.y = wallHeight + 0.05;
    roof.receiveShadow = true;
    roof.castShadow = true;
    roof.visible = false;
    scene.add(roof);

    // Particle System for Wall A (Glowing)
    const particles = [];
    const particleGeo = new THREE.BoxGeometry(0.15, 0.15, 0.15);

    // Dust Particle System (Debris)
    const dustParticles = [];
    const dustGeo = new THREE.BoxGeometry(0.08, 0.08, 0.08);
    const dustMat = new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 1,
      metalness: 0,
      transparent: true,
    });

    const spawnDust = (vStart, vEnd) => {
      if (Math.random() > 0.4) return; // Control density
      const p = new THREE.Mesh(dustGeo, dustMat);
      const basePoint = vStart.clone().lerp(vEnd, Math.random());
      p.position.set(
        basePoint.x + (Math.random() - 0.5) * 0.5,
        0.1,
        basePoint.z + (Math.random() - 0.5) * 0.5
      );
      p.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.04,
        Math.random() * 0.06 + 0.02,
        (Math.random() - 0.5) * 0.04
      );
      p.life = 1.0;
      scene.add(p);
      dustParticles.push(p);
    };

    // Easing Functions for Smooth Animation
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

    // --- LABEL POSITIONS ---
    const posB = r1
      .clone()
      .lerp(r3, 0.5)
      .add(new THREE.Vector3(0, wallHeight + 1, 0));
    const posC = r1
      .clone()
      .lerp(r2, 0.5)
      .add(new THREE.Vector3(0, wallHeight + 1, 0));
    const posA_ang = r1
      .clone()
      .add(
        new THREE.Vector3(
          arcRadius * 1.5 * Math.cos(-A_rad / 2),
          1,
          arcRadius * 1.5 * Math.sin(-A_rad / 2)
        )
      );
    const posResult = r2
      .clone()
      .lerp(r3, 0.5)
      .add(new THREE.Vector3(0, wallHeight + 1.5, 0));

    // ANIMATION LOOP & TIMELINE
    let startTime = Date.now();
    let isOrbiting = false;
    let currentOrbitAngle = 0;

    // Custom Drag Controls (Orbit)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetCameraAngle = 0;

    const handlePointerDown = () => {
      isDragging = true;
    };
    const handlePointerUp = () => {
      isDragging = false;
    };
    const handlePointerMove = (e) => {
      if (isDragging) {
        const deltaX =
          e.movementX ||
          (e.touches && e.touches[0].clientX - previousMousePosition.x) ||
          0;
        targetCameraAngle -= deltaX * 0.01;
      }
      if (e.touches)
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handlePointerDown);
    dom.addEventListener('mouseup', handlePointerUp);
    dom.addEventListener('mousemove', handlePointerMove);
    dom.addEventListener('touchstart', (e) => {
      isDragging = true;
      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    });
    dom.addEventListener('touchend', handlePointerUp);
    dom.addEventListener('touchmove', handlePointerMove);

    const updateLabel = (pos, ref, visible) => {
      if (!ref.current) return;
      if (visible) {
        const proj = pos.clone().project(camera);
        const x = (proj.x * 0.5 + 0.5) * screenW;
        const y = (proj.y * -0.5 + 0.5) * screenH;
        ref.current.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        ref.current.style.opacity = '1';
      } else {
        ref.current.style.opacity = '0';
      }
    };

    let hasCompleted = false;

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsed = Date.now() - startTime;

      const getEasedProgress = (start, duration) => {
        const t = clamp((elapsed - start) / duration, 0, 1);
        return easeInOutCubic(t);
      };

      // 1. Ground fades in (0-500)
      groundMaterial.opacity = clamp(elapsed / 500, 0, 1);

      // 2. Wall b builds (500-1500)
      const progB = getEasedProgress(500, 1000);
      meshB.scale.y = Math.max(0.001, progB);
      if (elapsed > 500 && elapsed < 1500) spawnDust(r1, r3);
      let showB = progB > 0.5;

      // 3. Angle A arc draws (1500-2500)
      const progAng = getEasedProgress(1500, 1000);
      arcMesh.scale.setScalar(Math.max(0.001, progAng));
      let showAng = progAng > 0.5;

      // 4. Wall c builds (2500-3500)
      const progC = getEasedProgress(2500, 1000);
      meshC.scale.y = Math.max(0.001, progC);
      if (elapsed > 2500 && elapsed < 3500) spawnDust(r1, r2);
      let showC = progC > 0.5;

      // 5. Pause (3500-4500)

      // 6. Wall A (Unknown) Hero Build (4500-6000)
      const progA = getEasedProgress(4500, 1500);
      meshA.scale.y = Math.max(0.001, progA);

      // Hero glowing particles
      if (elapsed > 4500 && elapsed < 6000) {
        if (Math.random() > 0.3) {
          const p = new THREE.Mesh(particleGeo, glowingMaterial);
          const basePoint = r2.clone().lerp(r3, Math.random());
          p.position.set(
            basePoint.x,
            wallHeight * progA + Math.random() * 0.5,
            basePoint.z
          );
          scene.add(p);
          particles.push({ mesh: p, life: 1.0 });
        }
      }

      // Update Dust Physics
      for (let i = dustParticles.length - 1; i >= 0; i--) {
        const p = dustParticles[i];
        p.life -= 0.015;
        p.position.add(p.velocity);
        p.velocity.y -= 0.0015; // gravity
        if (p.position.y < 0.05) p.position.y = 0.05; // floor collision
        p.scale.setScalar(p.life);
        p.material.opacity = p.life;
        if (p.life <= 0) {
          scene.remove(p);
          dustParticles.splice(i, 1);
        }
      }

      // Update Hero Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.02;
        p.mesh.position.y += 0.06;
        p.mesh.scale.setScalar(p.life);
        if (p.life <= 0) {
          scene.remove(p.mesh);
          particles.splice(i, 1);
        }
      }

      // Cinematic Camera Shake during Hero build
      let shakeX = 0,
        shakeY = 0,
        shakeZ = 0;
      if (elapsed > 4500 && elapsed < 6000) {
        const shakeInt = (1 - progA) * 0.15; // peaks at start, fades to 0
        shakeX = (Math.random() - 0.5) * shakeInt;
        shakeY = (Math.random() - 0.5) * shakeInt;
        shakeZ = (Math.random() - 0.5) * shakeInt;
      }

      // 7 & 8. Result + Solidify + Complete
      let showRes = elapsed > 6500;

      if (elapsed > 6500 && !hasCompleted) {
        meshA.material = concreteMaterial; // Solidify to real concrete
        roof.visible = true;
        door.visible = true;
        isOrbiting = true;
        hasCompleted = true;
        onComplete();
      }

      // Update Labels Projection
      updateLabel(posB, labelBRef, showB);
      updateLabel(posA_ang, labelARef, showAng);
      updateLabel(posC, labelCRef, showC);
      updateLabel(posResult, labelResultRef, showRes);

      // Camera Orbiting Logic (Smooth lerp if dragging vs auto)
      if (isOrbiting && !isDragging) {
        targetCameraAngle += 0.0015; // slow cinematic auto orbit
      }

      // Apply camera position (isometric orbit) + shake
      const radius = 22;
      camera.position.x = Math.sin(targetCameraAngle) * radius + shakeX;
      camera.position.z = Math.cos(targetCameraAngle) * radius + shakeZ;
      camera.position.y = 18 + shakeY;
      camera.lookAt(shakeX, shakeY, shakeZ);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      screenW = window.innerWidth;
      screenH = window.innerHeight;
      const aspect = screenW / screenH;
      camera.left = (-frustumSize * aspect) / 2;
      camera.right = (frustumSize * aspect) / 2;
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(screenW, screenH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handlePointerDown);
      dom.removeEventListener('mouseup', handlePointerUp);
      dom.removeEventListener('mousemove', handlePointerMove);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [b, c, A_deg]);

  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] overflow-hidden cursor-grab active:cursor-grabbing">
      <div ref={mountRef} className="w-full h-full block" />

      {/* 3D FLOATING HTML LABELS */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 20 }}
      >
        <div
          ref={labelBRef}
          className="absolute top-0 left-0 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-2 border-slate-300 font-bold text-slate-800 opacity-0 transition-opacity duration-300 flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border border-blue-300 font-mono">
            b
          </div>
          <span className="text-xl font-mono">{b}m</span>
        </div>

        <div
          ref={labelARef}
          className="absolute top-0 left-0 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-2 border-slate-600 font-bold text-white opacity-0 transition-opacity duration-300 flex items-center gap-3"
        >
          <span className="text-emerald-400 text-2xl">&ang;</span>
          <span className="text-xl font-mono">A = {A_deg}&deg;</span>
        </div>

        <div
          ref={labelCRef}
          className="absolute top-0 left-0 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-2 border-slate-300 font-bold text-slate-800 opacity-0 transition-opacity duration-300 flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 border border-purple-300 font-mono">
            c
          </div>
          <span className="text-xl font-mono">{c}m</span>
        </div>

        <div
          ref={labelResultRef}
          className="absolute top-0 left-0 bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 rounded-2xl shadow-[0_20px_40px_rgba(16,185,129,0.4)] border-2 border-emerald-300 font-bold text-white opacity-0 transition-opacity duration-500 flex items-center gap-4 scale-110"
        >
          <div className="bg-white/20 p-2 rounded-full">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <div>
            <div className="text-sm text-emerald-100 font-cairo">
              الجدار المجهول a
            </div>
            <div className="text-2xl font-mono tracking-wider">
              {finalResult ? finalResult.toFixed(3) : 0}m
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [stage, setStage] = useState('LANDING'); // LANDING, SELECT, FORM, LOADING, 3D
  const [inputs, setInputs] = useState({ b: 0, c: 0, A: 0 });
  const [resultA, setResultA] = useState(0);
  const [showResultPanel, setShowResultPanel] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  const startApp = () => setStage('SELECT');

  const selectShape = (shape) => {
    if (shape === 'room') setStage('FORM');
  };

  const handleFormSubmit = (b, c, A) => {
    setInputs({ b, c, A });
    // Calculate a² = b² + c² - 2bc*cos(A)
    const A_rad = (A * Math.PI) / 180;
    const a2 = b * b + c * c - 2 * b * c * Math.cos(A_rad);
    const a = Math.sqrt(Math.max(0, a2));
    setResultA(a);

    setStage('LOADING');
    setTimeout(() => {
      setStage('3D');
    }, 2000);
  };

  const handleAnimationComplete = () => {
    setShowResultPanel(true);
  };

  const reset = () => {
    setStage('SELECT');
    setShowResultPanel(false);
    setShowSteps(false);
  };

  return (
    <div className="w-full h-screen bg-black overflow-hidden font-sans select-none">
      {/* Import Arabic Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
        .font-cairo { font-family: 'Cairo', sans-serif; }
      `}</style>

      <AnimatePresence mode="wait">
        {stage === 'LANDING' && (
          <LandingScreen key="landing" onStart={startApp} />
        )}
        {stage === 'SELECT' && (
          <SelectShapeScreen key="select" onSelect={selectShape} />
        )}
        {stage === 'FORM' && (
          <FormScreen key="form" onSubmit={handleFormSubmit} />
        )}
        {stage === 'LOADING' && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {/* 3D Stage is kept mounted once reached, but visible only when active */}
      {stage === '3D' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="fixed top-0 left-0 w-[100vw] h-[100vh] overflow-hidden z-10"
        >
          <ThreeWorld
            b={inputs.b}
            c={inputs.c}
            A_deg={inputs.A}
            onComplete={handleAnimationComplete}
            finalResult={resultA}
          />

          {/* Top Controls in 3D Mode */}
          <div className="absolute top-6 left-6 z-30">
            <button
              onClick={reset}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl font-bold font-cairo shadow-lg transition-all flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              رجوع
            </button>
          </div>

          <div className="absolute top-6 right-6 z-30 bg-slate-900/40 backdrop-blur-sm border border-white/10 text-white/70 px-4 py-2 rounded-xl text-sm font-cairo flex items-center gap-2">
            <Info className="w-4 h-4" /> اسحب لتدوير الكاميرا
          </div>

          {/* Result Panel (Appears after animation) */}
          <AnimatePresence>
            {showResultPanel && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-700 p-6 rounded-3xl shadow-2xl"
              >
                <div className="flex items-center gap-3 text-emerald-400 font-bold mb-1 font-cairo text-lg">
                  <CheckCircle2 className="w-6 h-6" />
                  اكتمل بناء الغرفة وحساب الجدار!
                </div>

                <button
                  onClick={() => setShowSteps(!showSteps)}
                  className="text-gray-400 hover:text-blue-500 hover:underline text-sm font-sans mb-2 transition-colors cursor-pointer focus:outline-none"
                >
                  Steps
                </button>

                <AnimatePresence>
                  {showSteps && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-black/40 rounded-xl p-4 font-mono text-sm md:text-base text-slate-300 space-y-2 border border-slate-800 mt-2">
                        <div className="flex justify-between items-center text-slate-500 mb-2 border-b border-slate-800 pb-2">
                          <span>Steps</span>
                          <span>Law of Cosines</span>
                        </div>
                        <div>
                          <span className="text-emerald-400">1.</span> a² = b² +
                          c² - 2bc·cos(A)
                        </div>
                        <div>
                          <span className="text-emerald-400">2.</span> a² ={' '}
                          {inputs.b}² + {inputs.c}² - 2({inputs.b})({inputs.c}
                          )·cos({inputs.A}°)
                        </div>
                        <div>
                          <span className="text-emerald-400">3.</span> a = √(
                          {(resultA * resultA).toFixed(2)})
                        </div>
                        <div className="text-xl font-bold text-white mt-2 pt-2 border-t border-slate-800">
                          <span className="text-emerald-500">a = </span>{' '}
                          {resultA.toFixed(3)} متر
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* WATERMARK */}
      <a
        href="https://github.com/velliasser"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-5 z-[9999] bg-black text-white px-[14px] py-[8px] rounded-full text-[13px] font-sans flex items-center gap-2 shadow-md hover:scale-105 hover:bg-[#111111] transition-all cursor-pointer"
      >
        <svg height="16" viewBox="0 0 16 16" width="16" fill="currentColor">
          <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
        </svg>
        velliasser
      </a>
    </div>
  );
}
