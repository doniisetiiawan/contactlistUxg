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
      user: [],
      loading: true,
      error: false,
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    console.log(navigation.setOptions);
    navigation.setOptions({
      title: 'Me',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: colors.blue,
      },
      headerRight: () => (
        <MaterialIcons
          name="settings"
          size={24}
          style={{ color: 'white', marginRight: 10 }}
          onPress={() => navigation.navigate('Options')}
        />
      ),
    });

    try {
      const user = await fetchUserContact();

      this.setState({
        user,
        loading: false,
        error: false,
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: true,
      });
    }
  };

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
