import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import NumbersContainer from "../components/NumbersContainer";
import Card from "../components/Card";
import BodyText from "../components/BodyText";

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
	onGameOver: (a: number) => void;
}

const GameScreen: React.FC<Props> = ({ userChoice, onGameOver }) => {
	const [currentGuess, setCurrentGuess] = useState(
		generateRandomBetween(1, 100, userChoice)
	);
	const [rounds, setRounds] = useState(0);

	const curLow = useRef(1);
	const curHigh = useRef(100);

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(rounds);
		}
	}, [currentGuess, userChoice, onGameOver]);

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
		setRounds((prevState) => prevState + 1);
	}

	return (
		<View style={styles.screen}>
			<BodyText>Opponent's Guess:</BodyText>
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
