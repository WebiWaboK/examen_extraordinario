import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{title: "Expresiones regulares"}}/>
            <Stack.Screen name="regex_manual" options={{title: "Expresiones que se Usan"}}/>
        </Stack>
    )
}