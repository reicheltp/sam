import React, {Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Tabs, Tab,
  Icon,
} from 'react-native-elements';

import {Settings, Playlist} from './components';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'playlist',
    }
  }

  changeTab(selectedTab) {
    this.setState({selectedTab})
  }

  render() {
    const {selectedTab} = this.state;

    return (
      <View style={styles.container}>
        <Tabs>
          <Tab
            selected={selectedTab === 'playlist'}
            renderIcon={() => <Icon containerStyle={styles.tabIcon} color={'#5e6977'} name='library-music' size={30} />}
            renderSelectedIcon={() => <Icon containerStyle={styles.tabIcon}  color={'#FF5722'} name='library-music' size={30} />}
            onPress={() => this.changeTab('playlist')}>
            <Playlist />
          </Tab>
          <Tab
            titleStyle={{fontWeight: 'bold', fontSize: 10}}
            selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
            selected={selectedTab === 'settings'}
            renderIcon={() => <Icon containerStyle={styles.tabIcon} color={'#5e6977'} name='settings' size={30} />}
            renderSelectedIcon={() => <Icon containerStyle={styles.tabIcon} color={'#FF5722'} name='settings' size={30}  />}
            onPress={() => this.changeTab('settings')}>
            <Settings />
          </Tab>
        </Tabs>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'pink',
  },
  tabIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;