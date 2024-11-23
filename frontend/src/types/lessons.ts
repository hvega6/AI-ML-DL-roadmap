export type LessonComponent = 'theory' | 'code' | 'practice';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type WeekNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export type PhaseNumber = 1 | 2 | 3;

export interface LessonContent {
  theory: {
    title: string;
    points: string[];
  };
  code: {
    title: string;
    description: string;
    language: string;
    example?: string;
  };
  practice: {
    quiz: {
      title: string;
      description: string;
    };
    coding: {
      title: string;
      description: string;
    };
  };
}

export interface Lesson {
  id: string;
  weekNumber: WeekNumber;
  phase: PhaseNumber;  // Keep for backward compatibility
  phaseNumber?: PhaseNumber; 
  title: string;
  description: string;
  content: LessonContent;
  order?: number;
  prerequisites?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  weekNumber: WeekNumber;
  difficulty: DifficultyLevel;
}

export interface Capstone {
  id: string;
  weekNumber: WeekNumber;
  title: string;
  objective: string;
  deliverables: string[];
}

export interface Phase {
  number: PhaseNumber;
  title: string;
  description: string;
  weeks: WeekNumber[];
}

export interface Curriculum {
  phases: Phase[];
  lessons: Lesson[];
  projects: Project[];
  capstones: Capstone[];
}
