import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Button,
	ActivityIndicator
} from 'react-native';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';

import { db } from '../../database/firebaseDB';
import { notifyMessage } from '../Components/notifyMessage';
import colors from '../config/colors';
function UpdateInfo({ navigation, route }) {
	const [name, setName] = useState('');
	const [location, setLocation] = useState('');
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setName(route.params.wallet_name);
		setLocation(route.params.location);
	}, []);
	const handleSave = () => {
		if (name.trim().length === 0) {
			alert('Please enter your name');
		} else if (location.trim().length === 0) {
			alert('Please enter your location');
		} else {
			setLoading(true);
			const userData = {
				...route.params,
				['wallet_name']: name,
				location: location
			};
			const myDoc = doc(db, 'users', route.params.wallet_id);

			setDoc(myDoc, userData)
				.then((res) => {
					setLoading(false);
					notifyMessage('Account updated successfully');
					console.log(userData);
					navigation.navigate('ProfilePage', userData);
				})
				.catch((err) => {
					alert(err.message);
					setLoading(false);
				});
		}
	};
	const handleDelete = () => {
		setLoading(true);
		const myDoc = doc(db, 'users', route.params.wallet_id);

		deleteDoc(myDoc)
			.then((res) => {
				setLoading(false);
				notifyMessage('Deleted successfully');
				navigation.navigate('LoginPage');
			})
			.catch((err) => {
				alert(err.message);
				setLoading(false);
			});
	};
	if (loading) {
		return (
			<View style={styles.preloader}>
				<ActivityIndicator size="large" color={colors.primary} />
			</View>
		);
	}
	return (
		<View style={styles.UpdateInfoContainer}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Update Profile Info</Text>
			</View>
			<View style={styles.content}>
				<View style={styles.phoneNumber} />
				<Text style={styles.label}>Wallet Name</Text>
				<TextInput
					style={styles.input}
					defaultValue={route.params.wallet_name}
					placeholder="e.g. John Doe"
					onChangeText={(val) => setName(val)}
				/>
				<Text style={styles.label}>Location</Text>
				<TextInput
					style={styles.input}
					defaultValue={route.params.location}
					placeholder="e.g. India"
					onChangeText={(val) => setLocation(val)}
				/>
				<View style={styles.button}>
					<Button
						title="💾 Save"
						onPress={() => {
							handleSave();
						}}
					/>
				</View>
				<View style={styles.button}>
					<Button
						title="🗑️ Delete"
						onPress={() => {
							handleDelete();
						}}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	UpdateInfoContainer: {
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
	}
});

export default UpdateInfo;
