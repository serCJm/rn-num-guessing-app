import React from "react";
import { StyleSheet, View, Button, Image } from "react-native";
import BodyText from "../components/BodyText";

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
			<BodyText>Number of rounds: {roundsNumber}</BodyText>
			<View style={styles.imageContainer}>
				<Image
					source={require("../assets/success.png")}
					style={styles.image}
					resizeMode="contain"
				></Image>
			</View>
			<BodyText>Number was: {userNumber}</BodyText>
			<BodyText>The Game Is Over</BodyText>
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
	imageContainer: {
		width: 300,
		height: 300,
		borderRadius: 150,
		borderWidth: 3,
		borderColor: "black",
		overflow: "hidden",
		marginVertical: 30,
	},
	image: {
		width: "100%",
		height: "100%",
	},
});
