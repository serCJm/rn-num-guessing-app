import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

interface Props {
	style?: TextStyle;
}

const BodyText: React.FC<Props> = ({ style, children }) => {
	return <Text style={{ ...styles.text, ...style }}>{children}</Text>;
};

export default BodyText;

const styles = StyleSheet.create({
	text: {
		fontFamily: "open-sans",
	},
});
