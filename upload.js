let db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      // Signed in
      console.log('signed in')
      document.querySelector('.sign-in-or-sign-out').innerHTML = `
        <button class="text-blue-500 underline sign-out">Sign Out</button>
      `
      document.querySelector('.sign-out').addEventListener('click', function(event) {
        console.log('sign out clicked')
        firebase.auth().signOut()
        document.location.href = 'browse.html'
      })

      db.collection('users').doc(user.uid).set({
        name: user.displayName,
        email: user.email
      })

      document.querySelector('.hello').insertAdjacentHTML('beforeend', `
      <div class="block">Hello, ${user.displayName}</div>
      `)

      document.querySelector('.upload_button').addEventListener('click', async function(event) {
        event.preventDefault()
  
        let productText = document.querySelector('#productName').value
        let priceText = document.querySelector('#price').value
        let imageText = document.querySelector('#link').value
  
        if (productText.length > 0 && priceText.length > 0 && imageText.length>0) {
          await db.collection('furniture').add({
            productName: productText,
            price: priceText,
            link: imageText,
            userId: user.uid
          })
        }
        document.location.href = 'browse.html'
        })
        
    



    } else {
      // Signed out
      console.log('signed out')
      //Hide browse capabilties
      document.querySelector
  
      // Initializes FirebaseUI Auth
      let ui = new firebaseui.auth.AuthUI(firebase.auth())
  
      // FirebaseUI configuration
      let authUIConfig = {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: 'browse.html'
      }
  
      // Starts FirebaseUI Auth
      ui.start('.sign-in-or-sign-out', authUIConfig)
    }
})