/**
 * @BANTI
 */

import {AppRegistry,useColorScheme} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store';
import { PaperProvider } from 'react-native-paper';
import { useState } from 'react';
import { darkTheme } from './src/Screens/Theme/DarkTheme';
import { defaultTheme } from './src/Screens/Theme/DefaultTheme';
const ReduxProvider = () => {
    const themeModeDark = useColorScheme() !== 'dark'
    const [isDarkMode,setIsDarkMode] = useState(themeModeDark);
    return(
        <Provider store={store}>
            <PaperProvider theme={isDarkMode ? darkTheme : defaultTheme}>
                <App />
            </PaperProvider>
        </Provider>
    )
}
AppRegistry.registerComponent(appName, () => ReduxProvider);
