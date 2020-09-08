import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { fetchContacts } from '../utils/api';
import ContactListItem from '../components/ContactListItem';
import colors from '../utils/colors';
import store from '../store';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
});

const keyExtractor = ({ phone }) => phone;

class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: store.getState().contacts,
      loading: store.getState().isFetchingContacts,
      error: store.getState().error,
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    navigation.setOptions({
      headerLeft: () => (
        <MaterialIcons
          name="menu"
          size={24}
          style={{ color: colors.black, marginLeft: 10 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
    });

    this.unsubscribe = store.onChange(() => this.setState({
      contacts: store.getState().contacts,
      loading: store.getState().isFetchingContacts,
      error: store.getState().error,
    }));

    const contacts = await fetchContacts();

    store.setState({ contacts, isFetchingContacts: false });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderContact = ({ item }) => {
    const {
      navigation: { navigate },
    } = this.props;
    const { name, avatar, phone } = item;

    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigate('Profile', { contact: item })}
      />
    );
  };

  render() {
    const { loading, contacts, error } = this.state;

    const contactsSorted = contacts.sort((a, b) => a.name.localeCompare(b.name));

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}
        {!loading && !error && (
          <FlatList
            data={contactsSorted}
            keyExtractor={keyExtractor}
            renderItem={this.renderContact}
          />
        )}
      </View>
    );
  }
}

export default Contacts;
