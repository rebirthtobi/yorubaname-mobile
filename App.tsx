import * as Sentry from "@sentry/react-native";
import Navigation from "./src/navigation/index";
import React from "react";

Sentry.init({
    dsn:         "https://012bedbbaa964ec2939d7eafdb31e962@sentry.io/1725949",
    environment: "production",
    release:     "0.5,",
});

const App = () => <Navigation />;

export default App;
