import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, db, doc, getDoc, setDoc } from './firebase-config.js';

const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email-address').value;
        const password = document.getElementById('password').value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check Role
            const userDoc = await getDoc(doc(db, "users", user.uid));
            let role = 'client';

            // Hardcoded Check (keep for your master admin)
            if (user.email === 'admin@chicken.com') {
                role = 'admin';
            } else if (userDoc.exists()) {
                role = userDoc.data().role;
            }

            if (role === 'admin') {
                console.log("Admin Logged In");
                window.location.href = 'admin.html';
            } else {
                // Not an admin? Kick them out.
                await signOut(auth);
                alert("Access Denied: You do not have Admin privileges.");
            }

        } catch (error) {
            console.error("Login failed:", error);

            // Special "First Time Setup" Logic for Master Admin
            if (email === 'admin@chicken.com') {
                try {
                    // Try creating the account if it doesn't exist
                    const newUserCred = await createUserWithEmailAndPassword(auth, email, password);

                    // Immediately make them an admin in the database
                    await setDoc(doc(db, "users", newUserCred.user.uid), {
                        email: email,
                        role: 'admin',
                        name: 'Master Admin'
                    });

                    alert("Master Admin Account Created! Logging you in...");
                    window.location.href = 'admin.html';
                    return;

                } catch (createErr) {
                    if (createErr.code === 'auth/email-already-in-use') {
                        alert("Admin account exists. Please check your password.");
                    } else {
                        alert("Error creating admin: " + createErr.message);
                    }
                }
            } else {
                alert("Login failed: " + error.message);
            }
        }
    });
}
