import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { shuffleAnswers } from '../src/utils/shuffle';

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const questionsData: Question[] = [
  {
    id: 72,
    question: "Quan hệ vợ, chồng chấm dứt khi nào:",
    options: [
      "Chỉ khi vợ, chồng ly hôn",
      "Khi vợ, chồng không còn yêu thương nhau và thỏa thuận chia tài sản, sống riêng",
      "Khi vợ chồng hủy giấy đăng ký kết hôn",
      "Khi một hoặc hai bên vợ, chồng chết hoặc khi có quyết định cho ly hôn có hiệu lực của Toà án"
    ],
    answer: 3,
    explanation: "Quan hệ vợ, chồng chấm dứt kể từ thời điểm một trong hai người chết (hoặc Tòa án tuyên bố chết) hoặc kể từ ngày bản án, quyết định ly hôn của Tòa án có hiệu lực pháp luật (Điều 65 và Điều 66 Luật Hôn nhân và Gia đình 2014)."
  },
  {
    id: 73,
    question: "Tài sản chung của vợ chồng được chia khi nào?",
    options: [
      "Chỉ khi vợ, chồng ly hôn",
      "Khi vợ chồng ly hôn và cả khi hôn nhân còn tồn tại theo quy định pháp luật",
      "Khi Tòa án cho phép chia",
      "Chỉ khi vợ chồng thỏa thuận chia"
    ],
    answer: 1,
    explanation: "Tài sản chung của vợ chồng được chia khi ly hôn. Ngoài ra, vợ chồng có quyền thỏa thuận chia một phần hoặc toàn bộ tài sản chung trong thời kỳ hôn nhân (Điều 38, Điều 59 Luật Hôn nhân và Gia đình 2014)."
  },
  {
    id: 74,
    question: "Tài sản riêng của vợ và chồng được hình thành như thế nào?",
    options: [
      "Do tự tạo lập trong thời kỳ hôn nhân",
      "Do được tặng cho riêng, thừa kế riêng",
      "Các tài sản có trước thời kỳ hôn nhân không sáp nhập vào tài sản chung",
      "Do được tặng cho riêng, thừa kế riêng và các tài sản có trước thời kỳ hôn nhân mà không sáp nhập vào tài sản chung"
    ],
    answer: 3,
    explanation: "Tài sản riêng của vợ, chồng bao gồm tài sản có trước khi kết hôn, tài sản được thừa kế riêng, tặng cho riêng trong thời kỳ hôn nhân, và các tài sản khác được quy định tại Điều 43 Luật Hôn nhân và Gia đình 2014."
  },
  {
    id: 75,
    question: "Khi kết hôn thì quyền tự do tín ngưỡng giữa vợ và chồng sẽ do:",
    options: [
      "Người chồng quyết định",
      "Người vợ quyết định",
      "Phong tục tập quán",
      "Các bên tự do thỏa thuận về việc theo hoặc không theo một tín ngưỡng nào"
    ],
    answer: 3,
    explanation: "Vợ chồng bình đẳng với nhau, có nghĩa vụ và quyền ngang nhau về mọi mặt trong gia đình, bao gồm cả quyền tự do tín ngưỡng, tôn giáo (Điều 17, Điều 19 Luật Hôn nhân và Gia đình 2014)."
  },
  {
    id: 76,
    question: "Tảo hôn là việc:",
    options: [
      "Kết hôn do cưỡng ép, lừa dối",
      "Kết hôn trái pháp luật",
      "Kết hôn khi chưa đủ tuổi",
      "Kết hôn không tự nguyện"
    ],
    answer: 2,
    explanation: "Tảo hôn là việc lấy vợ, lấy chồng khi một bên hoặc cả hai bên chưa đủ tuổi kết hôn theo quy định của pháp luật (Khoản 8 Điều 3 Luật Hôn nhân và Gia đình 2014)."
  },
  {
    id: 77,
    question: "Quan hệ hôn nhân chấm dứt kể từ ngày:",
    options: [
      "Vợ, chồng hoặc cả vợ và chồng nộp đơn yêu cầu giải quyết ly hôn cho Tòa án",
      "Tòa án thụ lý đơn yêu cầu giải quyết ly hôn",
      "Tòa án ra bản án, quyết định cho ly hôn",
      "Có bản án, quyết định cho ly hôn có hiệu lực của Tòa án"
    ],
    answer: 3,
    explanation: "Quan hệ hôn nhân chấm dứt kể từ ngày bản án, quyết định ly hôn của Tòa án có hiệu lực pháp luật (Khoản 8 Điều 3, Điều 66 Luật Hôn nhân và Gia đình 2014)."
  },
  {
    id: 78,
    question: "Nhận định nào sau đây là ĐÚNG khi nghiên cứu về Luật Hôn nhân và gia đình hiện hành?",
    options: [
      "Nam nữ sống chung từ trước ngày 01/01/2001 đều được công nhận là vợ chồng",
      "Khi ly hôn việc giao con chung từ đủ 7 tuổi trở lên cho cha hoặc mẹ nuôi phải xem xét vào nguyện vọng của con",
      "Luật Hôn nhân và gia đình năm 2014 quy định thừa nhận hôn nhân đồng tính",
      "Người từ đủ 18 tuổi trở lên và có trạng thái thần kinh bình thường là người có năng lực hành vi hôn nhân"
    ],
    answer: 1,
    explanation: "Con từ đủ 7 tuổi trở lên khi ly hôn phải xem xét nguyện vọng của con (Khoản 2 Điều 81 Luật Hôn nhân và Gia đình 2014). Hôn nhân đồng tính không được công nhận, và nam nữ sống chung trước 01/01/2001 chỉ được công nhận là vợ chồng nếu đáp ứng điều kiện nhất định."
  },
  {
    id: 79,
    question: "Nhận định nào sau đây là ĐÚNG khi nghiên cứu về Luật Hôn nhân và gia đình hiện hành?",
    options: [
      "Tài sản chung của vợ chồng phải là tài sản có được trong thời kỳ hôn nhân",
      "Mọi tài sản mà vợ hoặc chồng tạo dựng trong thời kỳ hôn nhân đều là tài sản chung",
      "Tài sản chung của vợ chồng chỉ được chia khi vợ chồng ly hôn",
      "Trong thời kỳ hôn nhân vẫn có thể chia tài sản chung của vợ chồng"
    ],
    answer: 3,
    explanation: "Vợ chồng có quyền thỏa thuận chia tài sản chung trong thời kỳ hôn nhân (Điều 38 Luật Hôn nhân và Gia đình 2014)."
  },
  {
    id: 80,
    question: "Anh Bi, chị Lượm tổ chức đám cưới ngày 15/10/2010, cả hai đăng ký kết hôn ngày 30/11/2011. Do vợ chồng có nhiều mâu thuẫn, ngày 25/7/2020 chị Lượm nộp đơn xin ly hôn tại tòa án có thẩm quyền. Ngày 30/9/2020 Tòa án ra bản án có hiệu lực pháp luật tuyên anh Bi, chị Lượm ly hôn. Vậy thời kỳ hôn nhân của anh Bi và chị Lượm sẽ được tính:",
    options: [
      "Từ ngày 15/10/2010 đến ngày 25/7/2020",
      "Từ ngày 30/11/2011 đến ngày 25/7/2020",
      "Từ ngày 30/11/2011 đến ngày 30/9/2020",
      "Từ ngày 15/10/2010 đến ngày 30/9/2020"
    ],
    answer: 2,
    explanation: "Thời kỳ hôn nhân được tính từ ngày đăng ký kết hôn (30/11/2011) đến ngày quan hệ hôn nhân chấm dứt, tức là ngày bản án ly hôn có hiệu lực pháp luật (30/9/2020) (Khoản 12 Điều 3 Luật Hôn nhân và Gia đình 2014)."
  },
  {
    id: 81,
    question: "Đối tượng điều chỉnh của ngành luật Lao động là:",
    options: [
      "Quan hệ lao động",
      "Quan hệ việc làm",
      "Các quan hệ liên quan đến quan hệ lao động",
      "Quan hệ lao động và các quan hệ xã hội liên quan trực tiếp với quan hệ lao động"
    ],
    answer: 3,
    explanation: "Luật Lao động điều chỉnh quan hệ lao động (quan hệ giữa người lao động và người sử dụng lao động) và các quan hệ liên quan trực tiếp đến quan hệ lao động (ví dụ: quan hệ về đào tạo nghề, bảo hiểm xã hội, giải quyết tranh chấp lao động...)."
  },
  {
    id: 82,
    question: "Tiền lương là một chế định của ngành luật:",
    options: [
      "Dân sự",
      "Hành chính",
      "Bảo hiểm xã hội",
      "Lao động"
    ],
    answer: 3,
    explanation: "Tiền lương là một chế định quan trọng trong Luật Lao động, quy định về hình thức, mức, kỳ hạn trả lương, và nguyên tắc trả lương."
  },
  {
    id: 83,
    question: "Phương pháp điều chỉnh được sử dụng phổ biến trong quan hệ lao động là:",
    options: [
      "Phương pháp thỏa thuận",
      "Phương pháp mệnh lệnh",
      "Phương pháp tác động của tổ chức Công đoàn",
      "Phương pháp mệnh lệnh - phục tùng"
    ],
    answer: 0,
    explanation: "Quan hệ lao động được thiết lập chủ yếu trên cơ sở hợp đồng lao động, với nguyên tắc tự nguyện, bình đẳng, tự do thỏa thuận. Đây là đặc trưng cơ bản của phương pháp thỏa thuận."
  },
  {
    id: 84,
    question: "Hợp đồng lao động phải có nội dung chủ yếu nào sau đây:",
    options: [
      "Công việc phải làm",
      "Tiền lương",
      "Điều kiện về an toàn lao động, vệ sinh lao động và bảo hiểm xã hội đối với người lao động",
      "Tiền lương, công việc phải làm, điều kiện về an toàn lao động, vệ sinh lao động và bảo hiểm xã hội đối với người lao động"
    ],
    answer: 3,
    explanation: "Đây là các nội dung chủ yếu phải có của hợp đồng lao động theo quy định của Bộ luật Lao động hiện hành (Điều 21 Bộ luật Lao động 2019)."
  },
  {
    id: 85,
    question: "Thời giờ làm việc theo qui định của Bộ luật Lao động là:",
    options: [
      "Không quá 12 giờ trong một ngày",
      "Từ 8 đến 10 giờ trong một ngày",
      "Tùy thỏa thuận giữa người lao động và người sử dụng lao động",
      "Không quá 8 giờ trong một ngày và 48 giờ trong một tuần"
    ],
    answer: 3,
    explanation: "Thời giờ làm việc bình thường không quá 08 giờ/ngày và không quá 48 giờ/tuần (Khoản 1 Điều 105 Bộ luật Lao động 2019)."
  },
  {
    id: 86,
    question: "Bộ luật lao động hiện hành quy định: tiền lương của người lao động trong thời gian thử việc do hai bên thỏa thuận nhưng:",
    options: [
      "Ít nhất phải bằng 85% mức lương của công việc đó",
      "Ít nhất phải bằng 50% mức lương của công việc đó",
      "Ít nhất phải bằng 60% mức lương của công việc đó",
      "Ít nhất phải bằng 70% mức lương của công việc đó"
    ],
    answer: 0,
    explanation: "Tiền lương của người lao động trong thời gian thử việc do hai bên thỏa thuận nhưng ít nhất phải bằng 85% mức lương chính thức của công việc đó (Khoản 2 Điều 26 Bộ luật Lao động 2019)."
  },
  {
    id: 87,
    question: "Theo Bộ luật lao động hiện hành thì trong trường hợp nào người lao động được nghỉ mà KHÔNG hưởng nguyên lương?",
    options: [
      "Kết hôn cho bản thân",
      "Kết hôn cho con",
      "Bố đẻ, mẹ đẻ, bố vợ, mẹ vợ hoặc bố chồng, mẹ chồng chết; vợ chết hoặc chồng chết; con chết",
      "Kết hôn cho anh, chị, em ruột"
    ],
    answer: 3,
    explanation: "Kết hôn cho anh, chị, em ruột (dù là ruột thịt hay vợ/chồng của anh, chị, em ruột) không thuộc trường hợp được nghỉ việc riêng hưởng nguyên lương (Khoản 1 Điều 115 BLLĐ 2019). Các trường hợp còn lại được nghỉ hưởng nguyên lương."
  },
  {
    id: 88,
    question: "Linh là công nhân làm việc tại công ty X từ năm 2015, đã tham gia bảo hiểm xã hội bắt buộc. Từ tháng 5/2017 mức lương của Linh là 5.700.000 đ/tháng. Theo quy định pháp luật lao động hiện hành thì tiền lương của Linh sau khi trừ đi số tiền đóng quỹ bảo hiểm xã hội bắt buộc là bao nhiêu:",
    options: [
      "5.244.000 đ",
      "5.301.000 đ",
      "5.358.000 đ",
      "5.415.000 đ"
    ],
    answer: 0,
    explanation: "Giả định mức đóng BHXH cho người lao động là 8%: 5.700.000 x (1 - 8%) = 5.244.000 đ (Đáp án A)."
  },
  {
    id: 89,
    question: "Anh Nhật được công ty X nhận vào làm việc ở vị trí kỹ sư điện tử từ tháng 9/2017. Công ty yêu cầu anh Nhật phải thử việc trước khi kí hợp đồng lao động với anh. Theo quy định của pháp luật hiện hành thì:",
    options: [
      "Anh Nhật chỉ thử việc 01 lần và thời gian thử việc tối đa là 60 ngày.",
      "Anh Nhật được thử việc tối đa 02 lần và mỗi lần thử việc tối đa là 60 ngày.",
      "Anh Nhật có thể thử việc nhiều lần nhưng tổng thời gian thử việc tối đa là 60 ngày.",
      "Anh Nhật phải thử việc nhiều lần cho đến khi thành thạo công việc."
    ],
    answer: 0,
    explanation: "Pháp luật quy định chỉ được thử việc một lần đối với một công việc, thời gian thử việc tối đa là 60 ngày đối với công việc yêu cầu trình độ chuyên môn, kỹ thuật cao (Khoản 1 Điều 25 BLLĐ 2019)."
  },
  {
    id: 90,
    question: "Sự thỏa thuận nào làm phát sinh hợp đồng dân sự?",
    options: [
      "Mọi sự thỏa thuận bằng ngôn ngữ cơ thể",
      "Mọi sự thỏa thuận được lập thành văn bản",
      "Mọi sự thỏa thuận nhằm làm phát sinh, thay đổi, chấm dứt quyền và nghĩa vụ dân sự",
      "Mọi sự thỏa thuận bằng lời nói"
    ],
    answer: 2,
    explanation: "Hợp đồng dân sự là sự thỏa thuận giữa các bên về việc xác lập, thay đổi hoặc chấm dứt quyền, nghĩa vụ dân sự (Điều 385 Bộ luật Dân sự 2015)."
  },
  {
    id: 91,
    question: "Việc chiếm hữu của một người với đối với một tài sản nhưng không biết đó là chiếm hữu bất hợp pháp thì:",
    options: [
      "Đều là chiếm hữu hợp pháp",
      "Có thể là chiếm hữu bất hợp pháp ngay tình hoặc chiếm hữu bất hợp pháp không ngay tình",
      "Đều là chiếm hữu bất hợp pháp ngay tình",
      "Đều là chiếm hữu bất hợp pháp không ngay tình"
    ],
    answer: 2,
    explanation: "Chiếm hữu bất hợp pháp ngay tình là việc chiếm hữu tài sản mà người chiếm hữu không biết hoặc không thể biết việc chiếm hữu đó là không có căn cứ pháp luật (Khoản 3 Điều 189 Bộ luật Dân sự 2015)."
  },
  {
    id: 92,
    question: "Diện những người thừa kế theo pháp luật bao gồm:",
    options: [
      "Những người có tên trong nội dung của di chúc",
      "Những người theo thứ tự hàng thừa kế được quy định tại Bộ luật dân sự",
      "Vợ, chồng; cha, mẹ; các con; người giám hộ của người để lại di sản",
      "Những người có quan hệ huyết thống trong phạm vi ba đời với người để lại di sản"
    ],
    answer: 1,
    explanation: "Thừa kế theo pháp luật được áp dụng theo thứ tự hàng thừa kế và điều kiện quy định tại Điều 651 Bộ luật Dân sự 2015."
  },
  {
    id: 93,
    question: "Trình tự, thủ tục giải quyết một vụ án dân sự nói chung là:",
    options: [
      "Thụ lý vụ án – hòa giải – xét xử sơ thẩm – thi hành án dân sự",
      "Xét xử sơ thẩm – xét xử phúc thẩm – xét lại bản án theo thủ tục giám đốc thẩm, tái thẩm",
      "Hòa giải – xét xử sơ thẩm – xét xử phúc thẩm",
      "Xét xử sơ thẩm – xét xử phúc thẩm"
    ],
    answer: 0,
    explanation: "Trình tự giải quyết vụ án dân sự bao gồm: Khởi kiện, thụ lý – Chuẩn bị xét xử (có thể hòa giải) – Xét xử sơ thẩm – Thi hành án. Đây là quy trình tổng quát và chính xác nhất."
  },
  {
    id: 94,
    question: "Thừa kế là gì?",
    options: [
      "Là việc chuyển quyền sở hữu đối với tài sản của cha mẹ, ông bà cho con, cháu",
      "Là việc chuyển quyền sở hữu đối với tài sản của người chết cho người thừa kế thông qua ý nguyện cá nhân bằng di chúc hoặc căn cứ vào qui định của pháp luật",
      "Là việc chuyển quyền sở hữu đối với tài sản của người chết cho con cháu và được lập thành văn bản theo qui định của pháp luật",
      "Là việc chuyển dịch tài sản từ người này sang người khác"
    ],
    answer: 1,
    explanation: "Thừa kế là việc chuyển dịch tài sản của người chết sang người còn sống theo Di chúc hoặc theo pháp luật (Điều 609 Bộ luật Dân sự 2015)."
  },
  {
    id: 95,
    question: "Người để lại di sản thừa kế là:",
    options: [
      "Tổ chức hoặc cá nhân đã chết có tài sản để lại",
      "Cá nhân có tài sản muốn để lại cho con cháu và đã lập thành di chúc",
      "Cá nhân đã chết có tài sản để lại",
      "Người lập di chúc để lại tài sản của mình cho người thân"
    ],
    answer: 2,
    explanation: "Người để lại di sản phải là cá nhân đã chết (Điều 611 Bộ luật Dân sự 2015)."
  }
];

export default function QuizScreen() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const shuffleQuestions = (questionsArray: Question[]) => {
    const newArray = [...questionsArray];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const shuffledQuestions = shuffleQuestions(questionsData);
    console.log('shuffledQuestions:', shuffledQuestions);
    console.log('shuffledQuestions[0]:', shuffledQuestions[0]);
    setQuestions(shuffledQuestions);
    if (shuffledQuestions.length > 0 && shuffledQuestions[0]) {
      setShuffledAnswers(shuffleAnswers(shuffledQuestions[0]));
    }
  }, []);

  const handleAnswerPress = (answer: Answer) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);
    setShowExplanation(true);

    if (answer.isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      if (questions[nextIndex]) {
        setShuffledAnswers(shuffleAnswers(questions[nextIndex]));
      }
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsAnswered(false);
    } else {
      router.push({
        pathname: '/result',
        params: {
          correctAnswers: correctAnswers.toString(),
          totalQuestions: questions.length.toString(),
        },
      });
    }
  };

  const getAnswerStyle = (answer: Answer) => {
    if (!selectedAnswer) return styles.answerButton;
    
    if (answer.text === selectedAnswer.text) {
      return answer.isCorrect ? styles.correctAnswer : styles.incorrectAnswer;
    }
    
    if (answer.isCorrect && selectedAnswer.text !== answer.text) {
      return styles.correctAnswer;
    }
    
    return styles.answerButton;
  };

  const getAnswerTextStyle = (answer: Answer) => {
    if (!selectedAnswer) return styles.answerButtonText;
    
    if (answer.text === selectedAnswer.text) {
      return answer.isCorrect ? styles.correctAnswerText : styles.incorrectAnswerText;
    }
    
    if (answer.isCorrect && selectedAnswer.text !== answer.text) {
      return styles.correctAnswerText;
    }
    
    return styles.answerButtonText;
  };

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Đang tải câu hỏi...</Text>
        <Text>questions.length: {questions.length}</Text>
        <Text>questionsData.length: {questionsData.length}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Câu {currentQuestionIndex + 1} / {questions.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {currentQuestion?.question || 'Không có câu hỏi'}
          </Text>
          <Text style={{fontSize: 12, color: 'gray'}}>
            Debug: currentQuestion exists: {currentQuestion ? 'YES' : 'NO'}
          </Text>
        </View>

        <View style={styles.answersContainer}>
          <Text style={{fontSize: 12, color: 'gray', marginBottom: 10}}>
            Debug: shuffledAnswers.length = {shuffledAnswers.length}
          </Text>
          {shuffledAnswers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={getAnswerStyle(answer)}
              onPress={() => handleAnswerPress(answer)}
              disabled={isAnswered}
            >
              <Text style={getAnswerTextStyle(answer)}>
                {String.fromCharCode(65 + index)}. {answer.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {showExplanation && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationTitle}>Giải thích:</Text>
            <Text style={styles.explanationText}>
              {currentQuestion?.explanation}
            </Text>
          </View>
        )}

        {isAnswered && (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextQuestion}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 18,
    color: '#64748b',
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  questionContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    lineHeight: 26,
  },
  answersContainer: {
    marginBottom: 24,
  },
  answerButton: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  correctAnswer: {
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  incorrectAnswer: {
    backgroundColor: '#ef4444',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  answerButtonText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  correctAnswerText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  incorrectAnswerText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  explanationContainer: {
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#78350f',
    lineHeight: 20,
  },
  nextButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 8,
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
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
