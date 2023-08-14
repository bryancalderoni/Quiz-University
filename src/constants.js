export const jsQuizz = {
  questions: [
    {
      question:
        "Il telegrafo ottico:",
      choices: [
        "E' stato inventato prima del telegrafo elettrico",
        "E' stato inventato dopo il telegrafo elettrico",
        "Utilizzava una fibra ottica per la trasmissione",
        "Impiegava segnali elettrici per la comunicazione A",
      ],
      type: "MCQs",
      correctAnswer: "E' stato inventato prima del telegrafo elettrico",
    },
    {
      question: "What is ReactJS?",
      choices: [
        "Server-side framework",
        "User Interface framework",
        "both a and b",
        "None of the above",
      ],
      type: "MCQs",
      correctAnswer: "User Interface framework",
    },
    {
      question:
        "Identify the one which is used to pass data to components from outside",
      choices: ["Render with arguments", "setState", "PropTypes", "props"],
      type: "MCQs",
      correctAnswer: "props",
    },
    {
      question: "In which language is React.js written?",
      choices: ["Python", "Java", "C#", "JavaScript"],
      type: "MCQs",
      correctAnswer: "JavaScript",
    },
    {
      question: "What is Babel?",
      choices: [
        "JavaScript interpreter",
        "JavaScript transpiler",
        "JavaScript compiler",
        "None of the above",
      ],
      type: "MCQs",
      correctAnswer: "JavaScript compiler",
    },
  ],
};

export const resultInitalState = {
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
};
