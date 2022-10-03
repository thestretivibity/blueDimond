import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SmallTitle, Title} from '../components/textBase';
import {COLORS} from '../constants/theme';

export default function SignUp({navigation}) {
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.headerWrappr}>
      <Image
        source={require('../assets/images/nytLOGO.png')}
        style={styles.logo}></Image>
      {/* form */}
      <View style={{alignSelf: 'stretch', padding: 40, maxWidth: 600}}>
        {/* email */}
        <View>
          <Title text={'Login'} />
          <TextInput
            style={styles.inputText}
            label="Email"
            returnKeyType="next"
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            placeholder="Type your email adress"
          />
        </View>
        {/* password */}
        <View>
          <Title text={'Password'} />
          <TextInput
            style={styles.inputText}
            label="Password"
            returnKeyType="done"
            // value={password.value}
            //  onChangeText={text => setPassword({ value: text, error: '' })}
            placeholder="Type your password"
            secureTextEntry
          />
        </View>
        <View>
          <TouchableOpacity style={styles.login} activeOpacity={0.9}>
            <Title text={'SignUp'} _color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrappr: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: 30,
  },
  inputText: {
    height: 50,
    alignSelf: 'stretch',
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    color: COLORS.black,
    fontSize: 16,
    borderColor: COLORS.aliceBlue,
    backgroundColor: COLORS.white,
    marginBottom: 10,
  },
  logo: {width: 300, height: 130, resizeMode: 'contain'},
  login: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 5,
  },
});
