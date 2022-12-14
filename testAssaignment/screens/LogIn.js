import React, {useEffect, useState} from 'react';
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
import ApiCall from '../API/ApiCall';
import useApi from '../hooks/ApiUsage';
import {useDispatch, useSelector} from 'react-redux';
import {
  saveToken,
  signIn,
  signOut,
} from '../redux/actions/authenticationAction';

export default function LogIn({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const {
    data,
    error,
    loading,
    request: logIn,
    errorMessage,
  } = useApi(ApiCall.logIn, {
    email: username,
    password: password,
  });
  useEffect(() => {
    if (error) {
      return;
    }
    if (!loading && !error) {
      dispatch(
        saveToken(
          data?.access_token,
          data?.expiresIn,
          data?.refresh_token,
          username,
        ),
      );
      dispatch(signIn());
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Home',
            params: {someParam: ''},
          },
        ],
      });
    }
  }, [loading]);

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
            onChangeText={text => setUsername(text)}
            placeholderTextColor={COLORS.lightGray}
          />
        </View>
        {/* password */}
        <View>
          <Title text={'Password'} />
          <TextInput
            style={styles.inputText}
            label="Password"
            returnKeyType="done"
            onChangeText={text => setPassword(text)}
            placeholderTextColor={COLORS.lightGray}
            placeholder="Type your password"
            secureTextEntry
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.login}
            activeOpacity={0.9}
            onPress={() =>
              logIn({
                email: username,
                password: password,
              })
            }>
            <Title text={'Log In'} _color={COLORS.white} />
          </TouchableOpacity>
          {/* signUP */}
          <TouchableOpacity
            style={[styles.login, {backgroundColor: COLORS.white}]}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('SignUp')}>
            <Title text={'Sign Up'} _color={COLORS.primary} />
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
    marginTop: 10,
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 5,
  },
});
