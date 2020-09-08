import React, { Component } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import colors from '../utils/colors';
import DetailListItem from '../components/DetailListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

class Options extends Component {
  componentDidMount = () => {
    const { navigation } = this.props;

    navigation.setOptions({
      title: 'Options',
      headerLeft: () => (
        <MaterialIcons
          name="close"
          size={24}
          style={{ color: colors.black, marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <DetailListItem title="Update Profile" />
        <DetailListItem title="Change Language" />
        <DetailListItem title="Sign Out" />
      </View>
    );
  }
}

export default Options;
