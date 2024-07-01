/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import type {Node} from 'react';
import messaging from '@react-native-firebase/messaging';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Button,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
    Freshchat,
    FreshchatConfig,
    FaqOptions,
    ConversationOptions,
    FreshchatUser,
    FreshchatMessage,
    FreshchatNotificationConfig
} from 'react-native-freshchat-sdk';
import { useEffect } from 'react';

const showFAQ = () => {
  // Freshchat.showFAQs();
  Freshchat.showConversationWithReferenceID("Sanitise","2");
 };
 const setUserProperties = () => {
//   var userPropertiesJson = {
//     "Value":null
// };
// console.log('set user prop  from app.js');

//   Freshchat.setUserProperties(null, (error) => {
//       console.log(error);
//   });
//   var botPropertiesJson = {
//     // "testBotProperty":"value",
//     "testBotProperty2":"value2"
//     // null:null
//     // null:"null"
//     // "null":null
// };

//  var botSpecificVariables = {
//   // "d57dd86f-85fb-4d4b-8a2e-ec39ada82589" : {"BotSpecific":"BS","BotSpecific2":"BS2"}
//   // "d57dd86f-85fb-4d4b-8a2e-ec39ada82589" : {null:"null"}
//   "d57dd86f-85fb-4d4b-8a2e-ec39ada82589" : {"null":null}
  
// };
//   Freshchat.setBotVariables(botPropertiesJson, botSpecificVariables);
var freshchatUser = new FreshchatUser();
freshchatUser.firstName = "John";
freshchatUser.lastName = "Doe";
freshchatUser.email = "johndoe@dead.man";
freshchatUser.phoneCountryCode = "+91";
freshchatUser.phone = "1234234123";
Freshchat.setUser(freshchatUser, (error) => {
    console.log(error);
});
  Freshchat.showConversations();
};

const showConversations = () => {
  // var conversationOptions = new ConversationOptions();
  //   conversationOptions.tags = ["parallel"];
  //   conversationOptions.filteredViewTitle = "Tags";
  //   console.log(conversationOptions);
  //   Freshchat.showConversations(conversationOptions);
  // console.log('show conversation from app.js');
    Freshchat.showConversations();
    // Freshchat.showConversationWithReferenceID("Sanitise","2");
};
const eventHandler = (actionData) => {
  // var action = actionData.user_action;
  // console.log('eventHandler: action - ', actionData["event_name"]);
  if(actionData["event_name"] == 'FCEventCsatSubmit'){
    Freshchat.dismissFreshchatViews();
  }
};
const removeListeners = () => { //Call this in code where you are clear all listener
  Freshchat.removeEventListeners(Freshchat.FRESHCHAT_EVENTS);
  
};
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  Freshchat.addEventListener(
    Freshchat.FRESHCHAT_EVENTS,
    eventHandler
  );
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View style={{marginTop: 4 , padding: 10}} >
                         <Button  style={styles.buttonStyle}  onPress={showFAQ} title="showFAQ" color="#841584" accessibilityLabel="Learn more about this purple button"/>
                     </View>

        <View style={{marginTop: 4 , padding: 10}} >
                            <Button  style={styles.buttonStyle}  onPress={showConversations} title="showConversations" color="#841584" accessibilityLabel="Learn more about this purple button"/>
                      </View>

                      <View style={{marginTop: 4 , padding: 10}} >
                            <Button  style={styles.buttonStyle}  onPress={setUserProperties} title="setUserProperties" color="#841584" accessibilityLabel="Learn more about this purple button"/>
                      </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
export default App;