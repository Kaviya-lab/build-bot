export interface ProjectSuggestion {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  components: string[];
  icon: string;
}

export interface ComponentMapping {
  [key: string]: ProjectSuggestion[];
}

export const componentProjects: ComponentMapping = {
  resistor: [
    {
      id: 'voltage-divider',
      title: 'Voltage Divider Circuit',
      description: 'Create a simple voltage divider to step down voltage levels for sensors or microcontrollers.',
      difficulty: 'beginner',
      components: ['resistor', 'power supply'],
      icon: '⚡',
    },
    {
      id: 'led-current-limiter',
      title: 'LED Current Limiter',
      description: 'Use resistors to safely limit current to LEDs and prevent burnout.',
      difficulty: 'beginner',
      components: ['resistor', 'LED'],
      icon: '💡',
    },
    {
      id: 'pull-up-circuit',
      title: 'Pull-up/Pull-down Circuit',
      description: 'Implement pull-up or pull-down resistors for stable digital inputs.',
      difficulty: 'beginner',
      components: ['resistor', 'microcontroller'],
      icon: '🔌',
    },
  ],
  led: [
    {
      id: 'blinking-led',
      title: 'Blinking LED Circuit',
      description: 'Build a classic 555 timer-based blinking LED or use a microcontroller.',
      difficulty: 'beginner',
      components: ['LED', 'resistor', '555 timer'],
      icon: '✨',
    },
    {
      id: 'rgb-mood-light',
      title: 'RGB Mood Light',
      description: 'Create a color-changing mood lamp using RGB LEDs and PWM control.',
      difficulty: 'intermediate',
      components: ['RGB LED', 'microcontroller', 'resistors'],
      icon: '🌈',
    },
    {
      id: 'led-matrix',
      title: 'LED Matrix Display',
      description: 'Build a scrolling text display using an 8x8 LED matrix.',
      difficulty: 'intermediate',
      components: ['LED matrix', 'shift register', 'microcontroller'],
      icon: '📟',
    },
  ],
  capacitor: [
    {
      id: 'power-supply-filter',
      title: 'Power Supply Filter',
      description: 'Add smoothing capacitors to reduce noise in DC power supplies.',
      difficulty: 'beginner',
      components: ['capacitor', 'rectifier', 'transformer'],
      icon: '🔋',
    },
    {
      id: 'touch-sensor',
      title: 'Capacitive Touch Sensor',
      description: 'Create a touch-sensitive button using capacitive sensing.',
      difficulty: 'intermediate',
      components: ['capacitor', 'resistor', 'microcontroller'],
      icon: '👆',
    },
    {
      id: 'rc-oscillator',
      title: 'RC Oscillator',
      description: 'Build a simple oscillator circuit for generating square waves.',
      difficulty: 'intermediate',
      components: ['capacitor', 'resistor', 'op-amp'],
      icon: '〰️',
    },
  ],
  transistor: [
    {
      id: 'motor-driver',
      title: 'Simple Motor Driver',
      description: 'Use transistors to control DC motors from microcontroller outputs.',
      difficulty: 'beginner',
      components: ['transistor', 'diode', 'motor'],
      icon: '⚙️',
    },
    {
      id: 'audio-amplifier',
      title: 'Audio Amplifier',
      description: 'Build a basic audio amplifier for speakers or headphones.',
      difficulty: 'intermediate',
      components: ['transistor', 'capacitor', 'resistor'],
      icon: '🔊',
    },
    {
      id: 'h-bridge',
      title: 'H-Bridge Motor Controller',
      description: 'Create a bidirectional motor controller for robotics projects.',
      difficulty: 'advanced',
      components: ['transistors', 'diodes', 'microcontroller'],
      icon: '🤖',
    },
  ],
  arduino: [
    {
      id: 'weather-station',
      title: 'Weather Station',
      description: 'Build a complete weather monitoring system with temperature, humidity, and pressure sensors.',
      difficulty: 'intermediate',
      components: ['Arduino', 'sensors', 'display'],
      icon: '🌡️',
    },
    {
      id: 'robot-car',
      title: 'Robot Car',
      description: 'Create an obstacle-avoiding robot car with ultrasonic sensors.',
      difficulty: 'intermediate',
      components: ['Arduino', 'motors', 'ultrasonic sensor'],
      icon: '🚗',
    },
    {
      id: 'home-automation',
      title: 'Home Automation Hub',
      description: 'Control lights and appliances remotely with relays and WiFi.',
      difficulty: 'advanced',
      components: ['Arduino', 'relays', 'WiFi module'],
      icon: '🏠',
    },
  ],
  sensor: [
    {
      id: 'light-sensor',
      title: 'Automatic Light Controller',
      description: 'Build a light that turns on automatically when it gets dark.',
      difficulty: 'beginner',
      components: ['LDR sensor', 'relay', 'LED'],
      icon: '🌙',
    },
    {
      id: 'motion-alarm',
      title: 'Motion Detection Alarm',
      description: 'Create a security system using PIR motion sensors.',
      difficulty: 'beginner',
      components: ['PIR sensor', 'buzzer', 'LED'],
      icon: '🚨',
    },
    {
      id: 'plant-monitor',
      title: 'Smart Plant Monitor',
      description: 'Monitor soil moisture and light levels for your plants.',
      difficulty: 'intermediate',
      components: ['moisture sensor', 'light sensor', 'display'],
      icon: '🌱',
    },
  ],
  motor: [
    {
      id: 'servo-arm',
      title: 'Robotic Arm',
      description: 'Build a controllable robotic arm using servo motors.',
      difficulty: 'intermediate',
      components: ['servo motors', 'potentiometers', 'microcontroller'],
      icon: '🦾',
    },
    {
      id: 'fan-controller',
      title: 'Temperature-Controlled Fan',
      description: 'Create a fan that adjusts speed based on temperature.',
      difficulty: 'beginner',
      components: ['DC motor', 'temperature sensor', 'transistor'],
      icon: '🌀',
    },
  ],
  battery: [
    {
      id: 'solar-charger',
      title: 'Solar Battery Charger',
      description: 'Build a solar-powered battery charging station.',
      difficulty: 'intermediate',
      components: ['solar panel', 'charge controller', 'battery'],
      icon: '☀️',
    },
    {
      id: 'power-bank',
      title: 'DIY Power Bank',
      description: 'Create your own portable USB power bank.',
      difficulty: 'beginner',
      components: ['batteries', 'charging module', 'USB port'],
      icon: '🔌',
    },
  ],
  display: [
    {
      id: 'digital-clock',
      title: 'Digital Clock',
      description: 'Build a digital clock with alarm functionality.',
      difficulty: 'intermediate',
      components: ['display', 'RTC module', 'microcontroller'],
      icon: '⏰',
    },
    {
      id: 'score-counter',
      title: 'Game Score Counter',
      description: 'Create a score display for tabletop games.',
      difficulty: 'beginner',
      components: ['7-segment display', 'buttons', 'microcontroller'],
      icon: '🎮',
    },
  ],
  microcontroller: [
    {
      id: 'iot-sensor-node',
      title: 'IoT Sensor Node',
      description: 'Build a wireless sensor node for home monitoring.',
      difficulty: 'advanced',
      components: ['ESP32', 'sensors', 'battery'],
      icon: '📡',
    },
    {
      id: 'midi-controller',
      title: 'MIDI Controller',
      description: 'Create a custom MIDI controller for music production.',
      difficulty: 'intermediate',
      components: ['Arduino', 'potentiometers', 'buttons'],
      icon: '🎹',
    },
  ],
};

export function getProjectsForComponents(detectedComponents: string[]): ProjectSuggestion[] {
  const projects: ProjectSuggestion[] = [];
  const addedIds = new Set<string>();

  detectedComponents.forEach((component) => {
    const lowerComponent = component.toLowerCase();
    
    // Find matching component category
    Object.keys(componentProjects).forEach((key) => {
      if (lowerComponent.includes(key) || key.includes(lowerComponent)) {
        componentProjects[key].forEach((project) => {
          if (!addedIds.has(project.id)) {
            projects.push(project);
            addedIds.add(project.id);
          }
        });
      }
    });
  });

  // Sort by difficulty
  const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };
  projects.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);

  return projects.slice(0, 6); // Return max 6 suggestions
}

export function getDifficultyColor(difficulty: 'beginner' | 'intermediate' | 'advanced'): string {
  switch (difficulty) {
    case 'beginner':
      return 'text-success';
    case 'intermediate':
      return 'text-accent';
    case 'advanced':
      return 'text-destructive';
  }
}
