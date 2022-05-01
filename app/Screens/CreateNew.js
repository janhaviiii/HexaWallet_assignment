import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	ActivityIndicator,
	Button
} from 'react-native';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import { db } from '../../database/firebaseDB';
import { notifyMessage } from '../Components/notifyMessage';

import colors from '../config/colors';
function CreateNew({ navigation }) {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [name, setName] = useState('');
	const [location, setLocation] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setPhoneNumber('');
		setName('');
		setLocation('');
		setLoading(false);
	}, []);

	const getHumanReadable = () => {
		// create a date time object
		const date = new Date(Date.now());
		// return date in form of day-month-year
		return `${date.getDate()} ${date.toLocaleString('default', {
			month: 'short'
		})} ${date.getFullYear()}`;
	};

	const handleSubmit = () => {
		if (phoneNumber.length !== 10) {
			alert('Phone number should be of 10 digits');
		} else if (name.trim().length === 0) {
			alert('Please enter your name');
		} else if (location.trim().length === 0) {
			alert('Please enter your location');
		} else {
			setLoading(true);
			const userData = {
				wallet_id: phoneNumber,
				wallet_name: name,
				created_on: getHumanReadable(),
				location: location
			};
			const myDoc = doc(db, 'users', phoneNumber);
			getDoc(myDoc)
				.then((snap) => {
					if (snap.exists()) {
						console.log(snap.data());
						alert('Wallet already exists');
						setLoading(false);
						setPhoneNumber('');
					} else {
						setDoc(myDoc, userData)
							.then((res) => {
								setLoading(false);
								notifyMessage('Account created successfully');
								navigation.navigate('LoginPage');
							})
							.catch((err) => {
								alert(err.message);
								setLoading(false);
							});
					}
				})
				.catch((err) => console.error(err));
		}
	};
	if (loading) {
		return (
			<View style={styles.preloader}>
				<ActivityIndicator size="large" color={colors.primary} />
			</View>
		);
	}
	return (
		<View style={styles.createNewContainer}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Create New Account</Text>
			</View>
			<View style={styles.content}>
				<TextInput
					autoFocus={true}
					style={styles.phoneNumber}
					placeholder="Phone Number"
					onChangeText={(val) => setPhoneNumber(val)}
				/>
				<Text style={styles.label}>Wallet Name</Text>
				<TextInput
					style={styles.input}
					placeholder="e.g. John Doe"
					onChangeText={(val) => setName(val)}
				/>
				<Text style={styles.label}>Location</Text>
				<TextInput
					style={styles.input}
					placeholder="e.g. India"
					onChangeText={(val) => setLocation(val)}
				/>
				<View style={styles.button}>
					<Button title="💾 Save" onPress={handleSubmit} />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	createNewContainer: {
		flex: 1,
		backgroundColor: colors.white,
		height: '100%',
		width: '100%'
	},
	header: {
		flex: 1,
		backgroundColor: colors.primary,
		justifyContent: 'center'
	},
	headerText: {
		padding: 10,
		marginTop: 20,
		fontSize: 20,
		fontWeight: 'bold',
		color: colors.white
	},
	content: {
		flex: 5,
		padding: 10
	},
	phoneNumber: {
		color: colors.primary,
		fontSize: 40,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 50,
		marginTop: 50
	},
	label: {
		fontSize: 20,
		color: colors.primary,
		margin: 10
	},
	input: {
		borderWidth: 2,
		borderColor: colors.primary,
		height: 50,
		fontSize: 20,
		backgroundColor: colors.primary,
		borderRadius: 15,
		paddingLeft: 20
	},
	button: {
		width: '40%',
		fontSize: 200,
		top: 60,
		height: 80,
		left: '30%'
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

export default CreateNew;
