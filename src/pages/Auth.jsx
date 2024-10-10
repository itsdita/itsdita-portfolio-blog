import { GoogleAuthProvider, getAuth, signInWithRedirect, signOut} from "firebase/auth";
import { useAuth } from "./util/auth-context.jsx";

const provider = new GoogleAuthProvider();

export default function Signup() {
  const { isAdmin } = useAuth();

  const googleAuth = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithRedirect(auth, provider)
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
        console.error("Error during Google sign in: ", error);
      });
  };

  const handleLogout = async () => {
    const auth = getAuth(); // Get the auth instance

    try {
      await signOut(auth); // Sign out the user
      console.log("User signed out successfully");
      // Optionally redirect or perform other actions after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="container">
      {isAdmin ? (
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className="btn" onClick={googleAuth}>
          Sign Up with Google
        </button>
      )}
    </div>
  );
}
