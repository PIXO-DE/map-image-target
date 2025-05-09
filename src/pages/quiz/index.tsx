import React, { useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const questions: Question[] = [
  {
    question: "Was ist auf der Fahne der Bauern abgebildet?",
    options: ["Regenbogen", "Einhorn", "Sonne"],
    answer: "Regenbogen",
  },
  {
    question: "Wofür kämpften die Bauern im Bauernkrieg?",
    options: ["Urlaub", "Freiheit", "Ordnung"],
    answer: "Freiheit",
  },
  {
    question: "Was wurde im Mühlhäuser Rathaus gegründet?",
    options: ["Bauernverein", "Ewiger Rat", "Tanzschule"],
    answer: "Ewiger Rat",
  },
  {
    question: "In welcher Mühlhäuser Kirche predigte Müntzer?",
    options: ["Marienkirche", "Divi Blasii-Kirche", "Allerheiligen-Kirche"],
    answer: "Marienkirche",
  },
  {
    question: "Was wurde in der Kornmarktkirche zu Kanonenkugel geschmolzen?",
    options: ["Kirchenglocken", "Metalltore", "Altare"],
    answer: "Kirchenglocken",
  },
  {
    question: "Wer ist Thomas Müntzers Freund?",
    options: ["Martin Müller", "Heinrich Pfeiffer", "Thomas Schmidt"],
    answer: "Heinrich Pfeiffer",
  },
  {
    question: "In welche Stadt zogen die Bauern in die Schlacht?",
    options: ["Gotha", "Erfurt", "Frankenhausen"],
    answer: "Frankenhausen",
  },
];

const Quiz: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = (option: string) => {
    if (selected !== null) return;
  
    const correct = option === questions[current].answer;
    setSelected(option);
    setIsCorrect(correct);
  
    if (correct) {
      // Lanjut ke soal berikutnya jika benar
      setTimeout(() => {
        setCurrent((prev) => prev + 1);
        setSelected(null);
        setIsCorrect(null);
      }, 1000);
    } else {
      // Reset pilihan setelah 1 detik jika salah
      setTimeout(() => {
        setSelected(null);
        setIsCorrect(null);
      }, 1000);
    }
  };
  
  

  if (current >= questions.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center quizbg text-center px-4">
        <h1 className="text-4xl font-bold text-green-700 mb-4">🎉 Glückwunsch!</h1>
        <p className="text-lg text-gray-700 mb-6">Du hast das Quiz abgeschlossen.</p>
        <button
          onClick={() => (window.location.href = "/wimmelbild/ar")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition"
        >
          Zurück zur Karte
        </button>
      </div>
    );
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-green-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Frage {current + 1} von {questions.length}
        </h2>
  
        <div className="mb-6">
          <p className="text-xl text-gray-700 font-semibold text-center">
            {questions[current].question}
          </p>
        </div>
  
        <div className="flex flex-col gap-4">
          {questions[current].options.map((option, index) => {
            const isSelected = selected === option;
  
            let buttonClass =
              "w-auto text-left px-6 py-3 rounded-lg border text-lg font-medium transition duration-300";
            if (isSelected) {
              buttonClass += isCorrect
                ? " bg-green-500 text-white border-green-600"
                : " bg-red-500 text-white border-red-600";
            } else {
              buttonClass += " bg-gray-50 hover:bg-gray-100 border-gray-300 text-gray-700";
            }
  
            return (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={buttonClass}
                disabled={selected !== null}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
  
};

export default Quiz;
