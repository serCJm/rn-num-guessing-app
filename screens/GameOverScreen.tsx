import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

interface Props {
	roundsNumber: number;
	userNumber: number | undefined;
	onRestart: () => void;
}

const GameOverScreen: React.FC<Props> = ({
	roundsNumber,
	userNumber,
	onRestart,
}) => {
	return (
		<View style={styles.screen}>
			<Text>The Game Is Over</Text>
			<Text>Number of rounds: {roundsNumber}</Text>
			<Text>Number was: {userNumber}</Text>
			<Button title="New Game" onPress={onRestart}></Button>
		</View>
	);
};

export default GameOverScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
