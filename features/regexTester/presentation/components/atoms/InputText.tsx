import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface Props extends TextInputProps {}

export const InputText = (props: Props) => {
  return <TextInput style={styles.input} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
});
