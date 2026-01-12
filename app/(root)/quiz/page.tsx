"use client";

import { quizQuestions } from "@/data/quiz";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface QuizQuestion {
  id: number;
  image: string;
  question: string;
  answer: string;
  subject: string;
  level: string;
  KalimatMatematika?: string;
}

export default function Page() {
  // --- default soal agar tidak error ---
  const [hasSearched, setHasSearched] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [subject, setSubject] = useState("Matematika");
  const [level, setLevel] = useState("TK");
  const [filteredQuestions, setFilteredQuestions] = useState<QuizQuestion[]>([]);
  const [questions, setQuestions] = useState<QuizQuestion[]>(quizQuestions);
  // --- filter berdasarkan mata pelajaran dan level ---
  const handleSearch = () => {
    setHasSearched(true);
    const filtered = questions.filter((q) => {
      const bySubject = subject ? q.subject === subject : true;
      const byLevel = level ? q.level === level : true;
      return bySubject && byLevel;
    });
    setFilteredQuestions(filtered.length > 0 ? filtered : questions);
    setCurrentIndex(0);
    setScore(0);
    setAnswer("");
  };

  const activeQuestions =
    filteredQuestions.length > 0 ? filteredQuestions : questions;
  const current = activeQuestions[currentIndex];

  const handleNext = () => {
    if (!activeQuestions.length) return;
    if (answer.trim() === current.answer) {
      setScore((prev) => prev + 1);
    }
    setAnswer("");
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert(
        `Kuis selesai! Skor kamu: ${
          score + (answer === current.answer ? 1 : 0)
        } dari ${activeQuestions.length}`
      );
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };
  console.log(score);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8f9fc] px-4 py-10">
      {/* --- Header --- */}
      <h1 className="text-4xl font-bold font-regular mb-2 text-gray-800">
        Uji Kemampuan
      </h1>
      <p className="text-gray-500 text-2xl text-center max-w-6xl mb-8">
        Lorem ipsum dolor sit amet consectetur. Gravida pharetra dignissim mi
        magnis non fames dignissim tortor nisi. Scelerisque sapien pretium
        ornare etiam.
      </p>

      {/* --- Form Filter --- */}
      <div className="flex flex-wrap justify-center gap-4 mb-10 w-full max-w-9xl">
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border rounded-lg px-4 py-2 w-[392px] focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="">Pilih mata pelajaran</option>
          <option value="Matematika">Matematika</option>
          <option value="Math">Math</option>
          <option value="English">English</option>
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="border rounded-lg px-4 py-2 w-[392px] focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="">Pilih level</option>
          <option value="TK">TK</option>
          <option value="Kelas 1">Kelas 1</option>
          <option value="Kelas 2">Kelas 2</option>
          <option value="Kelas 3">Kelas 3</option>
          <option value="Kelas 4">Kelas 4</option>
          <option value="Kelas 5">Kelas 5</option>
          <option value="Kelas 6">Kelas 3</option>
          <option value="SMP">SMP</option>
        </select>

        <button
          onClick={handleSearch}
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg"
        >
          Cari
        </button>
      </div>

      {/* --- Kartu Soal --- */}
      {!hasSearched ? (
        <p className="text-gray-500 text-xl mt-10">
          Pilih quiz terlebih dahulu
        </p>
        ) : ( 
        <>
        {activeQuestions.length > 0 ? (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-5xl">
          <div className="flex justify-between items-center mb-4">
            <span className="bg-yellow-400 text-white px-3 py-1 rounded-md text-lg font-regular">
              Soal {currentIndex + 1} / {activeQuestions.length}
            </span>
            <span className="text-lg text-gray-600">Skor: {score}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="border border-gray-300 rounded-md p-2 inline-block">
                  <Image
                    src={current.image}
                    alt="soal"
                    width={500}
                    height={150}
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="font-medium text-lg mb-3">{current.question}</p>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Jawabanmu..."
                className="border rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="bg-green-100 text-green-600 px-6 py-2 rounded-lg hover:bg-green-200 disabled:opacity-50"
            >
              Kembali
            </button>
            <button
              onClick={handleNext}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              {currentIndex === activeQuestions.length - 1
                ? "Selesai"
                : "Selanjutnya"}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Belum ada soal untuk kategori ini.</p>
      )}
      </>
      )}
    </div>
    
  );
}