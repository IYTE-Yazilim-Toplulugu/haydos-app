import { Text, View } from "react-native";
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#EAECE2',
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href= "./login">
        <Text>Login</Text>
      </Link>
      <Link href= "./signup">
        <Text>Signup</Text>
      </Link>
      <Link href= "./feeding">
        <Text>Maps</Text>
      </Link>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
