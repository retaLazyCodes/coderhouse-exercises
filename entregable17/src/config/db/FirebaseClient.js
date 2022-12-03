import admin from 'firebase-admin'

export default class FirestoreClient {
  constructor () {
    this.connection = this.getConnection()
  }

  initializeDatabase () {
    admin.initializeApp({
      credential: admin.credential.cert({
        project_id: process.env.FIREBASE_PROJECT_ID,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        // replace `\` and `n` character pairs w/ single `\n` character
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
      })
    })
    console.log('Firestore Database connected')
  }
  getConnection () {
    this.initializeDatabase()
    return admin.firestore()
  }
  static getInstance = () => {
    if (!this.instance) {
      this.instance = new FirestoreClient()
    }
    else {
      return this.instance
    }
  }

}

