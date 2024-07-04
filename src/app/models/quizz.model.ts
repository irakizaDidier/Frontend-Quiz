export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface Quizz {
  title: string;
  icon: string;
  // color: string;
  questions: Question[];
}

export interface Result {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  correct: boolean;
}
