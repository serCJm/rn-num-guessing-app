import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Alert, ScrollView } from "react-native";
import NumbersContainer from "../components/NumbersContainer";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
// Icons
import { Ionicons } from "@expo/vector-icons";

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
	const initialGuess = generateRandomBetween(1, 100, userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess]);

	const curLow = useRef(1);
	const curHigh = useRef(100);

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
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
			curLow.current = currentGuess + 1;
		}
		const nextNumber = generateRandomBetween(
			curLow.current,
			curHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		setPastGuesses((prevState) => [nextNumber, ...prevState]);
	}

	return (
		<View style={styles.screen}>
			<BodyText>Opponent's Guess:</BodyText>
			<NumbersContainer>{currentGuess}</NumbersContainer>
			<Card style={styles.buttonContainer}>
				<MainButton onPress={() => nextGuessHandler("lower")}>
					<Ionicons name="md-remove" size={24} color="white" />
				</MainButton>
				<MainButton onPress={() => nextGuessHandler("greater")}>
					<Ionicons name="md-add" size={24} color="white" />
				</MainButton>
			</Card>
			<View style={styles.list}>
				<ScrollView>
					{pastGuesses.map((guess, i) => (
						<View key={guess} style={styles.listItem}>
							<BodyText>#{pastGuesses.length - i}</BodyText>
							<BodyText>{guess}</BodyText>
						</View>
					))}
				</ScrollView>
			</View>
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
	list: {
		flex: 1,
		width: "80%",
	},
	listItem: {
		borderColor: "#ccc",
		padding: 15,
		marginVertical: 10,
		backgroundColor: "white",
		borderWidth: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
