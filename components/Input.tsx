import React from "react";
import { TextInput, StyleSheet, TextStyle, TextInputProps } from "react-native";

interface Props extends TextInputProps {
	style?: TextStyle;
}

const Input: React.FC<Props> = (props) => {
	return (
		<TextInput
			{...props}
			style={{ ...styles.input, ...props.style }}
		></TextInput>
	);
};

export default Input;

const styles = StyleSheet.create({
	input: {
		height: 30,
		borderBottomColor: "gray",
		borderBottomWidth: 1,
		marginVertical: 10,
	},
});
