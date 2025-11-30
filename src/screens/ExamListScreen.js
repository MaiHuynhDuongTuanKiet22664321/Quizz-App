import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ExamListScreen = ({ navigation }) => {
  const [examSets, setExamSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExamSets();
  }, []);

  const loadExamSets = async () => {
    try {
      // Create exam sets organized by legal topics
      const examSets = [
        {
          id: 1,
          name: "Luật Hôn nhân và Gia đình",
          description: "Các quy định về kết hôn, ly hôn, tài sản chung và quyền nghĩa vụ vợ chồng",
          questionCount: 45
        },
        {
          id: 2,
          name: "Luật Lao động",
          description: "Quan hệ lao động, hợp đồng, thời giờ làm việc và quyền lợi người lao động",
          questionCount: 35
        },
        {
          id: 3,
          name: "Luật Hành chính",
          description: "Quy định về quản lý nhà nước, quyết định hành chính và thủ tục hành chính",
          questionCount: 30
        },
        {
          id: 4,
          name: "Luật Dân sự",
          description: "Giao dịch dân sự, hợp đồng, thời hiệu và năng lực pháp luật",
          questionCount: 32
        },
        {
          id: 5,
          name: "Luật Hình sự",
          description: "Các quy định về tội phạm, hình phạt và thủ tục tố tụng hình sự",
          questionCount: 25
        },
        {
          id: 6,
          name: "Luật Đất đai và Nhà ở",
          description: "Quyền sử dụng đất, giao dịch bất động sản và tranh chấp đất đai",
          questionCount: 30
        },
        {
          id: 7,
          name: "Bộ đề Tổng hợp",
          description: "Tất cả các câu hỏi từ mọi lĩnh vực pháp luật (197 câu)",
          questionCount: 197
        }
      ];
      
      setExamSets(examSets);
    } catch (error) {
      console.error('Error loading exam sets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExamPress = (examSet) => {
    // Navigate to Quiz screen with the selected exam set
    navigation.navigate('Quiz', { examSetId: examSet.id, examSetName: examSet.name });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Đang tải danh sách đề thi...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Danh sách bộ đề</Text>
        <Text style={styles.subtitle}>Chọn bộ đề để bắt đầu thi</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {examSets.map((examSet) => (
          <TouchableOpacity
            key={examSet.id}
            style={styles.examCard}
            onPress={() => handleExamPress(examSet)}
            activeOpacity={0.7}
          >
            <View style={styles.examInfo}>
              <Text style={styles.examName}>{examSet.name}</Text>
              <Text style={styles.examDescription}>{examSet.description}</Text>
            </View>
            
            <View style={styles.examMeta}>
              <View style={styles.questionCount}>
                <Text style={styles.questionCountText}>{examSet.questionCount}</Text>
                <Text style={styles.questionCountLabel}>câu hỏi</Text>
              </View>
              <View style={styles.arrowIcon}>
                <Text style={styles.arrow}>›</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  examCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
  },
  examInfo: {
    flex: 1,
    marginRight: 16,
  },
  examName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  examDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  examMeta: {
    alignItems: 'center',
  },
  questionCount: {
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  questionCountText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  questionCountLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  arrowIcon: {
    marginTop: 8,
  },
  arrow: {
    fontSize: 24,
    color: '#94a3b8',
    fontWeight: 'bold',
  },
});

export default ExamListScreen;
