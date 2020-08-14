import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from "expo-font";
import { AppLoading } from "expo";

function fetchFonts() {
	return Font.loadAsync({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	});
}

export default function App() {
	const [userNumber, setUserNumber] = useState<number>();
	const [guessRounds, setGuessRounds] = useState(0);
	const [dataLoaded, setDataLoaded] = useState(false);

	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setDataLoaded(true)}
				onError={(err) => console.log(err)}
			></AppLoading>
		);
	}

	function configureNewGame() {
		setGuessRounds(0);
		setUserNumber(undefined);
	}

	function startGameHandler(selectedNumber: number | undefined) {
		setUserNumber(selectedNumber);
	}

	function gameOverHandler(numOfRounds: number) {
		setGuessRounds(numOfRounds);
	}

	let content = (
		<StartGameScreen onStartGame={startGameHandler}></StartGameScreen>
	);

	if (userNumber && guessRounds <= 0) {
		content = (
			<GameScreen
				userChoice={userNumber}
				onGameOver={gameOverHandler}
			></GameScreen>
		);
	} else if (guessRounds > 0) {
		content = (
			<GameOverScreen
				roundsNumber={guessRounds}
				userNumber={userNumber}
				onRestart={configureNewGame}
			></GameOverScreen>
		);
	}

	return (
		<SafeAreaView>
			<View style={styles.screen}>
				<Header title="Guess A Number"></Header>
				{content}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
