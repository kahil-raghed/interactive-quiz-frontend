'use client'

import { Quiz } from "@/types/quiz";
import { AccessStep } from "./_steps/access"
import { useState } from "react";
import { QuestionsStep } from "./_steps/show";

export default function AccessQuiz() {

    const [quiz, setQuiz] = useState<Quiz>();

    return quiz == null?
            <AccessStep 
                onSuccess={(quiz: Quiz) => {
                    setQuiz(quiz);
                }}
            />:
            <QuestionsStep quiz={quiz} />
}