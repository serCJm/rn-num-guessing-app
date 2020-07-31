import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import NumbersContainer from "../components/NumbersContainer";
import Card from "../components/Card";

function generateRandomBetween(
	min: number,
	max: number,
	exclude: number
): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
}

interface Props {
	userChoice: number;
}

const GameScreen: React.FC<Props> = ({ userChoice }) => {
	const [currentGuess, setCurrentGuess] = useState(
		generateRandomBetween(1, 100, userChoice)
	);

	const curLow = useRef(1);
	const curHigh = useRef(100);

	function nextGuessHandler(direction: string) {
		if (
			(direction === "lower" && currentGuess < userChoice) ||
			(direction === "greater" && currentGuess > userChoice)
		) {
			Alert.alert("Don't lie!", "You know this is wrong.", [
				{ text: "Sorry", style: "cancel" },
			]);
			return;
		}
		if (direction === "lower") {
			curHigh.current = currentGuess;
		} else {
			curLow.current = currentGuess;
		}
		const nextNumber = generateRandomBetween(
			curLow.current,
			curHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
	}

	return (
		<View style={styles.screen}>
			<Text>Opponent's Guess:</Text>
			<NumbersContainer>{currentGuess}</NumbersContainer>
			<Card style={styles.buttonContainer}>
				<Button
					title="LOWER"
					onPress={() => nextGuessHandler("lower")}
				></Button>
				<Button
					title="GREATER"
					onPress={() => nextGuessHandler("greater")}
				></Button>
			</Card>
		</View>
	);
};

export default GameScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		width: 300,
		maxWidth: "80%",
	},
});
