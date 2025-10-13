import { KeyboardAvoidingView, Platform, StyleSheet, View,} from "react-native";
import { useRouter } from "expo-router";
import {Button, Text, TextInput, useTheme} from "react-native-paper"
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

export default function AuthScreen() {
    const [isSignUp, setISignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>("");

    const theme = useTheme();
    const router = useRouter();

    const {signIn, signUp} = useAuth();

    const toggleForm = () => {
        setISignUp((prev) => !prev);
    }

    const handleAuth = async () => {
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setError(null);

        if (isSignUp) { 
           const error = await signUp(email, password);
              if (error) {
                setError(error);
                return;
                }
        } else {
           const error = await signIn(email, password);
              if (error) {
                setError(error);
                return;
                }

                router.replace("/")
        }
    }
 return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
 style={styles.container}>
    <View 
    style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
            {isSignUp ? "Create Account" : "Welcome Back!"}
        </Text>

        <TextInput
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="example@email.com" 
        mode="outlined"
        onChangeText={setEmail}
        />

        <TextInput
        label="Password"
        autoCapitalize="none"
        placeholder="Your password"
        secureTextEntry
        mode="outlined"
        onChangeText={setPassword}
        />

        {error ? <Text style={{color: theme.colors.error, textAlign: "center"}}>{error}</Text> : null}

        <Button mode="contained" onPress={handleAuth}> {isSignUp ? "Sign up" : "Sign In"}</Button>

        <Button mode="text" onPress={toggleForm}
        style={styles.switchModeButton}
        >{isSignUp ? "Already have an account? Sign in" : "Dont have an account? Sign Up"}</Button>
    </View>
 </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    }
    ,
    content :{
flex: 1,
padding: 16,
justifyContent: "center",
gap: 16,

    },
    title : {
        
        marginBottom: 16,
        textAlign: "center",
    },
    input : {
        marginBottom: 24,
        textAlign: "center",
    },
    button : {
        marginTop: 8,
    },
    switchModeButton : {
        marginTop: 16,
    }

})