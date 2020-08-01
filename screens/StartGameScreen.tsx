import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	Keyboard,
	TouchableWithoutFeedback,
	Alert,
} from "react-native";
import Card from "../components/Card";
import { Colors } from "../Constants/colors";
import Input from "../components/Input";
import NumbersContainer from "../components/NumbersContainer";

type Props = {
	onStartGame: (a: number | undefined) => void;
};

const StartGameScreen: React.FC<Props> = ({ onStartGame }) => {
	const [enteredValue, setEnteredValue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState<number>();

	function numberInputHandler(e: string) {
		setEnteredValue(e.replace(/[^0-9]/g, ""));
	}

	function resetInputHandler() {
		setEnteredValue("");
		setConfirmed(false);
	}

	function confirmInputHandler() {
		const chosenNumber = parseInt(enteredValue);
		if (
			Number.isNaN(chosenNumber) ||
			chosenNumber <= 0 ||
			chosenNumber > 99
		) {
			Alert.alert(
				"Invalid Number!",
				"Number has to be between 1 and 99. ",
				[
					{
						text: "Okay",
						style: "destructive",
						onPress: resetInputHandler,
					},
				]
			);
			return;
		}
		setConfirmed(true);
		setSelectedNumber(chosenNumber);
		setEnteredValue("");
		Keyboard.dismiss();
	}

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<Text>Chosen Number: </Text>
				<NumbersContainer>{selectedNumber}</NumbersContainer>
				<Button
					title="Start Game"
					onPress={() => onStartGame(selectedNumber)}
				></Button>
			</Card>
		);
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.screen}>
				<Text style={styles.title}>Start A New Game!</Text>
				<Card style={styles.inputContainer}>
					<Text>Select A Number</Text>
					<Input
						style={styles.input}
						blurOnSubmit
						autoCapitalize="none"
						keyboardType="number-pad"
						maxLength={2}
						value={enteredValue}
						onChangeText={numberInputHandler}
					></Input>
					<View style={styles.buttonContainer}>
						<View style={styles.button}>
							<Button
								title="Reset"
								color={Colors.accent}
								onPress={resetInputHandler}
							></Button>
						</View>
						<View style={styles.button}>
							<Button
								title="Confirm"
								color={Colors.primary}
								onPress={confirmInputHandler}
							></Button>
						</View>
					</View>
				</Card>
				{confirmedOutput}
			</View>
		</TouchableWithoutFeedback>
	);
};

export default StartGameScreen;

const styles = StyleSheet.create({
	screen: { flex: 1, padding: 10, alignItems: "center" },
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: "open-sans-bold",
	},
	inputContainer: {
		width: 300,
		maxWidth: "80%",
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		paddingHorizontal: 15,
	},
	button: {
		width: 100,
	},
	input: {
		width: 50,
		textAlign: "center",
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: "center",
	},
});
