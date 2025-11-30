import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  const { correctAnswers, totalQuestions, answerHistory, wrongAnswers } = route.params;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  // Thống kê câu trả lời
  const correctCount = answerHistory?.filter(answer => answer.isCorrect).length || correctAnswers;
  const incorrectCount = (answerHistory?.length || 0) - correctCount;
  
  // Lấy các câu trả lời sai
  const wrongQuestions = wrongAnswers || [];
  
  const getGradeMessage = () => {
    if (percentage >= 90) return 'Xuất sắc!';
    if (percentage >= 80) return 'Tốt!';
    if (percentage >= 70) return 'Khá!';
    if (percentage >= 60) return 'Trung bình!';
    return 'Cần cố gắng hơn!';
  };

  const getGradeColor = () => {
    if (percentage >= 90) return '#10b981';
    if (percentage >= 80) return '#3b82f6';
    if (percentage >= 70) return '#8b5cf6';
    if (percentage >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const handleRetakeQuiz = () => {
    navigation.navigate('Quiz');
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  const handleReviewWrongAnswers = () => {
    navigation.navigate('WrongAnswersReview', { wrongQuestions });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Kết quả</Text>
            
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>
                {correctAnswers} / {totalQuestions}
              </Text>
            <Text style={[styles.percentageText, { color: getGradeColor() }]}>
              {percentage}%
            </Text>
          </View>
          
          <Text style={[styles.gradeMessage, { color: getGradeColor() }]}>
            {getGradeMessage()}
          </Text>
        </View>

        <View style={styles.statisticsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{correctCount}</Text>
            <Text style={styles.statLabel}>Đúng</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{incorrectCount}</Text>
            <Text style={styles.statLabel}>Sai</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalQuestions}</Text>
            <Text style={styles.statLabel}>Tổng số</Text>
          </View>
        </View>

        {/* Lịch sử trả lời */}
        {answerHistory && answerHistory.length > 0 && (
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>Chi tiết câu trả lời:</Text>
            {answerHistory.map((answer, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyQuestion}>Câu {index + 1}: {answer.question}</Text>
                <Text style={styles.historySelected}>Bạn chọn: {answer.selectedAnswer}</Text>
                <Text style={styles.historyCorrect}>Đáp án đúng: {answer.correctAnswer}</Text>
                <View style={[styles.resultBadge, { backgroundColor: answer.isCorrect ? '#10b981' : '#ef4444' }]}>
                  <Text style={styles.resultBadgeText}>{answer.isCorrect ? 'ĐÚNG' : 'SAI'}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.retakeButton]}
            onPress={handleRetakeQuiz}
          >
            <Text style={styles.retakeButtonText}>Làm lại</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.homeButton]}
            onPress={handleGoHome}
          >
            <Text style={styles.homeButtonText}>Về trang chủ</Text>
          </TouchableOpacity>
          
          {/* Nút ôn tập câu sai - chỉ hiển thị khi có câu sai */}
          {wrongQuestions.length > 0 && (
            <TouchableOpacity
              style={[styles.button, styles.reviewButton]}
              onPress={handleReviewWrongAnswers}
            >
              <Text style={styles.reviewButtonText}>Ôn tập câu sai ({wrongQuestions.length})</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 320,
    width: '100%',
  },
  resultContainer: {
    backgroundColor: '#ffffff',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 32,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 24,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 8,
  },
  percentageText: {
    fontSize: 24,
    fontWeight: '600',
  },
  gradeMessage: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8,
  },
  statisticsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 32,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  retakeButton: {
    backgroundColor: '#6366f1',
  },
  homeButton: {
    backgroundColor: '#e2e8f0',
  },
  retakeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  homeButtonText: {
    color: '#1e293b',
    fontSize: 16,
    fontWeight: '600',
  },
  historyContainer: {
    width: '100%',
    marginTop: 20,
    maxHeight: 300,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  historyItem: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  historyQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  historySelected: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 2,
  },
  historyCorrect: {
    fontSize: 13,
    color: '#10b981',
    marginBottom: 4,
  },
  resultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  resultBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  reviewButton: {
    backgroundColor: '#f59e0b',
  },
  reviewButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
export default ResultScreen;
