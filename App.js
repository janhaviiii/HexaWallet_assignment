import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProfilePage from './app/Screens/ProfilePage';
import CreateNew from './app/Screens/CreateNew';
import UpdateInfo from './app/Screens/UpdateInfo';
import LoginPage from './app/Screens/LoginPage';

import colors from './app/config/colors';

const Stack = createStackNavigator();

function MyStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}
			initialRouteName="LoginPage"
		>
			<Stack.Screen
				name="LoginPage"
				component={LoginPage}
			/>
			<Stack.Screen
				name="CreateNew"
				component={CreateNew}
			/>
			<Stack.Screen
				name="ProfilePage"
				component={ProfilePage}
			/>
			<Stack.Screen
				name="UpdateInfo"
				component={UpdateInfo}
			/>
		</Stack.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<MyStack />
		</NavigationContainer>
	);
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: colors.black,
// 		alignItems: 'center',
// 		justifyContent: 'center'
// 	}
// });
