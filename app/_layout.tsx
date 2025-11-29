import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Trắc nghiệm" }} />
      <Stack.Screen name="quiz" options={{ title: "Bài thi", headerBackVisible: false }} />
      <Stack.Screen name="result" options={{ title: "Kết quả" }} />
    </Stack>
  );
}
