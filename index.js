/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';



import {
    Freshchat,
    FreshchatConfig
    } from 'react-native-freshchat-sdk';

AppRegistry.registerComponent(appName, () => App);

const freshchatConfig = new FreshchatConfig('abeaa0e6-b2de-4852-9a75-90d91e64294f', 'eb7a2fa0-edeb-468e-bbcd-3459103f30c0');
freshchatConfig.domain = 'msdk.au.freshchat.com';
Freshchat.init(freshchatConfig);


async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFcmToken();
    }
  }
  
  // Get FCM token
  async function getFcmToken() {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCM Token:', fcmToken);
      return fcmToken;
    } else {
      console.log('Failed to get FCM token');
      return null;

    }
  }
  
  // Call this function in your component
  requestUserPermission();

  getFcmToken().then(token => {
    Freshchat.setPushRegistrationToken(token);
    console.log('setPushRegistrationToken', token);
});
  

 messaging().onMessage(async remoteMessage => {
  console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  Freshchat.isFreshchatNotification(remoteMessage.data, (freshchatNotification) => 
    {
        if (freshchatNotification) 
    {
          Freshchat.handlePushNotification(remoteMessage.data);
     } else 
    {
            // handle your app notification
     }
    })
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('A new FCM message Background!', JSON.stringify(remoteMessage));
      Freshchat.isFreshchatNotification(remoteMessage.data, (freshchatNotification) => 
        {
            if (freshchatNotification) 
        {
                Freshchat.handlePushNotification(remoteMessage.data);
         } else 
        {
                // handle your app notification
         }
        })
    });

    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {
    //     if (remoteMessage) {
    //       console.log('Notification caused app to open from killed state:', remoteMessage);
    //       // Handle the notification here
    //     }
    //   });