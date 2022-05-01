import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Image } from 'react-native';
import ProfileInfoBox from '../Components/ProfileInfoBox';

import colors from '../config/colors';

function ProfilePage({ navigation, route }) {
	const [data, setdata] = useState({});
	const icons = {
		wallet_id: 'wallet',
		wallet_name: 'person',
		created_on: 'shield-checkmark',
		location: 'location'
	};
	useEffect(() => {
		setdata(route.params);
	}, [route]);
	return (
		<View style={styles.profilePageContainer}>
			<View style={styles.profileHeader} />
			<View style={styles.profilePageImage}>
				<Image
					resizeMode="contain"
					source={require('../assets/girl.jpeg')}
					style={styles.profileImage}
				/>
			</View>
			<View style={styles.profileInfoContainer}>
				{Object.keys(data).map((k) => (
					<ProfileInfoBox
						key={k}
						text={data[k]}
						icon_name={icons[k]}
					/>
				))}
			</View>
			<View style={styles.profilePageButton}>
				<Button
					title="✍️ Edit"
					onPress={() => {
						navigation.navigate('UpdateInfo', data);
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	profilePageContainer: {
		flex: 1,
		backgroundColor: colors.white
	},
	profileHeader: {
		flex: 1,
		backgroundColor: colors.primary,
		borderBottomLeftRadius: 40,
		borderBottomRightRadius: 40
	},
	profilePageImage: {
		position: 'absolute',
		height: 140,
		aspectRatio: 1,
		backgroundColor: colors.black,
		borderRadius: 70,
		top: '18%',
		left: '30%',
		zIndex: 3
	},
	profileImage: {
		flex: 1,
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 100,
	},
	profileInfoContainer: {
		paddingTop: '25%',
		flex: 2,
		height: '80%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: colors.white,
		alignItems: 'center',
		justifyContent: 'center'
	},
	profilePageButton: {
		width: '25%',
		height: 60,
		borderRadius: 50,
		position: 'absolute',
		bottom: 10,
		right: 20
	}
});

export default ProfilePage;
