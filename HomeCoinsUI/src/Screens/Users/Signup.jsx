import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View , ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'react-native';
import Input from '../../Components/Input';
import Icons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../Redux/Action/userAction';
import { showAlert, updateErrors, validateForm } from '../../Utils/CommonAuthFunction';
import { useTheme } from 'react-native-paper';

const Signup = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors, dark } = useTheme();
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const { isLoading } = useSelector(state=>state.user);
  
  const backgroundStyle = {backgroundColor: colors.background,color: colors.text};
  const btnStyle = {backgroundColor: colors.btnBackground,color: colors.btnBackground};
  
  const changeHandler = (key, value) => {
    updateErrors(errors, key);
    setUser({ ...user, [key]: value })
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let validation = validateForm(user);
    setErrors(validation.error);
    if (validation.valid) {
      try {
          dispatch(createUser(user));
      } catch (err) {
        showAlert(err);
      };
    }
  };

  return (
    <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={styles.signupContainer}>
          <View style={styles.arrowBack}>
            <Icons name='arrow-back' size={30} onPress={() => navigation.navigate('Login')} color={colors.text} />
          </View>
          <View style={styles.pageTitle}>
            <Text style={{ ...styles.headerTitle, color: colors.text }}>Create Account</Text>
            <Text style={{ ...styles.subHeaderTitle, color: colors.text }}>Please fill the input below here</Text>
          </View>
          <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View>
              <Input
                placeholder={"Full Name"}
                label={"Full Name"}
                isLabel={false}
                name={'name'}
                icons={'user'}
                value={user.name}
                secureTextEntry={false}
                autoFocus={false}
                onChangeText={(text) => changeHandler("name", text)}
                isHelper={errors.name ? true : false}
                errorMsg={errors?.name}
                helperType={'error'}
              />
            </View>
            <View>
              <Input
                placeholder={"Mobile"}
                label={"Moble"}
                isLabel={false}
                name={'mobile'}
                icons={'phone'}
                value={user.mobile}
                secureTextEntry={false}
                autoFocus={false}
                keyboardType={"numeric"}
                onChangeText={(text) => changeHandler("mobile", text)}
                isHelper={errors.mobile ? true : false}
                errorMsg={errors?.mobile}
                helperType={'error'}
              />
            </View>
            <View>
              <Input
                placeholder={"Email"}
                label={"Email"}
                isLabel={false}
                name={'email'}
                icons={'envelope-o'}
                value={user.email}
                secureTextEntry={false}
                autoFocus={false}
                onChangeText={(text) => changeHandler("email", text)}
                isHelper={errors.email ? true : false}
                errorMsg={errors?.email}
                helperType={'error'}
              />
            </View>
            <View>
              <Input
                placeholder={"Password"}
                label={"Password"}
                isLabel={false}
                name={'password'}
                icons={'lock'}
                value={user.password}
                secureTextEntry={true}
                autoFocus={false}
                onChangeText={(text) => changeHandler("password", text)}
                isHelper={errors.email ? true : false}
                errorMsg={errors?.email}
                helperType={'error'}
              />
            </View>
            <View>
              <Input
                placeholder={"Confirm Password"}
                label={"Confirm Password"}
                isLabel={false}
                name={'confirmPassword'}
                icons={'lock'}
                value={user.confirmPassword}
                secureTextEntry={true}
                autoFocus={false}
                onChangeText={(text) => changeHandler("confirmPassword", text)}
                isHelper={errors.confirmPassword ? true : false}
                errorMsg={errors?.confirmPassword}
                helperType={'error'}
              />
            </View>
          </ScrollView>
          <View style={{ width: '100%' }}>
            <View style={{ width: "auto", alignItems: 'center' }}>
              <Pressable style={{ ...styles.button, ...btnStyle }} onPress={submitHandler}>
                <Text style={{ ...styles.text, ...btnStyle.color }}>{isLoading ? <ActivityIndicator size={'small'} color={colors.text}/> : "SIGN UP"}</Text>
              </Pressable>
            </View>
            <View style={{ position: 'relative', height: 30 }}>
              <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                  <Text style={{ fontSize: 16, color: backgroundStyle.color }}>Allready have an accounts? </Text><Text onPress={() => navigation.navigate('Login')} style={{ color: btnStyle.color, fontSize: 16, fontWeight: 600, textDecorationLine: 'underline' }}>Login</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup


const styles = StyleSheet.create({
  signupContainer: {
    paddingHorizontal: 20,
    flex: 1
  },
  arrowBack: {
    paddingVertical: 20,
  },
  pageTitle: {
    paddingVertical: 10
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '600',
  },
  subHeaderTitle: {},
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 3,
    width: "100%",
    marginVertical: 15
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});
