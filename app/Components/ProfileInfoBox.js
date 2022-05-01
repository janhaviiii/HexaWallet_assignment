import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../config/colors';

function ProfileInfoBox({icon_name,text}) {
    return (
		<View style={styles.profileInfoBox}>
			<Icon name={icon_name} size={50} color={colors.primary} />
			<Text style={styles.profileInfoText}>{text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	profileInfoBox: {
		width: '35%',
		borderRadius: 20,
		aspectRatio: 1,
		borderWidth: 2,
		borderColor: colors.primary,
		margin: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},

	profileInfoText: {
		color: colors.secondary,
		top: 5
	}
});

export default ProfileInfoBox;