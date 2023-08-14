import Quiz from "./Quiz";
import { jsQuizz } from "./constants";


//METODO SHUFFLE FUNZIONANTE
function shuffleArray(array) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function App() {
  const allQuestions = jsQuizz.questions;
  const randomQuestions = shuffleArray(allQuestions).slice(0, 30);
  return <Quiz questions={randomQuestions} />;
}

// function App() {
//   return <Quiz questions={jsQuizz.questions} />;
// }

export default App;
