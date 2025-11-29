import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ResultScreen() {
  const router = useRouter();
  const { correctAnswers, totalQuestions } = useLocalSearchParams();
  
  const correct = parseInt(correctAnswers as string) || 0;
  const total = parseInt(totalQuestions as string) || 0;
  const percentage = Math.round((correct / total) * 100);
  
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
    router.push('/quiz');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Kết quả</Text>
          
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>
              {correct} / {total}
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
            <Text style={styles.statNumber}>{correct}</Text>
            <Text style={styles.statLabel}>Đúng</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{total - correct}</Text>
            <Text style={styles.statLabel}>Sai</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{total}</Text>
            <Text style={styles.statLabel}>Tổng số</Text>
          </View>
        </View>

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
        </View>
      </View>
    </View>
  );
}

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
    fontWeight: 'bold',
  },
  homeButtonText: {
    color: '#1e293b',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
