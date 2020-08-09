import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	Keyboard,
	TouchableWithoutFeedback,
	Alert,
	ScrollView,
	KeyboardAvoidingView,
	Dimensions,
} from "react-native";
import Card from "../components/Card";
import { Colors } from "../Constants/colors";
import Input from "../components/Input";
import NumbersContainer from "../components/NumbersContainer";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";

type Props = {
	onStartGame: (a: number | undefined) => void;
};

const StartGameScreen: React.FC<Props> = ({ onStartGame }) => {
	const [enteredValue, setEnteredValue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState<number>();
	const [buttonWidth, setButtonWidth] = useState(
		Dimensions.get("window").width / 4
	);

	useEffect(() => {
		function updateLayout() {
			setButtonWidth(Dimensions.get("window").width / 4);
		}

		Dimensions.addEventListener("change", updateLayout);
		return () => {
			Dimensions.removeEventListener("change", updateLayout);
		};
	}, []);

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
				<MainButton onPress={() => onStartGame(selectedNumber)}>
					Start Game
				</MainButton>
			</Card>
		);
	}

	return (
		<ScrollView>
			<KeyboardAvoidingView
				behavior="position"
				keyboardVerticalOffset={30}
			>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<View style={styles.screen}>
						<Text style={styles.title}>Start A New Game!</Text>
						<Card style={styles.inputContainer}>
							<BodyText>Select A Number</BodyText>
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
								<View style={{ width: buttonWidth }}>
									<Button
										title="Reset"
										color={Colors.accent}
										onPress={resetInputHandler}
									></Button>
								</View>
								<View style={{ width: buttonWidth }}>
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
			</KeyboardAvoidingView>
		</ScrollView>
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
		// width: 300,
		// maxWidth: "80%",
		width: "80%",
		minWidth: 300,
		maxWidth: "95%",
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
