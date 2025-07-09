/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { useState, useEffect } from 'react';
import { Mixpanel } from 'mixpanel-react-native';
import { Button, Text, TextInput, View, Alert } from 'react-native';

// Set up Mixpanel instance (as requested — unchanged)
const trackAutomaticEvents = false;
const mixpanel = new Mixpanel("8d071e6772937123daa6cf9a5ffd91bb", trackAutomaticEvents);
mixpanel.init();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    mixpanel.init()
      .then(() => {
        console.log("Before Mixpanel init");
        mixpanel.track("App Initialized");
        console.log("Mixpanel initialized");
        mixpanel.track("App Opened");
      })
      .catch(error => {
        console.log("Mixpanel init failed:", error);
      });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      {isLoggedIn ? (
        <HomeScreen />
      ) : (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      )}
    </View>
  );
}

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {
    mixpanel.track("Login Button Clicked");

    // Standard credentials
    const validEmail = "testuser@example.com";
    const validPassword = "password123";

    if (email === validEmail && password === validPassword) {
      mixpanel.track("Login Successful", { user: email });
      setLoginError('');
      onLogin();
    } else {
      mixpanel.track("Login Failed", { attemptedUser: email });
      setLoginError('Invalid email or password.');
    }
  };

  const handleForgotPassword = () => {
    mixpanel.track("Forgot Password Button Clicked");
    Alert.alert("Forgot Password", "Password reset instructions sent to your email.");
  };

  const handleSignUp = () => {
    mixpanel.track("Sign Up Button Clicked");
    Alert.alert("Sign Up", "Sign up functionality coming soon!");
  };

  return (
    <View>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>

      <Text>Email:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 8,
          marginBottom: 12,
          borderRadius: 5,
        }}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text>Password:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 8,
          marginBottom: 12,
          borderRadius: 5,
        }}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />

      {loginError ? (
        <Text style={{ color: 'red', marginBottom: 12 }}>{loginError}</Text>
      ) : null}

      <Button title="Login" onPress={handleLogin} />

      <View style={{ height: 12 }} />

      <Button title="Forgot Password" color="#f39c12" onPress={handleForgotPassword} />

      <View style={{ height: 12 }} />

      <Button title="Sign Up" color="#27ae60" onPress={handleSignUp} />
    </View>
  );
}

function HomeScreen() {
  return (
    <View>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to Rupeeflo</Text>
      <Text>You're now logged in!</Text>
    </View>
  );
}


