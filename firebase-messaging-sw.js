importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js')
importScripts(
    'https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js'
)

const firebaseConfig = {
    apiKey: 'AIzaSyDWi6liGTS9SERHAyw_vnyuudPBkvxI4es',
    authDomain: 'h5-30x.firebaseapp.com',
    projectId: 'h5-30x',
    storageBucket: 'h5-30x.appspot.com',
    messagingSenderId: '204363007035',
    appId: '1:204363007035:web:984bfc7d7d8eeb29ae481e',
    measurementId: 'G-VF6Y3X69KG',
}

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    )
    // Customize notification here
    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    }

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    )
})
