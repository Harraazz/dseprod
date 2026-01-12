const XLSX = require("xlsx")
const fs = require("fs")
const path = require("path")

const filePath = path.resolve("scripts/Quiz.xlsx")
const workbook = XLSX.readFile(filePath)
const sheet = workbook.Sheets[workbook.SheetNames[0]]
const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 })

let id = 1
const imageCount = {}

const questions = rows
  .filter((row) => row[0] && row[1] && row[2])
  .map((row) => {
    const grade = String(row[0]).trim()
    const question = String(row[1]).trim()
    const answer = String(row[2]).trim()

    let level = ""
    let prefix = ""

    if (grade === "GK") {
      level = "TK"
      prefix = "GK"
    } else if (grade === "G1") {
      level = "Kelas 1"
      prefix = "G1"
    } else if (grade === "G2") {
      level = "Kelas 2"
      prefix = "G2"
    } else if (grade === "G3") {
      level = "Kelas 3"
      prefix = "G3"
    } else if (grade === "G4") {
      level = "Kelas 4"
      prefix = "G4"
    } else if (grade === "G5") {
      level = "Kelas 5"
      prefix = "G5"
    } else if (grade === "G6") {
      level = "Kelas 6"
      prefix = "G6"
    } else if (grade === "GM") {
      level = "SMP"
      prefix = "GM"
    } else {
      return null
    }

    imageCount[prefix] = (imageCount[prefix] || 0) + 1

    return {
      id: id++,
      image: `public/quiz/MATEMATIKA/${prefix}/${imageCount[prefix]}.png`,
      question,
      answer,
      subject: "Matematika",
      level,
    }
  })
  .filter(Boolean)

const output = `
export type QuizQuestion = {
  id: number
  image: string
  question: string
  answer: string
  subject: string
  level: string
}

export const quizQuestions = [
${questions
  .map(
    (q) => `  {
    id: ${q.id},
    image: "${q.image}",
    question: "${q.question.replace(/"/g, '\\"')}",
    answer: "${q.answer}",
    subject: "${q.subject}",
    level: "${q.level}",
  }`
  )
  .join(",\n")}
]
`

fs.mkdirSync("src/data", { recursive: true })
fs.writeFileSync("src/data/quiz.ts", output)

console.log("✅ src/data/quiz.ts berhasil dibuat")