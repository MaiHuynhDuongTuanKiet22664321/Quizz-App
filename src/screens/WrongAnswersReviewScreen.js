import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const WrongAnswersReviewScreen = ({ route, navigation }) => {
  const { wrongQuestions } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleRetakeWrongQuestions = () => {
    // Chuyển sang quiz chỉ với các câu sai
    navigation.navigate('Quiz', { questions: wrongQuestions, isReviewMode: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Ôn tập câu sai</Text>
            <Text style={styles.subtitle}>
              {wrongQuestions.length} câu cần ôn tập lại
            </Text>
          </View>

          {wrongQuestions.map((question, index) => (
            <View key={question.id} style={styles.questionCard}>
              <View style={styles.questionHeader}>
                <Text style={styles.questionNumber}>Câu {index + 1}</Text>
                <View style={styles.wrongBadge}>
                  <Text style={styles.wrongBadgeText}>SAI</Text>
                </View>
              </View>
              
              <Text style={styles.questionText}>{question.question}</Text>
              
              <View style={styles.answersContainer}>
                {question.options.map((option, optionIndex) => (
                  <View
                    key={optionIndex}
                    style={[
                      styles.answerOption,
                      optionIndex === question.options.indexOf(question.correctAnswer)
                        ? styles.correctAnswer
                        : option === question.userAnswer
                        ? styles.wrongAnswer
                        : styles.neutralAnswer
                    ]}
                  >
                    <Text style={[
                      styles.answerText,
                      optionIndex === question.options.indexOf(question.correctAnswer)
                        ? styles.correctAnswerText
                        : option === question.userAnswer
                        ? styles.wrongAnswerText
                        : styles.neutralAnswerText
                    ]}>
                      {String.fromCharCode(65 + optionIndex)}. {option}
                    </Text>
                    {optionIndex === question.options.indexOf(question.correctAnswer) && (
                      <Text style={styles.correctIndicator}>✓</Text>
                    )}
                    {option === question.userAnswer && option !== question.correctAnswer && (
                      <Text style={styles.wrongIndicator}>✗</Text>
                    )}
                  </View>
                ))}
              </View>

              <View style={styles.explanationContainer}>
                <Text style={styles.explanationTitle}>Giải thích:</Text>
                <Text style={styles.explanationText}>{question.explanation}</Text>
              </View>
            </View>
          ))}

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.backButton]}
              onPress={handleGoBack}
            >
              <Text style={styles.backButtonText}>Quay lại</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.retakeButton]}
              onPress={handleRetakeWrongQuestions}
            >
              <Text style={styles.retakeButtonText}>Làm lại câu sai</Text>
            </TouchableOpacity>
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
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  questionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  wrongBadge: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  wrongBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 16,
    lineHeight: 24,
  },
  answersContainer: {
    marginBottom: 16,
  },
  answerOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  correctAnswer: {
    backgroundColor: '#dcfce7',
    borderColor: '#10b981',
  },
  wrongAnswer: {
    backgroundColor: '#fef2f2',
    borderColor: '#ef4444',
  },
  neutralAnswer: {
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
  },
  answerText: {
    fontSize: 14,
    flex: 1,
  },
  correctAnswerText: {
    color: '#10b981',
    fontWeight: '600',
  },
  wrongAnswerText: {
    color: '#ef4444',
    fontWeight: '600',
  },
  neutralAnswerText: {
    color: '#64748b',
  },
  correctIndicator: {
    color: '#10b981',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  wrongIndicator: {
    color: '#ef4444',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  explanationContainer: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 4,
  },
  explanationText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  buttonsContainer: {
    marginTop: 24,
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
  backButton: {
    backgroundColor: '#e2e8f0',
  },
  retakeButton: {
    backgroundColor: '#6366f1',
  },
  backButtonText: {
    color: '#1e293b',
    fontSize: 16,
    fontWeight: '600',
  },
  retakeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WrongAnswersReviewScreen;
