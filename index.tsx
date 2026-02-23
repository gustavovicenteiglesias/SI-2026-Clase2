import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  BookOpen,
  Layers,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  X,
  Quote,
  Target,
  Info,
  Book,
  RotateCw,
  CheckCircle2,
  AlertCircle,
  Trophy,
  RefreshCcw,
  MousePointer2,
  Car,
  Gamepad2,
  Zap,
  ShieldAlert,
  ArrowLeft,
  ArrowRight,
  Activity,
  GitFork,
  ArrowUp,
  ArrowDown,
  Terminal,
} from "lucide-react";

// --- Types ---
type Section = "clase" | "flashcards" | "quiz" | "practica" | "arcade";
type ArcadeGame = "hub" | "invaders" | "homeostasis" | "snake";

interface ConceptDetail {
  concept: string;
  definition: string;
  example: string;
}

interface CharacteristicDetail {
  title: string;
  description: string;
}

interface FundamentalDetail {
  title: string;
  description: string;
}

interface FlashcardData {
  front: string;
  back: string;
  category: string;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

interface PracticeItem {
  id: string;
  name: string;
  systemId: string;
}

interface PracticeSystem {
  id: string;
  name: string;
}

// --- Data Pool ---
const FUNDAMENTALS_DATA: FundamentalDetail[] = [
  {
    title: "Los sistemas existen dentro de sistemas",
    description:
      "Hay una jerarquía de sistemas: suprasistema, sistema y subsistema. Las moléculas existen dentro de células, las células dentro de tejidos, los tejidos dentro de los órganos, los órganos dentro de los organismos, los organismos dentro de colonias, las colonias dentro de culturas rientes, las culturas dentro de conjuntos mayores de culturas, y así sucesivamente.",
  },
  {
    title: "Los sistemas son abiertos",
    description:
      "Es una consecuencia de la premisa anterior. Cada sistema que se examine, excepto el menor o mayor, recibe y descarga algo en los otros sistemas, generalmente en aquellos que le son contiguos. Los sistemas abiertos son caracterizados por un proceso de intercambio infinito con su ambiente, que son los otros sistemas. Cuando el intercambio cesa, el sistema se desintegra, esto es, pierde sus fuentes de energía.",
  },
  {
    title: "Las funciones de un sistema dependen de su estructura",
    description:
      "Para los sistemas biológicos y mecánicos esta afirmación es intuitiva. Los tejidos musculares, por ejemplo, se contraen porque están constituidos por una estructura celular que permite contracciones. No es propiamente la T. G. S., sino las características y parámetros que establece para todos los sistemas, lo que se constituye en el área de interés en este caso.",
  },
];

const CHARACTERISTICS_DATA: CharacteristicDetail[] = [
  {
    title: "Principio de organización (Selección, Relación, Control)",
    description:
      "Todo sistema tiene un principio de organización que cumple tres funciones: selección, relación y control. Un sistema es una composición de elementos. Una mesa, por ejemplo, consiste en una tapa y patas. Para obtener una mesa, primero es necesario elegir (selección) los elementos, luego colocarlos en cierta relación (la tapa por encima de las patas) y finalmente controlar la operación para cumplir el objetivo (crear un espacio de trabajo). Este principio también se conoce como “Código”.",
  },
  {
    title: "Diferencias entre sí mismo y el medio ambiente",
    description:
      "Todo sistema está basado en diferencias entre sí mismo y el medio ambiente. Cuando un “código” selecciona y relaciona ciertos elementos, muchos otros quedan excluidos en el “resto del mundo”. La selección es inclusiva y exclusiva: todo lo excluido es el “medio ambiente” o contexto. Un sistema existe solo porque se distingue del medio en el cual está inmerso.",
  },
  {
    title: "Construye sus propios elementos",
    description:
      "Un sistema es más que una simple colección de objetos. En el ejemplo de la mesa, antes de serlo no había “patas” o “tapa” dispersos, sino madera o metal. El código del sistema seleccionó y construyó esos objetos como elementos funcionales. En sistemas orgánicos, el código genético es el que “construye” el organismo (órganos, piel, etc.); no es posible simplemente unir partes externas para obtener algo que funcione.",
  },
  {
    title: "Autorreferencia (mantenimiento y equilibrio)",
    description:
      "Todo sistema refiere sus operaciones a sí mismo. Si un sistema “construye” sus propios elementos, también tiene la tendencia de mantenerse a sí mismo, resistiendo cambios y transformaciones. Esta retroalimentación deriva en un control de la función u objetivos, permitiéndole evolucionar y mantener el equilibrio dinámico.",
  },
  {
    title: "Propósito u Objetivo",
    description:
      "Todos los sistemas persiguen un fin. No existe un sistema sin una orientación hacia un objetivo o propósito que justifique su existencia y la interrelación de sus partes.",
  },
  {
    title: "Globalismo (Naturaleza Orgánica)",
    description:
      "Todo sistema tiene una naturaleza orgánica, por lo cual cualquier estímulo en uno de los componentes afecta a todo el sistema. El cambio en una parte genera ajustes o repercusiones en la totalidad de la estructura.",
  },
];

const CONCEPTS_DATA: ConceptDetail[] = [
  {
    concept: "Subsistema",
    definition:
      "Componente de un sistema mayor que posee sus propias características sistémicas.",
    example: "El sistema de frenos dentro de un automóvil.",
  },
  {
    concept: "Isomorfismo",
    definition:
      "Existencia de leyes formalmente idénticas en diferentes campos del conocimiento.",
    example:
      "Leyes de crecimiento poblacional aplicadas a bacterias y a ciudades.",
  },
  {
    concept: "Homomorfismo",
    definition:
      "Cuando dos sistemas tienen una estructura similar pero no idéntica, permitiendo modelos simplificados.",
    example: "Un plano arquitectónico respecto a un edificio real.",
  },
  {
    concept: "Caja Negra",
    definition:
      "Sistema cuyo proceso interno se desconoce, interesando solo sus entradas y salidas.",
    example: "Un microprocesador para un programador de alto nivel.",
  },
  {
    concept: "Procesamiento",
    definition:
      "Acción de transformar las entradas en salidas mediante un proceso interno.",
    example: "La refinación de petróleo en gasolina.",
  },
  {
    concept: "Homeostasis",
    definition:
      "Equilibrio dinámico que permite la supervivencia del sistema frente a cambios del medio.",
    example: "La regulación de la temperatura corporal con la sudoración.",
  },
  {
    concept: "Retroalimentación",
    definition:
      "Mecanismo donde la salida influye en la entrada para control del sistema.",
    example: "El sensor de temperatura de una heladera.",
  },
  {
    concept: "Recursividad",
    definition:
      "Propiedad de los sistemas de estar compuestos por otros sistemas inferiores.",
    example:
      "Una universidad compuesta por facultades, que tienen departamentos.",
  },
  {
    concept: "Sinergia",
    definition:
      "Fenómeno donde el todo es superior a la suma de sus partes (Holismo).",
    example: "Un equipo de trabajo logrando metas que ninguno podría solo.",
  },
  {
    concept: "Entropía",
    definition:
      "Tendencia natural de los sistemas al desorden y la degradación.",
    example:
      "El desorden acumulado en un archivo que no se organiza periódicamente.",
  },
  {
    concept: "Equifinalidad",
    definition:
      "Capacidad de alcanzar el mismo estado final por differentes caminos.",
    example: "Llegar a una meta de producción usando diferentes tecnologías.",
  },
  {
    concept: "Flujo",
    definition:
      "Movimiento de materia, energía o información a través de los límites del sistema.",
    example: "El flujo de datos en una red de fibra óptica.",
  },
];

const FLASHCARDS_DATA: FlashcardData[] = [
  {
    category: "Metodología",
    front: "¿Qué busca el Enfoque AnalÍTico?",
    back: "Describir un todo descomponiéndolo en sus partes constituyentes para comprenderlo (Analizar, dividir, segmentar).",
  },
  {
    category: "Teoría",
    front: "Concepción Mecanicista vs. Holística",
    back: "Mecanicista: Se enfoca en la estructura (cómo funciona).\nHolística: Se concentra en la función (por qué opera así).",
  },
  {
    category: "Definición",
    front: "Definición de Sistema (Kast, 1979)",
    back: "Un todo organizado, compuesto por partes interdependientes y deliniado por límites de su suprasistema ambiente.",
  },
  {
    category: "Fundamentos",
    front: "Los 3 Fundamentos de la TGS",
    back: "1. Sistemas dentro de sistemas.\n2. Sistemas son abiertos.\n3. Funciones dependen de la estructura.",
  },
];

const QUIZ_POOL: Question[] = [
  {
    id: 1,
    text: "¿Qué autor define sistema como un todo organizado con partes interdependientes?",
    options: ["Bertalanffy", "Kast", "Newton", "Taylor"],
    correct: 1,
  },
  {
    id: 2,
    text: "La tendencia natural de los sistemas al desorden se denomina:",
    options: ["Homeostasis", "Entropía", "Sinergia", "Recursividad"],
    correct: 1,
  },
  {
    id: 3,
    text: "El enfoque analítico tradicional se caracteriza por:",
    options: [
      "Ver el todo como función",
      "Descomponer el todo en partes",
      "Ignorar las entradas",
      "Ser puramente holístico",
    ],
    correct: 1,
  },
  {
    id: 4,
    text: "Según la TGS, los sistemas son principalmente:",
    options: ["Cerrados", "Estáticos", "Abiertos", "Aislados"],
    correct: 2,
  },
  {
    id: 5,
    text: "Cuando el resultado total es mayor a la suma de las partes hablamos de:",
    options: ["Equifinalidad", "Sinergia", "Isomorfismo", "Caja Negra"],
    correct: 1,
  },
];

const PRACTICE_ITEMS: PracticeItem[] = [
  { id: "bat", name: "BATERÍA", systemId: "elec" },
  { id: "pis", name: "PISTÓN", systemId: "prop" },
  { id: "rad", name: "RADIADOR", systemId: "refr" },
  { id: "vol", name: "VOLANTE", systemId: "dire" },
  { id: "alt", name: "ALTERNADOR", systemId: "elec" },
  { id: "neu", name: "NEUMÁTICO", systemId: "dire" },
];

const PRACTICE_SYSTEMS: PracticeSystem[] = [
  { id: "elec", name: "SISTEMA ELÉCTRICO" },
  { id: "prop", name: "SISTEMA DE PROPULSIÓN" },
  { id: "refr", name: "SISTEMA DE REFRIGERACIÓN" },
  { id: "dire", name: "SISTEMA DE DIRECCIÓN" },
];

// --- Sub-components ---

const Flashcard: React.FC<{ data: FlashcardData; isDark: boolean }> = ({
  data,
  isDark,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div
      className="h-[300px] w-full perspective cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
      >
        <div
          className={`absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 rounded-[2.5rem] border-2 shadow-xl ${isDark ? "bg-[#1E1E1E] border-[#333] text-white" : "bg-white border-gray-100 text-[#3C3C3C]"}`}
        >
          <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-[0.3em] text-[#AA9614] opacity-80">
            {data.category}
          </span>
          <h4 className="text-xl font-black text-center tracking-tighter">
            {data.front}
          </h4>
          <div className="absolute bottom-6 flex items-center gap-2 opacity-30 text-[9px] font-black  tracking-widest">
            <RotateCw size={12} /> Tocar para girar
          </div>
        </div>
        <div
          className={`absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 rounded-[2.5rem] border-2 shadow-2xl bg-[#AA9614] border-[#AA9614] text-white`}
        >
          <p className="text-base font-bold text-center leading-relaxed whitespace-pre-line  tracking-tight">
            {data.back}
          </p>
        </div>
      </div>
    </div>
  );
};

const Quiz: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === QUIZ_POOL[currentIndex].correct) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (currentIndex < QUIZ_POOL.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (showResult) {
    return (
      <div
        className={`max-w-2xl mx-auto p-12 text-center animate-slideUp rounded-[3rem] border-4 ${isDark ? "bg-[#1A1A1A] border-[#AA9614]/30" : "bg-white border-gray-100 shadow-2xl"}`}
      >
        <div className="mb-10 inline-flex p-10 rounded-full bg-[#AA9614]/10 text-[#AA9614]">
          <Trophy size={100} />
        </div>
        <h3
          className={`text-6xl font-black uppercase tracking-tighter ${isDark ? "text-white" : "text-[#3C3C3C]"}`}
        >
          PUNTAJE: {score}/{QUIZ_POOL.length}
        </h3>
        <div className="mt-12">
          <button
            onClick={resetQuiz}
            className="flex items-center gap-4 px-12 py-5 bg-[#3C3C3C] text-white rounded-2xl mx-auto font-black uppercase hover:scale-105 transition-all shadow-xl active:scale-95"
          >
            <RefreshCcw size={20} /> REINTENTAR QUIZ
          </button>
        </div>
      </div>
    );
  }

  const q = QUIZ_POOL[currentIndex];

  return (
    <div className="max-w-3xl mx-auto px-6 py-4 animate-slideUp">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-2">
          {QUIZ_POOL.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-12 rounded-full transition-all ${i === currentIndex ? "bg-[#AA9614] scale-x-110 shadow-lg" : i < currentIndex ? "bg-green-500" : "bg-gray-200 opacity-20"}`}
            />
          ))}
        </div>
        <span className="text-[10px] font-black  tracking-widest opacity-50">
          Pregunta {currentIndex + 1}/{QUIZ_POOL.length}
        </span>
      </div>

      <div
        className={`${isDark ? "bg-[#1A1A1A] border-[#333]" : "bg-white border-gray-100 shadow-2xl"} p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border-2 relative overflow-hidden`}
      >
        <h4
          className={`text-xl md:text-3xl font-black  leading-tight tracking-tighter mb-8 md:mb-10 ${isDark ? "text-white" : "text-[#3C3C3C]"}`}
        >
          {q.text}
        </h4>

        <div className="space-y-4">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correct;
            const isSelected = i === selectedOption;
            let btnClass = isDark
              ? "bg-[#222] border-[#333] text-white hover:border-[#AA9614]"
              : "bg-gray-50 border-gray-100 text-[#3C3C3C] hover:border-[#AA9614]";

            if (isAnswered) {
              if (isCorrect)
                btnClass = "bg-green-500 text-white border-green-500";
              else if (isSelected)
                btnClass = "bg-red-500 text-white border-red-500 scale-95";
              else btnClass = "opacity-20 bg-transparent grayscale";
            }

            return (
              <button
                key={i}
                disabled={isAnswered}
                onClick={() => handleOptionClick(i)}
                className={`w-full p-4 md:p-6 rounded-2xl border-2 font-black  text-left transition-all flex items-center justify-between group text-sm md:text-base ${btnClass}`}
              >
                <span>{opt}</span>
                {isAnswered && isCorrect && <CheckCircle2 size={24} />}
                {isAnswered && isSelected && !isCorrect && (
                  <AlertCircle size={24} />
                )}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="mt-10 flex justify-center animate-scaleIn">
            <button
              onClick={nextQuestion}
              className="px-10 md:px-16 py-3 md:py-4 bg-[#AA9614] text-white rounded-full font-black  tracking-widest shadow-xl hover:scale-105 transition-all text-xs md:text-sm"
            >
              {currentIndex < QUIZ_POOL.length - 1
                ? "Siguiente"
                : "Ver Resultados"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const PracticeModule: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [items, setItems] = useState<PracticeItem[]>(PRACTICE_ITEMS);
  const [assignments, setAssignments] = useState<Record<string, string | null>>(
    {},
  );
  const [feedback, setFeedback] = useState<
    Record<string, "correct" | "wrong" | null>
  >({});

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData("itemId", itemId);
  };

  const handleDrop = (e: React.DragEvent, systemId: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("itemId");
    const item = PRACTICE_ITEMS.find((i) => i.id === itemId);

    if (item) {
      const isCorrect = item.systemId === systemId;
      setAssignments((prev) => ({ ...prev, [itemId]: systemId }));
      setFeedback((prev) => ({
        ...prev,
        [itemId]: isCorrect ? "correct" : "wrong",
      }));

      if (isCorrect) {
        setItems((prev) => prev.filter((i) => i.id !== itemId));
      }
    }
  };

  const resetPractice = () => {
    setItems(PRACTICE_ITEMS);
    setAssignments({});
    setFeedback({});
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 animate-slideUp text-center">
      <div className="mb-12">
        <Car size={48} className="mx-auto text-[#AA9614] mb-4" />
        <h2
          className={`text-3xl md:text-4xl font-black uppercase tracking-tighter ${isDark ? "text-white" : "text-[#3C3C3C]"}`}
        >
          RECURSIVIDAD: EL AUTOMÓVIL
        </h2>
        <p className="text-[#AA9614] font-black  tracking-[0.2em] text-[10px] md:text-xs mt-2">
          Arrastra los subsistemas a su sistema correspondiente
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start text-left">
        <div
          className={`${isDark ? "bg-[#1A1A1A] border-[#333]" : "bg-gray-50 border-gray-200"} p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-2 min-h-[300px] md:min-h-[400px]`}
        >
          <h3 className="text-[10px] font-black uppercase tracking-widest text-[#AA9614] mb-8 border-b-2 border-[#AA9614]/20 pb-2 text-center">
            ELEMENTOS
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                className={`p-4 rounded-2xl border-2 cursor-move flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md ${
                  isDark
                    ? "bg-[#252525] border-gray-700 text-white"
                    : "bg-white border-gray-100 text-[#3C3C3C]"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#AA9614] flex items-center justify-center text-white">
                  <Settings size={16} />
                </div>
                <span className="text-[9px] font-black text-center leading-none">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRACTICE_SYSTEMS.map((sys) => (
            <div
              key={sys.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, sys.id)}
              className={`p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-4 border-dashed transition-all min-h-[160px] flex flex-col ${
                isDark
                  ? "bg-[#151515] border-gray-800"
                  : "bg-white border-gray-200 shadow-sm"
              } hover:border-[#AA9614] hover:bg-[#AA9614]/5 group`}
            >
              <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-[#AA9614] mb-4 flex items-center gap-2">
                <Target size={14} /> {sys.name}
              </h4>
              <div className="flex flex-wrap gap-2 flex-grow items-center justify-center">
                {PRACTICE_ITEMS.filter((i) => assignments[i.id] === sys.id).map(
                  (placed) => (
                    <div
                      key={placed.id}
                      className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase flex items-center gap-2 animate-scaleIn border-2 ${
                        feedback[placed.id] === "correct"
                          ? "bg-green-500/20 border-green-500 text-green-500"
                          : "bg-red-500/20 border-red-500 text-red-500 cursor-pointer"
                      }`}
                    >
                      {placed.name}
                      {feedback[placed.id] === "correct" ? (
                        <CheckCircle2 size={12} />
                      ) : (
                        <AlertCircle size={12} />
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 text-center">
        <button
          onClick={resetPractice}
          className={`px-8 py-3 rounded-xl font-black uppercase text-[10px] md:text-[11px] flex items-center gap-2 mx-auto transition-all hover:scale-105 active:scale-95 ${
            isDark
              ? "bg-gray-800 text-white"
              : "bg-[#3C3C3C] text-white shadow-xl"
          }`}
        >
          <RefreshCcw size={14} /> REINICIAR
        </button>
      </div>
    </div>
  );
};

// --- Arcade Games ---

const EntropiaInvaders: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const keysRef = useRef<Record<string, boolean>>({});
  const scoreInternalRef = useRef(0);

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const CANVAS_WIDTH = 600;
    const CANVAS_HEIGHT = 500;
    const SHIP_WIDTH = 60;
    const SHIP_HEIGHT = 20;
    const BULLET_RADIUS = 3;
    const ENEMY_WIDTH = 45;
    const ENEMY_HEIGHT = 45;

    let shipX = CANVAS_WIDTH / 2 - SHIP_WIDTH / 2;
    let bullets: { x: number; y: number }[] = [];
    let enemies: { x: number; y: number; id: number }[] = [];
    let enemySpeed = 1.2;
    let lastSpawn = 0;
    let frame = 0;
    scoreInternalRef.current = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
          e.code,
        )
      )
        e.preventDefault();
      keysRef.current[e.code] = true;
      if (e.code === "Space") fire();
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const fire = () => {
      bullets.push({
        x: shipX + SHIP_WIDTH / 2,
        y: CANVAS_HEIGHT - SHIP_HEIGHT - 10,
      });
    };

    const update = () => {
      frame++;
      if (
        (keysRef.current["ArrowLeft"] || keysRef.current["MobileLeft"]) &&
        shipX > 0
      )
        shipX -= 6;
      if (
        (keysRef.current["ArrowRight"] || keysRef.current["MobileRight"]) &&
        shipX < CANVAS_WIDTH - SHIP_WIDTH
      )
        shipX += 6;
      if (keysRef.current["MobileFire"]) {
        fire();
        keysRef.current["MobileFire"] = false;
      }
      bullets = bullets.filter((b) => b.y > 0);
      bullets.forEach((b) => (b.y -= 8));
      const spawnRate = Math.max(
        25,
        60 - Math.floor(scoreInternalRef.current / 150) * 5,
      );
      if (frame - lastSpawn > spawnRate) {
        enemies.push({
          x: Math.random() * (CANVAS_WIDTH - ENEMY_WIDTH),
          y: -ENEMY_HEIGHT,
          id: Math.random(),
        });
        lastSpawn = frame;
      }
      enemies.forEach((e) => {
        e.y += enemySpeed;
        if (e.y > CANVAS_HEIGHT - SHIP_HEIGHT - 10) setGameOver(true);
      });
      bullets.forEach((b, bi) => {
        enemies.forEach((e, ei) => {
          if (
            b.x > e.x &&
            b.x < e.x + ENEMY_WIDTH &&
            b.y > e.y &&
            b.y < e.y + ENEMY_HEIGHT
          ) {
            bullets.splice(bi, 1);
            enemies.splice(ei, 1);
            scoreInternalRef.current += 10;
            setScore(scoreInternalRef.current);
            enemySpeed += 0.012;
          }
        });
      });
    };

    const draw = () => {
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.strokeStyle = "rgba(170, 150, 20, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i < CANVAS_WIDTH; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, CANVAS_HEIGHT);
        ctx.stroke();
      }
      for (let i = 0; i < CANVAS_HEIGHT; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(CANVAS_WIDTH, i);
        ctx.stroke();
      }
      ctx.fillStyle = "#AA9614";
      ctx.fillRect(
        shipX,
        CANVAS_HEIGHT - SHIP_HEIGHT - 10,
        SHIP_WIDTH,
        SHIP_HEIGHT,
      );
      ctx.fillRect(
        shipX + SHIP_WIDTH / 4,
        CANVAS_HEIGHT - SHIP_HEIGHT - 20,
        SHIP_WIDTH / 2,
        10,
      );
      ctx.fillStyle = "#FFD700";
      bullets.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, BULLET_RADIUS + 1, 0, Math.PI * 2);
        ctx.fill();
      });
      enemies.forEach((e) => {
        ctx.strokeStyle = "#EF4444";
        ctx.lineWidth = 3;
        ctx.strokeRect(e.x, e.y, ENEMY_WIDTH, ENEMY_HEIGHT);
        ctx.fillStyle = "#EF4444";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.fillText(
          "ENTROPY",
          e.x + ENEMY_WIDTH / 2,
          e.y + ENEMY_HEIGHT / 2 + 4,
        );
      });
    };

    const loop = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted, gameOver]);

  return (
    <div className="flex flex-col items-center animate-fadeIn px-4">
      <button
        onClick={onBack}
        className="self-start mb-4 px-4 py-2 bg-[#AA9614] text-white rounded-lg font-black text-xs uppercase flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg"
      >
        <ArrowLeft size={16} /> VOLVER AL HUB
      </button>
      <div className="relative border-4 border-[#3C3C3C] bg-black rounded-2xl overflow-hidden shadow-2xl w-full max-w-[600px] aspect-[6/5]">
        {!gameStarted && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/95 p-8 text-white text-center">
            <ShieldAlert
              size={64}
              className="text-[#AA9614] mb-6 animate-pulse"
            />
            <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">
              ENTROPÍA INVADERS
            </h3>
            <div className="mb-8 text-sm opacity-80 uppercase tracking-widest leading-relaxed space-y-2">
              <p>Mueve con FLECHAS / Botones</p>
              <p>Dispara con ESPACIO / Botón INFO</p>
              <p>No dejes que el desorden alcance la base</p>
            </div>
            <button
              onClick={() => setGameStarted(true)}
              className="px-10 py-4 bg-[#AA9614] rounded-xl font-black uppercase text-sm tracking-widest hover:scale-110 transition-all shadow-[0_0_30px_rgba(170,150,20,0.5)]"
            >
              INICIAR MISIÓN
            </button>
          </div>
        )}
        {gameOver && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-red-950/90 p-6 text-white text-center">
            <Zap size={64} className="text-yellow-400 mb-4" />
            <h3 className="text-3xl font-black uppercase mb-2 tracking-tighter">
              SISTEMA COLAPSADO
            </h3>
            <p className="mb-6 font-bold uppercase tracking-widest text-lg">
              ORDEN RESTAURADO: {score}
            </p>
            <button
              onClick={() => {
                setGameOver(false);
                setScore(0);
                scoreInternalRef.current = 0;
              }}
              className="px-10 py-4 bg-white text-red-900 rounded-xl font-black uppercase text-sm tracking-widest shadow-2xl"
            >
              REINTENTAR
            </button>
          </div>
        )}
        <canvas
          ref={canvasRef}
          width={600}
          height={500}
          className="w-full h-auto block"
        />
        <div className="absolute top-4 left-4 text-white/50 text-[10px] font-black uppercase tracking-widest bg-black/40 p-2 rounded-lg">
          NEGENTROPÍA:{" "}
          <span className="text-[#AA9614] text-xl font-black">{score}</span>
        </div>
      </div>
      <div className="mt-6 flex gap-4 md:hidden">
        <button
          onPointerDown={() => (keysRef.current["MobileLeft"] = true)}
          onPointerUp={() => (keysRef.current["MobileLeft"] = false)}
          className="w-16 h-16 bg-gray-800 border-2 border-[#AA9614]/30 rounded-2xl flex items-center justify-center active:bg-[#AA9614] transition-colors"
        >
          <ArrowLeft size={32} className="text-white" />
        </button>
        <button
          onPointerDown={() => (keysRef.current["MobileRight"] = true)}
          onPointerUp={() => (keysRef.current["MobileRight"] = false)}
          className="w-16 h-16 bg-gray-800 border-2 border-[#AA9614]/30 rounded-2xl flex items-center justify-center active:bg-[#AA9614] transition-colors"
        >
          <ArrowRight size={32} className="text-white" />
        </button>
        <button
          onPointerDown={() => (keysRef.current["MobileFire"] = true)}
          onPointerUp={() => (keysRef.current["MobileFire"] = false)}
          className="w-20 h-20 bg-[#AA9614] rounded-2xl text-white flex flex-col items-center justify-center font-black active:scale-95 transition-transform"
        >
          <Zap size={24} />
          INFO
        </button>
      </div>
    </div>
  );
};

const HomeostasisBalance: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const keysRef = useRef<Record<string, boolean>>({});
  const scoreInternalRef = useRef(0);

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const W = 600;
    const H = 500;
    let py = H / 2;
    let pv = 0;
    const gravity = 0.25;
    const jump = -5.5;
    const size = 15;
    let eq = 50;
    let obstacles: {
      x: number;
      y: number;
      w: number;
      h: number;
      type: "pert" | "input";
    }[] = [];
    let frame = 0;
    scoreInternalRef.current = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["Space", "ArrowUp"].includes(e.code)) {
        e.preventDefault();
        pv = jump;
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const update = () => {
      frame++;
      pv += gravity;
      py += pv;
      eq -= 0.05;
      if (keysRef.current["MobileJump"]) {
        pv = jump;
        keysRef.current["MobileJump"] = false;
      }
      if (py < 0 || py > H || eq <= 0 || eq >= 100) setGameOver(true);
      if (frame % 80 === 0) {
        const gap = 150;
        const y = Math.random() * (H - gap - 100) + 50;
        obstacles.push({ x: W, y: 0, w: 40, h: y, type: "pert" });
        obstacles.push({
          x: W,
          y: y + gap,
          w: 40,
          h: H - (y + gap),
          type: "pert",
        });
        if (Math.random() > 0.5)
          obstacles.push({
            x: W + 100,
            y: y + gap / 2,
            w: 20,
            h: 20,
            type: "input",
          });
      }
      obstacles.forEach((o, i) => {
        o.x -= 3;
        if (
          py + size > o.y &&
          py - size < o.y + o.h &&
          100 + size > o.x &&
          100 - size < o.x + o.w
        ) {
          if (o.type === "pert") setGameOver(true);
          else {
            eq += 12;
            obstacles.splice(i, 1);
            scoreInternalRef.current += 100;
            setScore(scoreInternalRef.current);
          }
        }
        if (o.x < -100) {
          obstacles.splice(i, 1);
          if (o.type === "pert") {
            scoreInternalRef.current += 10;
            setScore(scoreInternalRef.current);
          }
        }
      });
    };

    const draw = () => {
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(170, 150, 20, 0.05)";
      for (let i = 0; i < W; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, H);
        ctx.stroke();
      }
      ctx.fillStyle = "#AA9614";
      ctx.beginPath();
      ctx.arc(100, py, size, 0, Math.PI * 2);
      ctx.fill();
      obstacles.forEach((o) => {
        ctx.fillStyle = o.type === "pert" ? "#EF4444" : "#4ADE80";
        if (o.type === "pert") ctx.fillRect(o.x, o.y, o.w, o.h);
        else {
          ctx.beginPath();
          ctx.arc(o.x + 10, o.y + 10, 10, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      const barW = 200;
      const barH = 15;
      const barX = W - barW - 20;
      const barY = 20;
      ctx.fillStyle = "#333";
      ctx.fillRect(barX, barY, barW, barH);
      const fillW = (eq / 100) * barW;
      ctx.fillStyle = eq > 20 && eq < 80 ? "#AA9614" : "#EF4444";
      ctx.fillRect(barX, barY, fillW, barH);
      ctx.strokeStyle = "#fff";
      ctx.strokeRect(barX, barY, barW, barH);
    };

    const loop = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted, gameOver]);

  return (
    <div className="flex flex-col items-center animate-fadeIn px-4">
      <button
        onClick={onBack}
        className="self-start mb-4 px-4 py-2 bg-[#AA9614] text-white rounded-lg font-black text-xs uppercase flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg"
      >
        <ArrowLeft size={16} /> VOLVER AL HUB
      </button>
      <div className="relative border-4 border-[#3C3C3C] bg-black rounded-2xl overflow-hidden shadow-2xl w-full max-w-[600px] aspect-[6/5]">
        {!gameStarted && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/95 p-8 text-white text-center">
            <Activity size={64} className="text-[#AA9614] mb-6 animate-pulse" />
            <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">
              HOMEOSTASIS BALANCE
            </h3>
            <div className="mb-8 text-sm opacity-80 uppercase tracking-widest leading-relaxed space-y-2">
              <p>Space / Tocar: Impulso hacia arriba</p>
              <p>Evita las Perturbaciones (Rojo)</p>
              <p>Recolecta Entradas (Verde) para equilibrar</p>
            </div>
            <button
              onClick={() => setGameStarted(true)}
              className="px-10 py-4 bg-[#AA9614] rounded-xl font-black uppercase text-sm tracking-widest hover:scale-110 transition-all shadow-[0_0_30px_rgba(170,150,20,0.5)]"
            >
              LOGRAR BALANCE
            </button>
          </div>
        )}
        {gameOver && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-red-950/90 p-6 text-white text-center">
            <AlertCircle size={64} className="text-white mb-4" />
            <h3 className="text-3xl font-black uppercase mb-2 tracking-tighter">
              DESEQUILIBRIO TOTAL
            </h3>
            <p className="mb-6 font-bold uppercase tracking-widest text-lg">
              SISTEMA SOBREVIVIÓ: {score}
            </p>
            <button
              onClick={() => {
                setGameOver(false);
                setScore(0);
                scoreInternalRef.current = 0;
              }}
              className="px-10 py-4 bg-white text-red-900 rounded-xl font-black uppercase text-sm tracking-widest shadow-2xl"
            >
              RESTAURAR
            </button>
          </div>
        )}
        <canvas
          ref={canvasRef}
          width={600}
          height={500}
          className="w-full h-auto block"
          onPointerDown={() => (keysRef.current["MobileJump"] = true)}
        />
        <div className="absolute top-4 left-4 text-white/50 text-[10px] font-black uppercase tracking-widest bg-black/40 p-2 rounded-lg">
          ESTABILIDAD:{" "}
          <span className="text-[#AA9614] font-black">{score}</span>
        </div>
      </div>
      <p className="mt-6 text-[10px] font-black uppercase opacity-60 tracking-widest md:hidden animate-bounce">
        TOCA LA PANTALLA PARA IMPULSAR
      </p>
    </div>
  );
};

const FeedbackSnake: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState<"UP" | "DOWN" | "LEFT" | "RIGHT">(
    "RIGHT",
  );
  const dirRef = useRef<"UP" | "DOWN" | "LEFT" | "RIGHT">("RIGHT");
  const scoreRef = useRef(0);

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GRID_SIZE = 20;
    const CELLS = 25;
    const W = canvas.width;
    const H = canvas.height;

    let snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    let food = { x: 15, y: 15 };
    let frame = 0;
    let speed = 7;
    scoreRef.current = 0;
    dirRef.current = "RIGHT";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code))
        e.preventDefault();
      if (e.code === "ArrowUp" && dirRef.current !== "DOWN")
        dirRef.current = "UP";
      if (e.code === "ArrowDown" && dirRef.current !== "UP")
        dirRef.current = "DOWN";
      if (e.code === "ArrowLeft" && dirRef.current !== "RIGHT")
        dirRef.current = "LEFT";
      if (e.code === "ArrowRight" && dirRef.current !== "LEFT")
        dirRef.current = "RIGHT";
      setDirection(dirRef.current);
    };
    window.addEventListener("keydown", handleKeyDown);

    const update = () => {
      frame++;
      if (frame % speed !== 0) return;

      const head = { ...snake[0] };
      if (dirRef.current === "UP") head.y--;
      if (dirRef.current === "DOWN") head.y++;
      if (dirRef.current === "LEFT") head.x--;
      if (dirRef.current === "RIGHT") head.x++;

      if (head.x < 0 || head.x >= CELLS || head.y < 0 || head.y >= CELLS)
        return setGameOver(true);
      if (snake.some((s) => s.x === head.x && s.y === head.y))
        return setGameOver(true);

      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        scoreRef.current += 50;
        setScore(scoreRef.current);
        food = {
          x: Math.floor(Math.random() * CELLS),
          y: Math.floor(Math.random() * CELLS),
        };
        if (scoreRef.current % 150 === 0 && speed > 3) speed--;
      } else {
        snake.pop();
      }
    };

    const draw = () => {
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(170, 150, 20, 0.05)";
      const cellW = W / CELLS;
      for (let i = 0; i < W; i += cellW) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, H);
        ctx.stroke();
      }
      for (let i = 0; i < H; i += cellW) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(W, i);
        ctx.stroke();
      }
      snake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? "#AA9614" : "rgba(170, 150, 20, 0.6)";
        ctx.fillRect(s.x * cellW + 1, s.y * cellW + 1, cellW - 2, cellW - 2);
        if (i === 0) {
          ctx.strokeStyle = "#fff";
          ctx.strokeRect(
            s.x * cellW + 2,
            s.y * cellW + 2,
            cellW - 4,
            cellW - 4,
          );
        }
      });
      ctx.fillStyle = "#4ADE80";
      ctx.beginPath();
      ctx.arc(
        food.x * cellW + cellW / 2,
        food.y * cellW + cellW / 2,
        cellW / 2 - 2,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    };

    const gameLoop = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(gameLoop);
    };
    let animationFrameId = requestAnimationFrame(gameLoop);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted, gameOver]);

  const mobileControl = (d: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
    if (d === "UP" && dirRef.current !== "DOWN") dirRef.current = "UP";
    if (d === "DOWN" && dirRef.current !== "UP") dirRef.current = "DOWN";
    if (d === "LEFT" && dirRef.current !== "RIGHT") dirRef.current = "LEFT";
    if (d === "RIGHT" && dirRef.current !== "LEFT") dirRef.current = "RIGHT";
    setDirection(dirRef.current);
  };

  return (
    <div className="flex flex-col items-center animate-fadeIn px-4">
      <button
        onClick={onBack}
        className="self-start mb-4 px-4 py-2 bg-[#AA9614] text-white rounded-lg font-black text-xs uppercase flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg"
      >
        <ArrowLeft size={16} /> VOLVER AL HUB
      </button>
      <div className="relative border-4 border-[#3C3C3C] bg-black rounded-2xl overflow-hidden shadow-2xl w-full max-w-[500px] aspect-square">
        {!gameStarted && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/95 p-8 text-white text-center">
            <GitFork size={64} className="text-[#AA9614] mb-6 animate-pulse" />
            <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">
              THE FEEDBACK LOOP
            </h3>
            <div className="mb-8 text-sm opacity-80 uppercase tracking-widest leading-relaxed space-y-2">
              <p>Usa FLECHAS / D-Pad para girar</p>
              <p>Recolecta Información (Verde)</p>
              <p>La complejidad aumenta al crecer</p>
            </div>
            <button
              onClick={() => setGameStarted(true)}
              className="px-10 py-4 bg-[#AA9614] rounded-xl font-black uppercase text-sm tracking-widest hover:scale-110 transition-all shadow-[0_0_30px_rgba(170,150,20,0.5)]"
            >
              ESTABLECER BUCLE
            </button>
          </div>
        )}
        {gameOver && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-red-950/90 p-6 text-white text-center">
            <Trophy size={64} className="text-yellow-400 mb-4" />
            <h3 className="text-3xl font-black uppercase mb-2 tracking-tighter">
              LÍMITE ALCANZADO
            </h3>
            <p className="mb-6 font-bold uppercase tracking-widest text-lg">
              COMPLEJIDAD FINAL: {score}
            </p>
            <button
              onClick={() => {
                setGameOver(false);
                setScore(0);
                scoreRef.current = 0;
              }}
              className="px-10 py-4 bg-white text-red-900 rounded-xl font-black uppercase text-sm tracking-widest shadow-2xl"
            >
              REINICIAR
            </button>
          </div>
        )}
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="w-full h-full block"
        />
        <div className="absolute top-4 left-4 text-white/50 text-[10px] font-black uppercase tracking-widest bg-black/40 p-2 rounded-lg">
          COMPLEJIDAD:{" "}
          <span className="text-[#AA9614] font-black">{score}</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-2 md:hidden">
        <div />
        <button
          onPointerDown={() => mobileControl("UP")}
          className="w-16 h-16 bg-gray-800 border-2 border-[#AA9614]/20 rounded-xl flex items-center justify-center active:bg-[#AA9614] transition-colors"
        >
          <ArrowUp size={32} className="text-white" />
        </button>
        <div />
        <button
          onPointerDown={() => mobileControl("LEFT")}
          className="w-16 h-16 bg-gray-800 border-2 border-[#AA9614]/20 rounded-xl flex items-center justify-center active:bg-[#AA9614] transition-colors"
        >
          <ArrowLeft size={32} className="text-white" />
        </button>
        <button
          onPointerDown={() => mobileControl("DOWN")}
          className="w-16 h-16 bg-gray-800 border-2 border-[#AA9614]/20 rounded-xl flex items-center justify-center active:bg-[#AA9614] transition-colors"
        >
          <ArrowDown size={32} className="text-white" />
        </button>
        <button
          onPointerDown={() => mobileControl("RIGHT")}
          className="w-16 h-16 bg-gray-800 border-2 border-[#AA9614]/20 rounded-xl flex items-center justify-center active:bg-[#AA9614] transition-colors"
        >
          <ArrowRight size={32} className="text-white" />
        </button>
      </div>
    </div>
  );
};

const ArcadeHub: React.FC<{
  setGame: (g: ArcadeGame) => void;
  isDark: boolean;
}> = ({ setGame, isDark }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-slideUp">
      <div className="text-center mb-12">
        <Gamepad2 size={64} className="mx-auto text-[#AA9614] mb-4" />
        <h2
          className={`text-5xl font-black uppercase tracking-tighter ${isDark ? "text-white" : "text-[#3C3C3C]"}`}
        >
          ARCADE TGS
        </h2>
        <p className="text-[#AA9614] font-black uppercase tracking-[0.4em] text-xs mt-2">
          Vive los conceptos sistémicos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            id: "invaders",
            title: "Entropía Invaders",
            desc: "Defiende el sistema del desorden absoluto con Negentropía.",
            icon: Zap,
          },
          {
            id: "homeostasis",
            title: "Homeostasis Balance",
            desc: "Mantén el equilibrio dinámico entre perturbaciones.",
            icon: Activity,
          },
          {
            id: "snake",
            title: "The Feedback Loop",
            desc: "Recolecta información para crecer sin colapsar por límites.",
            icon: GitFork,
          },
        ].map((game) => (
          <button
            key={game.id}
            onClick={() => setGame(game.id as ArcadeGame)}
            className={`flex flex-col items-center p-10 rounded-[3.5rem] border-2 transition-all hover:scale-105 group relative overflow-hidden ${
              isDark
                ? "bg-[#1A1A1A] border-gray-800"
                : "bg-white border-gray-100 shadow-xl"
            } hover:border-[#AA9614] active:scale-95`}
          >
            <div
              className={`p-8 rounded-full bg-[#AA9614]/10 mb-6 group-hover:scale-110 transition-transform text-[#AA9614] shadow-inner`}
            >
              <game.icon size={48} />
            </div>
            <h3
              className={`text-xl font-black uppercase tracking-tighter mb-4 ${isDark ? "text-white" : "text-[#3C3C3C]"}`}
            >
              {game.title}
            </h3>
            <p className="text-xs font-bold opacity-60 uppercase leading-relaxed text-center">
              {game.desc}
            </p>
            <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#AA9614] border-b-2 border-[#AA9614]/30 pb-1">
              <span>JUGAR AHORA</span>
              <ChevronRight size={14} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Presentation Content (FIXED SIZE SLIDES) ---

const SlideContainer = ({
  title,
  page,
  total,
  isDark,
  children,
  onNext,
  onPrev,
  progress,
}: any) => {
  return (
    <div className="max-w-5xl mx-auto py-4 md:py-8 px-4">
      <div
        className={`${isDark ? "bg-[#1A1A1A] text-white border-[#333]" : "bg-white text-[#3C3C3C] border-gray-100 shadow-2xl"} rounded-[2rem] md:rounded-[3rem] border-2 flex flex-col h-[580px] md:h-[680px] relative overflow-hidden`}
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 md:h-2 bg-gray-200/10 z-10">
          <div
            className="h-full bg-[#AA9614] transition-all duration-700 ease-out"
            style={{ width: `${((progress + 1) / total) * 100}%` }}
          />
        </div>

        {/* Header Decorator */}
        <div className="px-6 md:px-12 pt-8 md:pt-12 flex justify-between items-center text-[7px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] opacity-60 shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-[#AA9614] max-w-[120px] md:max-w-none truncate">
              SISTEMA: {title}
            </span>
            <span className="opacity-30">|</span>
            <span>
              DIAPOSITIVA {page} / {total}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#AA9614] animate-pulse" />
            <span className="hidden xs:inline">UNSAdA 2026</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow min-h-0 flex flex-col justify-center px-6 md:px-16 py-6 md:py-10 overflow-y-auto custom-scrollbar">
          {children}
        </div>

        {/* Navigation Footer */}
        <div
          className={`px-8 md:px-12 py-4 md:py-10 flex justify-between items-center shrink-0 ${isDark ? "bg-[#151515]" : "bg-gray-50"}`}
        >
          <button
            onClick={onPrev}
            disabled={progress === 0}
            className={`p-2 md:p-4 rounded-xl md:rounded-2xl transition-all ${isDark ? "bg-[#252525] text-white hover:bg-[#333]" : "bg-white border border-gray-200 text-[#3C3C3C] hover:bg-gray-100"} disabled:opacity-10 shadow-sm`}
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </button>

          <button
            onClick={onNext}
            disabled={progress === total - 1}
            className="flex items-center gap-2 md:gap-3 px-6 md:px-12 py-3 md:py-4 rounded-xl md:rounded-2xl bg-[#AA9614] text-white font-black uppercase text-[10px] md:text-sm hover:scale-105 transition-all shadow-xl active:scale-95 disabled:opacity-30 tracking-widest"
          >
            {progress === total - 1 ? "FIN" : "SIGUIENTE"}{" "}
            <ChevronRight size={14} className="md:w-[18px] md:h-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Presentation = ({ isDark }: { isDark: boolean }) => {
  const [slide, setSlide] = useState(0);
  const [selectedConcept, setSelectedConcept] = useState<ConceptDetail | null>(
    null,
  );
  const [selectedChar, setSelectedChar] = useState<CharacteristicDetail | null>(
    null,
  );
  const [selectedFund, setSelectedFund] = useState<FundamentalDetail | null>(
    null,
  );

  const slides = [
    {
  title: "PORTADA",
  content: (
    <div className="flex flex-col items-center justify-center text-center space-y-4 md:space-y-10 animate-slideUp">
      <div className="relative">
        <h1
          className={`text-3xl md:text-7xl font-black uppercase leading-none tracking-tighter ${isDark ? "text-white" : "text-[#3C3C3C]"}`}
        >
          SISTEMAS DE <br /> <span className="text-[#AA9614]">INFORMACIÓN</span>
        </h1>
        <div className="h-1.5 md:h-2 w-20 md:w-56 bg-[#AA9614] mx-auto mt-4 md:mt-5 rounded-full shadow-[0_0_20px_rgba(170,150,20,0.5)]" />
      </div>

      <p className="text-base md:text-2xl font-bold opacity-60 uppercase tracking-[0.2em] md:tracking-[0.35em] text-gray-500">
        Teoría General de Sistemas (TGS)
      </p>

      <div className="pt-4 md:pt-6">
        <Target className="text-[#AA9614] opacity-30 animate-spin-slow w-14 h-14 md:w-16 md:h-16" />
      </div>
    </div>
  ),
},
    {
      title: "ENFOQUE ANALÍTICO",
      content: (
        <div className="space-y-6 md:space-y-12 animate-slideUp">
          <h3 className="text-xl md:text-4xl font-black text-[#AA9614]  tracking-tighter border-b-4 border-[#AA9614]/20 pb-2 md:pb-4">
            ENFOQUE ANALÍTICO TRADICIONAL
          </h3>
          <p
            className={`text-base md:text-2xl font-black  leading-snug tracking-tight ${isDark ? "text-white" : "text-[#3C3C3C]"}`}
          >
            Surgió como un mecanismo para describir un todo o entidad{" "}
            <span className="text-[#AA9614]">
              descomponiéndolo en sus partes
            </span>{" "}
            componentes o constitutivas:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {["ANALIZANDO", "DESAGREGANDO", "DIVIDIENDO", "SEGMENTANDO"].map(
              (item) => (
                <div
                  key={item}
                  className={`p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 md:gap-4 ${isDark ? "bg-[#222] border-[#333]" : "bg-white border-gray-100 shadow-md"}`}
                >
                  <div className="w-8 h-8 md:w-14 md:h-14 rounded-full bg-[#AA9614]/10 flex items-center justify-center text-[#AA9614] font-black">
                    <Target size={20} className="md:w-6 md:h-6" />
                  </div>
                  <span
                    className={`text-[8px] md:text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-white" : "text-[#3C3C3C]"}`}
                  >
                    {item}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      ),
    },
    {
      title: "DIFERENTES ENFOQUES",
      content: (
        <div className="space-y-6 md:space-y-12 animate-slideUp">
          <h3 className="text-xl md:text-4xl font-black text-[#AA9614] uppercase tracking-tighter">
            DIFERENTES ENFOQUES...
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div
              className={`p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-2 ${isDark ? "bg-[#222] border-[#333]" : "bg-gray-50 border-gray-100"}`}
            >
              <h4 className="text-base md:text-xl font-black text-[#AA9614] uppercase mb-3 md:mb-6 flex items-center gap-2">
                <Settings size={20} className="md:w-7 md:h-7" /> CONCEPCIÓN
                MECANICISTA
              </h4>
              <p className="text-sm md:text-lg font-bold leading-relaxed opacity-90 mb-3 md:mb-4">
                Se enfoca sobre la <span className="underline">ESTRUCTURA</span>
                , revela cómo funcionan las cosas.
              </p>
              <div className="bg-[#AA9614] text-white px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-black inline-block uppercase tracking-wider">
                GENERA CONOCIMIENTO
              </div>
            </div>
            <div
              className={`p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-2 ${isDark ? "bg-[#222] border-[#333]" : "bg-gray-50 border-gray-100"}`}
            >
              <h4 className="text-base md:text-xl font-black text-[#AA9614] uppercase mb-3 md:mb-6 flex items-center gap-2">
                <Activity size={20} className="md:w-7 md:h-7" /> CONCEPCIÓN
                HOLÍSTICA
              </h4>
              <p className="text-sm md:text-lg font-bold leading-relaxed opacity-90 mb-3 md:mb-4">
                Se concentra en la <span className="underline">FUNCIÓN</span>,
                revela por qué las cosas operan.
              </p>
              <div className="bg-[#AA9614] text-white px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-black inline-block uppercase tracking-wider">
                GENERA COMPRENSIÓN
              </div>
            </div>
          </div>
          <div
            className={`p-3 md:p-4 text-center rounded-2xl border-2 border-dashed ${isDark ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-500"} font-black uppercase text-[9px] md:text-xs tracking-tighter`}
          >
            NO DEBERÍAN PRODUCIR RESULTADOS CONTRADICTORIOS: SON
            COMPLEMENTARIOS.
          </div>
        </div>
      ),
    },
    {
  title: "DEFINICIÓN",
  content: (
    <div className="space-y-5 md:space-y-6 animate-slideUp flex flex-col justify-center h-full min-h-0">
      <h3 className="text-xl md:text-3xl font-black text-[#AA9614] uppercase tracking-tighter shrink-0">
        DEFINICIÓN DE SISTEMA
      </h3>

      <p
        className={`text-sm md:text-lg leading-relaxed font-medium shrink-0 ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Surgió como un mecanismo para describir un todo o entidad{" "}
        <span className="text-[#AA9614] font-bold">
          descomponiéndolo en sus partes
        </span>{" "}
        componentes o constitutivas.
      </p>

      <div
        className={`p-4 md:p-6 rounded-2xl border-l-4 border-[#AA9614] shrink-0 relative ${
          isDark ? "bg-[#222]" : "bg-[#AA9614]/5"
        }`}
      >
        <p
          className={`text-base md:text-xl font-black leading-relaxed ${
            isDark ? "text-white" : "text-[#3C3C3C]"
          }`}
        >
          "Un todo organizado, compuesto por dos o más partes interdependientes y delineados por límites identificables de su suprasistema ambiente"
        </p>

        <div className="flex justify-end pt-4 md:pt-5">
          <span className="bg-[#AA9614] text-white px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase shadow-lg">
            KAST, 1979
          </span>
        </div>
      </div>
    </div>
  ),
},
   {
  title: "OBJETIVOS TGS",
  content: (
    <div className="space-y-5 md:space-y-6 animate-slideUp">
      <h3 className="text-xl md:text-3xl font-black text-[#AA9614] uppercase tracking-tighter">
        OBJETIVOS DE LA TGS
      </h3>

      <div className="grid grid-cols-1 gap-3 md:gap-4">
        {[
          { icon: Terminal, t: "Terminología general", d: "Desarrollar un lenguaje común que permita describir y analizar las características, funciones y comportamientos de los sistemas." },
          { icon: Book, t: "Conjunto de leyes", d: "Identificar principios y regularidades aplicables a los sistemas en general, independientemente de su naturaleza específica." },
          { icon: GitFork, t: "Formalización matemática", d: "Establecer modelos formales que otorguen precisión, coherencia y fundamento lógico al estudio de los sistemas." },
        ].map((obj, i) => (
          <div
            key={i}
            className={`p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border-2 flex items-center gap-4 md:gap-6 group transition-all hover:border-[#AA9614] ${
              isDark ? "bg-[#222] border-[#333]" : "bg-white border-gray-100 shadow-sm"
            }`}
          >
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-[#AA9614]/10 flex items-center justify-center text-[#AA9614] transition-all group-hover:scale-110 shrink-0">
              <obj.icon size={20} className="md:w-6 md:h-6" />
            </div>

            <div>
              <h4 className={`text-sm md:text-lg font-black tracking-tight ${isDark ? "text-white" : "text-[#3C3C3C]"}`}>
                {obj.t}
              </h4>
              <p className="text-[9px] md:text-[13px] font-medium opacity-60 tracking-widest mt-1 leading-tight">
                {obj.d}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
},
    {
  title: "FUNDAMENTOS TGS",
  content: (
    <div className="space-y-6 md:space-y-8 animate-slideUp h-full flex flex-col min-h-0">
      <h3 className="text-xl md:text-3xl font-black text-[#AA9614] uppercase tracking-tighter shrink-0">
        PREMISAS BÁSICAS (BERTALANFFY)
      </h3>

      <div className="space-y-4 md:space-y-5 overflow-y-auto custom-scrollbar flex-grow min-h-0 pr-1">
        {FUNDAMENTALS_DATA.map((fund, i) => (
          <button
            key={i}
            onClick={() => setSelectedFund(fund)}
            className={`p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] border-2 flex items-center gap-4 md:gap-6 text-left transition-all hover:border-[#AA9614] active:scale-95 group w-full ${
              isDark ? "bg-[#222] border-[#333]" : "bg-white border-gray-100 shadow-sm"
            }`}
          >
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#AA9614]/20 flex items-center justify-center text-[#AA9614] font-black text-xl md:text-2xl shrink-0 group-hover:scale-110 transition-transform">
              {i + 1}
            </div>

            <div className="flex-grow">
              <h4 className={`text-sm md:text-lg font-black tracking-tighter ${isDark ? "text-white" : "text-[#3C3C3C]"} leading-tight`}>
                {fund.title}
              </h4>
              <span className="text-[8px] md:text-[10px] font-bold text-[#AA9614] uppercase tracking-widest mt-1 block opacity-60 italic">
                Seleccionar para visualizar el fundamento
              </span>
            </div>

            <ChevronRight size={18} className="text-[#AA9614] opacity-30" />
          </button>
        ))}
      </div>

      <FundamentalModal
        isOpen={!!selectedFund}
        onClose={() => setSelectedFund(null)}
        data={selectedFund}
        isDark={isDark}
      />
    </div>
  ),
},
    {
      title: "CARACTERÍSTICAS",
      content: (
        <div className="space-y-4 md:space-y-8 animate-slideUp h-full flex flex-col">
          <h3 className="text-xl md:text-3xl font-black text-[#AA9614] uppercase tracking-tighter shrink-0">
            CARACTERÍSTICAS GENERALES
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 overflow-y-auto custom-scrollbar flex-grow pr-1">
            {CHARACTERISTICS_DATA.map((char, i) => (
              <button
                key={i}
                onClick={() => setSelectedChar(char)}
                className={`p-3 md:p-4 rounded-xl border-2 flex items-center gap-3 md:gap-4 text-left transition-all hover:border-[#AA9614] active:scale-95 group ${
                  isDark
                    ? "bg-[#222] border-[#333]"
                    : "bg-white border-gray-100 shadow-sm"
                }`}
              >
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-[#AA9614] flex items-center justify-center text-white font-black text-[10px] md:text-xs shrink-0 group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>

                <div className="flex-grow">
                  <span
                    className={`text-[9px] md:text-xs font-black tracking-tight ${
                      isDark ? "text-white" : "text-[#3C3C3C]"
                    } leading-tight block`}
                  >
                    {char.title}
                  </span>

                  <span className="text-[8px] md:text-[9px] font-bold text-[#AA9614] tracking-widest mt-0.5 block opacity-60">
                    Ver detalle
                  </span>
                </div>

                <ChevronRight size={14} className="text-[#AA9614] opacity-30" />
              </button>
            ))}
          </div>

          <CharacteristicModal
            isOpen={!!selectedChar}
            onClose={() => setSelectedChar(null)}
            data={selectedChar}
            isDark={isDark}
          />
        </div>
      ),
    },
    {
      title: "CONCEPTOS CLAVE",
      content: (
        <div className="space-y-4 md:space-y-8 animate-slideUp h-full flex flex-col">
          <h3 className="text-xl md:text-4xl font-black text-[#AA9614] uppercase tracking-tighter shrink-0">
            CONCEPTOS CLAVE
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 py-2 overflow-y-auto custom-scrollbar flex-grow">
            {CONCEPTS_DATA.map((c, i) => (
              <button
                key={i}
                onClick={() => setSelectedConcept(c)}
                className={`p-3 md:p-5 rounded-[1.2rem] md:rounded-[2rem] border-2 transition-all flex flex-col items-center justify-center text-center gap-1.5 md:gap-3 group hover:border-[#AA9614] ${isDark ? "bg-[#222] border-[#333]" : "bg-white border-gray-100 shadow-md"} active:scale-95`}
              >
                <div
                  className={`w-6 h-6 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all ${isDark ? "bg-[#333] group-hover:bg-[#AA9614]" : "bg-gray-50 group-hover:bg-[#AA9614]/10"}`}
                >
                  <Info
                    size={14}
                    className={`md:w-5 md:h-5 ${isDark ? "text-white" : "text-[#AA9614]"}`}
                  />
                </div>
                <span
                  className={`text-[8px] md:text-[10px] font-black uppercase tracking-tighter ${isDark ? "text-white" : "text-[#3C3C3C]"} leading-none`}
                >
                  {c.concept}
                </span>
              </button>
            ))}
          </div>
          <ConceptModal
            isOpen={!!selectedConcept}
            onClose={() => setSelectedConcept(null)}
            data={selectedConcept}
            isDark={isDark}
          />
        </div>
      ),
    },
    {
      title: "CASO DE ESTUDIO",
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-6 md:space-y-10 animate-slideUp h-full">
          <h3 className="text-2xl md:text-6xl font-black text-[#AA9614] uppercase tracking-tighter">
            CASO DE ESTUDIO
          </h3>
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#AA9614]/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <Car
              size={100}
              className={`relative text-[#AA9614] md:w-[160px] md:h-[160px] drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3`}
            />
          </div>
          <p className="text-sm md:text-xl font-black tracking-[0.2em] md:tracking-[0.3em] opacity-40">
            Analizando el Automóvil
          </p>
          <div
            className={`p-4 md:p-6 rounded-2xl border-2 ${isDark ? "bg-[#222] border-[#333]" : "bg-gray-50 border-gray-200"} max-w-lg`}
          >
            <p className="text-[10px] md:text-sm font-bold  tracking-widest leading-relaxed">
              En la pestaña de <span className="text-[#AA9614]">PRÁCTICA</span>{" "}
              pondremos a prueba estos conceptos usando un vehículo real.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "REFERENCIAS",
      content: (
        <div className="space-y-6 animate-slideUp h-full flex flex-col justify-center">
          <h3 className="text-xl md:text-4xl font-black text-[#AA9614] uppercase tracking-tighter">
            REFERENCIAS
          </h3>
          <div className="space-y-3 md:space-y-4 overflow-y-auto max-h-[380px] pr-1">
            {[
              {
                a: "Kast, F. E., Rosenzweig, J. E., & Antonio, M. M. (1979)",
                t: "Administración en las organizaciones: un enfoque de sistemas. México: McGraw-Hill.",
              },
              {
                a: "Romanelli, G. (2003)",
                t: "Teoría de sistemas. La organización como sistema. Argentina: Tercer Milenio.",
              },
              {
                a: "Bertalanffy, L. V., & Almela, J. (1995)",
                t: "Teoría general de los sistemas: fundamentos, desarrollo, aplicaciones. México: Fondo de Cultura Económica.",
              },
            ].map((ref, i) => (
              <div
                key={i}
                className={`p-3 md:p-6 rounded-2xl border-l-8 border-[#AA9614] ${isDark ? "bg-[#222] border-y-0 border-r-0" : "bg-white border-y-0 border-r-0 shadow-sm border-gray-100"}`}
              >
                <p className="text-[8px] md:text-[10px] font-black text-[#AA9614] mb-1 uppercase tracking-widest">
                  {ref.a}
                </p>
                <p
                  className={`text-[10px] md:text-sm font-medium italic ${isDark ? "text-white" : "text-[#3C3C3C]"} leading-tight`}
                >
                  {ref.t}
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <SlideContainer
      title={slides[slide].title}
      page={slide + 1}
      total={slides.length}
      isDark={isDark}
      progress={slide}
      onNext={() => slide < slides.length - 1 && setSlide((s) => s + 1)}
      onPrev={() => slide > 0 && setSlide((s) => s - 1)}
    >
      {slides[slide].content}
    </SlideContainer>
  );
};

// --- Main App Components ---

const ConceptModal = ({
  isOpen,
  onClose,
  data,
  isDark,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: ConceptDetail | null;
  isDark: boolean;
}) => {
  if (!isOpen || !data) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div
        className={`${isDark ? "bg-[#1A1A1A] text-white border-[#333]" : "bg-white text-[#3C3C3C] border-gray-200"} p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-2 shadow-2xl max-w-lg w-full relative animate-scaleIn`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-gray-200/20 transition-colors"
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-6 md:h-8 bg-[#AA9614] rounded-full" />
          <h3 className="text-xl md:text-2xl font-black text-[#AA9614] uppercase tracking-tighter leading-none">
            {data.concept}
          </h3>
        </div>
        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block mb-2">
              Definición Académica
            </span>
            <p className="text-sm md:text-base leading-relaxed font-medium">
              {data.definition}
            </p>
          </div>
          <div
            className={`p-4 md:p-5 rounded-2xl ${isDark ? "bg-[#AA9614]/20 border border-[#AA9614]/30" : "bg-gray-50 border border-gray-200"}`}
          >
            <span className="text-[9px] font-black uppercase tracking-widest text-[#AA9614] block mb-2">
              Ejemplo
            </span>
            <p className="text-xs md:text-sm italic opacity-90 leading-relaxed">
              "{data.example}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CharacteristicModal = ({
  isOpen,
  onClose,
  data,
  isDark,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: CharacteristicDetail | null;
  isDark: boolean;
}) => {
  if (!isOpen || !data) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div
        className={`${isDark ? "bg-[#1A1A1A] text-white border-[#333]" : "bg-white text-[#3C3C3C] border-gray-200"} p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-2 shadow-2xl max-w-xl w-full relative animate-scaleIn`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-gray-200/20 transition-colors"
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-6 md:h-8 bg-[#AA9614] rounded-full" />
          <h3 className="text-lg md:text-2xl font-black text-[#AA9614] uppercase tracking-tighter leading-tight pr-8">
            {data.title}
          </h3>
        </div>
        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block mb-3">
              Explicación del sistema
            </span>
            <p className="text-sm md:text-base leading-relaxed font-medium text-justify">
              {data.description}
            </p>
          </div>
          <div className="flex justify-end pt-4">
            <button
              onClick={onClose}
              className="bg-[#AA9614] text-white px-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-transform active:scale-95"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FundamentalModal = ({
  isOpen,
  onClose,
  data,
  isDark,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: FundamentalDetail | null;
  isDark: boolean;
}) => {
  if (!isOpen || !data) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div
        className={`${isDark ? "bg-[#1A1A1A] text-white border-[#333]" : "bg-white text-[#3C3C3C] border-gray-200"} p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-2 shadow-2xl max-w-xl w-full relative animate-scaleIn`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-gray-200/20 transition-colors"
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-6 md:h-8 bg-[#AA9614] rounded-full" />
          <h3 className="text-lg md:text-2xl font-black text-[#AA9614] uppercase tracking-tighter leading-tight pr-8">
            {data.title}
          </h3>
        </div>
        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block mb-3">
              Detalle del Fundamento
            </span>
            <p className="text-sm md:text-base leading-relaxed font-medium text-justify">
              {data.description}
            </p>
          </div>
          <div className="flex justify-end pt-4">
            <button
              onClick={onClose}
              className="bg-[#AA9614] text-white px-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-transform active:scale-95"
            >
              Comprendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({
  active,
  setActive,
  isDark,
  toggleTheme,
}: {
  active: Section;
  setActive: (s: Section) => void;
  isDark: boolean;
  toggleTheme: () => void;
}) => {
    const colors = {
    dorado: '#AA9614',
    gris: '#3C3C3C',
    blanco: '#FFFFFF'
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-[#3C3C3C] border-gray-700 h-16 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center h-full">
        <div className="flex items-center gap-3 md:gap-4 shrink-0">

  <div className="bg-white p-2 md:p-2.5 rounded-lg shadow-lg transition-transform hover:scale-110 active:scale-90 shrink-0">
    <i
      className="fas fa-university text-lg md:text-2xl"
      style={{ color: "#AA9614" }}
    />
  </div>

  <div className="leading-tight">

    <h1 className="text-[10px] md:text-base font-black uppercase tracking-tight text-white">
      Sistemas de información
    </h1>

    <p className="text-[8px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
      UNSAdA - TGS
    </p>

  </div>

</div>
        <div className="flex items-center gap-1 md:gap-2">
          {[
            { id: "clase", label: "Clase", icon: BookOpen },
            { id: "flashcards", label: "Fichas", icon: Layers },
            { id: "quiz", label: "Quiz", icon: HelpCircle },
            { id: "practica", label: "Práctica", icon: MousePointer2 },
            { id: "arcade", label: "Arcade", icon: Gamepad2 },
          ].map((item) => (
            <button
              key={item.id}
              title={item.label}
              onClick={() => setActive(item.id as Section)}
              className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 rounded-lg md:rounded-xl transition-all text-[9px] md:text-[11px] font-black uppercase ${active === item.id ? "bg-[#AA9614] text-white shadow-lg" : "text-gray-300 hover:text-white hover:bg-white/5"}`}
            >
              <item.icon size={14} className="md:w-4 md:h-4" />
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          ))}
          <button
            onClick={toggleTheme}
            className="ml-1 md:ml-2 p-2 rounded-full transition-all bg-gray-700 text-white hover:bg-[#AA9614] shadow-md shrink-0"
          >
            {isDark ? (
              <Sun size={14} className="md:w-4 md:h-4" />
            ) : (
              <Moon size={14} className="md:w-4 md:h-4" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState<Section>("clase");
  const [activeGame, setActiveGame] = useState<ArcadeGame>("hub");
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined")
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    return true;
  });

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 selection:bg-[#AA9614]/30 ${isDark ? "bg-[#0A0A0A] dark" : "bg-[#FFFFFF]"}`}
    >
      <Navbar
        active={activeTab}
        setActive={setActiveTab}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      <main className="pt-20 md:pt-24 pb-8 md:pb-12 min-h-[calc(100vh-12rem)]">
        {activeTab === "clase" && <Presentation isDark={isDark} />}
        {activeTab === "flashcards" && (
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 animate-slideUp">
            <div className="text-center mb-8 md:mb-16">
              <Layers className="mx-auto mb-4 text-[#AA9614] w-10 h-10 md:w-12 md:h-12" />
              <h2
                className={`text-2xl md:text-5xl font-black  tracking-tighter ${isDark ? "text-white" : "text-[#3C3C3C]"}`}
              >
                Fichas de repaso
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {FLASHCARDS_DATA.map((card, idx) => (
                <Flashcard key={idx} data={card} isDark={isDark} />
              ))}
            </div>
          </div>
        )}
        {activeTab === "quiz" && (
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 animate-slideUp">
            <div className="text-center mb-8 md:mb-16">
              <HelpCircle className="mx-auto mb-4 text-[#AA9614] w-10 h-10 md:w-12 md:h-12" />
              <h2
                className={`text-2xl md:text-5xl font-black  tracking-tighter ${isDark ? "text-white" : "text-[#3C3C3C]"}`}
              >
                Desafìo TGS
              </h2>
            </div>
            <Quiz isDark={isDark} />
          </div>
        )}
        {activeTab === "practica" && <PracticeModule isDark={isDark} />}
        {activeTab === "arcade" && (
          <div className="animate-slideUp max-w-6xl mx-auto px-4">
            {activeGame === "hub" && (
              <ArcadeHub setGame={setActiveGame} isDark={isDark} />
            )}
            {activeGame === "invaders" && (
              <EntropiaInvaders onBack={() => setActiveGame("hub")} />
            )}
            {activeGame === "homeostasis" && (
              <HomeostasisBalance onBack={() => setActiveGame("hub")} />
            )}
            {activeGame === "snake" && (
              <FeedbackSnake onBack={() => setActiveGame("hub")} />
            )}
          </div>
        )}
      </main>
      <footer className="bg-gray-100 dark:bg-[#121212] border-t border-gray-200 dark:border-gray-800 py-6 md:py-12 text-center transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <p className="mb-1 font-black tracking-widest text-[#3C3C3C] dark:text-gray-400 text-[10px] md:text-base uppercase leading-none">
            UNSAdA - Clase 2
          </p>
          <p className="text-[8px] md:text-sm font-medium opacity-60 uppercase tracking-widest">
            Universidad Nacional de San Antonio de Areco
          </p>
        </div>
      </footer>
      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-slideUp { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scaleIn { animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fadeIn { animation: fadeIn 1.2s ease-out forwards; }
        .animate-spin-slow { animation: spinSlow 12s linear infinite; }
        .perspective { perspective: 1500px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #AA9614; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #AA9614; border-radius: 10px; }
        canvas { image-rendering: pixelated; touch-action: none; background: #000; border-radius: 12px; }
/* Opción B: texto legible (NO TODO EN MAYÚSCULAS) */
.tgs-body,
.tgs-body * {
  text-transform: none !important;
  letter-spacing: normal !important;
}

/* Títulos / etiquetas siguen en mayúsculas SOLO si vos querés */
.tgs-title {
  text-transform: uppercase;
  letter-spacing: -0.02em;
  font-weight: 900;
}

.tgs-kicker {
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-weight: 900;
  font-size: 0.75rem;
}
        @media (max-width: 400px) {
          .xs-hidden { display: none; }
        }
      `}</style>
    </div>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) createRoot(rootElement).render(<App />);
