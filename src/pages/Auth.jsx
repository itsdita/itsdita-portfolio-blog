import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

export default function Signup() {
  const googleAuth = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("User info:", user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        console.error("Error during Goolge sign in: ", error);
      });
  };

  return (
    <div className="container">
      <button className="btn" onClick={googleAuth}>
        Sign Up with Google
      </button>
    </div>
  );
}
