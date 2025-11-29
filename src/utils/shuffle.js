export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const shuffleAnswers = (question) => {
  console.log('shuffleAnswers called with:', question);
  
  if (!question || !question.options || !Array.isArray(question.options)) {
    console.log('Invalid question, returning empty array');
    return [];
  }
  
  const answersWithCorrect = question.options.map((answer, index) => ({
    text: answer,
    isCorrect: index === question.answer
  }));
  
  console.log('answersWithCorrect:', answersWithCorrect);
  const result = shuffleArray(answersWithCorrect);
  console.log('shuffled result:', result);
  
  return result;
};
