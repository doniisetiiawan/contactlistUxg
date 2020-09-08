import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../utils/colors';
import { fetchUserContact } from '../utils/api';
import ContactThumbnail from '../components/ContactThumbnail';
import store from '../store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
});

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: store.getState().user,
      loading: store.getState().isFetchingUser,
      error: store.getState().error,
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    navigation.setOptions({
      title: 'Me',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: colors.blue,
      },
      headerLeft: () => (
        <MaterialIcons
          name="menu"
          size={24}
          style={{ color: colors.black, marginLeft: 10 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
      headerRight: () => (
        <MaterialIcons
          name="settings"
          size={24}
          style={{ color: 'white', marginRight: 10 }}
          onPress={() => navigation.navigate('Options')}
        />
      ),
    });

    this.unsubscribe = store.onChange(() => this.setState({
      user: store.getState().user,
      loading: store.getState().isFetchingUser,
      error: store.getState().error,
    }));

    const user = await fetchUserContact();

    store.setState({ user, isFetchingUser: false });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { loading, user, error } = this.state;
    const { avatar, name, phone } = user;

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}

        {!loading && (
          <ContactThumbnail
            avatar={avatar}
            name={name}
            phone={phone}
          />
        )}
      </View>
    );
  }
}

export default User;
