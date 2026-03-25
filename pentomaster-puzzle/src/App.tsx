/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  RotateCw, 
  FlipHorizontal, 
  Trash2, 
  Undo2, 
  Play, 
  Star, 
  Trophy,
  ChevronRight,
  ChevronLeft,
  Timer,
  Cpu,
  Zap,
  LayoutGrid,
  Settings,
  Volume2,
  VolumeX,
  Palette,
  Copy,
  ClipboardPaste,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants & Types ---
const GRID_ROWS = 9;
const GRID_COLS = 8;

const LANGUAGES = {
  EN: { id: 'en', name: 'English', flag: '🇺🇸' },
  ES: { id: 'es', name: 'Español', flag: '🇪🇸' },
  FR: { id: 'fr', name: 'Français', flag: '🇫🇷' },
  DE: { id: 'de', name: 'Deutsch', flag: '🇩🇪' },
  PT: { id: 'pt', name: 'Português', flag: '🇵🇹' }
};

const TRANSLATIONS = {
  en: {
    newProtocol: "New Protocol",
    resumeSession: "Resume Session",
    systemConfig: "System Config",
    neuralLogic: "Neural Logic Engine",
    advancedSpatial: "Advanced Spatial Logic Engine",
    sector: "Sector",
    menu: "Menu",
    rotate: "Rotate",
    flip: "Flip",
    undo: "Undo",
    reset: "Reset",
    settings: "Settings",
    language: "Language",
    volume: "Volume",
    skin: "Skin",
    back: "Back",
    apply: "Apply Changes",
    syncComplete: "Sync Complete",
    neuralSector: "Neural Sector {n} Secured",
    nextProtocol: "Next Protocol",
    audioOutput: "Audio Output",
    visualSkin: "Visual Skin",
    node: "Node {current} / {total}",
    allNodes: "All Nodes Synced",
    neuralLink: "Neural Link Established",
    victory: "Final Victory!",
    infiniteMode: "Infinite Mode Activated",
    workshop: "Workshop",
    testLevel: "Test Level",
    shareLevel: "Share Level",
    importLevel: "Import Level",
    invalidCode: "Invalid Code",
    solvable: "Level is solvable!",
    unsolvable: "Level might be unsolvable",
    placingBlockers: "Place 4 Blockers",
    copyCode: "Copy Code",
    copied: "Copied!",
    playLevel: "Play Level",
    testing: "Testing...",
    enterCode: "Enter Level Code",
    tutorial: "Tutorial",
    ranked: "Ranked",
    neonFx: "Neon FX",
    levelSelect: "Level Select",
    bestTime: "Best Time",
    howToPlay: "How to Play",
    tutorialText: "Drag pieces to the grid to fill all empty spaces. Use blockers to create your own challenges in the workshop!"
  },
  es: {
    newProtocol: "Nuevo Protocolo",
    resumeSession: "Reanudar Sesión",
    systemConfig: "Config. Sistema",
    neuralLogic: "Motor Lógico Neural",
    advancedSpatial: "Motor Lógico Espacial Avanzado",
    sector: "Sector",
    menu: "Menú",
    rotate: "Rotar",
    flip: "Girar",
    undo: "Deshacer",
    reset: "Reiniciar",
    settings: "Ajustes",
    language: "Idioma",
    volume: "Volumen",
    skin: "Apariencia",
    back: "Volver",
    apply: "Aplicar Cambios",
    syncComplete: "Sincronización Completa",
    neuralSector: "Sector Neural {n} Asegurado",
    nextProtocol: "Siguiente Protocolo",
    audioOutput: "Salida de Audio",
    visualSkin: "Apariencia Visual",
    node: "Nodo {current} / {total}",
    allNodes: "Todos los Nodos Sincronizados",
    neuralLink: "Enlace Neural Establecido",
    victory: "¡Victoria Final!",
    infiniteMode: "Modo Infinito Activado",
    workshop: "Taller",
    testLevel: "Probar Nivel",
    shareLevel: "Compartir Nivel",
    importLevel: "Importar Nivel",
    invalidCode: "Código Inválido",
    solvable: "¡El nivel es resoluble!",
    unsolvable: "El nivel podría no ser resoluble",
    placingBlockers: "Coloca 4 Bloqueos",
    copyCode: "Copiar Código",
    copied: "¡Copiado!",
    playLevel: "Jugar Nivel",
    testing: "Probando...",
    enterCode: "Ingresa el Código",
    tutorial: "Tutorial",
    ranked: "Clasificado",
    neonFx: "Neon FX",
    levelSelect: "Selección de Nivel",
    bestTime: "Mejor Tiempo",
    howToPlay: "Cómo Jugar",
    tutorialText: "Arrastra las piezas al tablero para llenar todos los espacios. ¡Usa bloqueos para crear tus propios retos en el taller!"
  },
  fr: {
    newProtocol: "Nouveau Protocole",
    resumeSession: "Reprendre Session",
    systemConfig: "Config. Système",
    neuralLogic: "Moteur Logique Neural",
    advancedSpatial: "Moteur Logique Spatial Avancé",
    sector: "Secteur",
    menu: "Menu",
    rotate: "Pivoter",
    flip: "Retourner",
    undo: "Annuler",
    reset: "Réinitialiser",
    settings: "Paramètres",
    language: "Langue",
    volume: "Volume",
    skin: "Apparence",
    back: "Retour",
    apply: "Appliquer",
    syncComplete: "Sync Complète",
    neuralSector: "Secteur Neural {n} Sécurisé",
    nextProtocol: "Protocole Suivant",
    audioOutput: "Sortie Audio",
    visualSkin: "Apparence Visuelle",
    node: "Nœud {current} / {total}",
    allNodes: "Tous les Nœuds Synchronisés",
    neuralLink: "Lien Neural Établi",
    victory: "Victoire Finale !",
    infiniteMode: "Mode Infini Activé",
    workshop: "Atelier",
    testLevel: "Tester le Niveau",
    shareLevel: "Partager le Niveau",
    importLevel: "Importer le Niveau",
    invalidCode: "Code Invalide",
    solvable: "Le niveau est résoluble !",
    unsolvable: "Le niveau pourrait être insoluble",
    placingBlockers: "Placez 4 Bloqueurs",
    copyCode: "Copiar le Code",
    copied: "Copié !",
    playLevel: "Jouer le Niveau",
    testing: "Test en cours...",
    enterCode: "Entrez le Code",
    tutorial: "Tutoriel",
    ranked: "Classé",
    neonFx: "Neon FX",
    levelSelect: "Sélection de Niveau",
    bestTime: "Meilleur Temps",
    howToPlay: "Comment Jouer",
    tutorialText: "Faites glisser les pièces sur la grille pour remplir tous les espaces vides. Utilisez des bloqueurs pour créer vos propres défis dans l'atelier !"
  },
  de: {
    newProtocol: "Neues Protokoll",
    resumeSession: "Sitzung Fortsetzen",
    systemConfig: "Systemkonfig",
    neuralLogic: "Neurale Logik-Engine",
    advancedSpatial: "Erweiterte Räumliche Logik-Engine",
    sector: "Sektor",
    menu: "Menü",
    rotate: "Drehen",
    flip: "Spiegeln",
    undo: "Rückgängig",
    reset: "Zurücksetzen",
    settings: "Einstellungen",
    language: "Sprache",
    volume: "Lautstärke",
    skin: "Skin",
    back: "Zurück",
    apply: "Änderungen Übernehmen",
    syncComplete: "Sync Abgeschlossen",
    neuralSector: "Neuraler Sektor {n} Gesichert",
    nextProtocol: "Nächstes Protokoll",
    audioOutput: "Audioausgabe",
    visualSkin: "Visueller Skin",
    node: "Knoten {current} / {total}",
    allNodes: "Alle Knoten Synchronisiert",
    neuralLink: "Neurale Verbindung Hergestellt",
    victory: "Finaler Sieg!",
    infiniteMode: "Unendlich-Modus Aktiviert",
    workshop: "Werkstatt",
    testLevel: "Level Testen",
    shareLevel: "Level Teilen",
    importLevel: "Level Importieren",
    invalidCode: "Ungültiger Code",
    solvable: "Level ist lösbar!",
    unsolvable: "Level könnte unlösbar sein",
    placingBlockers: "4 Blocker Platzieren",
    copyCode: "Code Kopieren",
    copied: "Kopiert!",
    playLevel: "Level Spielen",
    testing: "Prüfen...",
    enterCode: "Code Eingeben",
    tutorial: "Tutorial",
    ranked: "Klassifiziert",
    neonFx: "Neon FX",
    levelSelect: "Levelauswahl",
    bestTime: "Bestzeit",
    howToPlay: "Spielanleitung",
    tutorialText: "Ziehen Sie die Teile auf das Gitter, um alle leeren Felder zu füllen. Verwenden Sie Blocker, um Ihre eigenen Herausforderungen in der Werkstatt zu erstellen!"
  },
  pt: {
    newProtocol: "Novo Protocolo",
    resumeSession: "Retomar Sessão",
    systemConfig: "Config. Sistema",
    neuralLogic: "Motor Lógico Neural",
    advancedSpatial: "Motor Lógico Espacial Avançado",
    sector: "Setor",
    menu: "Menu",
    rotate: "Girar",
    flip: "Inverter",
    undo: "Desfazer",
    reset: "Reiniciar",
    settings: "Ajustes",
    language: "Idioma",
    volume: "Volume",
    skin: "Aparência",
    back: "Voltar",
    apply: "Aplicar Alterações",
    syncComplete: "Sincronização Completa",
    neuralSector: "Setor Neural {n} Seguro",
    nextProtocol: "Próximo Protocolo",
    audioOutput: "Saída de Áudio",
    visualSkin: "Aparência Visual",
    node: "Nó {current} / {total}",
    allNodes: "Todos os Nós Sincronizados",
    neuralLink: "Link Neural Estabelecido",
    victory: "Vitória Final!",
    infiniteMode: "Modo Infinito Ativado",
    workshop: "Oficina",
    testLevel: "Testar Nível",
    shareLevel: "Compartilhar Nível",
    importLevel: "Importar Nível",
    invalidCode: "Código Inválido",
    solvable: "O nível é resolúvel!",
    unsolvable: "O nível pode ser irresolúvel",
    placingBlockers: "Coloque 4 Bloqueios",
    copyCode: "Copiar Código",
    copied: "Copiado!",
    playLevel: "Jogar Nível",
    testing: "Testando...",
    enterCode: "Inserir Código",
    tutorial: "Tutorial",
    ranked: "Classificado",
    neonFx: "Neon FX",
    levelSelect: "Seleção de Nível",
    bestTime: "Melhor Tempo",
    howToPlay: "Como Jogar",
    tutorialText: "Arraste as peças para a grade para preencher todos os espaços vazios. Use bloqueios para criar seus próprios desafios na oficina!"
  }
};

const SKINS = {
  CYBERPUNK: {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    primary: '#22d3ee', // cyan-400
    secondary: '#d946ef', // fuchsia-500
    bg: '#020205',
    grid: 'rgba(34, 211, 238, 0.05)',
    palette: ['#22d3ee', '#d946ef', '#f472b6', '#818cf8', '#c084fc', '#2dd4bf', '#06b6d4', '#ec4899', '#8b5cf6', '#14b8a6']
  },
  RETRO: {
    id: 'retro',
    name: 'Retro CRT',
    primary: '#f59e0b', // amber-500
    secondary: '#10b981', // emerald-500
    bg: '#0a0a05',
    grid: 'rgba(245, 158, 11, 0.05)',
    palette: ['#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#8b5cf6', '#f97316', '#eab308', '#06b6d4', '#84cc16', '#d946ef']
  },
  MINIMAL: {
    id: 'minimal',
    name: 'Minimalist',
    primary: '#94a3b8', // slate-400
    secondary: '#475569', // slate-600
    bg: '#0f172a',
    grid: 'rgba(148, 163, 184, 0.05)',
    palette: ['#94a3b8', '#64748b', '#475569', '#cbd5e1', '#e2e8f0', '#1e293b', '#334155', '#475569', '#94a3b8', '#f1f5f9']
  },
  VAPORWAVE: {
    id: 'vaporwave',
    name: 'Vaporwave',
    primary: '#ff71ce', // pink
    secondary: '#01cdfe', // cyan
    bg: '#2d004b',
    grid: 'rgba(255, 113, 206, 0.05)',
    palette: ['#ff71ce', '#01cdfe', '#05ffa1', '#b967ff', '#fffb96', '#7df9ff', '#ff99cc', '#99ccff', '#ccff99', '#ffcc99']
  },
  MATRIX: {
    id: 'matrix',
    name: 'Matrix',
    primary: '#00ff41', // matrix green
    secondary: '#008f11', // green
    bg: '#000000',
    grid: 'rgba(0, 255, 65, 0.05)',
    palette: ['#00ff41', '#008f11', '#003b00', '#00ff00', '#0d0208', '#004b00', '#008000', '#32cd32', '#228b22', '#006400']
  }
};

const getPieceStyle = (id: string, skin: any) => {
  // Use a consistent hash for the ID to pick a color from the palette
  const allIds = ['F', 'I', 'L', 'P', 'N', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'D1', 'D2', 'L4'];
  const index = allIds.indexOf(id.split('-')[0]); // Handle rotated/flipped IDs if they have suffixes
  const palette = skin.palette || [skin.primary, skin.secondary];
  const color = palette[index % palette.length] || skin.primary;
  return {
    color,
    glow: `${color}66` // 40% opacity for glow
  };
};

type PieceShape = number[][];

interface Piece {
  id: string;
  shape: PieceShape;
  color: string;
  glow: string;
}

interface PlacedPiece {
  id: string;
  shape: PieceShape;
  row: number;
  col: number;
  color: string;
  glow: string;
}

// --- Piece Definitions with Neon Colors ---
const PENTOMINOES: Piece[] = [
  { id: 'F', color: '#FF00E5', glow: 'rgba(255, 0, 229, 0.6)', shape: [[0, 1, 1], [1, 1, 0], [0, 1, 0]] },
  { id: 'I', color: '#00F3FF', glow: 'rgba(0, 243, 255, 0.6)', shape: [[1], [1], [1], [1], [1]] },
  { id: 'L', color: '#FFD700', glow: 'rgba(255, 215, 0, 0.6)', shape: [[1, 0], [1, 0], [1, 0], [1, 1]] },
  { id: 'P', color: '#39FF14', glow: 'rgba(57, 255, 20, 0.6)', shape: [[1, 1], [1, 1], [1, 0]] },
  { id: 'N', color: '#FF4D00', glow: 'rgba(255, 77, 0, 0.6)', shape: [[1, 1, 0, 0], [0, 1, 1, 1]] },
  { id: 'T', color: '#BC13FE', glow: 'rgba(188, 19, 254, 0.6)', shape: [[1, 1, 1], [0, 1, 0], [0, 1, 0]] },
  { id: 'U', color: '#00FF9F', glow: 'rgba(0, 255, 159, 0.6)', shape: [[1, 0, 1], [1, 1, 1]] },
  { id: 'V', color: '#FF003C', glow: 'rgba(255, 0, 60, 0.6)', shape: [[1, 0, 0], [1, 0, 0], [1, 1, 1]] },
  { id: 'W', color: '#007FFF', glow: 'rgba(0, 127, 255, 0.6)', shape: [[1, 0, 0], [1, 1, 0], [0, 1, 1]] },
  { id: 'X', color: '#FFFF00', glow: 'rgba(255, 255, 0, 0.6)', shape: [[0, 1, 0], [1, 1, 1], [0, 1, 0]] },
  { id: 'Y', color: '#7DF9FF', glow: 'rgba(125, 249, 255, 0.6)', shape: [[1, 1, 1, 1], [0, 1, 0, 0]] },
  { id: 'Z', color: '#FF007F', glow: 'rgba(255, 0, 127, 0.6)', shape: [[1, 1, 0], [0, 1, 0], [0, 1, 1]] },
];

const SPECIAL_PIECES: Piece[] = [
  { id: 'D1', color: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.4)', shape: [[1, 1]] },
  { id: 'D2', color: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.4)', shape: [[1, 1]] },
  { id: 'L4', color: '#00F3FF', glow: 'rgba(0, 243, 255, 0.4)', shape: [[1, 1, 1, 1]] },
];

// --- Utilities ---
const rotateMatrix = (matrix: PieceShape): PieceShape => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const newMatrix: PieceShape = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      newMatrix[c][rows - 1 - r] = matrix[r][c];
    }
  }
  return newMatrix;
};

const flipMatrix = (matrix: PieceShape): PieceShape => {
  return matrix.map(row => [...row].reverse());
};

const encodeLevel = (blockers: {r: number, c: number}[]) => {
  return blockers.map(b => (b.r * GRID_COLS + b.c).toString(36)).join('-');
};

const decodeLevel = (code: string) => {
  try {
    const parts = code.split('-');
    if (parts.length !== 4) return null;
    return parts.map(p => {
      const pos = parseInt(p, 36);
      if (isNaN(pos)) throw new Error();
      return { r: Math.floor(pos / GRID_COLS), c: pos % GRID_COLS };
    });
  } catch {
    return null;
  }
};

const canSolve = (blockers: {r: number, c: number}[], pieces: Piece[]): boolean => {
  const totalPieceSize = pieces.reduce((acc, p) => acc + p.shape.flat().filter(x => x === 1).length, 0);
  if (totalPieceSize !== (GRID_ROWS * GRID_COLS - blockers.length)) return false;

  const grid = Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(0));
  blockers.forEach(b => {
    if (b.r >= 0 && b.r < GRID_ROWS && b.c >= 0 && b.c < GRID_COLS) {
      grid[b.r][b.c] = -1;
    }
  });

  const getUniqueRotations = (shape: number[][]) => {
    const rots = [shape];
    let curr = shape;
    for (let i = 0; i < 3; i++) {
      curr = rotateMatrix(curr);
      rots.push(curr);
    }
    const flips = rots.map(r => flipMatrix(r));
    const all = [...rots, ...flips];
    const unique: string[] = [];
    const result: number[][][] = [];
    all.forEach(s => {
      const str = JSON.stringify(s);
      if (!unique.includes(str)) {
        unique.push(str);
        result.push(s);
      }
    });
    return result;
  };

  const pieceRotations = pieces.map(p => getUniqueRotations(p.shape));

  let iterations = 0;
  const MAX_ITERATIONS = 1000000;

  // Flood fill to check for isolated areas that are too small
  const checkIslands = (currentGrid: number[][]): boolean => {
    const visited = Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(false));
    for (let i = 0; i < GRID_ROWS; i++) {
      for (let j = 0; j < GRID_COLS; j++) {
        if (currentGrid[i][j] === 0 && !visited[i][j]) {
          let size = 0;
          const stack = [[i, j]];
          visited[i][j] = true;
          while (stack.length > 0) {
            const [r, c] = stack.pop()!;
            size++;
            const neighbors = [[r+1, c], [r-1, c], [r, c+1], [r, c-1]];
            for (const [nr, nc] of neighbors) {
              if (nr >= 0 && nr < GRID_ROWS && nc >= 0 && nc < GRID_COLS && currentGrid[nr][nc] === 0 && !visited[nr][nc]) {
                visited[nr][nc] = true;
                stack.push([nr, nc]);
              }
            }
          }
          // If the island size is 1 or 3, it's impossible to fill with our pieces (sizes 2, 4, 5)
          if (size === 1 || size === 3) return false;
        }
      }
    }
    return true;
  };

  const solve = (usedMask: number): boolean => {
    iterations++;
    if (iterations > MAX_ITERATIONS) return false;

    // Periodic pruning check
    if (iterations % 1000 === 0) {
      if (!checkIslands(grid)) return false;
    }

    // Find first empty cell
    let r = -1, c = -1;
    for (let i = 0; i < GRID_ROWS; i++) {
      for (let j = 0; j < GRID_COLS; j++) {
        if (grid[i][j] === 0) {
          r = i; c = j;
          break;
        }
      }
      if (r !== -1) break;
    }

    if (r === -1) return usedMask === (1 << pieces.length) - 1;

    for (let pIdx = 0; pIdx < pieces.length; pIdx++) {
      if (!(usedMask & (1 << pIdx))) {
        const currentRots = pieceRotations[pIdx];
        for (const shape of currentRots) {
          for (let sr = 0; sr < shape.length; sr++) {
            for (let sc = 0; sc < shape[0].length; sc++) {
              if (shape[sr][sc] === 1) {
                const startR = r - sr;
                const startC = c - sc;

                if (startR < 0 || startC < 0 || startR + shape.length > GRID_ROWS || startC + shape[0].length > GRID_COLS) continue;

                let fits = true;
                for (let i = 0; i < shape.length; i++) {
                  for (let j = 0; j < shape[0].length; j++) {
                    if (shape[i][j] === 1 && grid[startR + i][startC + j] !== 0) {
                      fits = false;
                      break;
                    }
                  }
                  if (!fits) break;
                }

                if (fits) {
                  for (let i = 0; i < shape.length; i++) {
                    for (let j = 0; j < shape[0].length; j++) {
                      if (shape[i][j] === 1) grid[startR + i][startC + j] = pIdx + 1;
                    }
                  }

                  if (solve(usedMask | (1 << pIdx))) return true;

                  for (let i = 0; i < shape.length; i++) {
                    for (let j = 0; j < shape[0].length; j++) {
                      if (shape[i][j] === 1) grid[startR + i][startC + j] = 0;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return false;
  };

  // Initial check
  if (!checkIslands(grid)) return false;
  return solve(0);
};

interface HistoryState {
  placedPieces: PlacedPiece[];
  allPieces: Piece[];
  currentPieceIndex: number;
}

export default function App() {
  // --- State ---
  const [gameState, setGameState] = useState<'MENU' | 'PLAYING' | 'GAMEOVER' | 'WORKSHOP'>('MENU');
  const [level, setLevel] = useState(1);
  const [time, setTime] = useState(0);
  const [blockers, setBlockers] = useState<{r: number, c: number}[]>([]);
  const [workshopBlockers, setWorkshopBlockers] = useState<{r: number, c: number}[]>([]);
  const [isSolvable, setIsSolvable] = useState<boolean | null>(null);
  const [importCode, setImportCode] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showSkinsModal, setShowSkinsModal] = useState(false);
  const [showLevelsModal, setShowLevelsModal] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [levelStars, setLevelStars] = useState<Record<number, {stars: number, time: number}>>(() => {
    const saved = localStorage.getItem('pentomaster_stars');
    return saved ? JSON.parse(saved) : {};
  });
  const [placedPieces, setPlacedPieces] = useState<PlacedPiece[]>([]);
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [currentPieceIndex, setCurrentPieceIndex] = useState(0);
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [allPieces, setAllPieces] = useState<Piece[]>([]);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [ghostPos, setGhostPos] = useState<{ row: number, col: number } | null>(null);
  
  // Settings & Skins
  const [showSettings, setShowSettings] = useState(false);
  const [lastTap, setLastTap] = useState<{id: string, time: number} | null>(null);
  const [volume, setVolume] = useState(50);
  const [currentSkin, setCurrentSkin] = useState(SKINS.CYBERPUNK);

  // Load skin on mount
  useEffect(() => {
    const savedSkinId = localStorage.getItem('pentomaster_skin');
    if (savedSkinId) {
      const skin = Object.values(SKINS).find(s => s.id === savedSkinId);
      if (skin) setCurrentSkin(skin);
    }
  }, []);

  // Save skin on change
  useEffect(() => {
    localStorage.setItem('pentomaster_skin', currentSkin.id);
  }, [currentSkin]);
  const [currentLang, setCurrentLang] = useState<string>(() => {
    const saved = localStorage.getItem('pentomaster_lang');
    return saved || 'en';
  });

  const t = (key: keyof typeof TRANSLATIONS['en'], params?: Record<string, any>) => {
    let text = (TRANSLATIONS as any)[currentLang][key] || TRANSLATIONS['en'][key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  };

  const gridRef = useRef<HTMLDivElement>(null);

  // --- Initialization ---
  const saveGameState = useCallback((state: any) => {
    localStorage.setItem('pentomaster_save', JSON.stringify(state));
  }, []);

  const loadGameState = useCallback(() => {
    const saved = localStorage.getItem('pentomaster_save');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  }, []);

  const initLevel = useCallback((resume = false, customBlockers?: {r: number, c: number}[]) => {
    if (resume) {
      const saved = loadGameState();
      if (saved) {
        setLevel(saved.level);
        setTime(saved.time);
        setBlockers(saved.blockers);
        setPlacedPieces(saved.placedPieces);
        setAllPieces(saved.allPieces);
        setCurrentPieceIndex(saved.currentPieceIndex);
        setCurrentPiece(saved.allPieces[saved.currentPieceIndex]);
        setGameState('PLAYING');
        return;
      }
    }

    const shuffled = [...PENTOMINOES, ...SPECIAL_PIECES].sort(() => Math.random() - 0.5);
    setAllPieces(shuffled);
    setCurrentPiece(shuffled[0]);
    setCurrentPieceIndex(0);
    setPlacedPieces([]);
    setHistory([]);
    setTime(0);
    setGhostPos(null);

    if (customBlockers) {
      setBlockers(customBlockers);
      setGameState('PLAYING');
      return;
    }

    const generateBlockers = () => {
      const newBlockers: {r: number, c: number}[] = [];
      while (newBlockers.length < 4) {
        const r = Math.floor(Math.random() * GRID_ROWS);
        const c = Math.floor(Math.random() * GRID_COLS);
        
        // Avoid adjacent blockers
        const isAdjacent = newBlockers.some(b => Math.abs(b.r - r) <= 1 && Math.abs(b.c - c) <= 1);
        if (isAdjacent) continue;

        // Check if this blocker isolates a cell
        const isIsolating = (row: number, col: number) => {
          const neighbors = [
            {r: row-1, c: col}, {r: row+1, c: col},
            {r: row, c: col-1}, {r: row, c: col+1}
          ];
          const blockedCount = neighbors.filter(n => {
            if (n.r < 0 || n.r >= GRID_ROWS || n.c < 0 || n.c >= GRID_COLS) return true;
            if (newBlockers.some(b => b.r === n.r && b.c === n.c)) return true;
            if (n.r === r && n.c === c) return true; // The potential new blocker
            return false;
          }).length;
          return blockedCount === 4;
        };

        // Check all neighbors of the potential blocker to see if they become isolated
        const neighbors = [{r: r-1, c: c}, {r: r+1, c: c}, {r: r, c: c-1}, {r: r, c: c+1}];
        const isolatesAny = neighbors.some(n => {
          if (n.r < 0 || n.r >= GRID_ROWS || n.c < 0 || n.c >= GRID_COLS) return false;
          return isIsolating(n.r, n.c);
        });

        if (!isolatesAny) {
          newBlockers.push({ r, c });
        }
      }
      return newBlockers;
    };

    setBlockers(generateBlockers());
    setGameState('PLAYING');
  }, [loadGameState]);

  // Save state on changes
  useEffect(() => {
    localStorage.setItem('pentomaster_lang', currentLang);
  }, [currentLang]);

  useEffect(() => {
    if (gameState === 'PLAYING') {
      saveGameState({
        level,
        time,
        blockers,
        placedPieces,
        allPieces,
        currentPieceIndex
      });
    }
  }, [gameState, level, time, blockers, placedPieces, allPieces, currentPieceIndex, saveGameState]);

  // --- Timer ---
  useEffect(() => {
    let interval: number | undefined;
    if (gameState === 'PLAYING') {
      interval = window.setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  // --- Game Logic ---
  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStars = (s: number) => {
    if (s < 120) return 3;
    if (s < 300) return 2;
    return 1;
  };

  const handlePieceClick = (pieceId: string) => {
    const now = Date.now();
    if (lastTap && lastTap.id === pieceId && now - lastTap.time < 300) {
      // Double tap detected
      const pieceToReturn = placedPieces.find(p => p.id === pieceId);
      if (pieceToReturn) {
        // Remove from placed
        setPlacedPieces(prev => prev.filter(p => p.id !== pieceId));
        // Add back to pool
        const pieceBase: Piece = {
          id: pieceToReturn.id,
          shape: pieceToReturn.shape,
          color: pieceToReturn.color,
          glow: pieceToReturn.glow
        };
        
        setAllPieces(prev => {
          const newAll = [...prev, pieceBase];
          // Set as current piece
          setCurrentPiece(pieceBase);
          setCurrentPieceIndex(newAll.length - 1);
          return newAll;
        });
      }
      setLastTap(null);
    } else {
      setLastTap({ id: pieceId, time: now });
    }
  };

  const handleRotate = () => {
    if (!currentPiece) return;
    setCurrentPiece({ ...currentPiece, shape: rotateMatrix(currentPiece.shape) });
  };

  const handleWorkshopClick = (r: number, c: number) => {
    setWorkshopBlockers(prev => {
      const exists = prev.some(b => b.r === r && b.c === c);
      if (exists) {
        return prev.filter(b => !(b.r === r && b.c === c));
      } else {
        if (prev.length >= 4) return prev;
        return [...prev, { r, c }];
      }
    });
    setIsSolvable(null);
  };

  const testWorkshopLevel = () => {
    if (workshopBlockers.length !== 4) return;
    setIsTesting(true);
    setTimeout(() => {
      const solvable = canSolve(workshopBlockers, [...PENTOMINOES, ...SPECIAL_PIECES]);
      setIsSolvable(solvable);
      setIsTesting(false);
    }, 100);
  };

  const handleImportLevel = () => {
    const decoded = decodeLevel(importCode);
    if (decoded) {
      setWorkshopBlockers(decoded);
      setIsSolvable(null);
      setImportCode('');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleFlip = () => {
    if (!currentPiece) return;
    setCurrentPiece({ ...currentPiece, shape: flipMatrix(currentPiece.shape) });
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const lastState = history[history.length - 1];
    setPlacedPieces(lastState.placedPieces);
    setAllPieces(lastState.allPieces);
    setCurrentPieceIndex(lastState.currentPieceIndex);
    setCurrentPiece(lastState.allPieces[lastState.currentPieceIndex]);
    setHistory(h => h.slice(0, -1));
  };

  const handleClear = () => {
    setPlacedPieces([]);
    setHistory([]);
    setCurrentPieceIndex(0);
    setCurrentPiece(allPieces[0]);
  };

  const nextTrayPiece = () => {
    const nextIdx = (currentPieceIndex + 1) % allPieces.length;
    setCurrentPieceIndex(nextIdx);
    setCurrentPiece(allPieces[nextIdx]);
  };

  const prevTrayPiece = () => {
    const prevIdx = (currentPieceIndex - 1 + allPieces.length) % allPieces.length;
    setCurrentPieceIndex(prevIdx);
    setCurrentPiece(allPieces[prevIdx]);
  };

  const canPlace = (shape: PieceShape, row: number, col: number) => {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] === 1) {
          const targetR = row + r;
          const targetC = col + c;
          if (targetR < 0 || targetR >= GRID_ROWS || targetC < 0 || targetC >= GRID_COLS) return false;
          if (blockers.some(b => b.r === targetR && b.c === targetC)) return false;
          if (placedPieces.some(p => {
            for (let pr = 0; pr < p.shape.length; pr++) {
              for (let pc = 0; pc < p.shape[pr].length; pc++) {
                if (p.shape[pr][pc] === 1 && p.row + pr === targetR && p.col + pc === targetC) return true;
              }
            }
            return false;
          })) return false;
        }
      }
    }
    return true;
  };

  const placePieceAt = (row: number, col: number) => {
    if (!currentPiece) return;
    if (canPlace(currentPiece.shape, row, col)) {
      const newPlaced = { ...currentPiece, row, col };
      
      // Save full state for robust undo
      setHistory(prev => [...prev, {
        placedPieces: [...placedPieces],
        allPieces: [...allPieces],
        currentPieceIndex: currentPieceIndex
      }]);
      
      const nextPlacedPieces = [...placedPieces, newPlaced];
      setPlacedPieces(nextPlacedPieces);

      // Remove the placed piece from the tray pool
      const remainingPieces = allPieces.filter((_, idx) => idx !== currentPieceIndex);
      setAllPieces(remainingPieces);
      
      if (remainingPieces.length > 0) {
        const nextIdx = currentPieceIndex % remainingPieces.length;
        setCurrentPieceIndex(nextIdx);
        setCurrentPiece(remainingPieces[nextIdx]);
      } else {
        setCurrentPiece(null);
        setGameState('GAMEOVER');
        
        // Save stars and best time
        const stars = getStars(time);
        const currentBest = levelStars[level];
        if (!currentBest || stars > currentBest.stars || (stars === currentBest.stars && time < currentBest.time)) {
          const newStars = { ...levelStars, [level]: { stars, time } };
          setLevelStars(newStars);
          localStorage.setItem('pentomaster_stars', JSON.stringify(newStars));
        }
      }
      setGhostPos(null);
    }
  };

  // --- Drag and Drop Logic ---
  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e: PointerEvent) => {
      if (!currentPiece || !gridRef.current) return;
      setDragPos({ x: e.clientX, y: e.clientY });

      const gridRect = gridRef.current.getBoundingClientRect();
      const cellSize = gridRect.width / GRID_COLS;
      const pieceWidth = cellSize * currentPiece.shape[0].length;
      const pieceHeight = cellSize * currentPiece.shape.length;

      const relativeX = e.clientX - gridRect.left - (dragOffset.x * pieceWidth);
      const relativeY = e.clientY - gridRect.top - (dragOffset.y * pieceHeight);

      const col = Math.round(relativeX / cellSize);
      const row = Math.round(relativeY / cellSize);

      if (canPlace(currentPiece.shape, row, col)) {
        setGhostPos({ row, col });
      } else {
        setGhostPos(null);
      }
    };

    const handleUp = (e: PointerEvent) => {
      if (!currentPiece || !gridRef.current) {
        setIsDragging(false);
        return;
      }

      const gridRect = gridRef.current.getBoundingClientRect();
      const cellSize = gridRect.width / GRID_COLS;
      const pieceWidth = cellSize * currentPiece.shape[0].length;
      const pieceHeight = cellSize * currentPiece.shape.length;

      const relativeX = e.clientX - gridRect.left - (dragOffset.x * pieceWidth);
      const relativeY = e.clientY - gridRect.top - (dragOffset.y * pieceHeight);

      const col = Math.round(relativeX / cellSize);
      const row = Math.round(relativeY / cellSize);

      placePieceAt(row, col);
      setIsDragging(false);
      setGhostPos(null);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointercancel', () => setIsDragging(false));

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', () => setIsDragging(false));
    };
  }, [isDragging, currentPiece, dragOffset, gridRef, canPlace, placePieceAt]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!currentPiece || gameState !== 'PLAYING') return;
    
    setIsDragging(true);
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    setDragOffset({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className="fixed inset-0 flex flex-col font-sans select-none text-white transition-colors duration-700"
      style={{ backgroundColor: currentSkin.bg }}
    >
      {/* Skin-Specific Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {currentSkin.id === 'cyberpunk' && (
          <>
            <div className="absolute inset-0 opacity-20" style={{ 
              backgroundImage: `linear-gradient(${currentSkin.primary}22 1px, transparent 1px), linear-gradient(90deg, ${currentSkin.primary}22 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              transform: 'perspective(500px) rotateX(60deg) translateY(-100px)',
              transformOrigin: 'top'
            }} />
            <motion.div 
              animate={{ top: ['-10%', '110%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] z-10"
              style={{ background: `linear-gradient(90deg, transparent, ${currentSkin.primary}44, transparent)` }}
            />
          </>
        )}
        {currentSkin.id === 'matrix' && (
          <div className="absolute inset-0 opacity-[0.15] flex justify-around">
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div 
                key={i}
                initial={{ y: -200 }}
                animate={{ y: '110vh' }}
                transition={{ duration: 3 + Math.random() * 7, repeat: Infinity, ease: 'linear', delay: Math.random() * 5 }}
                className="w-[1px] h-40"
                style={{ background: `linear-gradient(to bottom, transparent, ${currentSkin.primary})` }}
              />
            ))}
          </div>
        )}
        {currentSkin.id === 'vaporwave' && (
          <>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-30 rounded-t-full" style={{ 
              background: `radial-gradient(circle at bottom, ${currentSkin.primary}, ${currentSkin.secondary}, transparent 70%)`,
              filter: 'blur(120px)'
            }} />
            <div className="absolute inset-0 opacity-10" style={{ 
              backgroundImage: `linear-gradient(${currentSkin.secondary}22 1px, transparent 1px), linear-gradient(90deg, ${currentSkin.secondary}22 1px, transparent 1px)`,
              backgroundSize: '100px 100px',
              transform: 'perspective(1000px) rotateX(75deg)',
              transformOrigin: 'bottom'
            }} />
          </>
        )}
        {currentSkin.id === 'retro' && (
          <>
            <div className="absolute inset-0 pointer-events-none z-[999] opacity-[0.05]" style={{ 
              backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
              backgroundSize: '100% 3px, 4px 100%'
            }} />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at center, transparent, black)` }} />
          </>
        )}
        {currentSkin.id === 'minimal' && (
          <div className="absolute inset-0 opacity-[0.03]" style={{ 
            backgroundImage: `radial-gradient(${currentSkin.primary} 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />
        )}
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'MENU' ? (
          <motion.div 
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center p-8 text-center z-20 overflow-y-auto"
          >
            <div className="w-full max-w-xs mx-auto py-12 flex flex-col items-center shrink-0">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mb-12 relative w-full"
              >
              <div className="absolute -inset-10 blur-[80px] rounded-full animate-pulse opacity-10" style={{ backgroundColor: currentSkin.primary }} />
              <div 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border text-[10px] uppercase tracking-[0.4em] font-bold mb-6"
                style={{ color: currentSkin.primary, borderColor: `${currentSkin.primary}44` }}
              >
                <Cpu size={14} className="animate-spin-slow" /> {t('neuralLink')}
              </div>
              <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.8] mb-4 relative flex flex-col items-center">
                <span>Pento</span>
                <span 
                  className="text-transparent bg-clip-text drop-shadow-2xl"
                  style={{ backgroundImage: `linear-gradient(to bottom, ${currentSkin.primary}, ${currentSkin.secondary})` }}
                >
                  Master
                </span>
              </h1>
              <div className="h-[2px] w-full mb-4 opacity-30" style={{ background: `linear-gradient(90deg, transparent, ${currentSkin.primary}, transparent)` }} />
              <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-light">{t('advancedSpatial')}</p>
            </motion.div>
          </div>

            <div className="flex flex-col gap-4 w-full max-w-[280px]">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => initLevel()}
                className="group relative w-full py-5 bg-white/10 backdrop-blur-md text-white font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 overflow-hidden rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
              >
                <Play size={18} fill="currentColor" />
                {t('newProtocol')}
              </motion.button>

              {loadGameState() && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => initLevel(true)}
                  className="group relative w-full py-5 bg-white/5 backdrop-blur-md text-white/70 font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 overflow-hidden rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                >
                  <Undo2 size={18} />
                  {t('resumeSession')}
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setWorkshopBlockers([]);
                  setIsSolvable(null);
                  setGameState('WORKSHOP');
                }}
                className="group relative w-full py-5 bg-white/5 backdrop-blur-md text-white/70 font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 overflow-hidden rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
              >
                <LayoutGrid size={18} />
                {t('workshop')}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSettings(true)}
                className="group relative w-full py-5 bg-white/5 backdrop-blur-md text-white/70 font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 overflow-hidden rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
              >
                <Settings size={18} />
                {t('systemConfig')}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowTutorialModal(true)}
                className="group relative w-full py-5 bg-white/5 backdrop-blur-md text-white/70 font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 overflow-hidden rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
              >
                <Zap size={18} className="text-yellow-400" />
                {t('tutorial')}
              </motion.button>
            </div>

            <div className="mt-20 grid grid-cols-2 gap-12 text-white/30">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSkinsModal(true)}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-fuchsia-500/50 transition-colors">
                  <Zap size={28} />
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold">{t('neonFx')}</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowLevelsModal(true)}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-blue-500/50 transition-colors">
                  <Trophy size={28} />
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold">{t('ranked')}</span>
              </motion.button>
            </div>
          </motion.div>
        ) : gameState === 'WORKSHOP' ? (
          <motion.div 
            key="workshop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center p-4 z-20 overflow-y-auto"
          >
            <div className="w-full max-w-md flex flex-col items-center gap-6 py-8 shrink-0">
              <div className="flex items-center justify-between w-full mb-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setGameState('MENU')}
                  className="p-2 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white transition-colors"
                >
                  <ChevronLeft size={24} />
                </motion.button>
                <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">{t('workshop')}</h2>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowImportModal(true)}
                    className="p-2 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white transition-colors"
                    title={t('importLevel')}
                  >
                    <ClipboardPaste size={20} />
                  </motion.button>
                  {isSolvable && (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        copyToClipboard(encodeLevel(workshopBlockers));
                      }}
                      className="p-2 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white transition-colors relative"
                      title={t('copyCode')}
                    >
                      <Copy size={20} />
                      <AnimatePresence>
                        {showCopied && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[8px] font-bold rounded uppercase tracking-tighter whitespace-nowrap"
                          >
                            {t('copied')}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )}
                </div>
              </div>

              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-2">
                {t('placingBlockers')} ({workshopBlockers.length}/4)
              </div>

              <div 
                className="relative bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
                style={{ 
                  width: 'min(90vw, 320px)',
                  aspectRatio: `${GRID_COLS} / ${GRID_ROWS}`,
                  borderColor: `${currentSkin.primary}33`
                }}
              >
                <div 
                  className="absolute inset-0 grid"
                  style={{
                    gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
                    gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
                  }}
                >
                  {Array.from({ length: GRID_ROWS * GRID_COLS }).map((_, i) => {
                    const r = Math.floor(i / GRID_COLS);
                    const c = i % GRID_COLS;
                    const isBlocker = workshopBlockers.some(b => b.r === r && b.c === c);
                    return (
                      <div 
                        key={`workshop-cell-${i}`}
                        onClick={() => handleWorkshopClick(r, c)}
                        className="border-[0.5px] border-white/5 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors"
                      >
                        {isBlocker && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-4 h-4 bg-white/80 rounded-full shadow-[0_0_10px_white]"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  disabled={(workshopBlockers.length !== 4 && !isSolvable) || isTesting}
                  onClick={() => isSolvable ? initLevel(false, workshopBlockers) : testWorkshopLevel()}
                  className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] border transition-all flex items-center justify-center gap-2 ${
                    isSolvable 
                      ? 'bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30'
                      : workshopBlockers.length === 4 
                        ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                        : 'bg-white/5 border-white/5 text-white/20'
                  }`}
                >
                  {isTesting ? <Cpu size={14} className="animate-spin" /> : isSolvable ? <Play size={14} fill="currentColor" /> : <Zap size={14} />}
                  {isTesting ? t('testing') || '...' : isSolvable ? t('playLevel') : workshopBlockers.length < 4 ? t('placingBlockers') : t('testLevel')}
                </motion.button>

                {isSolvable === false && (
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-center py-2 rounded-xl text-red-400 bg-red-400/5">
                    {t('unsolvable')}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col z-20"
          >
            {/* Header */}
            <header className="bg-black/40 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between relative overflow-hidden">
              <div className="absolute bottom-0 left-0 h-[1px] w-full opacity-30" style={{ backgroundColor: currentSkin.primary }} />
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: currentSkin.primary, boxShadow: `0 0 8px ${currentSkin.primary}` }} />
                  <span className="text-[9px] uppercase font-black tracking-[0.4em]" style={{ color: currentSkin.primary }}>{t('sector')} {level.toString().padStart(2, '0')}</span>
                </div>
                <div className="flex items-center gap-2 text-white font-mono font-black text-xl tracking-tighter">
                  <Timer size={16} style={{ color: currentSkin.primary }} />
                  {formatTime(time)}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setGameState('MENU')}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all flex items-center gap-2"
                >
                  <LayoutGrid size={18} />
                  <span className="text-[9px] uppercase font-black tracking-widest hidden sm:inline">{t('menu')}</span>
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={handleUndo}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all"
                >
                  <Undo2 size={18} />
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClear}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-red-400 transition-all"
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            </header>

            {/* Main Game Area */}
            <main className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-y-auto">
              <div 
                ref={gridRef}
                className="relative bg-[#050508] border-2 border-white/10 rounded-xl shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden group touch-none"
                style={{
                  display: 'grid',
                  gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
                  gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
                  width: 'min(90vw, 400px, 60vh)',
                  aspectRatio: `${GRID_COLS} / ${GRID_ROWS}`
                }}
              >
                {/* Grid Lines */}
                {Array.from({ length: GRID_ROWS * GRID_COLS }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-white/[0.04] relative">
                    <div className="absolute inset-0 bg-cyan-500/0 hover:bg-cyan-500/5 transition-colors" />
                  </div>
                ))}

                {/* Ghost Piece (Shadow) */}
                {isDragging && currentPiece && ghostPos && (
                  <div 
                    className="absolute pointer-events-none transition-all duration-150 ease-out"
                    style={{
                      top: `${(ghostPos.row / GRID_ROWS) * 100}%`,
                      left: `${(ghostPos.col / GRID_COLS) * 100}%`,
                      width: `${(currentPiece.shape[0].length / GRID_COLS) * 100}%`,
                      height: `${(currentPiece.shape.length / GRID_ROWS) * 100}%`,
                      display: 'grid',
                      gridTemplateRows: `repeat(${currentPiece.shape.length}, 1fr)`,
                      gridTemplateColumns: `repeat(${currentPiece.shape[0].length}, 1fr)`,
                      zIndex: 10
                    }}
                  >
                    {currentPiece.shape.map((row, rIdx) => row.map((cell, cIdx) => {
                      const { color } = getPieceStyle(currentPiece.id, currentSkin);
                      return (cell === 1) ? (
                        <div 
                          key={`ghost-${rIdx}-${cIdx}`}
                          className="m-[1.5px] rounded-[6px]"
                          style={{
                            backgroundColor: `${color}B3`, // ~70% opacity
                            border: `1px solid white/20`,
                            boxShadow: `none` // Disable glow when dragging
                          }}
                        />
                      ) : <div key={`ghost-empty-${rIdx}-${cIdx}`} />;
                    }))}
                  </div>
                )}

                {/* Blockers */}
                {blockers.map((b, i) => (
                  <div 
                    key={`blocker-${i}`}
                    className="absolute bg-zinc-900/90 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
                    style={{
                      top: `${(b.r / GRID_ROWS) * 100}%`,
                      left: `${(b.c / GRID_COLS) * 100}%`,
                      width: `${(1 / GRID_COLS) * 100}%`,
                      height: `${(1 / GRID_ROWS) * 100}%`,
                      zIndex: 5
                    }}
                  >
                    <div className="w-2.5 h-2.5 bg-zinc-700 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.8)] border border-white/5" />
                  </div>
                ))}

                {/* Placed Pieces */}
                {placedPieces.map((p, i) => {
                  const { color, glow } = getPieceStyle(p.id, currentSkin);
                  return (
                    <div 
                      key={`placed-${p.id}-${i}`}
                      onPointerDown={() => handlePieceClick(p.id)}
                      className="absolute cursor-pointer"
                      style={{
                        top: `${(p.row / GRID_ROWS) * 100}%`,
                        left: `${(p.col / GRID_COLS) * 100}%`,
                        width: `${(p.shape[0].length / GRID_COLS) * 100}%`,
                        height: `${(p.shape.length / GRID_ROWS) * 100}%`,
                        display: 'grid',
                        gridTemplateRows: `repeat(${p.shape.length}, 1fr)`,
                        gridTemplateColumns: `repeat(${p.shape[0].length}, 1fr)`,
                        zIndex: 20
                      }}
                    >
                      {p.shape.map((row, rIdx) => row.map((cell, cIdx) => (cell === 1) ? (
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          key={`${rIdx}-${cIdx}`}
                          className="m-[1.5px] rounded-[6px] relative overflow-hidden"
                          style={{
                            backgroundColor: color,
                            boxShadow: `0 0 8px ${glow}, inset 0 0 10px rgba(255,255,255,0.3)`, // Lower intensity glow
                            border: '1px solid rgba(255,255,255,0.3)'
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                        </motion.div>
                      ) : <div key={`placed-empty-${rIdx}-${cIdx}`} />))}
                    </div>
                  );
                })}
              </div>

              {/* Dragging Overlay */}
              {isDragging && currentPiece && (
                <div 
                  className="fixed pointer-events-none z-[100]"
                  style={{
                    left: dragPos.x - (dragOffset.x * (gridRef.current ? (gridRef.current.clientWidth / GRID_COLS) * currentPiece.shape[0].length : 0)),
                    top: dragPos.y - (dragOffset.y * (gridRef.current ? (gridRef.current.clientWidth / GRID_COLS) * currentPiece.shape.length : 0)),
                    width: gridRef.current ? (gridRef.current.clientWidth / GRID_COLS) * currentPiece.shape[0].length : 0,
                    height: gridRef.current ? (gridRef.current.clientWidth / GRID_COLS) * currentPiece.shape.length : 0,
                    display: 'grid',
                    gridTemplateRows: `repeat(${currentPiece.shape.length}, 1fr)`,
                    gridTemplateColumns: `repeat(${currentPiece.shape[0].length}, 1fr)`,
                    opacity: 0.4,
                    scale: 1.1,
                    filter: `none` // Disable drop-shadow when dragging
                  }}
                >
                  {currentPiece.shape.map((row, rIdx) => row.map((cell, cIdx) => {
                    const { color } = getPieceStyle(currentPiece.id, currentSkin);
                    return (
                      <div 
                        key={`drag-${rIdx}-${cIdx}`}
                        className="m-[1.5px] rounded-[6px] relative overflow-hidden"
                        style={{
                          backgroundColor: (cell === 1) ? color : 'transparent',
                          boxShadow: 'none', // Disable glow when dragging
                          border: (cell === 1) ? '2px solid white/40' : 'none'
                        }}
                      >
                        {(cell === 1) && <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />}
                      </div>
                    );
                  }))}
                </div>
              )}
            </main>

            {/* Tray Area */}
            <footer className="bg-black/80 backdrop-blur-3xl border-t border-white/10 p-4 pb-10 flex flex-col items-center gap-6 relative shrink-0">
              <div className="absolute top-0 left-0 h-[1px] w-full opacity-30" style={{ background: `linear-gradient(90deg, transparent, ${currentSkin.primary}, transparent)` }} />
              
              <div className="flex items-center justify-center w-full gap-3 sm:gap-6">
                {/* Left Controls */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={handleRotate}
                      className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all shadow-lg"
                      style={{ borderColor: `${currentSkin.primary}44` }}
                    >
                      <RotateCw size={22} style={{ color: currentSkin.primary }} />
                    </motion.button>
                    <span className="text-[8px] font-bold opacity-60 tracking-wider uppercase" style={{ color: currentSkin.primary }}>{t('rotate')}</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-1">
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={handleFlip}
                      className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all shadow-lg"
                      style={{ borderColor: `${currentSkin.secondary}44` }}
                    >
                      <FlipHorizontal size={22} style={{ color: currentSkin.secondary }} />
                    </motion.button>
                    <span className="text-[8px] font-bold opacity-60 tracking-wider uppercase" style={{ color: currentSkin.secondary }}>{t('flip')}</span>
                  </div>
                </div>

                {/* Piece Tray Centered */}
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <motion.button 
                    whileTap={{ scale: 0.8 }}
                    onClick={prevTrayPiece}
                    className="p-1 text-white/40 hover:text-white transition-colors"
                  >
                    <ChevronLeft size={28} />
                  </motion.button>

                  <div 
                    className="relative bg-white/[0.03] rounded-[2rem] border border-white/10 flex items-center justify-center overflow-hidden group active:border-white/30 transition-all shadow-2xl touch-none"
                    style={{ width: '100px', height: '100px', borderColor: `${currentSkin.primary}33` }}
                    onPointerDown={onPointerDown}
                  >
                    {currentPiece ? (
                      <motion.div 
                        key={currentPiece.id}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="grid pointer-events-none"
                        style={{
                          gridTemplateRows: `repeat(${currentPiece.shape.length}, 1fr)`,
                          gridTemplateColumns: `repeat(${currentPiece.shape[0].length}, 1fr)`,
                          width: `${currentPiece.shape[0].length * 16}px`,
                          height: `${currentPiece.shape.length * 16}px`,
                        }}
                      >
                        {currentPiece.shape.map((row, rIdx) => row.map((cell, cIdx) => {
                          const { color, glow } = getPieceStyle(currentPiece.id, currentSkin);
                          return (cell === 1) ? (
                            <div 
                              key={`tray-${rIdx}-${cIdx}`}
                              className="m-[1px] rounded-[3px]"
                              style={{
                                backgroundColor: color,
                                boxShadow: `0 0 10px ${glow}`,
                                border: '1px solid rgba(255,255,255,0.2)'
                              }}
                            />
                          ) : <div key={`tray-empty-${rIdx}-${cIdx}`} />;
                        }))}
                      </motion.div>
                    ) : (
                      <div className="flex flex-col items-center text-white/10">
                        <Zap size={32} />
                        <span className="text-[8px] font-black uppercase tracking-widest mt-2">{t('allNodes')}</span>
                      </div>
                    )}
                  </div>

                  <motion.button 
                    whileTap={{ scale: 0.8 }}
                    onClick={nextTrayPiece}
                    className="p-1 text-white/40 hover:text-white transition-colors"
                  >
                    <ChevronRight size={28} />
                  </motion.button>
                </div>

                {/* Right Controls */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={handleUndo}
                      className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all shadow-lg"
                      style={{ borderColor: `${currentSkin.primary}44` }}
                    >
                      <Undo2 size={22} style={{ color: currentSkin.primary }} />
                    </motion.button>
                    <span className="text-[8px] font-bold opacity-60 tracking-wider uppercase" style={{ color: currentSkin.primary }}>{t('undo')}</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={handleClear}
                      className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all shadow-lg"
                      style={{ borderColor: `${currentSkin.secondary}44` }}
                    >
                      <Zap size={22} style={{ color: currentSkin.secondary }} />
                    </motion.button>
                    <span className="text-[8px] font-bold opacity-60 tracking-wider uppercase" style={{ color: currentSkin.secondary }}>{t('reset')}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 w-full max-w-[200px]">
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full shadow-[0_0_10px_white]"
                    style={{ backgroundColor: currentSkin.primary }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentPieceIndex / allPieces.length) * 100}%` }}
                  />
                </div>
                <div className="text-[8px] uppercase font-black text-white/20 tracking-[0.4em]">
                  {currentPiece ? t('node', { current: currentPieceIndex + 1, total: allPieces.length }) : t('allNodes')}
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Victory Modal */}
      <AnimatePresence>
        {gameState === 'GAMEOVER' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl flex flex-col items-center p-6 z-[200] overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-black/40 border border-white/10 backdrop-blur-3xl rounded-[3rem] p-10 w-full max-w-xs text-center relative overflow-hidden my-auto shrink-0"
            >
              <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: currentSkin.primary }} />
              
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <Trophy size={40} style={{ color: currentSkin.primary }} />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-4px] border border-dashed border-white/20 rounded-full"
                />
              </div>

              <h2 className="text-4xl font-black text-white mb-2 uppercase italic tracking-tighter">
                {level === 20 ? t('victory') : t('syncComplete')}
              </h2>
              <p className="text-white/30 mb-8 text-[8px] uppercase tracking-[0.4em] font-bold">
                {level === 20 ? t('infiniteMode') : t('neuralSector', { n: level })}
              </p>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8">
                <div className="text-3xl font-mono font-black text-white mb-6 tracking-tighter">{formatTime(time)}</div>
                
                <div className="flex justify-center gap-3">
                  {[1, 2, 3].map(i => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <Star 
                        size={32} 
                        fill={i <= getStars(time) ? currentSkin.primary : "none"} 
                        style={{ color: i <= getStars(time) ? currentSkin.primary : "rgba(255,255,255,0.05)" }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setLevel(l => l + 1);
                  initLevel();
                }}
                className="w-full py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white/20 transition-all"
              >
                {t('nextProtocol')}
                <ChevronRight size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6 z-[300]"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-black/40 border border-white/10 backdrop-blur-3xl rounded-[3rem] p-10 w-full max-w-sm relative max-h-[90vh] overflow-y-auto shrink-0"
            >
              <h2 className="text-2xl font-black text-white mb-8 uppercase italic tracking-tighter flex items-center gap-3">
                <Settings size={24} /> {t('systemConfig')}
              </h2>

              <div className="space-y-8">
                {/* Language */}
                <div className="space-y-4">
                  <div className="text-[10px] uppercase font-black tracking-widest text-white/40">{t('language')}</div>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.values(LANGUAGES).map(lang => (
                      <button
                        key={lang.id}
                        onClick={() => setCurrentLang(lang.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                          currentLang === lang.id ? 'bg-white/10 border-white/40' : 'bg-white/5 border-white/5'
                        }`}
                      >
                        <span className="text-xl mb-1">{lang.flag}</span>
                        <span className="text-[8px] font-bold uppercase">{lang.id}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Volume */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[10px] uppercase font-black tracking-widest text-white/40">
                    <span>{t('audioOutput')}</span>
                    <span>{volume}%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={volume} 
                      onChange={(e) => setVolume(parseInt(e.target.value))}
                      className="flex-1 accent-white h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSettings(false)}
                className="w-full mt-10 py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em]"
              >
                {t('apply')}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skins Modal (Neon FX) */}
      <AnimatePresence>
        {showSkinsModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6 z-[300]"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-black/40 border border-white/10 backdrop-blur-3xl rounded-[3rem] p-10 w-full max-w-sm relative max-h-[90vh] overflow-y-auto shrink-0"
            >
              <button 
                onClick={() => setShowSkinsModal(false)}
                className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-black text-white mb-6 uppercase italic tracking-tighter flex items-center gap-3">
                <Zap size={24} className="text-fuchsia-500" /> {t('neonFx')}
              </h2>

              <div className="grid grid-cols-2 gap-2">
                {Object.values(SKINS).map(skin => (
                  <button
                    key={skin.id}
                    onClick={() => setCurrentSkin(skin)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${
                      currentSkin.id === skin.id ? 'bg-white/10 border-white/40' : 'bg-white/5 border-white/5'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10" style={{ backgroundColor: skin.bg }}>
                      <div className="w-5 h-5 rounded-full" style={{ backgroundColor: skin.primary }} />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest mb-1">{skin.name}</span>
                      <div className="flex gap-0.5">
                        {skin.palette.slice(0, 4).map((c: string, i: number) => (
                          <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSkinsModal(false)}
                className="w-full mt-6 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em]"
              >
                {t('apply')}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Levels Modal (Ranked) */}
      <AnimatePresence>
        {showLevelsModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6 z-[300]"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-black/40 border border-white/10 backdrop-blur-3xl rounded-[3rem] p-10 w-full max-w-md relative max-h-[90vh] overflow-y-auto shrink-0"
            >
              <button 
                onClick={() => setShowLevelsModal(false)}
                className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-black text-white mb-8 uppercase italic tracking-tighter flex items-center gap-3">
                <Trophy size={24} className="text-blue-500" /> {t('levelSelect')}
              </h2>

              <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: Math.max(20, Math.max(...Object.keys(levelStars).map(Number), 0) + 1) }).map((_, i) => {
                  const levelNum = i + 1;
                  const stats = levelStars[levelNum];
                  return (
                    <button
                      key={levelNum}
                      onClick={() => {
                        setLevel(levelNum);
                        initLevel();
                        setShowLevelsModal(false);
                      }}
                      className="aspect-square flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all relative group"
                    >
                      <span className="text-lg font-black italic">{levelNum}</span>
                      {stats && (
                        <div className="flex gap-0.5 mt-1">
                          {[1, 2, 3].map(s => (
                            <Star key={s} size={8} fill={s <= stats.stars ? currentSkin.primary : "none"} style={{ color: s <= stats.stars ? currentSkin.primary : "rgba(255,255,255,0.1)" }} />
                          ))}
                        </div>
                      )}
                      {stats && (
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[8px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {formatTime(stats.time)}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tutorial Modal */}
      <AnimatePresence>
        {showTutorialModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6 z-[300]"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-black/40 border border-white/10 backdrop-blur-3xl rounded-[3rem] p-10 w-full max-w-sm relative shrink-0 text-center"
            >
              <button 
                onClick={() => setShowTutorialModal(false)}
                className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <Zap size={40} className="text-yellow-400" />
              </div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tighter">
                {t('howToPlay')}
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-10 px-4">
                {t('tutorialText')}
              </p>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTutorialModal(false)}
                className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em]"
              >
                {t('apply')}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Import Modal */}
      <AnimatePresence>
        {showImportModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6 z-[400]"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-black/40 border border-white/10 backdrop-blur-3xl rounded-[3rem] p-10 w-full max-w-sm relative shrink-0"
            >
              <button 
                onClick={() => setShowImportModal(false)}
                className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-black text-white mb-8 uppercase italic tracking-tighter flex items-center gap-3">
                <ClipboardPaste size={24} /> {t('importLevel')}
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-[10px] uppercase font-black tracking-widest text-white/40">{t('enterCode')}</div>
                  <input 
                    type="text"
                    value={importCode}
                    onChange={(e) => setImportCode(e.target.value)}
                    placeholder="e.g. 1-2-3-4"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-4 font-mono text-sm text-white outline-none focus:border-white/30 transition-all"
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleImportLevel();
                    setShowImportModal(false);
                  }}
                  className="w-full py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white/20 transition-all"
                >
                  {t('apply')}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

