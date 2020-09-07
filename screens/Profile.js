import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { fetchRandomContact } from '../utils/api';
import colors from '../utils/colors';
import ContactThumbnail from '../components/ContactThumbnail';
import DetailListItem from '../components/DetailListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: {},
    };
  }

  async componentDidMount() {
    const contact = await fetchRandomContact();

    this.setState({
      contact,
    });
  }

  render() {
    const { contact } = this.state;
    const {
      avatar,
      name,
      email,
      phone,
      cell,
    } = contact;

    return (
      <View style={styles.container}>
        <View style={styles.avatarSection}>
          <ContactThumbnail
            avatar={avatar}
            name={name}
            phone={phone}
          />
        </View>
        <View style={styles.detailsSection}>
          <DetailListItem
            icon="mail"
            title="Email"
            subtitle={email}
          />
          <DetailListItem
            icon="phone"
            title="Work"
            subtitle={phone}
          />
          <DetailListItem
            icon="smartphone"
            title="Personal"
            subtitle={cell}
          />
        </View>
      </View>
    );
  }
}

export default Profile;
