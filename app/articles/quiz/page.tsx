"use client";

import QuizHeader from "@/components/pages/quiz/QuizHeader";
import QuizQuestion from "@/components/pages/quiz/QuizQuestion";
import QuizNavigation from "@/components/pages/quiz/QuizNavigation";
import SubmissionModal from "@/components/pages/quiz/SubmissionModal";
import { useState } from "react";

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showModal, setShowModal] = useState(false);

  const questions = [
    {
      id: 1,
      number: "PERTANYAAN 1",
      question: "Apa peran utama hutan mangrove dalam menjaga keseimbangan ekosistem pesisir?",
      options: [
        { id: "A", label: "Menyediakan air tawar bagi penduduk sekitar." },
        { id: "B", label: "Melindungi garis pantai dari abrasi dan badai.", correct: true },
        { id: "C", label: "Sebagai tempat pembuangan sampah organik." },
        { id: "D", label: "Mempercepat penguapan air laut." },
      ],
    },
    {
      id: 2,
      number: "PERTANYAAN 2",
      question: "Apa manfaat utama daur ulang plastik?",
      options: [
        { id: "A", label: "Mengurangi limbah di tempat pembuangan akhir.", correct: true },
        { id: "B", label: "Membuat plastik lebih berwarna." },
        { id: "C", label: "Meningkatkan harga plastik di pasaran." },
        { id: "D", label: "Menghilangkan limbah secara permanen." },
      ],
    },
    {
      id: 3,
      number: "PERTANYAAN 3",
      question: "Bagaimana cara terbaik mengurangi jejak karbon pribadi?",
      options: [
        { id: "A", label: "Menggunakan kendaraan publik atau bersepeda." },
        { id: "B", label: "Mengurangi konsumsi energi listrik." },
        { id: "C", label: "Mengonsumsi makanan lokal dan mengurangi daging merah.", correct: true },
        { id: "D", label: "Semua jawaban di atas benar." },
      ],
    },
  ];

  const handleSelectAnswer = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionId,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitAnswers = () => {
    setShowModal(true);
  };

  const allQuestionsAnswered = questions.length === Object.keys(answers).length;
  const selectedAnswer = answers[currentQuestion];

  return (
    <div className="quiz-page">
      <div className="quiz-wrapper">
        <QuizHeader
          currentQuestion={currentQuestion + 1}
          totalQuestions={questions.length}
        />

        <div className="quiz-container">
          <QuizQuestion
            question={questions[currentQuestion]}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
          />

          <QuizNavigation
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            isAnswerSelected={selectedAnswer !== undefined}
            allQuestionsAnswered={allQuestionsAnswered}
            onPrevious={handlePreviousQuestion}
            onNext={handleNextQuestion}
            onSubmit={handleSubmitAnswers}
          />
        </div>
      </div>

      {showModal && <SubmissionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

