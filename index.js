import { AppRegistry } from 'react-native';
import 'intl-pluralrules';

import './src/i18n';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
