import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";

export default function App() {
	const [userNumber, setUserNumber] = useState<number>();

	function startGameHandler(selectedNumber: number | undefined) {
		setUserNumber(selectedNumber);
	}

	let content = (
		<StartGameScreen onStartGame={startGameHandler}></StartGameScreen>
	);

	if (userNumber) {
		content = <GameScreen userChoice={userNumber}></GameScreen>;
	}

	return (
		<View style={styles.screen}>
			<Header title="Guess A Number"></Header>
			{content}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
