import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import Card from "../components/Card";
import { Colors } from "../Constants/colors";
import Input from "../components/Input";

type Props = {};

const StartGameScreen: React.FC<Props> = () => {
	const [enteredValue, setEnteredValue] = useState("");

	function numberInputHandler(e: string) {
		setEnteredValue(e.replace(/[^0-9]/g, ""));
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
								onPress={() => {}}
							></Button>
						</View>
						<View style={styles.button}>
							<Button
								title="Confirm"
								color={Colors.primary}
								onPress={() => {}}
							></Button>
						</View>
					</View>
				</Card>
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
});
