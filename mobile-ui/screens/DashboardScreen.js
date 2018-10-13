import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import {
  Container, Header, Content, Button, Text,
} from 'native-base';

const styles = StyleSheet.create({
  button: {
    margin: 10,
    height: Dimensions.get('window').width,
  },
});

class DashboardScreen extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Button
            full
            rounded
            style={styles.button}
            onPress={() => this.props.navigation.navigate('CommunityScreen')}
          >
            <Text>Community</Text>
          </Button>
          <Button
            full
            rounded
            style={styles.button}
            onPress={() => this.props.navigation.navigate('WorkScreen')}
          >
            <Text>Work</Text>
          </Button>
          <Button
            full
            rounded
            style={styles.button}
            onPress={() => this.props.navigation.navigate('HealthScreen')}
          >
            <Text>Health</Text>
          </Button>
          <Button
            full
            rounded
            style={styles.button}
            onPress={() => this.props.navigation.navigate('SkillsScreen')}
          >
            <Text>Skills</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default DashboardScreen;
