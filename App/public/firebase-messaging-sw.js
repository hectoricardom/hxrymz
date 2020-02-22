importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');


firebase.initializeApp({
    'messagingSenderId': '1049250585245'
});
const messaging = firebase.messaging(); 

messaging.setBackgroundMessageHandler(function(payload) {
    console.log(' Received background message ', payload);
    // Customize notification here
    var notificationTitle = 'Background Message Title';
    var notificationOptions = {
      body: 'Background Message body.',
      icon: './favicon.png'
    };
    
    if(notificationTitle === 'TokenActive'){
     
    }
    else if(notificationTitle === 'TokenException'){          
      //return self.registration.showNotification(notificationTitle, notificationOptions);
    }
    else{
      //return self.registration.showNotification(notificationTitle, notificationOptions);
    }
    return self.registration.showNotification(notificationTitle, notificationOptions);
  });

var  deferredPrompt;
/*
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  console.log('beforeinstallprompt')
  console.log(e)
});
*/