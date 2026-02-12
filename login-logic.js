import { auth, googleProvider, signInWithPopup, onAuthStateChanged, db, doc, getDoc, collection, query, where, getDocs, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, setDoc } from './firebase-config.js';

const loginForm = document.getElementById('login-form');

// Handle Email/Password Login
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email-address').value;
        const password = document.getElementById('password').value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in with Email/Password");
        } catch (error) {
            console.error("Login failed:", error);

            // Auto-Create Admin/Shopkeeper if they don't explicitly exist (Demo Mode)
            if (email === 'admin@chicken.com' || email === 'shop@chicken.com') {
                try {
                    console.log("Attempting auto-creation for special role...");
                    await createUserWithEmailAndPassword(auth, email, password);
                    alert(`Account created for ${email}! You are now logged in.`);
                    return; // onAuthStateChanged will handle redirect
                } catch (createError) {
                    // Start of createError block
                    if (createError.code === 'auth/email-already-in-use') {
                        alert("Incorrect password for this account.");
                    } else {
                        alert("Login/Signup failed: " + createError.message);
                    }
                } // End of createError block
            } else {
                alert("Login failed: " + "User not found or wrong password.");
            }
        }
    });
}

// Check if already logged in and redirect based on role
// Check if already logged in and redirect based on role
// Check if already logged in and redirect based on role
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("User is logged in:", user.email);

        // Only hijack the UI if we are on the login page (index.html)
        // Check for the specific card classes in index.html
        const loginContainer = document.querySelector('.max-w-md.w-full.bg-white.p-8');
        if (loginContainer && (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.href.includes('index.html'))) {
            loginContainer.innerHTML = `
                <div class="text-center">
                    <div class="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <i data-lucide="user-check" class="h-8 w-8 text-green-600"></i>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                    <p class="text-gray-600 mb-6">Logged in as <span class="font-semibold">${user.email}</span></p>
                    
                    <div class="space-y-4">
                        <button id="cancel-redirect" class="text-sm text-gray-500 hover:text-gray-700 underline">
                            Pausing redirect...
                        </button>
                        <button id="switch-account-btn" class="w-full bg-gray-200 text-gray-800 font-bold py-3 rounded-xl hover:bg-gray-300 transition-colors">
                            Switch Account / Log Out
                        </button>
                    </div>
                    <div class="mt-6 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div id="progress-bar" class="h-full bg-brand-red w-0 transition-all duration-[3000ms] ease-linear"></div>
                    </div>
                    <p class="text-xs text-gray-400 mt-2">Redirecting to dashboard in 3 seconds...</p>
                </div>
            `;
            if (window.lucide) lucide.createIcons();

            // Handle Switch Account
            document.getElementById('switch-account-btn').addEventListener('click', () => {
                signOut(auth).then(() => {
                    window.location.reload();
                });
            });

            // Animate Progress
            setTimeout(() => {
                const bar = document.getElementById('progress-bar');
                if (bar) bar.style.width = '100%';
            }, 100);
        }

        // Delay the actual redirect logic
        setTimeout(async () => {
            try {
                // Check Firestore for Role
                const userDoc = await getDoc(doc(db, "users", user.uid));
                let role = 'client';

                // Hardcoded Overrides (Priority)
                if (user.email === 'admin@chicken.com') {
                    role = 'admin';
                } else if (user.email === 'shop@chicken.com') {
                    role = 'shopkeeper';
                } else if (userDoc.exists()) {
                    role = userDoc.data().role;
                }

                console.log("User Role:", role);

                if (role === 'admin') {
                    window.location.href = 'admin.html';
                } else if (role === 'shopkeeper') {
                    window.location.href = 'shop.html';
                } else {
                    window.location.href = 'client.html';
                }
            } catch (error) {
                console.error("Error fetching role:", error);
                window.location.href = 'client.html'; // Fallback
            }
        }, 3000); // 3 Second Delay
    }
});

window.handleGoogleLogin = async function () {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log("Logged in with Google:", user);

        // Check if user doc exists, if not create it
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            await setDoc(userDocRef, {
                name: user.displayName,
                email: user.email,
                role: 'client',
                createdAt: new Date().toISOString()
            });
            console.log("Created Firestore doc for Google user");
        }

        // onAuthStateChanged will handle redirect
    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed: " + error.message);
    }
}
