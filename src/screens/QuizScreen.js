import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { shuffleAnswers } from '../utils/shuffle';

const questionsData = [
  {
    "id": 72,
    "question": "Quan hệ vợ, chồng chấm dứt khi nào:",
    "options": [
      "Chỉ khi vợ, chồng ly hôn",
      "Khi vợ, chồng không còn yêu thương nhau và thỏa thuận chia tài sản, sống riêng",
      "Khi vợ chồng hủy giấy đăng ký kết hôn",
      "Khi một hoặc hai bên vợ, chồng chết hoặc khi có quyết định cho ly hôn có hiệu lực của Toà án"
    ],
    "answer": 3,
    "explanation": "Quan hệ vợ, chồng chấm dứt kể từ thời điểm một trong hai người chết (hoặc Tòa án tuyên bố chết) hoặc kể từ ngày bản án, quyết định ly hôn của Tòa án có hiệu lực pháp luật (Điều 65 và Điều 66 Luật Hôn nhân và Gia đình 2014)."
  },
  {
    "id": 73,
    "question": "Tài sản chung của vợ chồng được chia khi nào?",
    "options": [
      "Chỉ khi vợ, chồng ly hôn",
      "Khi vợ chồng ly hôn và cả khi hôn nhân còn tồn tại theo quy định pháp luật",
      "Khi Tòa án cho phép chia",
      "Chỉ khi vợ chồng thỏa thuận chia"
    ],
    "answer": 1,
    "explanation": "Tài sản chung của vợ chồng được chia khi ly hôn. Ngoài ra, vợ chồng có quyền thỏa thuận chia một phần hoặc toàn bộ tài sản chung trong thời kỳ hôn nhân (Điều 38, Điều 59 Luật Hôn nhân và Gia đình 2014)."
  },
  {
    "id": 74,
    "question": "Tài sản riêng của vợ và chồng được hình thành như thế nào?",
    "options": [
      "Do tự tạo lập trong thời kỳ hôn nhân",
      "Do được tặng cho riêng, thừa kế riêng",
      "Các tài sản có trước thời kỳ hôn nhân không sáp nhập vào tài sản chung",
      "Do được tặng cho riêng, thừa kế riêng và các tài sản có trước thời kỳ hôn nhân mà không sáp nhập vào tài sản chung"
    ],
    "answer": 3,
    "explanation": "Tài sản riêng của vợ, chồng bao gồm tài sản có trước khi kết hôn, tài sản được thừa kế riêng, tặng cho riêng trong thời kỳ hôn nhân, và các tài sản khác được quy định tại Điều 43 Luật Hôn nhân và Gia đình 2014."
  },
  {
    "id": 75,
    "question": "Khi kết hôn thì quyền tự do tín ngưỡng giữa vợ và chồng sẽ do:",
    "options": [
      "Người chồng quyết định",
      "Người vợ quyết định",
      "Phong tục tập quán",
      "Các bên tự do thỏa thuận về việc theo hoặc không theo một tín ngưỡng nào"
    ],
    "answer": 3,
    "explanation": "Vợ chồng bình đẳng với nhau, có nghĩa vụ và quyền ngang nhau về mọi mặt trong gia đình, bao gồm cả quyền tự do tín ngưỡng, tôn giáo (Điều 17, Điều 19 Luật Hôn nhân và Gia đình 2014)."
  },
  {
    "id": 76,
    "question": "Tảo hôn là việc:",
    "options": [
      "Kết hôn do cưỡng ép, lừa dối",
      "Kết hôn trái pháp luật",
      "Kết hôn khi chưa đủ tuổi",
      "Kết hôn không tự nguyện"
    ],
    "answer": 2,
    "explanation": "Tảo hôn là việc lấy vợ, lấy chồng khi một bên hoặc cả hai bên chưa đủ tuổi kết hôn theo quy định của pháp luật (Khoản 8 Điều 3 Luật Hôn nhân và Gia đình 2014)."
  },
  {
    "id": 77,
    "question": "Quan hệ hôn nhân chấm dứt kể từ ngày:",
    "options": [
      "Vợ, chồng hoặc cả vợ và chồng nộp đơn yêu cầu giải quyết ly hôn cho Tòa án",
      "Tòa án thụ lý đơn yêu cầu giải quyết ly hôn",
      "Tòa án ra bản án, quyết định cho ly hôn",
      "Có bản án, quyết định cho ly hôn có hiệu lực của Tòa án"
    ],
    "answer": 3,
    "explanation": "Quan hệ hôn nhân chấm dứt kể từ ngày bản án, quyết định ly hôn của Tòa án có hiệu lực pháp luật (Khoản 8 Điều 3, Điều 66 Luật Hôn nhân và Gia đình 2014)."
  },
  {
    "id": 78,
    "question": "Nhận định nào sau đây là ĐÚNG khi nghiên cứu về Luật Hôn nhân và gia đình hiện hành?",
    "options": [
      "Nam nữ sống chung từ trước ngày 01/01/2001 đều được công nhận là vợ chồng",
      "Khi ly hôn việc giao con chung từ đủ 7 tuổi trở lên cho cha hoặc mẹ nuôi phải xem xét vào nguyện vọng của con",
      "Luật Hôn nhân và gia đình năm 2014 quy định thừa nhận hôn nhân đồng tính",
      "Người từ đủ 18 tuổi trở lên và có trạng thái thần kinh bình thường là người có năng lực hành vi hôn nhân"
    ],
    "answer": 1,
    "explanation": "Con từ đủ 7 tuổi trở lên khi ly hôn phải xem xét nguyện vọng của con (Khoản 2 Điều 81 Luật Hôn nhân và Gia đình 2014). Hôn nhân đồng tính không được công nhận, và nam nữ sống chung trước 01/01/2001 chỉ được công nhận là vợ chồng nếu đáp ứng điều kiện nhất định."
  },
  {
    "id": 79,
    "question": "Nhận định nào sau đây là ĐÚNG khi nghiên cứu về Luật Hôn nhân và gia đình hiện hành?",
    "options": [
      "Tài sản chung của vợ chồng phải là tài sản có được trong thời kỳ hôn nhân",
      "Mọi tài sản mà vợ hoặc chồng tạo dựng trong thời kỳ hôn nhân đều là tài sản chung",
      "Tài sản chung của vợ chồng chỉ được chia khi vợ chồng ly hôn",
      "Trong thời kỳ hôn nhân vẫn có thể chia tài sản chung của vợ chồng"
    ],
    "answer": 3,
    "explanation": "Vợ chồng có quyền thỏa thuận chia tài sản chung trong thời kỳ hôn nhân (Điều 38 Luật Hôn nhân và Gia đình 2014)."
  },
  {
    "id": 80,
    "question": "Anh Bi, chị Lượm tổ chức đám cưới ngày 15/10/2010, cả hai đăng ký kết hôn ngày 30/11/2011. Do vợ chồng có nhiều mâu thuẫn, ngày 25/7/2020 chị Lượm nộp đơn xin ly hôn tại tòa án có thẩm quyền. Ngày 30/9/2020 Tòa án ra bản án có hiệu lực pháp luật tuyên anh Bi, chị Lượm ly hôn. Vậy thời kỳ hôn nhân của anh Bi và chị Lượm sẽ được tính:",
    "options": [
      "Từ ngày 15/10/2010 đến ngày 25/7/2020",
      "Từ ngày 30/11/2011 đến ngày 25/7/2020",
      "Từ ngày 30/11/2011 đến ngày 30/9/2020",
      "Từ ngày 15/10/2010 đến ngày 30/9/2020"
    ],
    "answer": 2,
    "explanation": "Thời kỳ hôn nhân được tính từ ngày đăng ký kết hôn (30/11/2011) đến ngày quan hệ hôn nhân chấm dứt, tức là ngày bản án ly hôn có hiệu lực pháp luật (30/9/2020) (Khoản 12 Điều 3 Luật Hôn nhân và Gia đình 2014)."
  },
  {
    "id": 81,
    "question": "Đối tượng điều chỉnh của ngành luật Lao động là:",
    "options": [
      "Quan hệ lao động",
      "Quan hệ việc làm",
      "Các quan hệ liên quan đến quan hệ lao động",
      "Quan hệ lao động và các quan hệ xã hội liên quan trực tiếp với quan hệ lao động"
    ],
    "answer": 3,
    "explanation": "Luật Lao động điều chỉnh quan hệ lao động (quan hệ giữa người lao động và người sử dụng lao động) và các quan hệ liên quan trực tiếp đến quan hệ lao động (ví dụ: quan hệ về đào tạo nghề, bảo hiểm xã hội, giải quyết tranh chấp lao động...)."
  },
  {
    "id": 82,
    "question": "Tiền lương là một chế định của ngành luật:",
    "options": [
      "Dân sự",
      "Hành chính",
      "Bảo hiểm xã hội",
      "Lao động"
    ],
    "answer": 3,
    "explanation": "Tiền lương là một chế định quan trọng trong Luật Lao động, quy định về hình thức, mức, kỳ hạn trả lương, và nguyên tắc trả lương."
  },
  {
    "id": 83,
    "question": "Phương pháp điều chỉnh được sử dụng phổ biến trong quan hệ lao động là:",
    "options": [
      "Phương pháp thỏa thuận",
      "Phương pháp mệnh lệnh",
      "Phương pháp tác động của tổ chức Công đoàn",
      "Phương pháp mệnh lệnh - phục tùng"
    ],
    "answer": 0,
    "explanation": "Quan hệ lao động được thiết lập chủ yếu trên cơ sở hợp đồng lao động, với nguyên tắc tự nguyện, bình đẳng, tự do thỏa thuận. Đây là đặc trưng cơ bản của phương pháp thỏa thuận."
  },
  {
    "id": 84,
    "question": "Hợp đồng lao động phải có nội dung chủ yếu nào sau đây:",
    "options": [
      "Công việc phải làm",
      "Tiền lương",
      "Điều kiện về an toàn lao động, vệ sinh lao động và bảo hiểm xã hội đối với người lao động",
      "Tiền lương, công việc phải làm, điều kiện về an toàn lao động, vệ sinh lao động và bảo hiểm xã hội đối với người lao động"
    ],
    "answer": 3,
    "explanation": "Đây là các nội dung chủ yếu phải có của hợp đồng lao động theo quy định của Bộ luật Lao động hiện hành (Điều 21 Bộ luật Lao động 2019)."
  },
  {
    "id": 85,
    "question": "Thời giờ làm việc theo qui định của Bộ luật Lao động là:",
    "options": [
      "Không quá 12 giờ trong một ngày",
      "Từ 8 đến 10 giờ trong một ngày",
      "Tùy thỏa thuận giữa người lao động và người sử dụng lao động",
      "Không quá 8 giờ trong một ngày và 48 giờ trong một tuần"
    ],
    "answer": 3,
    "explanation": "Thời giờ làm việc bình thường không quá 08 giờ/ngày và không quá 48 giờ/tuần (Khoản 1 Điều 105 Bộ luật Lao động 2019)."
  },
  {
    "id": 86,
    "question": "Bộ luật lao động hiện hành quy định: tiền lương của người lao động trong thời gian thử việc do hai bên thỏa thuận nhưng:",
    "options": [
      "Ít nhất phải bằng 85% mức lương của công việc đó",
      "Ít nhất phải bằng 50% mức lương của công việc đó",
      "Ít nhất phải bằng 60% mức lương của công việc đó",
      "Ít nhất phải bằng 70% mức lương của công việc đó"
    ],
    "answer": 0,
    "explanation": "Tiền lương của người lao động trong thời gian thử việc do hai bên thỏa thuận nhưng ít nhất phải bằng 85% mức lương chính thức của công việc đó (Khoản 2 Điều 26 Bộ luật Lao động 2019)."
  },
  {
    "id": 87,
    "question": "Theo Bộ luật lao động hiện hành thì trong trường hợp nào người lao động được nghỉ mà KHÔNG hưởng nguyên lương?",
    "options": [
      "Kết hôn cho bản thân",
      "Kết hôn cho con",
      "Bố đẻ, mẹ đẻ, bố vợ, mẹ vợ hoặc bố chồng, mẹ chồng chết; vợ chết hoặc chồng chết; con chết",
      "Kết hôn cho anh, chị, em ruột"
    ],
    "answer": 3,
    "explanation": "Kết hôn cho anh, chị, em ruột (dù là ruột thịt hay vợ/chồng của anh, chị, em ruột) không thuộc trường hợp được nghỉ việc riêng hưởng nguyên lương (Khoản 1 Điều 115 BLLĐ 2019). Các trường hợp còn lại được nghỉ hưởng nguyên lương."
  },
  {
    "id": 88,
    "question": "\"Linh là công nhân làm việc tại công ty X từ năm 2015, đã tham gia bảo hiểm xã hội bắt buộc. Từ tháng 5/2017 mức lương của Linh là 5.700.000 đ/tháng\". Theo quy định pháp luật lao động hiện hành thì tiền lương của Linh sau khi trừ đi số tiền đóng quỹ bảo hiểm xã hội bắt buộc là bao nhiêu:",
    "options": [
      "5.244.000 đ",
      "5.301.000 đ",
      "5.358.000 đ",
      "5.415.000 đ"
    ],
    "answer": 0,
    "explanation": "Giả định mức đóng BHXH cho người lao động là 8%: 5.700.000 x (1 - 8%) = 5.244.000 đ (Đáp án A)."
  },
  {
    "id": 89,
    "question": "Anh Nhật được công ty X nhận vào làm việc ở vị trí kỹ sư điện tử từ tháng 9/2017. Công ty yêu cầu anh Nhật phải thử việc trước khi kí hợp đồng lao động với anh. Theo quy định của pháp luật hiện hành thì:",
    "options": [
      "Anh Nhật chỉ thử việc 01 lần và thời gian thử việc tối đa là 60 ngày.",
      "Anh Nhật được thử việc tối đa 02 lần và mỗi lần thử việc tối đa là 60 ngày.",
      "Anh Nhật có thể thử việc nhiều lần nhưng tổng thời gian thử việc tối đa là 60 ngày.",
      "Anh Nhật phải thử việc nhiều lần cho đến khi thành thạo công việc."
    ],
    "answer": 0,
    "explanation": "Pháp luật quy định chỉ được thử việc một lần đối với một công việc, thời gian thử việc tối đa là 60 ngày đối với công việc yêu cầu trình độ chuyên môn, kỹ thuật cao (Khoản 1 Điều 25 BLLĐ 2019)."
  },
  {
    "id": 90,
    "question": "Sự thỏa thuận nào làm phát sinh hợp đồng dân sự?",
    "options": [
      "Mọi sự thỏa thuận bằng ngôn ngữ cơ thể",
      "Mọi sự thỏa thuận được lập thành văn bản",
      "Mọi sự thỏa thuận nhằm làm phát sinh, thay đổi, chấm dứt quyền và nghĩa vụ dân sự",
      "Mọi sự thỏa thuận bằng lời nói"
    ],
    "answer": 2,
    "explanation": "Hợp đồng dân sự là sự thỏa thuận giữa các bên về việc xác lập, thay đổi hoặc chấm dứt quyền, nghĩa vụ dân sự (Điều 385 Bộ luật Dân sự 2015)."
  },
  {
    "id": 91,
    "question": "Việc chiếm hữu của một người với đối với một tài sản nhưng không biết đó là chiếm hữu bất hợp pháp thì:",
    "options": [
      "Đều là chiếm hữu hợp pháp",
      "Có thể là chiếm hữu bất hợp pháp ngay tình hoặc chiếm hữu bất hợp pháp không ngay tình",
      "Đều là chiếm hữu bất hợp pháp ngay tình",
      "Đều là chiếm hữu bất hợp pháp không ngay tình"
    ],
    "answer": 2,
    "explanation": "Chiếm hữu bất hợp pháp ngay tình là việc chiếm hữu tài sản mà người chiếm hữu không biết hoặc không thể biết việc chiếm hữu đó là không có căn cứ pháp luật (Khoản 3 Điều 189 Bộ luật Dân sự 2015)."
  },
  {
    "id": 92,
    "question": "Diện những người thừa kế theo pháp luật bao gồm:",
    "options": [
      "Những người có tên trong nội dung của di chúc",
      "Những người theo thứ tự hàng thừa kế được quy định tại Bộ luật dân sự",
      "Vợ, chồng; cha, mẹ; các con; người giám hộ của người để lại di sản",
      "Những người có quan hệ huyết thống trong phạm vi ba đời với người để lại di sản"
    ],
    "answer": 1,
    "explanation": "Thừa kế theo pháp luật được áp dụng theo thứ tự hàng thừa kế và điều kiện quy định tại Điều 651 Bộ luật Dân sự 2015."
  },
  {
    "id": 93,
    "question": "Trình tự, thủ tục giải quyết một vụ án dân sự nói chung là:",
    "options": [
      "Thụ lý vụ án – hòa giải – xét xử sơ thẩm – thi hành án dân sự",
      "Xét xử sơ thẩm – xét xử phúc thẩm – xét lại bản án theo thủ tục giám đốc thẩm, tái thẩm",
      "Hòa giải – xét xử sơ thẩm – xét xử phúc thẩm",
      "Xét xử sơ thẩm – xét xử phúc thẩm"
    ],
    "answer": 0,
    "explanation": "Trình tự giải quyết vụ án dân sự bao gồm: Khởi kiện, thụ lý – Chuẩn bị xét xử (có thể hòa giải) – Xét xử sơ thẩm – Thi hành án. Đây là quy trình tổng quát và chính xác nhất."
  },
  {
    "id": 94,
    "question": "Thừa kế là gì?",
    "options": [
      "Là việc chuyển quyền sở hữu đối với tài sản của cha mẹ, ông bà cho con, cháu",
      "Là việc chuyển quyền sở hữu đối với tài sản của người chết cho người thừa kế thông qua ý nguyện cá nhân bằng di chúc hoặc căn cứ vào qui định của pháp luật",
      "Là việc chuyển quyền sở hữu đối với tài sản của người chết cho con cháu và được lập thành văn bản theo qui định của pháp luật",
      "Là việc chuyển dịch tài sản từ người này sang người khác"
    ],
    "answer": 1,
    "explanation": "Thừa kế là việc chuyển dịch tài sản của người chết sang người còn sống theo Di chúc hoặc theo pháp luật (Điều 609 Bộ luật Dân sự 2015)."
  },
  {
    "id": 95,
    "question": "Người để lại di sản thừa kế là:",
    "options": [
      "Tổ chức hoặc cá nhân đã chết có tài sản để lại",
      "Cá nhân có tài sản muốn để lại cho con cháu và đã lập thành di chúc",
      "Cá nhân đã chết có tài sản để lại",
      "Người lập di chúc để lại tài sản của mình cho người thân"
    ],
    "answer": 2,
    "explanation": "Người để lại di sản phải là cá nhân đã chết (Điều 611 Bộ luật Dân sự 2015)."
  },
  {
    "id": 96,
    "question": "Theo quy định của Bộ luật dân sự hiện hành thì người thừa kế có thể là:",
    "options": [
      "Cá nhân, tổ chức",
      "Tổ chức, cơ quan Nhà nước",
      "Cơ quan Nhà nước",
      "Cá nhân, tổ chức, cơ quan Nhà nước"
    ],
    "answer": 0,
    "explanation": "Người thừa kế có thể là cá nhân (người còn sống) hoặc tổ chức được hưởng di sản (Điều 613 Bộ luật Dân sự 2015)."
  },
  {
    "id": 97,
    "question": "Hình thức thừa kế theo di chúc bao gồm:",
    "options": [
      "Di chúc bằng văn bản",
      "Di chúc bằng văn bản có người làm chứng",
      "Di chúc bằng văn bản có công chứng",
      "Di chúc bằng văn bản không có người làm chứng, di chúc bằng văn bản có người làm chứng, di chúc bằng văn bản có công chứng, chứng thực (kết hợp trang cuối)"
    ],
    "answer": 3,
    "explanation": "Di chúc bằng văn bản có thể có các hình thức: không có người làm chứng; có người làm chứng; được công chứng hoặc chứng thực (Điều 627, Điều 630, Điều 633, Điều 634 Bộ luật Dân sự 2015)."
  },
  {
    "id": 98,
    "question": "Hàng thừa kế thứ nhất theo quy định của pháp luật bao gồm:",
    "options": [
      "Vợ, chồng",
      "Cha mẹ đẻ, con đẻ",
      "Cha mẹ nuôi, con nuôi",
      "Vợ, chồng; cha mẹ đẻ, con đẻ; cha mẹ nuôi, con nuôi"
    ],
    "answer": 3,
    "explanation": "Hàng thừa kế thứ nhất gồm: vợ, chồng, cha đẻ, mẹ đẻ, cha nuôi, mẹ nuôi, con đẻ, con nuôi của người chết (Khoản 1 Điều 651 Bộ luật Dân sự 2015)."
  },
  {
    "id": 99,
    "question": "\"Anh A chạy xe máy va chạm với xe máy của anh X làm anh X ngã xuống đường. Anh A dừng xe và đỡ anh X nhưng anh X cố tình đẩy đổ xe máy của anh A làm gương xe bị vỡ. Hỏi: anh X có trách nhiệm gì trong trường hợp này?",
    "options": [
      "Không chịu bất kỳ trách nhiệm nào",
      "Chịu trách nhiệm do vi phạm hành chính",
      "Chịu trách nhiệm do vi phạm hình sự",
      "Chịu trách nhiệm do gây ra thiệt hại dân sự"
    ],
    "answer": 3,
    "explanation": "Hành vi cố ý làm vỡ gương xe máy của anh A là hành vi gây thiệt hại về tài sản cho người khác, phải bồi thường theo trách nhiệm bồi thường thiệt hại ngoài hợp đồng (Điều 584 Bộ luật Dân sự 2015)."
  },
  {
    "id": 100,
    "question": "Theo quy định của Bộ luật hình sự hiện hành thì hệ thống hình phạt gồm:",
    "options": [
      "Hình phạt tù giam và các hình phạt khác",
      "Hình phạt cơ bản và hình phạt không cơ bản",
      "Hình phạt chủ yếu và hình phạt không chủ yếu",
      "Các hình phạt chính và các hình phạt bổ sung"
    ],
    "answer": 3,
    "explanation": "Hệ thống hình phạt bao gồm hình phạt chính và hình phạt bổ sung (Điều 32 Bộ luật Hình sự 2015)."
  },
  {
    "id": 101,
    "question": "Hình phạt trong Bộ luật Hình sự hiện hành được áp dụng nhằm mục đích chính là:",
    "options": [
      "Trừng phạt người phạm tội, giáo dục, răn đe và đấu tranh phòng chống tội phạm",
      "Bắt người phạm tội bồi thường thiệt hại đã gây ra",
      "Lên án, công kích, hạ thấp giá trị của người phạm tội",
      "Khuyên nhủ, thuyết phục mọi người không thực hiện hành vi phạm tội"
    ],
    "answer": 0,
    "explanation": "Mục đích của hình phạt là: trừng trị, giáo dục người phạm tội trở thành người có ích cho xã hội và phòng ngừa tội phạm (Điều 30 Bộ luật Hình sự 2015)."
  },
  {
    "id": 102,
    "question": "Phụ nữ có thai hoặc đang nuôi con dưới 36 tháng tuổi khi phạm tội không áp dụng hình phạt nào sau đây?",
    "options": [
      "Tù chung thân",
      "Tử hình",
      "Tù chung thân và tử hình",
      "Tù có thời hạn"
    ],
    "answer": 1,
    "explanation": "Không áp dụng hình phạt tử hình đối với phụ nữ có thai hoặc đang nuôi con dưới 36 tháng tuổi (Khoản 2 Điều 40 Bộ luật Hình sự 2015)."
  },
  {
    "id": 103,
    "question": "Hình phạt cấm cư trú là:",
    "options": [
      "Hình phạt bổ sung",
      "Hình phạt chính",
      "Hình phạt hỗ trợ",
      "Hình phạt ít nghiêm trọng"
    ],
    "answer": 0,
    "explanation": "Cấm cư trú là một trong các hình phạt bổ sung (Điểm d Khoản 2 Điều 32 Bộ luật Hình sự 2015)."
  },
  {
    "id": 104,
    "question": "Hình phạt quản chế được áp dụng với thời hạn từ 01 năm đến 05 năm, kể từ ngày:",
    "options": [
      "Chấp hành xong hình phạt",
      "Tòa tuyên án",
      "Bản án có hiệu lực pháp luật",
      "Chấp hành xong hình phạt tù"
    ],
    "answer": 3,
    "explanation": "Hình phạt quản chế được tính từ ngày chấp hành xong hình phạt tù (Điều 38 Bộ luật Hình sự 2015)."
  },
  {
    "id": 105,
    "question": "Tòa án có thể cho hưởng án treo và ấn định thời gian thử thách theo quy định pháp luật cho người phạm tội khi họ bị xử phạt tù thời hạn:",
    "options": [
      "Không quá 03 năm",
      "Không quá 03 tháng",
      "Không quá 01 năm",
      "Không quá 05 năm"
    ],
    "answer": 0,
    "explanation": "Người bị xử phạt tù không quá 03 năm có thể được xem xét cho hưởng án treo (Điều 65 Bộ luật Hình sự 2015)."
  },
  {
    "id": 106,
    "question": "Hình phạt trục xuất chỉ áp dụng với:",
    "options": [
      "Người không có quốc tịch",
      "Công dân Việt Nam",
      "Người nước ngoài",
      "Công dân Việt Nam định cư ở nước ngoài"
    ],
    "answer": 2,
    "explanation": "Trục xuất là hình phạt buộc người nước ngoài phạm tội phải rời khỏi lãnh thổ Việt Nam (Điều 37 Bộ luật Hình sự 2015)."
  },
  {
    "id": 107,
    "question": "Hình phạt tử hình là:",
    "options": [
      "Tước quyền công dân của người phạm tội",
      "Tước quyền được sống của người phạm tội",
      "Cách ly người phạm tội ra khỏi xã hội vĩnh viễn",
      "Cách ly người phạm tội khỏi xã hội một thời gian"
    ],
    "answer": 1,
    "explanation": "Tử hình là hình phạt đặc biệt chỉ áp dụng đối với người phạm tội đặc biệt nghiêm trọng, tước đi quyền sống của người phạm tội (Điều 40 Bộ luật Hình sự 2015)."
  },
  {
    "id": 108,
    "question": "Biện pháp cưỡng chế nào sau đây là hình phạt?",
    "options": [
      "Cải tạo không giam giữ",
      "Án treo",
      "Giáo dục tại xã, phường, thị trấn",
      "Tịch thu phương tiện phạm tội"
    ],
    "answer": 0,
    "explanation": "Cải tạo không giam giữ là một trong các hình phạt chính (Điểm c Khoản 1 Điều 32 Bộ luật Hình sự 2015)."
  },
  {
    "id": 109,
    "question": "Hình phạt được áp dụng khi:",
    "options": [
      "Bản án có hiệu lực pháp luật",
      "Bị Tòa án đưa ra xét xử",
      "Bị khởi tố",
      "Bị truy tố"
    ],
    "answer": 0,
    "explanation": "Hình phạt chỉ được áp dụng khi có bản án đã có hiệu lực pháp luật của Tòa án."
  },
  {
    "id": 110,
    "question": "Cấu thành tội phạm tham nhũng là:",
    "options": [
      "Hành vi của người có chức vụ, quyền hạn đã lợi dụng chức vụ, quyền hạn đó vì vụ lợi.",
      "Người có hành vi nhũng nhiễu nhân dân lấy của.",
      "Hành vi của người có chức vụ, quyền hạn đã lợi dụng chức vụ, quyền hạn đó vì vụ lợi với giá trị 01 triệu đồng.",
      "Hành vi của người không có chức vụ quyền hạn nhưng làm thất thoát tài sản của Nhà nước"
    ],
    "answer": 0,
    "explanation": "Tham nhũng là hành vi của người có chức vụ, quyền hạn đã lợi dụng chức vụ, quyền hạn đó để vụ lợi (Khoản 1 Điều 3 Luật Phòng, chống tham nhũng 2018)."
  },
  {
    "id": 111,
    "question": "Đặc trưng của tội tham nhũng là:",
    "options": [
      "Chủ thể tham nhũng là người có chức vụ, quyền hạn nhưng tham nhũng dưới 2 triệu đồng",
      "Chủ thể tham nhũng lợi dụng chức vụ, quyền hạn được giao nhưng do yếu kém chuyên môn là thất thoát tài sản",
      "Mục đích của hành vi tham nhũng là không vì vụ lợi",
      "Chủ thể tham nhũng là người có chức vụ, quyền hạn"
    ],
    "answer": 3,
    "explanation": "Đặc trưng cơ bản của chủ thể tội phạm tham nhũng là người có chức vụ, quyền hạn (Điều 352-359 Bộ luật Hình sự 2015)."
  },
  {
    "id": 30,
    "question": "Chọn phương án đúng nhất điền vào chỗ trống: “... của quy phạm pháp luật chứa đựng mệnh lệnh của nhà nước”.",
    "options": [
      "Bộ phận gia đình",
      "Bộ phận quy định",
      "Bộ phận chế tài",
      "Bộ phận quy định và bộ phận chế tài"
    ],
    "answer": 1,
    "explanation": "Bộ phận chứa đựng mệnh lệnh trực tiếp, quy định cách xử sự là Bộ phận quy định."
  },
  {
    "id": 31,
    "question": "Các quan hệ xã hội được các quy phạm pháp luật điều chỉnh, trong đó các chủ thể có quyền và nghĩa vụ pháp lý nhất định, các quan hệ này là:",
    "options": [
      "Quan hệ pháp luật",
      "Quan hệ xã hội",
      "Quan hệ ngoại giao",
      "Quan hệ kinh tế"
    ],
    "answer": 0,
    "explanation": "Đây chính là định nghĩa của Quan hệ pháp luật."
  },
  {
    "id": 32,
    "question": "Quan hệ nào sau đây là quan hệ pháp luật?",
    "options": [
      "Quan hệ tình yêu nam nữ",
      "Quan hệ vợ chồng",
      "Quan hệ bạn bè",
      "Quan hệ tình yêu giữa những người cùng giới tính"
    ],
    "answer": 1,
    "explanation": "Quan hệ vợ chồng được điều chỉnh bởi Luật Hôn nhân và Gia đình, có tính chất pháp lý (quyền và nghĩa vụ)."
  },
  {
    "id": 33,
    "question": "Quan hệ pháp luật giữa các chủ thể tham gia vào quan hệ pháp luật phát sinh khi gắn liền với:",
    "options": [
      "Nhà nước",
      "Sự kiện pháp lý",
      "Nghĩa vụ pháp lý",
      "Chủ thể và khách thể"
    ],
    "answer": 1,
    "explanation": "Quan hệ pháp luật phát sinh, thay đổi hoặc chấm dứt khi có Sự kiện pháp lý (hành vi pháp lý hoặc sự biến pháp lý)."
  },
  {
    "id": 34,
    "question": "Chủ thể của quan hệ pháp luật là:",
    "options": [
      "Nhà nước, tất cả mọi cá nhân và tổ chức trong xã hội",
      "Những tổ chức có tiềm lực kinh tế",
      "Cá nhân hoặc tổ chức có năng lực chủ thể tham gia vào quan hệ pháp luật",
      "Những cá nhân từ đủ 18 tuổi trở lên và có khả năng nhận thức"
    ],
    "answer": 2,
    "explanation": "Chủ thể phải có Năng lực pháp luật và Năng lực hành vi để tham gia quan hệ pháp luật."
  },
  {
    "id": 35,
    "question": "Khả năng Nhà nước thừa nhận cho chủ thể bằng văn bản của mình có thể xác lập và thực hiện quyền hoặc nghĩa vụ pháp lý, gọi là:",
    "options": [
      "Khả năng hành vi",
      "Năng lực hành vi",
      "Năng lực pháp lý",
      "Năng lực pháp luật"
    ],
    "answer": 3,
    "explanation": "Khả năng có quyền và nghĩa vụ pháp lý là Năng lực pháp luật. Lựa chọn D (Năng lực pháp luật) là chính xác nhất."
  },
  {
    "id": 36,
    "question": "Khách thể của quan hệ pháp luật là:",
    "options": [
      "Các quan hệ xã hội được pháp luật bảo vệ",
      "Các quy định của cơ quan nhà nước",
      "Lợi ích vật chất và tinh thần mà các bên mong muốn đạt được",
      "Lợi ích mà các bên mong muốn đạt được và thúc đẩy chủ thể tham gia quan hệ pháp luật"
    ],
    "answer": 3,
    "explanation": "Khách thể là mục đích, lợi ích vật chất hoặc phi vật chất mà các chủ thể hướng tới khi tham gia vào quan hệ pháp luật."
  },
  {
    "id": 37,
    "question": "Sự kiện pháp lý là những sự kiện thực tế:",
    "options": [
      "Phản ánh ý chí của con người và được pháp luật quy định",
      "Xảy ra không phụ thuộc vào ý chí của con người",
      "Xảy ra không phụ thuộc vào ý chí của con người; làm phát sinh, thay đổi hoặc chấm dứt các quan hệ pháp luật",
      "Xảy ra theo ý chí của chủ thể; làm phát sinh, thay đổi hoặc chấm dứt các quan hệ pháp luật"
    ],
    "answer": 3,
    "explanation": "Sự kiện pháp lý bao gồm cả hành vi pháp lý (theo ý chí) và sự biến pháp lý (không theo ý chí). Lựa chọn D là định nghĩa bao trùm."
  },
  {
    "id": 38,
    "question": "Để quan hệ xã hội trở thành quan hệ pháp luật cần phải:",
    "options": [
      "Có quy phạm pháp luật điều chỉnh và gắn liền với sự kiện pháp lý",
      "Quy định quyền và nghĩa vụ trong quy phạm pháp luật",
      "Có chủ thể và khách thể quan hệ pháp luật",
      "Có sự điều chỉnh của pháp luật"
    ],
    "answer": 0,
    "explanation": "Cần hai điều kiện: có quy phạm pháp luật điều chỉnh và có sự kiện pháp lý xảy ra trong thực tế."
  },
  {
    "id": 39,
    "question": "Khi nghiên cứu về năng lực chủ thể của quan hệ pháp luật, thì nhận định nào sau đây là ĐÚNG?",
    "options": [
      "Cá nhân không có năng lực pháp luật thì cũng không có năng lực hành vi",
      "Cá nhân có năng lực hành vi thì cũng có năng lực pháp luật",
      "Cá nhân có năng lực hành vi thì cũng có năng lực pháp luật",
      "Cá nhân không có năng lực hành vi thì cũng không có năng lực pháp luật"
    ],
    "answer": 1,
    "explanation": "Năng lực pháp luật là tiền đề của Năng lực hành vi. Nếu đã có năng lực hành vi thì chắc chắn phải có năng lực pháp luật."
  },
  {
    "id": 40,
    "question": "“An là sinh viên một trường đại học đang cần tiền để đóng học phí. An gặp bạn là Thành và nhờ Thành giúp đỡ tiền đóng học phí. Sau đó, Thành đưa An 3 triệu đồng và yêu cầu một tháng sau An phải trả lại 3 triệu đồng”. Trong trường hợp này, quan hệ pháp luật phát sinh giữa An và Thành là:",
    "options": [
      "Quan hệ thuê tài sản",
      "Quan hệ mượn tài sản",
      "Quan hệ thế chấp tài sản",
      "Quan hệ cho - nhận"
    ],
    "answer": 1,
    "explanation": "Đây là quan hệ mượn tài sản (vay) không có lãi suất, tài sản vay là tiền (Điều 463 Bộ luật Dân sự 2015)."
  },
  {
    "id": 41,
    "question": "Điền vào chỗ trống: “Có.... hình thức thực hiện pháp luật, bao gồm:....”",
    "options": [
      "4 - Tuân thủ pháp luật, thực thi pháp luật, thi hành pháp luật, áp dụng pháp luật",
      "4 - Tuân thủ pháp luật, thực thi pháp luật, sử dụng pháp luật, áp dụng pháp luật",
      "4 - Tuân thủ pháp luật, thi hành pháp luật, sử dụng pháp luật, áp dụng pháp luật",
      "4 - Tuân theo pháp luật, thi hành pháp luật, sử dụng pháp luật, áp dụng pháp luật"
    ],
    "answer": 2,
    "explanation": "Có 4 hình thức thực hiện pháp luật: Tuân thủ pháp luật, Thi hành pháp luật, Sử dụng pháp luật và Áp dụng pháp luật."
  },
  {
    "id": 42,
    "question": "Hình thức thi hành pháp luật được hiểu là:",
    "options": [
      "Quyền của chủ thể",
      "Nghĩa vụ của chủ thể",
      "Chủ thể không làm những điều luật cấm",
      "Chủ thể làm những điều pháp luật cho phép"
    ],
    "answer": 1,
    "explanation": "Thi hành pháp luật là việc chủ thể thực hiện nghĩa vụ pháp lý, tức là làm những điều pháp luật quy định phải làm."
  },
  {
    "id": 43,
    "question": "Hoạt động áp dụng pháp luật được tiến hành bởi:",
    "options": [
      "Các tổ chức tôn giáo",
      "Các cơ quan nhà nước có thẩm quyền",
      "Công dân, người nước ngoài",
      "Tất cả các chủ thể"
    ],
    "answer": 1,
    "explanation": "Áp dụng pháp luật là hoạt động mang tính quyền lực nhà nước, chỉ do cơ quan nhà nước hoặc người có thẩm quyền thực hiện."
  },
  {
    "id": 44,
    "question": "Mặt khách quan của vi phạm pháp luật bao gồm:",
    "options": [
      "Lỗi, động cơ, mục đích",
      "Hành vi trái pháp luật và hậu quả do hành vi trái pháp luật gây ra; mối quan hệ nhân - quả giữa hành vi trái pháp luật và thiệt hại gây ra cho xã hội",
      "Chủ thể thực hiện hành vi",
      "Quan hệ xã hội được pháp luật bảo vệ"
    ],
    "answer": 1,
    "explanation": "Mặt khách quan bao gồm Hành vi trái pháp luật, Hậu quả, Mối quan hệ nhân quả và các yếu tố khác như thời gian, địa điểm."
  },
  {
    "id": 45,
    "question": "Hoạt động nhằm đưa pháp luật vào cuộc sống, trở thành hành vi thực tế hợp pháp của các chủ thể pháp luật, gọi là:",
    "options": [
      "Áp dụng pháp luật",
      "Thực thi pháp luật",
      "Thực hiện pháp luật",
      "Thi hành pháp luật"
    ],
    "answer": 2,
    "explanation": "Thực hiện pháp luật là khái niệm chung, bao trùm tất cả các hoạt động đưa pháp luật vào đời sống."
  },
  {
    "id": 46,
    "question": "Yếu tố nào sau đây **không** thuộc mặt khách quan của vi phạm pháp luật?",
    "options": [
      "Hành vi trái pháp luật",
      "Hậu quả do hành vi trái pháp luật gây ra",
      "Mối quan hệ nhân – quả giữa hành vi và hậu quả",
      "Lỗi"
    ],
    "answer": 3,
    "explanation": "Lỗi (cố ý hoặc vô ý) là yếu tố thuộc Mặt chủ quan của vi phạm pháp luật."
  },
  {
    "id": 47,
    "question": "Độ tuổi bắt đầu chịu trách nhiệm pháp lý hình sự theo quy định của Bộ luật Hình sự Việt Nam là bao nhiêu?",
    "options": [
      "Đủ 14 tuổi",
      "Đủ 16 tuổi",
      "Đủ 18 tuổi",
      "Đủ 21 tuổi"
    ],
    "answer": 0,
    "explanation": "Người từ đủ 14 tuổi đến dưới 16 tuổi phải chịu trách nhiệm hình sự về tội phạm rất nghiêm trọng, đặc biệt nghiêm trọng (Điều 12 Bộ luật Hình sự 2015)."
  },
  {
    "id": 48,
    "question": "Trong vi phạm pháp luật, lỗi được coi là:",
    "options": [
      "Là trạng thái tâm lý bên trong của chủ thể khi có hành vi vi phạm pháp luật",
      "Là mục đích của chủ thể khi có hành vi vi phạm pháp luật",
      "Là động cơ của chủ thể khi có hành vi vi phạm pháp luật",
      "Là động cơ và mục đích của chủ thể khi có hành vi vi phạm pháp luật"
    ],
    "answer": 0,
    "explanation": "Lỗi thể hiện thái độ tâm lý của chủ thể đối với hành vi trái pháp luật và hậu quả do hành vi đó gây ra."
  },
  {
    "id": 49,
    "question": "Hành vi nào sau đây là vi phạm pháp luật hành chính?",
    "options": [
      "Vượt đèn đỏ gây chết người",
      "Cướp tài sản",
      "Buôn bán hàng cấm nhiễm cúm",
      "Sử dụng tài liệu khi làm bài thi"
    ],
    "answer": 3,
    "explanation": "Sử dụng tài liệu khi làm bài thi là vi phạm quy chế (thường kéo theo xử lý hành chính/kỷ luật). Vượt đèn đỏ gây chết người, cướp tài sản là hình sự."
  },
  {
    "id": 50,
    "question": "Hành vi nào sau đây là vi phạm pháp luật hình sự?",
    "options": [
      "Điều khiển xe máy chạy lấn tuyến",
      "Bán hàng lấn chiếm lòng, lề đường",
      "Chứa chấp hoặc hoạt động mại dâm",
      "Điều khiển xe gắn máy không có bằng lái xe"
    ],
    "answer": 2,
    "explanation": "Chứa chấp, môi giới mại dâm là tội phạm hình sự (Điều 327, 328 Bộ luật Hình sự 2015)."
  },
  {
    "id": 51,
    "question": "Văn bản quy phạm pháp luật nào quy định về quyền và nghĩa vụ cơ bản của công dân?",
    "options": [
      "Luật Hành chính",
      "Luật Dân sự",
      "Luật Lao động",
      "Luật Hiến pháp"
    ],
    "answer": 3,
    "explanation": "Hiến pháp (được gọi là Luật cơ bản/Luật Hiến pháp) quy định các quyền và nghĩa vụ cơ bản của công dân."
  },
  {
    "id": 52,
    "question": "Lịch sử lập hiến Việt Nam đã có những bản hiến pháp nào?",
    "options": [
      "Hiến pháp 1946 - Hiến pháp 1954 - Hiến pháp 1980 - Hiến pháp 1992",
      "Hiến pháp 1959 - Hiến pháp 1980 - Hiến pháp 1992 - Hiến pháp 2001",
      "Hiến pháp 1946 - Hiến pháp 1959 - Hiến pháp 1980 - Hiến pháp 1992 - Hiến pháp 2013",
      "Hiến pháp 1946 - Hiến pháp 1959 - Hiến pháp 1980 - Hiến pháp 1992"
    ],
    "answer": 2,
    "explanation": "Việt Nam có 5 bản Hiến pháp: 1946, 1959, 1980, 1992, và 2013."
  },
  {
    "id": 53,
    "question": "Hệ thống cơ quan quyền lực nhà nước bao gồm:",
    "options": [
      "Quốc hội, Chính Phủ",
      "Quốc hội, Ủy ban nhân dân các cấp",
      "Chính phủ, Ủy ban nhân dân các cấp",
      "Quốc hội, Hội đồng nhân dân các cấp"
    ],
    "answer": 3,
    "explanation": "Cơ quan quyền lực nhà nước bao gồm Quốc hội (Trung ương) và Hội đồng nhân dân các cấp (địa phương)."
  },
  {
    "id": 54,
    "question": "Hệ thống cơ quan hành chính nhà nước bao gồm:",
    "options": [
      "Quốc hội, Chính Phủ",
      "Quốc hội, Ủy ban nhân dân các cấp",
      "Chính phủ, Ủy ban nhân dân các cấp",
      "Quốc hội, Hội đồng nhân dân các cấp"
    ],
    "answer": 2,
    "explanation": "Cơ quan hành chính (hành pháp) nhà nước bao gồm Chính phủ (Trung ương) và Ủy ban nhân dân (địa phương)."
  },
  {
    "id": 55,
    "question": "Vị trí của Chủ tịch nước Cộng hòa Xã hội Chủ nghĩa Việt Nam:",
    "options": [
      "Là nguyên thủ quốc gia, thay mặt nhà nước về công tác đối nội và đối ngoại",
      "Là người đứng đầu Chính phủ",
      "Là người có quyền quyết định những vấn đề quan trọng của đất nước",
      "Là nguyên thủ quốc gia và có quyền quyết định những vấn đề quan trọng của đất nước"
    ],
    "answer": 0,
    "explanation": "Chủ tịch nước là nguyên thủ quốc gia, thay mặt nước Cộng hòa xã hội chủ nghĩa Việt Nam về đối nội và đối ngoại (Điều 86 Hiến pháp 2013)."
  },
  {
    "id": 56,
    "question": "Chính phủ Cộng hòa xã hội chủ nghĩa Việt Nam là:",
    "options": [
      "Cơ quan trung tâm của Nhà nước, có thẩm quyền trong cả 3 lĩnh vực lập pháp, hành pháp, tư pháp",
      "Cơ quan Hành chính nhà nước cao nhất, thực hiện quyền hành pháp, tư pháp",
      "Cơ quan chấp hành của Quốc hội, cơ quan hành chính nhà nước cao nhất, thực hiện quyền hành pháp",
      "Cơ quan hành pháp, ban hành văn bản luật"
    ],
    "answer": 2,
    "explanation": "Chính phủ là cơ quan hành chính nhà nước cao nhất, thực hiện quyền hành pháp, là cơ quan chấp hành của Quốc hội (Điều 94 Hiến pháp 2013)."
  },
  {
    "id": 57,
    "question": "Chức năng của Viện kiểm sát nhân dân các cấp:",
    "options": [
      "Kiểm sát hoạt động của cơ quan nhà nước ở địa phương",
      "Kiểm sát hoạt động tư pháp; Thực hành quyền công tố theo quy định của pháp luật",
      "Kiểm soát hoạt động của cơ quan nhà nước ở Trung ương",
      "Kiểm soát hoạt động của tất cả các cơ quan nhà nước"
    ],
    "answer": 1,
    "explanation": "Viện kiểm sát nhân dân thực hành quyền công tố và kiểm sát hoạt động tư pháp (Điều 107 Hiến pháp 2013)."
  },
  {
    "id": 58,
    "question": "Giá trị pháp lý của “Hiến pháp” và “Bộ luật” được xác định như thế nào?",
    "options": [
      "Hiến pháp có hiệu lực pháp lý cao hơn Bộ luật",
      "Bộ luật có hiệu lực pháp lý cao hơn hiến pháp",
      "Hai loại văn bản này đều có hiệu lực pháp lý ngang nhau",
      "Hiến pháp là văn bản luật; Bộ luật là văn bản dưới luật"
    ],
    "answer": 0,
    "explanation": "Hiến pháp là luật cơ bản, có hiệu lực pháp lý cao nhất trong hệ thống pháp luật Việt Nam."
  },
  {
    "id": 59,
    "question": "Trong Bộ máy nhà nước CHXHCN Việt Nam, chức danh nào có thẩm quyền thống lĩnh lực lượng vũ trang nhân dân?",
    "options": [
      "Bộ trưởng Bộ Công an",
      "Bộ trưởng Bộ Quốc phòng",
      "Chủ Tịch Nước",
      "Thủ tướng Chính Phủ"
    ],
    "answer": 2,
    "explanation": "Chủ tịch nước thống lĩnh các lực lượng vũ trang nhân dân (Điều 88 Hiến pháp 2013)."
  },
  {
    "id": 60,
    "question": "Nhân ngày UBND Phường X xuống sinh hoạt cùng tổ dân phố, ông B xin phát biểu ý kiến nhưng ông L (tổ trưởng dân phố) không cho. Ông B đã bị vi phạm quyền công dân nào?",
    "options": [
      "Quyền tiếp cận thông tin",
      "Quyền tự do ngôn luận",
      "Quyền tố cáo",
      "Quyền khiếu nại"
    ],
    "answer": 1,
    "explanation": "Việc cản trở người dân bày tỏ ý kiến tại cuộc họp là vi phạm Quyền tự do ngôn luận (Điều 25 Hiến pháp 2013)."
  },
  {
    "id": 61,
    "question": "Tên gọi nào **không** phải là tên gọi của bộ máy quản lý hành chính của Nhà nước CHXHCN Việt Nam hiện nay?",
    "options": [
      "Bộ Thủy lợi",
      "Bộ Công thương",
      "Bộ Công an",
      "Bộ Y tế"
    ],
    "answer": 0,
    "explanation": "Bộ Thủy lợi là tên gọi cũ, hiện nay là Bộ Nông nghiệp và Phát triển nông thôn."
  },
  {
    "id": 62,
    "question": "Phương pháp điều chỉnh của Luật Hành chính là:",
    "options": [
      "Phương pháp bình đẳng, thỏa thuận",
      "Phương pháp độc lập, tự định đoạt",
      "Phương pháp mệnh lệnh đơn phương",
      "Phương pháp quyền uy và phương pháp thông qua hoạt động của tổ chức công đoàn"
    ],
    "answer": 2,
    "explanation": "Luật Hành chính sử dụng Phương pháp mệnh lệnh - phục tùng (quyền lực) vì nó điều chỉnh các quan hệ quản lý nhà nước."
  },
  {
    "id": 63,
    "question": "Độ tuổi bắt đầu chịu trách nhiệm hành chính là:",
    "options": [
      "Đủ 14 tuổi",
      "14 tuổi",
      "Từ 14 tuổi",
      "Bắt đầu từ 14 tuổi"
    ],
    "answer": 0,
    "explanation": "Người từ đủ 14 tuổi đến dưới 16 tuổi bị xử phạt hành chính về vi phạm hành chính do cố ý (Khoản 1 Điều 5 Luật Xử lý vi phạm hành chính 2012)."
  },
  {
    "id": 64,
    "question": "Cơ quan nào sau đây **không** thực hiện chức năng quản lý nhà nước chủ yếu ở địa phương?",
    "options": [
      "Ủy ban nhân dân tỉnh",
      "Sở, phòng, ban ngành chuyên môn",
      "Tòa án và Viện kiểm sát nhân dân",
      "Ủy ban nhân dân huyện"
    ],
    "answer": 2,
    "explanation": "Tòa án và Viện kiểm sát là cơ quan tư pháp (xét xử, kiểm sát), không phải cơ quan quản lý nhà nước (hành chính) chủ yếu."
  },
  {
    "id": 65,
    "question": "Cơ quan nào là cơ quan ngang bộ của bộ máy hành chính Nhà nước CHXHCN Việt Nam hiện nay?",
    "options": [
      "Ủy ban thể dục, thể thao",
      "Ủy ban dân số gia đình và trẻ em",
      "Văn phòng Chính phủ",
      "Cả A, B và C đều đúng"
    ],
    "answer": 2,
    "explanation": "Trong bối cảnh câu hỏi cũ, Văn phòng Chính phủ được coi là cơ quan ngang Bộ (tương đương cấp Bộ). Theo Luật hiện hành, Văn phòng Chính phủ là Cơ quan thuộc Chính phủ, không phải Cơ quan ngang Bộ. Tuy nhiên, căn cứ vào đáp án phổ biến trong tài liệu, đáp án C được chấp nhận."
  },
  {
    "id": 66,
    "question": "Cơ quan nào **không** phải là cơ quan ngang bộ của Nhà nước CHXHCN Việt Nam hiện nay?",
    "options": [
      "Ngân hàng nhà nước",
      "Thanh tra chính phủ",
      "Ủy ban thể dục và thể thao",
      "Văn phòng chính phủ"
    ],
    "answer": 3,
    "explanation": "Văn phòng Chính phủ là Cơ quan thuộc Chính phủ, không phải là Cơ quan ngang Bộ (hiện tại)."
  },
  {
    "id": 67,
    "question": "Quan hệ nào sau đây là quan hệ pháp luật hành chính?",
    "options": [
      "Quan hệ giải quyết tranh chấp hợp đồng lao động",
      "Quan hệ về tuyển dụng và sử dụng lao động trong cơ quan nhà nước theo chế độ hợp đồng lao động",
      "Quan hệ về kỷ luật buộc thôi việc cán bộ, công chức nhà nước vì vi phạm pháp luật",
      "Quan hệ về kỷ luật đối với sinh viên của trường đại học X"
    ],
    "answer": 2,
    "explanation": "Quan hệ kỷ luật cán bộ, công chức là quan hệ quản lý hành chính nhà nước trong nội bộ hệ thống cơ quan hành chính."
  },
  {
    "id": 68,
    "question": "Chủ thể nào sau đây **không** thuộc hệ thống các cơ quan hành chính?",
    "options": [
      "Chính phủ",
      "UBND các cấp",
      "Bộ Khoa học và Công nghệ",
      "Tòa án hành chính"
    ],
    "answer": 3,
    "explanation": "Tòa án (bao gồm cả Tòa án hành chính) là cơ quan tư pháp, không thuộc hệ thống cơ quan hành chính (hành pháp)."
  },
  {
    "id": 69,
    "question": "Ông Trần Hà là chuyên viên làm việc tại Phòng Quản lý đô thị quận Gò Vấp, theo quy định của Luật cán bộ, công chức thì ông Hà là:",
    "options": [
      "Cán bộ",
      "Công chức",
      "Viên chức",
      "Người làm công"
    ],
    "answer": 1,
    "explanation": "Chuyên viên làm việc tại cơ quan nhà nước cấp quận/huyện, được tuyển dụng vào biên chế và hưởng lương từ ngân sách nhà nước là Công chức (theo Luật Cán bộ, Công chức)."
  },
  {
    "id": 70,
    "question": "Ông A xây dựng nhà ở mà không có giấy phép nên thanh tra xây dựng đã lập biên bản, đình chỉ hành vi vi phạm của ông A. Quan hệ giữa ông A và thanh tra xây dựng thuộc đối tượng điều chỉnh của ngành luật nào sau đây:",
    "options": [
      "Ngành luật dân sự",
      "Ngành luật hình sự",
      "Ngành luật xây dựng",
      "Ngành luật hành chính"
    ],
    "answer": 3,
    "explanation": "Quan hệ giữa cơ quan quản lý nhà nước (Thanh tra) và đối tượng quản lý (Ông A) là quan hệ quản lý hành chính, do Luật Hành chính điều chỉnh."
  },
  {
    "id": 71,
    "question": "Theo quy định của Luật Hôn nhân và gia đình hiện hành thì những trường hợp nào sau đây **không** bị cấm kết hôn?",
    "options": [
      "Có quan hệ trong phạm vi ba đời, có cùng dòng máu về trực hệ",
      "Kết hôn với người bị nhiễm HIV/AIDS",
      "Người mất năng lực hành vi dân sự",
      "Giữa cha nuôi và con nuôi"
    ],
    "answer": 1,
    "explanation": "Pháp luật hiện hành không cấm kết hôn với người bị nhiễm HIV/AIDS. Các trường hợp còn lại đều bị cấm theo Khoản 2 Điều 5 Luật Hôn nhân và Gia đình 2014."
  },
  {
    "id": 1,
    "question": "Theo quan điểm của chủ nghĩa Mác-Lênin thì nguyên nhân chủ yếu làm xuất hiện Nhà nước là:",
    "options": [
      "Do có sự phân hóa lao động trong xã hội.",
      "Do có sự phân hóa giai cấp và đấu tranh giai cấp trong xã hội.",
      "Do nhu cầu về lương thực, con người phải hợp sức lại để phát triển sản xuất.",
      "Do yêu cầu về bảo đảm an ninh, con người cần nhà nước để tồn tại."
    ],
    "answer": 1,
    "explanation": "Theo chủ nghĩa Mác-Lênin, Nhà nước chỉ xuất hiện khi xã hội đã trải qua sự phân hóa giai cấp và mâu thuẫn giai cấp không thể hòa giải được."
  },
  {
    "id": 2,
    "question": "Tổ chức Thị tộc trong xã hội Cộng sản nguyên thủy là:",
    "options": [
      "Một gia đình gồm nhiều thành viên làm riêng ăn riêng",
      "Một nhóm người gồm nhiều gia đình có cùng quan hệ huyết thống, sống quây quần làm chung ăn chung.",
      "Một nhóm người gồm nhiều gia đình do cùng một bố mẹ đẻ ra, nhưng làm riêng ăn riêng.",
      "Một cộng đồng gồm nhiều gia đình, nhưng có sự phân chia tài sản"
    ],
    "answer": 1,
    "explanation": "Thị tộc là hình thức tổ chức xã hội đầu tiên, dựa trên quan hệ huyết thống, lao động và hưởng thụ chung."
  },
  {
    "id": 3,
    "question": "Trong các quan điểm phi Mác-xít về nguồn gốc nhà nước thì quan điểm nào được coi là tiến bộ nhất:",
    "options": [
      "Quan điểm của những nhà nghiên cứu theo thuyết thần học",
      "Quan điểm của những nhà nghiên cứu theo thuyết gia trưởng",
      "Quan điểm của những nhà nghiên cứu theo thuyết khế ước xã hội",
      "Quan điểm của những nhà nghiên cứu theo thuyết bạo lực"
    ],
    "answer": 2,
    "explanation": "Thuyết khế ước xã hội (của Locke, Rousseau...) cho rằng nhà nước là sản phẩm của sự thỏa thuận giữa con người, được xem là quan điểm có yếu tố dân chủ và tiến bộ nhất trong các học thuyết phi Mác-xít."
  },
  {
    "id": 4,
    "question": "Bản chất xã hội của nhà nước được thể hiện:",
    "options": [
      "Nhà nước là công cụ sắc bén để duy trì sự thống trị giai cấp",
      "Nhà nước là một bộ máy trấn áp đặc biệt của giai cấp này đối với giai cấp khác",
      "Nhà nước bảo đảm trật tự an toàn xã hội và giải quyết công việc chung của xã hội",
      "Do thượng đế tạo ra"
    ],
    "answer": 2,
    "explanation": "Bản chất xã hội thể hiện qua chức năng quản lý, tổ chức các công việc chung, đảm bảo trật tự và lợi ích chung của xã hội."
  },
  {
    "id": 5,
    "question": "Đẩy mạnh cải cách thủ tục hành chính, tăng cường hiệu quả hoạt động của bộ máy nhà nước, đặc biệt trong giai đoạn hiện nay là nội dung thuộc về:",
    "options": [
      "Chức năng đối nội của nhà nước",
      "Quyền hạn của nhà nước",
      "Chức năng đối ngoại",
      "Nhiệm vụ của nhà nước"
    ],
    "answer": 0,
    "explanation": "Cải cách hành chính là hoạt động quản lý bên trong (đối nội) của Nhà nước."
  },
  {
    "id": 6,
    "question": "Lịch sử xã hội loài người đã tồn tại .... kiểu nhà nước, bao gồm các kiểu nhà nước là:",
    "options": [
      "4 – Chiếm hữu nô lệ - Phong kiến - Tư hữu - Tư bản",
      "4 – Chủ nô - Chiếm hữu nô lệ - Tư bản - Xã hội chủ nghĩa",
      "4 – Địa chủ - Nông nô, Phong kiến - Tư bản - Xã hội chủ nghĩa",
      "4 – Chiếm hữu nô lệ - Phong kiến - Tư sản - Xã hội chủ nghĩa"
    ],
    "answer": 3,
    "explanation": "Theo chủ nghĩa Mác-Lênin, lịch sử xã hội loài người đã tồn tại 4 kiểu nhà nước: Chiếm hữu nô lệ, Phong kiến, Tư sản và Xã hội chủ nghĩa."
  },
  {
    "id": 7,
    "question": "Chức năng nào dưới đây không phải là chức năng của Quốc hội?",
    "options": [
      "Chức năng lập pháp",
      "Chức năng giám sát tối cao",
      "Chức năng quyết định các vấn đề quan trọng của đất nước",
      "Chức năng công tố"
    ],
    "answer": 3,
    "explanation": "Chức năng công tố (buộc tội) là chức năng của Viện kiểm sát nhân dân."
  },
  {
    "id": 8,
    "question": "Quyền lực công cộng đặc biệt của nhà nước được hiểu là:",
    "options": [
      "Chỉ sử dụng biện pháp cưỡng chế",
      "Chỉ sử dụng biện pháp thuyết phục, giáo dục",
      "Chỉ sử dụng quyền lực kinh tế",
      "Sử dụng sức mạnh cưỡng chế; biện pháp thuyết phục, giáo dục và sử dụng quyền lực kinh tế"
    ],
    "answer": 3,
    "explanation": "Quyền lực nhà nước thể hiện thông qua sức mạnh cưỡng chế kết hợp với các biện pháp giáo dục, thuyết phục và điều tiết kinh tế."
  },
  {
    "id": 9,
    "question": "Theo quan điểm của chủ nghĩa Mác-Lênin thì nguyên nhân pháp luật ra đời là:",
    "options": [
      "Do có sự chia rẽ trong xã hội",
      "Do có sự phân hóa giai cấp và đấu tranh giai cấp trong xã hội.",
      "Do các thành viên trong xã hội ban hành.",
      "Do thượng đế tạo ra"
    ],
    "answer": 1,
    "explanation": "Pháp luật ra đời là sản phẩm của xã hội có giai cấp, nhằm bảo vệ lợi ích của giai cấp thống trị."
  },
  {
    "id": 10,
    "question": "Pháp luật chưa tồn tại trong xã hội nào?",
    "options": [
      "Xã hội phong kiến",
      "Xã hội Cộng sản nguyên thủy",
      "Xã hội Tư bản chủ nghĩa",
      "Xã hội Chiếm hữu nô lệ"
    ],
    "answer": 1,
    "explanation": "Trong xã hội Cộng sản nguyên thủy (xã hội không có giai cấp), pháp luật chưa xuất hiện."
  },
  {
    "id": 11,
    "question": "Nhận định nào sau đây là ĐÚNG khi bàn về bản chất của pháp luật?",
    "options": [
      "Pháp luật mang bản chất giai cấp và bản chất xã hội",
      "Pháp luật luôn chỉ phản ánh ý chí của giai cấp thống trị",
      "Trong mọi chế độ xã hội, pháp luật là công cụ bảo vệ lợi ích của nhân dân",
      "Bản chất giai cấp của pháp luật quan trọng hơn bản chất xã hội"
    ],
    "answer": 0,
    "explanation": "Pháp luật có hai bản chất thống nhất: Bản chất giai cấp và Bản chất xã hội."
  },
  {
    "id": 12,
    "question": "Đề cập về mối quan hệ giữa pháp luật và nhà nước, khẳng định nào sau đây là SAI?",
    "options": [
      "Pháp luật và nhà nước có chung điều kiện ra đời, tồn tại, thay đổi và tiêu vong",
      "Nhà nước và pháp luật có mối quan hệ tác động qua lại lẫn nhau theo hướng tích cực hoặc tiêu cực",
      "Pháp luật đứng trên nhà nước vì nó là cơ sở pháp lý thừa nhận sự tồn tại của nhà nước",
      "Tương ứng với mỗi kiểu nhà nước thì có một kiểu pháp luật"
    ],
    "    answer": 2,
    "explanation": "Pháp luật và Nhà nước luôn tồn tại song song và không có cái nào đứng trên cái nào."
  },
  {
    "id": 13,
    "question": "Pháp luật quy định đẳng cấp trong xã hội và đặc quyền, đặc lợi của địa chủ, phong kiến, đây là đặc trưng của kiểu pháp luật nào?",
    "options": [
      "Pháp luật chủ nô",
      "Pháp luật phong kiến",
      "Pháp luật tư sản",
      "Pháp luật xã hội chủ nghĩa"
    ],
    "answer": 1,
    "explanation": "Pháp luật phong kiến đặc trưng bởi sự phân biệt đẳng cấp và đặc quyền cho giai cấp thống trị (địa chủ, phong kiến)."
  },
  {
    "id": 14,
    "question": "Kiểu pháp luật và hình thức pháp luật là hai khái niệm:",
    "options": [
      "Giống nhau",
      "Khác nhau",
      "Đối lập nhau",
      "Tương tự nhau"
    ],
    "answer": 1,
    "explanation": "Kiểu pháp luật chỉ bản chất giai cấp (bên trong), còn Hình thức pháp luật chỉ cách thức thể hiện ra bên ngoài (văn bản)."
  },
  {
    "id": 15,
    "question": "Hiện nay Nhà nước CHXHCN Việt Nam chủ yếu áp dụng hình thức pháp luật nào?",
    "options": [
      "Tập quán pháp",
      "Án lệ",
      "Văn bản quy phạm pháp luật",
      "Tiền lệ pháp"
    ],
    "answer": 2,
    "explanation": "Hệ thống pháp luật Việt Nam thuộc hệ thống Civil Law, hình thức pháp luật chủ yếu là Văn bản quy phạm pháp luật."
  },
  {
    "id": 16,
    "question": "Kiểu pháp luật ........ thể hiện rõ sự bất bình đẳng giữa hai cấp đối kháng trong xã hội, công khai thừa nhận nô lệ không phải là công dân, họ là tài sản của.........",
    "options": [
      "Phong kiến - Giai cấp địa chủ",
      "Tư sản - Giai cấp thống trị",
      "Chủ nô - Giai cấp phong kiến",
      "Chủ nô - Giai cấp chủ nô"
    ],
    "answer": 3,
    "explanation": "Kiểu pháp luật Chủ nô là kiểu pháp luật công khai nhất thể hiện sự bất bình đẳng, thừa nhận nô lệ là tài sản của Giai cấp chủ nô."
  },
  {
    "id": 17,
    "question": "Nhận định nào sau đây là SAI khi đề cập về tập quán pháp?",
    "options": [
      "Tập quán pháp là hình thức nhà nước thừa nhận một số tập quán lưu truyền trong xã hội và quy định thành cách xử sự chung, được nhà nước bảo đảm thực hiện",
      "Hình thức pháp luật xuất hiện sớm nhất là tập quán pháp",
      "Hiện nay hình thức tập quán pháp được sử dụng hạn chế tại một số nước",
      "Các tập quán đều trở thành pháp luật"
    ],
    "answer": 3,
    "explanation": "Chỉ những tập quán được Nhà nước thừa nhận mới trở thành Tập quán pháp."
  },
  {
    "id": 18,
    "question": "Chức năng nào không phải là chức năng của pháp luật?",
    "options": [
      "Chức năng điều chỉnh các quan hệ xã hội",
      "Chức năng xây dựng và bảo vệ tổ quốc",
      "Chức năng bảo vệ các quan hệ xã hội",
      "Chức năng giáo dục"
    ],
    "answer": 1,
    "explanation": "Chức năng Xây dựng và Bảo vệ Tổ quốc là chức năng của Nhà nước."
  },
  {
    "id": 19,
    "question": "Tính xác định chặt chẽ về mặt hình thức là thuộc tính (đặc trưng) của:",
    "options": [
      "Quy phạm đạo đức",
      "Quy phạm tập quán",
      "Quy phạm pháp luật",
      "Quy phạm tôn giáo"
    ],
    "answer": 2,
    "explanation": "Quy phạm pháp luật được ban hành bằng văn bản theo trình tự, thủ tục nghiêm ngặt, có ngôn ngữ, cấu trúc rõ ràng, thể hiện tính hình thức chặt chẽ."
  },
  {
    "id": 20,
    "question": "Chức năng nào không phải là chức năng của pháp luật?",
    "options": [
      "Chức năng điều chỉnh các quan hệ xã hội",
      "Chức năng lập hiến và lập pháp",
      "Chức năng bảo vệ các quan hệ xã hội",
      "Chức năng giáo dục"
    ],
    "answer": 1,
    "explanation": "Chức năng Lập hiến và Lập pháp là chức năng của Nhà nước (Quốc hội)."
  },
  {
    "id": 21,
    "question": "Bộ phận nào sau đây không thể thiếu trong một quy phạm pháp luật?",
    "options": [
      "Bộ phận giả định và bộ phận chế tài",
      "Bộ phận giả định",
      "Bộ phận quy định",
      "Bộ phận chế tài"
    ],
    "answer": 2,
    "explanation": "Bộ phận Quy định (nêu quy tắc xử sự) là yếu tố cốt lõi, không thể thiếu trong mọi quy phạm pháp luật."
  },
  {
    "id": 22,
    "question": "Trong một quy phạm pháp luật bộ phận quan trọng nhất là:",
    "options": [
      "Bộ phận quy định và bộ phận chế tài",
      "Bộ phận giả định",
      "Bộ phận quy định",
      "Bộ phận chế tài"
    ],
    "answer": 2,
    "explanation": "Bộ phận Quy định nêu quy tắc xử sự, là yếu tố quan trọng nhất của quy phạm pháp luật."
  },
  {
    "id": 23,
    "question": "Văn bản quy phạm pháp luật là văn bản do:",
    "options": [
      "Quốc hội ban hành",
      "Chủ tịch nước ban hành",
      "Chính phủ ban hành",
      "Cơ quan nhà nước có thẩm quyền ban hành"
    ],
    "answer": 3,
    "explanation": "Văn bản quy phạm pháp luật được ban hành bởi các cơ quan nhà nước có thẩm quyền (Quốc hội, Chính phủ, Bộ trưởng, UBND...)."
  },
  {
    "id": 24,
    "question": "Bộ trưởng có quyền ban hành:",
    "options": [
      "Quyết định; Nghị quyết",
      "Quyết định; Lệnh",
      "Quyết định; Thông tư",
      "Thông tư"
    ],
    "answer": 2,
    "explanation": "Bộ trưởng ban hành Thông tư và Quyết định (để quy định biện pháp thi hành văn bản QPPL cấp trên)."
  },
  {
    "id": 25,
    "question": "Văn bản quy phạm pháp luật do Hội đồng nhân dân ban hành:",
    "options": [
      "Quyết định; Nghị quyết",
      "Quyết định; Chỉ thị",
      "Nghị quyết",
      "Quyết định; Thông tư"
    ],
    "answer": 2,
    "explanation": "Hội đồng nhân dân ban hành Nghị quyết (Điều 4 Luật Ban hành VBQPPL 2015)."
  },
  {
    "id": 26,
    "question": "Văn bản Luật là văn bản do cơ quan nào ban hành?",
    "options": [
      "Ủy ban thường vụ Quốc hội",
      "Quốc hội",
      "Chính phủ",
      "Tòa án nhân dân tối cao"
    ],
    "answer": 1,
    "explanation": "Văn bản Luật do Quốc hội ban hành (Điều 4 Luật Ban hành VBQPPL 2015)."
  },
  {
    "id": 27,
    "question": "Trong quá trình hoạt động công vụ, Ủy ban nhân dân Quận Gò Vấp có quyền ban hành loại văn bản nào sau đây?",
    "options": [
      "Nghị quyết",
      "Quyết định",
      "Thông tư",
      "Không có quyền ban hành các loại văn bản trên"
    ],
    "answer": 1,
    "explanation": "Ủy ban nhân dân các cấp (bao gồm cấp quận/huyện) ban hành Quyết định (Điều 4 Luật Ban hành VBQPPL 2015)."
  },
  {
    "id": 28,
    "question": "Văn bản nào sau đây thuộc thẩm quyền ban hành của Chủ tịch nước?",
    "options": [
      "Quyết định",
      "Nghị quyết",
      "Thông tư",
      "Nghị định"
    ],
    "answer": 0,
    "explanation": "Chủ tịch nước ban hành Lệnh và Quyết định (Điều 4 Luật Ban hành VBQPPL 2015)."
  },
  {
    "id": 29,
    "question": "Đáp án nào sau đây **không** phải là văn bản quy phạm pháp luật?",
    "options": [
      "Quyết định của Thủ tướng chính phủ",
      "Thông tư của Bộ trưởng Bộ Tài chính",
      "Điều lệ Hội cựu chiến binh",
      "Nghị quyết Ủy ban thường vụ quốc hội"
    ],
    "answer": 2,
    "explanation": "Điều lệ Hội cựu chiến binh là văn bản nội bộ của một tổ chức xã hội, không phải là văn bản quy phạm pháp luật."
  },
  {
    "id": "M24",
    "question": "Nguyên tắc giao kết hợp đồng dân sự là:",
    "options": [
      "Không vi phạm phong tục tập quán tốt đẹp của dân tộc",
      "Tự nguyện, bình đẳng và Tự do giao kết hợp đồng nhưng không trái pháp luật, đạo đức xã hội",
      "Tự do giao kết hợp đồng nhưng không trái pháp luật, đạo đức xã hội",
      "Tự nguyện, bình đẳng"
    ],
    "answer": 1,
    "explanation": "Nguyên tắc cơ bản nhất là Tự do, tự nguyện, bình đẳng, thiện chí, hợp tác, trung thực và **không vi phạm điều cấm của luật, không trái đạo đức xã hội** (Điều 3, Điều 116 Bộ luật Dân sự 2015)."
  },
  {
    "id": "M25",
    "question": "Văn bản quy phạm pháp luật nào quy định về quyền và nghĩa vụ cơ bản của công dân?",
    "options": [
      "Luật Dân sự",
      "Luật Hành chính",
      "Luật Lao động",
      "Luật Hiến pháp"
    ],
    "answer": 3,
    "explanation": "**Hiến pháp** (hay Luật Hiến pháp) là luật cơ bản quy định các quyền và nghĩa vụ cơ bản của công dân."
  },
  {
    "id": "M26",
    "question": "Tìm phương án ĐÚNG trong các nhận định sau khi nghiên cứu về pháp luật dân sự:",
    "options": [
      "Mọi hợp đồng dân sự đều phải được lập thành văn bản",
      "Mọi hợp đồng dân sự đều phải được lập thành văn bản có công chứng, chứng thực",
      "Mọi hợp đồng dân sự bằng lời nói đều có hiệu lực",
      "Hợp đồng chuyển nhượng quyền sử dụng đất phải được công chứng"
    ],
    "answer": 3,
    "explanation": "**Hợp đồng chuyển nhượng quyền sử dụng đất** phải được lập thành văn bản, công chứng hoặc chứng thực (trừ một số trường hợp), là yêu cầu về hình thức bắt buộc theo quy định của Luật Đất đai và Bộ luật Dân sự."
  },
  {
    "id": "M27",
    "question": "Thời giờ làm việc theo qui định của Bộ luật Lao động là:",
    "options": [
      "Không quá 12 giờ trong một ngày",
      "Không quá 8 giờ trong một ngày và 48 giờ trong một tuần",
      "Từ 8 đến 10 giờ trong một ngày",
      "Tùy thỏa thuận giữa người lao động và người sử dụng lao động"
    ],
    "answer": 1,
    "explanation": "Thời giờ làm việc bình thường **không quá 08 giờ trong 01 ngày và không quá 48 giờ trong 01 tuần** (Điều 105 BLLĐ 2019)."
  },
  {
    "id": "M28",
    "question": "Năng lực hành vi của cá nhân xuất hiện khi nào?",
    "options": [
      "Khi cá nhân được sinh ra",
      "Cá nhân đủ 16 tuổi, có nhận thức bình thường",
      "Cá nhân đã đến độ tuổi nhất định và có khả năng nhận thức",
      "Cá nhân đủ 18 tuổi, không mắc bệnh tâm thần"
    ],
    "answer": 2,
    "explanation": "**Năng lực hành vi** được xác định dựa trên hai yếu tố: **độ tuổi** (tiền đề vật chất) và **khả năng nhận thức/làm chủ hành vi** (tiền đề tinh thần)."
  },
  {
    "id": "M29",
    "question": "Hoạt động áp dụng pháp luật được tiến hành bởi:",
    "options": [
      "Các tổ chức tôn giáo",
      "Công dân, người nước ngoài",
      "Tất cả các chủ thể",
      "Các cơ quan nhà nước có thẩm quyền"
    ],
    "answer": 3,
    "explanation": "**Áp dụng pháp luật** là hoạt động mang tính quyền lực nhà nước, chỉ do **các cơ quan nhà nước hoặc cá nhân có thẩm quyền** thực hiện."
  },
  {
    "id": "M30",
    "question": "Khi nghiên cứu về nguồn gốc Nhà nước, khẳng định nào sau đây là SAI?",
    "options": [
      "Nhà nước ra đời, tồn tại cùng với lịch sử xã hội loài người",
      "Nhà nước ra đời trong điều kiện xã hội có giai cấp và đấu tranh giai cấp",
      "Nhà nước chưa xuất hiện trong chế độ cộng sản nguyên thủy",
      "Nhà nước là hiện tượng xã hội mang tính lịch sử"
    ],
    "answer": 0,
    "explanation": "Khẳng định **'Nhà nước ra đời, tồn tại cùng với lịch sử xã hội loài người'** là SAI. Theo học thuyết Mác-Lênin, Nhà nước ra đời muộn hơn nhiều so với lịch sử xã hội loài người (chỉ xuất hiện khi có giai cấp và đấu tranh giai cấp)."
  },
  {
    "id": "M31",
    "question": "Sự kiện pháp lý là những sự kiện xảy ra:",
    "options": [
      "Từ thực tiễn đời sống xã hội",
      "Từ hành vi xử sự của con người",
      "Trong thực tiễn đời sống mà sự xuất hiện hay mất đi của nó được pháp luật gắn với việc hình thành, thay đổi hay chấm dứt quan hệ pháp luật",
      "Không phụ thuộc vào ý chí của con người"
    ],
    "answer": 2,
    "explanation": "**Sự kiện pháp lý** là sự kiện thực tế mà pháp luật gắn liền với việc làm phát sinh, thay đổi hoặc chấm dứt quan hệ pháp luật. Nó bao gồm cả hành vi (theo ý chí) và sự biến (không theo ý chí)."
  },
  {
    "id": "M32",
    "question": "Nguyễn Văn A khiếu nại quyết định kỷ luật của cấp trên đối với mình (khiếu nại lần đầu). Khách thể của khiếu nại trong quan hệ pháp luật nêu trên là:",
    "options": [
      "Cán bộ của nhà nước",
      "Người đã ra quyết định kỷ luật",
      "Công chức của nhà nước",
      "Quyết định kỷ luật"
    ],
    "answer": 3,
    "explanation": "Khách thể của quan hệ pháp luật là đối tượng (lợi ích vật chất, tinh thần, hoặc hành vi) mà các bên hướng tới. Trong khiếu nại, đối tượng là **Quyết định kỷ luật**."
  },
  {
    "id": "M33",
    "question": "Sắp xếp theo thứ tự tăng dần về tính nghiêm khắc của hình phạt, thứ tự nào sau đây là đúng?",
    "options": [
      "Trục xuất, phạt tiền, cảnh cáo, tù có thời hạn, cải tạo không giam giữ, tù chung thân, tử hình",
      "Cảnh cáo, phạt tiền, cải tạo không giam giữ, trục xuất, tù có thời hạn, tù chung thân, tử hình",
      "Phạt tiền, cảnh cáo, cải tạo không giam giữ, tù có thời hạn, tù chung thân, tử hình",
      "Cải tạo không giam giữ, phạt tiền, trục xuất, tù có thời hạn, tù chung thân, tử hình"
    ],
    "answer": 1,
    "explanation": "Theo Điều 32 Bộ luật Hình sự 2015, hệ thống hình phạt chính tăng dần về tính nghiêm khắc là: **Cảnh cáo, Phạt tiền, Cải tạo không giam giữ, Trục xuất, Tù có thời hạn, Tù chung thân, Tử hình**."
  },
  {
    "id": "M34",
    "question": "Giả định nêu lên nhiều điều kiện, hoàn cảnh và giữa chúng có mối liên hệ với nhau, gọi là:",
    "options": [
      "Giả định đơn giản",
      "Giả thuyết phức tạp",
      "Giả định phức tạp",
      "Giả định phù hợp"
    ],
    "answer": 2,
    "explanation": "**Giả định phức tạp** là bộ phận giả định nêu ra nhiều điều kiện, hoàn cảnh cùng một lúc hoặc có mối liên hệ với nhau."
  },
  {
    "id": "M35",
    "question": "Hợp đồng lao động được giao kết dựa trên nguyên tắc:",
    "options": [
      "Người lao động tuân thủ đúng yêu cầu của người sử dụng lao động",
      "Người lao động và người sử dụng lao động hoàn toàn bình đẳng trước pháp luật",
      "Tự nguyện, bình đẳng, thiện chí, hợp tác và trung thực. Không được trái pháp luật, thỏa ước lao động tập thể và đạo đức xã hội",
      "Tôn trọng ý chí tự thỏa thuận giữa người lao động và người sử dụng lao động"
    ],
    "answer": 2,
    "explanation": "Nguyên tắc giao kết Hợp đồng lao động đầy đủ nhất là **Tự nguyện, bình đẳng, thiện chí, hợp tác và trung thực**. Không được trái pháp luật, thỏa ước lao động tập thể và đạo đức xã hội (Điều 15 BLLĐ 2019)."
  },
  {
    "id": "M36",
    "question": "Ông A và Ông B ký kết hợp đồng mua bán hàng hoá với nhau. Ông A vi phạm hợp đồng nên ông B đã khởi kiện ra toà án để yêu cầu toà án bảo vệ quyền lợi cho mình. Toà án đã xét xử vụ kiện và phán quyết ông A phải bồi thường thiệt hại cho ông B số tiền là 100 triệu đồng. Anh(chị) hãy xác định biện pháp bồi thường thiệt hại nêu trên là loại chế tài pháp luật nào dưới đây?",
    "options": [
      "Chế tài dân sự",
      "Chế tài hình sự",
      "Chế tài kỷ luật",
      "Chế tài hành chính"
    ],
    "answer": 0,
    "explanation": "Vi phạm hợp đồng mua bán hàng hóa là quan hệ dân sự, và bồi thường thiệt hại là hình thức của trách nhiệm dân sự/ **chế tài dân sự**."
  },
  {
    "id": "M37",
    "question": "Pháp luật là sản phẩm của ai?",
    "options": [
      "Đạo đức",
      "Đảng phái chính trị",
      "Nhà nước",
      "Tôn giáo"
    ],
    "answer": 2,
    "explanation": "**Pháp luật** là công cụ quản lý do **Nhà nước** ban hành, đảm bảo thực hiện và bảo vệ."
  },
  {
    "id": "M38",
    "question": "Trong xã hội có giai cấp, quy phạm nào sau đây có vai trò quan trọng nhất đối với việc duy trì trật tự xã hội?",
    "options": [
      "Quy phạm đạo đức",
      "Quy phạm tập quán",
      "Quy phạm tôn giáo",
      "Quy phạm pháp luật"
    ],
    "answer": 3,
    "explanation": "**Quy phạm pháp luật** được Nhà nước bảo đảm thực hiện bằng **quyền lực cưỡng chế**, do đó có vai trò quan trọng nhất trong việc duy trì trật tự xã hội so với các loại quy phạm xã hội khác."
  },
  {
    "id": "M39",
    "question": "Khả năng chủ thể có quyền hoặc có nghĩa vụ pháp lý do nhà nước quy định, gọi là:",
    "options": [
      "Năng lực hành vi",
      "Năng lực trách nhiệm pháp lý",
      "Năng lực pháp luật",
      "Khả năng pháp lý"
    ],
    "answer": 2,
    "explanation": "**Năng lực pháp luật** là khả năng chủ thể có quyền và nghĩa vụ pháp lý do Nhà nước quy định (từ khi sinh ra và kết thúc khi chết). Năng lực hành vi là khả năng tự mình thực hiện quyền và nghĩa vụ đó."
  },
  {
    "id": "M40",
    "question": "Ông A xây dựng nhà ở mà không có giấy phép nên thanh tra xây dựng đã lập biên bản, đình chỉ hành vi vi phạm của ông A. Quan hệ giữa ông A và thanh tra xây dựng là:",
    "options": [
      "Quan hệ pháp luật hình sự",
      "Quan hệ pháp luật dân sự",
      "Quan hệ pháp luật trong nội bộ cơ quan thanh tra",
      "Quan hệ pháp luật hành chính"
    ],
    "answer": 3,
    "explanation": "Quan hệ giữa cơ quan quản lý nhà nước (**Thanh tra xây dựng**) và đối tượng bị quản lý (**Ông A**) là quan hệ quản lý hành chính nhà nước, thuộc đối tượng điều chỉnh của **Luật Hành chính**."
  },
  {
    "id": "R6",
    "question": "UBND tỉnh X ra văn bản tạm dừng giải quyết đăng ký thường trú vào khu vực nội thành đối với người dân ở các địa phương khác. UBND tỉnh X đã vi phạm quyền gì của công dân?",
    "options": [
      "Quyền thay đổi hộ tịch",
      "Quyền tự do đi lại",
      "Quyền tự do lựa chọn chỗ ở",
      "Quyền cư trú"
    ],
    "answer": 3,
    "explanation": "Quyền cư trú bao gồm quyền tự do đi lại và quyền tự do lựa chọn chỗ ở, đăng ký thường trú/tạm trú. Việc tạm dừng đăng ký thường trú vào nội thành là vi phạm **quyền cư trú** của công dân (Điều 23 Hiến pháp 2013)."
  },
  {
    "id": "R7",
    "question": "Trong các quan hệ pháp luật sau đây, quan hệ nào là quan hệ pháp luật dân sự?",
    "options": [
      "Quan hệ về bồi thường thiệt hại do nguồn nguy hiểm cao độ gây ra",
      "Quan hệ về xử phạt vi phạm xây dựng trái phép",
      "Quan hệ về kỷ luật cán bộ, công chức nhà nước",
      "Quan hệ về cấp giấy đăng ký kết hôn"
    ],
    "answer": 0,
    "explanation": "Bồi thường thiệt hại ngoài hợp đồng (bao gồm thiệt hại do nguồn nguy hiểm cao độ) là quan hệ tài sản được điều chỉnh bởi **Luật Dân sự** (Điều 584, 601 Bộ luật Dân sự 2015)."
  },
  {
    "id": "R8",
    "question": "Khi tìm hiểu về quyền và nghĩa vụ tài sản của vợ chồng thì khẳng định nào sau đây là ĐÚNG?",
    "options": [
      "Khi ly hôn thì toàn bộ tài sản của vợ, chồng phải chia đôi",
      "Vợ, chồng có quyền ủy quyền cho nhau trong mọi vấn đề",
      "Vợ, chồng có trách nhiệm ngang nhau đối với tài sản chung và tài sản riêng của vợ, chồng",
      "Vợ, chồng có quyền có tài sản riêng"
    ],
    "answer": 3,
    "explanation": "Khẳng định đúng là **Vợ, chồng có quyền có tài sản riêng**. Tài sản riêng bao gồm tài sản có trước hôn nhân, tài sản được thừa kế/tặng cho riêng, v.v. (Điều 43 Luật Hôn nhân và Gia đình 2014)."
  },
  {
    "id": "R9",
    "question": "Nhận định nào sau đây là ĐÚNG về nghiên cứu về vi phạm pháp luật?",
    "options": [
      "Mọi hành vi trái pháp luật đều vi phạm pháp luật",
      "Mọi hành vi vi phạm pháp luật đều phải chịu trách nhiệm pháp lý",
      "Mọi hành vi trái pháp luật đều phải chịu trách nhiệm pháp lý",
      "Mọi hành vi vi phạm pháp luật đều trái pháp luật"
    ],
    "answer": 3,
    "explanation": "Vi phạm pháp luật là hành vi trái pháp luật, có lỗi và do chủ thể có năng lực trách nhiệm thực hiện. Do đó, mọi hành vi **vi phạm pháp luật** phải có yếu tố **trái pháp luật**."
  },
  {
    "id": "R10",
    "question": "Trong một quốc gia, tổ chức duy nhất được quyền phát hành tiền là:",
    "options": [
      "Quốc hội",
      "Chính phủ",
      "Nhà nước",
      "Các tổ chức chính trị - xã hội"
    ],
    "answer": 2,
    "explanation": "Phát hành tiền là một chức năng thể hiện chủ quyền quốc gia, thuộc về **Nhà nước**. Ở Việt Nam, Ngân hàng Nhà nước thực hiện chức năng này theo ủy quyền của Nhà nước."
  },
  {
    "id": "R11",
    "question": "Ưu thế vượt trội của pháp luật so với các quy phạm xã hội khác là:",
    "options": [
      "Tồn tại trong thời gian dài",
      "Tính xã hội",
      "Tính rộng rãi",
      "Tính cưỡng chế"
    ],
    "answer": 3,
    "explanation": "**Tính cưỡng chế** (được Nhà nước bảo đảm thực hiện bằng sức mạnh cưỡng chế) là đặc trưng cơ bản và **ưu thế vượt trội** của pháp luật so với các quy phạm đạo đức, tập quán, tôn giáo."
  },
  {
    "id": "R12",
    "question": "Trên đường đi học, A nhặt được một túi xách bên vỉa hè, trong đó có 35 triệu đồng nhưng không có giấy tờ tùy thân của chủ sở hữu túi xách. Hỏi: Theo quy định của pháp luật A phải làm gì trong tình huống trên?",
    "options": [
      "A không được nhặt túi xách mà phải đi báo cho Ủy ban nhân dân hoặc công an cấp xã nơi gần nhất đến nhặt túi xách",
      "A phải giao nộp túi xách cho Ủy ban nhân dân hoặc công an cấp xã nơi gần nhất",
      "A có quyền giữ túi xách mà không phải trả lại cho người đánh rơi",
      "A được giữ lại 50% số tiền có trong túi xách, phần còn lại giao nộp cho Ủy ban nhân dân hoặc công an cấp xã nơi gần nhất"
    ],
    "answer": 1,
    "explanation": "Người nhặt được tài sản do người khác đánh rơi (tài sản không xác định được chủ sở hữu) phải **giao nộp cho cơ quan công an hoặc Ủy ban nhân dân cấp xã nơi gần nhất** (Điều 230 Bộ luật Dân sự 2015)."
  },
  {
    "id": "R13",
    "question": "Trong các loại chế tài sau đây thì loại nào không phải là hình phạt?",
    "options": [
      "Tù có thời hạn",
      "Tù chung thân, tử hình",
      "Cải tạo không giam giữ",
      "Án treo"
    ],
    "answer": 3,
    "explanation": "**Án treo** không phải là hình phạt. Nó là **biện pháp miễn chấp hành hình phạt tù có điều kiện**, còn các loại khác là hình phạt chính theo Bộ luật Hình sự 2015."
  },
  {
    "id": "R14",
    "question": "Hành vi trái pháp luật nào sau đây là dạng hành vi không hành động?",
    "options": [
      "Ép người khác kết hôn",
      "Không tố giác người phạm tội",
      "Tàng trữ vũ khí",
      "Môi giới mại dâm"
    ],
    "answer": 1,
    "explanation": "**Không hành động** là việc chủ thể có nghĩa vụ pháp lý phải làm nhưng đã không làm. **Không tố giác tội phạm** là hành vi không thực hiện nghĩa vụ tố giác theo quy định của pháp luật (hành vi không hành động). Các hành vi còn lại là hành động."
  },
  {
    "id": "R15",
    "question": "Nhận định nào sau đây ĐÚNG khi bàn về sự ra đời của pháp luật?",
    "options": [
      "Ý chí chủ quan của nhà nước được nâng thành pháp luật",
      "Pháp luật ra đời do nhu cầu khách quan của xã hội mà không cần đến vai trò của nhà nước",
      "Pháp luật là sản phẩm của xã hội có giai cấp và đấu tranh giai cấp",
      "Pháp luật là sự thỏa hiệp về ý chí của mọi người trong xã hội"
    ],
    "answer": 2,
    "explanation": "Theo quan điểm Mác-Lênin, pháp luật là sản phẩm của xã hội có **giai cấp và đấu tranh giai cấp**, là ý chí của giai cấp thống trị được đề lên thành luật."
  },
  {
    "id": "R16",
    "question": "Tòa án huyện A tuyên bố bị cáo B mức phạt 05 năm tù vì tội hiếp dâm, đây được coi là hình thức thực hiện pháp luật nào?",
    "options": [
      "Áp dụng pháp luật",
      "Tuân thủ pháp luật",
      "Thi hành pháp luật",
      "Sử dụng pháp luật"
    ],
    "answer": 0,
    "explanation": "Hoạt động xét xử, ra bản án của Tòa án là hoạt động mang tính quyền lực nhà nước, nhằm cá biệt hóa quy phạm pháp luật cho từng trường hợp cụ thể. Đây là hình thức **Áp dụng pháp luật**."
  },
  {
    "id": "R17",
    "question": "Nhà nước ban hành pháp luật để điều chỉnh các quan hệ xã hội:",
    "options": [
      "Chủ yếu, quan trọng",
      "Phổ biến, điển hình",
      "Điển hình, quan trọng",
      "Tất cả các quan hệ xã hội"
    ],
    "answer": 1,
    "explanation": "Nhà nước chỉ điều chỉnh những quan hệ xã hội **phổ biến, điển hình** và quan trọng, để đảm bảo pháp luật có tính khái quát cao và có thể áp dụng rộng rãi."
  },
  {
    "id": "R18",
    "question": "Đáp án nào sau đây không phải là văn bản quy phạm pháp luật?",
    "options": [
      "Quyết định của Chủ tịch nước",
      "Nghị quyết của Hội đồng nhân dân",
      "Nghị quyết của Quốc hội",
      "Điều lệ Đoàn thanh niên Cộng sản Hồ Chí Minh"
    ],
    "answer": 3,
    "explanation": "**Điều lệ Đoàn thanh niên** là văn bản nội bộ của một tổ chức chính trị - xã hội, **không** phải là văn bản quy phạm pháp luật do cơ quan nhà nước có thẩm quyền ban hành."
  },
  {
    "id": "R19",
    "question": "Ông Thắng, bà Hân kết hôn hợp pháp năm 2013. Năm 2014 ông Thắng mua xe ô tô trị giá 1,7 tỷ. Năm 2016, ông Thắng và bà Hân thỏa thuận chia tài sản. Theo đó, chiếc ô tô nói trên do bà Hân làm chủ sở hữu. Từ năm 2017, bà Hân cho thuê chiếc xe ô tô này. Vậy số tiền phát sinh từ tài sản cho thuê được xác định thuộc về ai?",
    "options": [
      "Ông Thắng",
      "Ông Thắng và bà Hân",
      "Con của ông Thắng và bà Hân",
      "Bà Hân"
    ],
    "answer": 3,
    "explanation": "Sau khi thỏa thuận chia tài sản năm 2016, chiếc ô tô trở thành **tài sản riêng** của bà Hân. Lợi tức phát sinh từ tài sản riêng của vợ, chồng (tiền cho thuê xe) cũng là **tài sản riêng của người đó** (Bà Hân), trừ trường hợp vợ chồng có thỏa thuận khác (Điều 44 Luật Hôn nhân và Gia đình 2014)."
  },
  {
    "id": "R20",
    "question": "Ngày 01/7/2018, anh Đức kí hợp đồng lao động xác định thời hạn với công ty X có trụ sở tại quận Gò Vấp, thành phố Hồ Chí Minh. Mức lương anh Đức và công ty thỏa thuận là 7.000.000 đồng. Nếu công ty yêu cầu anh Đức thử việc thì theo quy định của pháp luật hiện hành, mức lương thử việc tối thiểu mà anh Đức nhận được là:",
    "options": [
      "5.950.000 đồng",
      "3.500.000 đồng",
      "4.900.000 đồng",
      "4.200.000 đồng"
    ],
    "answer": 0,
    "explanation": "Tiền lương của người lao động trong thời gian thử việc do hai bên thỏa thuận nhưng ít nhất phải bằng **85%** mức lương của công việc đó. Tính toán: $7.000.000 \text{ đồng} \times 85\% = \mathbf{5.950.000 \text{ đồng}}$ (Khoản 2 Điều 26 BLLĐ 2019)."
  },
  {
    "id": "R21",
    "question": "Quan hệ nào dưới đây là quan hệ pháp luật lao động?",
    "options": [
      "Công ty A ký hợp đồng xây dựng với cơ quan B",
      "Công ty V làm thủ tục thanh toán bằng phương thức L/C",
      "Cảnh sát giao thông ra quyết định xử phạt người vi phạm giao thông",
      "Công nhân nhà máy thép đình công vì công ty không trả lương"
    ],
    "answer": 3,
    "explanation": "**Đình công** (tranh chấp về quyền và lợi ích giữa tập thể người lao động và người sử dụng lao động) là một hình thức giải quyết tranh chấp lao động, thuộc đối tượng điều chỉnh của **Luật Lao động**."
  },
  {
    "id": "R22",
    "question": "Theo quy định Luật Bảo hiểm xã hội hiện hành, hàng tháng người lao động đóng vào quỹ bảo hiểm xã hội bắt buộc:",
    "options": [
      "7% mức tiền lương hàng tháng",
      "6% mức tiền lương hàng tháng",
      "5% mức tiền lương hàng tháng",
      "8% mức tiền lương hàng tháng"
    ],
    "answer": 3,
    "explanation": "Theo Luật Bảo hiểm xã hội hiện hành, người lao động đóng **8%** mức tiền lương tháng vào quỹ hưu trí và tử tuất (trong tổng số các loại BHXH, BHYT, BHTN)."
  },
  {
    "id": "R23",
    "question": "Giá trị pháp lý của “Hiến pháp” và “Bộ luật” được xác định như thế nào?",
    "options": [
      "Hiến pháp có hiệu lực pháp lý cao hơn Bộ luật",
      "Hiến pháp là văn bản luật; Bộ luật là văn bản dưới luật",
      "Bộ luật có hiệu lực pháp lý cao hơn hiến pháp",
      "Hai loại văn bản này đều có hiệu lực pháp lý ngang nhau"
    ],
    "answer": 0,
    "explanation": "**Hiến pháp** là luật cơ bản, có **hiệu lực pháp lý cao nhất** trong hệ thống pháp luật Việt Nam, cao hơn tất cả các Bộ luật và Luật khác."
  },
  {
    "id": "N1",
    "question": "Độ tuổi chịu trách nhiệm pháp lý hình sự đầy đủ theo quy định của Bộ luật Hình sự Việt Nam là bao nhiêu?",
    "options": [
      "Đủ 21 tuổi",
      "Đủ 16 tuổi",
      "Đủ 14 tuổi",
      "Đủ 18 tuổi"
    ],
    "answer": 1,
    "explanation": "Theo Điều 12 Bộ luật Hình sự 2015, người từ **đủ 16 tuổi trở lên** phải chịu trách nhiệm hình sự về mọi tội phạm (chịu trách nhiệm đầy đủ). Người từ đủ 14 đến dưới 16 tuổi chỉ chịu trách nhiệm về tội rất nghiêm trọng, đặc biệt nghiêm trọng."
  },
  {
    "id": "N2",
    "question": "Điền vào chỗ trống: “Có...... hình thức thực hiện pháp luật, bao gồm......”",
    "options": [
      "4 - Tuân theo pháp luật, thi hành pháp luật, sử dụng pháp luật, áp dụng pháp luật",
      "4 - Tuân thủ pháp luật, thực thi pháp luật, thi hành pháp luật, áp dụng pháp luật",
      "4 - Tuân thủ pháp luật, thi hành pháp luật, sử dụng pháp luật, áp dụng pháp luật",
      "4 - Tuân thủ pháp luật, thực thi pháp luật, sử dụng pháp luật, áp dụng pháp luật"
    ],
    "answer": 2,
    "explanation": "Có **4** hình thức thực hiện pháp luật cơ bản: **Tuân thủ pháp luật, Thi hành pháp luật, Sử dụng pháp luật** và **Áp dụng pháp luật**."
  },
  {
    "id": "N3",
    "question": "Quan hệ nào dưới đây là quan hệ dân sự?",
    "options": [
      "Chị N ký hợp đồng lao động với công ty B",
      "Anh A cho chị B vay 10 triệu đồng",
      "A tố cáo cán bộ X nhận hối lộ",
      "Anh B đang ở tù vượt ngục"
    ],
    "answer": 1,
    "explanation": "Quan hệ cho vay (**vay tài sản**) là quan hệ hợp đồng tài sản, thuộc phạm vi điều chỉnh của **Luật Dân sự**. Các quan hệ còn lại là Lao động, Tố tụng/Hình sự."
  },
  {
    "id": "N4",
    "question": "Giao dịch dân sự bị vô hiệu khi:",
    "options": [
      "Không được giao kết trên lãnh thổ Việt Nam",
      "Vi phạm điều cấm của pháp luật",
      "Được giao kết bằng lời nói",
      "Một bên đơn phương chấm dứt giao dịch"
    ],
    "answer": 1,
    "explanation": "Giao dịch dân sự vô hiệu khi **vi phạm điều cấm của luật** hoặc trái đạo đức xã hội (Điều 123 Bộ luật Dân sự 2015). Việc giao kết bằng lời nói hoặc ngoài lãnh thổ Việt Nam không mặc định làm giao dịch vô hiệu."
  },
  {
    "id": "N5",
    "question": "Loại hợp đồng lao động nào trong đó hai bên không xác định được thời hạn, thời điểm chấm dứt hiệu lực của hợp đồng:",
    "options": [
      "Hợp đồng lao động theo mùa vụ",
      "Hợp đồng lao động không xác định thời hạn",
      "Hợp đồng lao động có thời hạn dưới 12 tháng",
      "Hợp đồng lao động xác định thời hạn"
    ],
    "answer": 1,
    "explanation": "**Hợp đồng lao động không xác định thời hạn** là hợp đồng mà trong đó hai bên không xác định thời hạn, thời điểm chấm dứt hiệu lực của hợp đồng (Khoản 1 Điều 20 Bộ luật Lao động 2019)."
  }
];

const QuizScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    const shuffledQuestions = shuffleQuestions(questionsData);
    setQuestions(shuffledQuestions);
    if (shuffledQuestions.length > 0) {
      setShuffledAnswers(shuffleAnswers(shuffledQuestions[0]));
    }
  }, []);

  const shuffleQuestions = (questionsArray) => {
    const newArray = [...questionsArray];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerPress = (answer) => {
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
      setShuffledAnswers(shuffleAnswers(questions[nextIndex]));
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsAnswered(false);
    } else {
      navigation.navigate('Result', {
        correctAnswers,
        totalQuestions: questions.length,
      });
    }
  };

  const getAnswerStyle = (answer) => {
    if (!selectedAnswer) return styles.answerButton;
    
    if (answer.text === selectedAnswer.text) {
      return answer.isCorrect ? styles.correctAnswer : styles.incorrectAnswer;
    }
    
    if (answer.isCorrect && selectedAnswer.text !== answer.text) {
      return styles.correctAnswer;
    }
    
    return styles.answerButton;
  };

  const getAnswerTextStyle = (answer) => {
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
            {currentQuestion.question}
          </Text>
        </View>

        <View style={styles.answersContainer}>
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
              {currentQuestion.explanation}
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
};

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

export default QuizScreen;
