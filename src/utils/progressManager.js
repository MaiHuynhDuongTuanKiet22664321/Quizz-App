import AsyncStorage from '@react-native-async-storage/async-storage';

const PROGRESS_KEY = 'quiz_progress';

export const saveProgress = async (examSetId, currentQuestionIndex, correctAnswers, answerHistory, wrongAnswers) => {
  try {
    const progressData = {
      examSetId,
      currentQuestionIndex,
      correctAnswers,
      answerHistory,
      wrongAnswers,
      timestamp: Date.now()
    };
    
    await AsyncStorage.setItem(`${PROGRESS_KEY}_${examSetId}`, JSON.stringify(progressData));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const loadProgress = async (examSetId) => {
  try {
    const savedProgress = await AsyncStorage.getItem(`${PROGRESS_KEY}_${examSetId}`);
    return savedProgress ? JSON.parse(savedProgress) : null;
  } catch (error) {
    console.error('Error loading progress:', error);
    return null;
  }
};

export const clearProgress = async (examSetId) => {
  try {
    await AsyncStorage.removeItem(`${PROGRESS_KEY}_${examSetId}`);
  } catch (error) {
    console.error('Error clearing progress:', error);
  }
};

export const hasProgress = async (examSetId) => {
  try {
    const progress = await loadProgress(examSetId);
    return progress !== null;
  } catch (error) {
    console.error('Error checking progress:', error);
    return false;
  }
};
