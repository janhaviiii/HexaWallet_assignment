import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Pressable,
	Image,
	ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../database/firebaseDB';
import { notifyMessage } from '../Components/notifyMessage';
import colors from '../config/colors';

function LoginPage({ navigation }) {
	const [loading, setLoading] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState('');
	const userLogin = () => {
		if (phoneNumber.length !== 10) {
			alert('Phone number should be of 10 digits');
		} else {
			setLoading(true);
			const myDoc = doc(db, 'users', phoneNumber);
			getDoc(myDoc).then((snap)=>{
				if(snap.exists()){
					notifyMessage('Logged in successfully');
					setLoading(false);
					navigation.navigate('ProfilePage',snap.data());
				} else{
					alert('Wallet does not exist');
				}
			}).catch((err)=>{
				setLoading(false);
				alert('Wallet does not exist');
			})
		}
	}
	if (loading) {
		return (
			<View style={styles.preloader}>
				<ActivityIndicator size="large" color={colors.primary} />
			</View>
		);
	}
	return (
		<View style={styles.loginContainer}>
			<Image source={require('../assets/hexa.png')} />
			<View style={styles.loginText}>
				<Text style={styles.hello}>Hello Again</Text>
				<Text style={styles.text}>Welcome back you've</Text>
				<Text style={styles.text}>been missed</Text>
			</View>
			<TextInput
				autoFocus={true}
				style={styles.phoneNumber}
				placeholder="Phone Number"
				onChangeText={(val) => setPhoneNumber(val)}
			/>
			<Pressable onPress={userLogin}>
				<Icon name="login" size={50} color={colors.black} />
				<Text style={styles.login}>Login</Text>
			</Pressable>
			<Pressable onPress={() => navigation.navigate('CreateNew')}>
				<Text style={styles.register}>Register</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	loginContainer: {
		flex: 1,
		backgroundColor: colors.white,
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	loginText: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20
	},
	hello: {
		fontFamily: 'monospace',
		fontWeight: 'bold',
		fontSize: 26
	},
	text: {
		fontFamily: 'monospace',
		fontWeight: '600',
		fontSize: 20,
		color: colors.secondary
	},
	phoneNumber: {
		height: '20%',
		width: '100%',
		color: colors.primary,
		fontSize: 40,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 30,
		marginTop: 30
	},
	login: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	register: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 60,
		color: colors.primary
	},
	preloader: {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
export default LoginPage;
