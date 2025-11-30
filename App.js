import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExamListScreen from './src/screens/ExamListScreen';
import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultScreen from './src/screens/ResultScreen';
import WrongAnswersReviewScreen from './src/screens/WrongAnswersReviewScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Trắc nghiệm' }}
        />
        <Stack.Screen 
          name="ExamList" 
          component={ExamListScreen} 
          options={{ title: 'Bộ đề' }}
        />
        <Stack.Screen 
          name="Quiz" 
          component={QuizScreen} 
          options={{ title: 'Bài thi', headerBackVisible: false }}
        />
        <Stack.Screen 
          name="Result" 
          component={ResultScreen} 
          options={{ title: 'Kết quả' }}
        />
        <Stack.Screen 
          name="WrongAnswersReview" 
          component={WrongAnswersReviewScreen} 
          options={{ title: 'Ôn tập câu sai' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
