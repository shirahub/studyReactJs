import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
}

// var admin = require("firebase-admin");

// var serviceAccount = require("./serviceAccountKey.json");

class Firebase {
    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
          }
        this.auth = app.auth()
        this.db = app.database();

        // admin.initializeApp({
        //     credential: admin.credential.cert(serviceAccount),
        //     databaseURL: "https://fir-test-56144.firebaseio.com"
        // });

        // this.defaultAuth = admin.auth();
        // this.defaultDatabase = admin.database();
    }

    registerFirebaseUser = (email, password) => {
        return this.auth.createUserWithEmailAndPassword(email, password)
    }

    

    insertNewUser = (name, email, github, phone, motto, photo) => {
        return this.db.ref('users/').push().set({
            name: name,
            email: email,
            github: github,
            phone: phone,
            motto: motto,
            photo: photo,
        });
    }

    getAllUser = () => {
        var array = [];
        var rootRef = this.db.ref();
        var urlRef = rootRef.child("users");
        urlRef.once("value", function (snapshot) {
            snapshot.forEach(function (child) {
                // console.log(child.key + ": " + child.val());
                array.push(child.val())
            });
        });
        return array
    }

    deleteFirebaseUser = async (email) => {
        var id = '';
        var rootRef = this.db.ref();
        var urlRef = rootRef.child("users");
        await urlRef.once("value", function (snapshot) {
            snapshot.forEach(function (child) {
            //     console.log(child.key + ": " + child.val());
                if (child.val().email === email) {
                    console.log("found")
                    id = child.key
                }
            });
        });
        console.log("id", id)
        urlRef.child(id).delete()
    }

    editFirebaseUser = async (name, email, github, phone, motto, photo) => {
        var id = '';
        var rootRef = this.db.ref();
        var urlRef = rootRef.child("users");
        await urlRef.once("value", function (snapshot) {
            snapshot.forEach(function (child) {
            //     console.log(child.key + ": " + child.val());
                if (child.val().email === email) {
                    console.log("found")
                    id = child.key
                }
            });
        });
        console.log("id", id)
        urlRef.child(id).update({
            'name': name,
            'email': email,
            'github': github,
            'phone': phone,
            'motto': motto,
            'photo': photo    
        })
    }

    // adminRegisterFirebaseUser = (email, password, name, phone, photo) => {
    //     return this.defaultAuth.createUser({
    //         email: email,
    //         emailVerified: false,
    //         phoneNumber: phone,
    //         password: password,
    //         displayName: name,
    //         photoURL: photo,
    //         disabled: false
    //         })
    //         .then(function(userRecord) {
    //           // See the UserRecord reference doc for the contents of userRecord.
    //           console.log('Successfully created new user:', userRecord.uid);
    //         })
    //         .catch(function(error) {
    //           console.log('Error creating new user:', error);
    //         });
    // }

}

export default Firebase