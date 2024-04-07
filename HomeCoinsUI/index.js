/**
 * @BANTI
 */

import {AppRegistry,useColorScheme} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store';
import { PaperProvider } from 'react-native-paper';
import { darkTheme,defaultTheme } from './src/Screens/DefaultLayout/ThemeColorProps';
const ReduxProvider = () => {
    const themeModeDark = useColorScheme() !== 'dark'
    return(
        <Provider store={store}>
            <PaperProvider theme={themeModeDark ? darkTheme : defaultTheme}>
                <App />
            </PaperProvider>
        </Provider>
    )
}
AppRegistry.registerComponent(appName, () => ReduxProvider);
