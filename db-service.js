import { db, collection, addDoc, getDocs, doc, deleteDoc, query, where, setDoc } from './firebase-config.js';

// --- Collection References ---
const FOOD_COLLECTION = 'foodItems';
const ORDERS_COLLECTION = 'orders';
const USERS_COLLECTION = 'users';

// --- Food Items ---
export async function getFoodItems() {
    const querySnapshot = await getDocs(collection(db, FOOD_COLLECTION));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addFoodItem(item) {
    // Remove 'id' if it exists, let Firestore generate it
    const { id, ...itemData } = item;
    const docRef = await addDoc(collection(db, FOOD_COLLECTION), itemData);
    return { id: docRef.id, ...itemData };
}

export async function deleteFoodItem(id) {
    await deleteDoc(doc(db, FOOD_COLLECTION, id));
}

// --- Orders ---
export async function getOrders(userId) {
    // If userId is null, return all (for admin?) - or we can make separate admin function
    // For now, let's just get all and filter in memory or add where clause
    let q = collection(db, ORDERS_COLLECTION);

    if (userId) {
        // q = query(collection(db, ORDERS_COLLECTION), where("client", "==", userId));
        // Note: For simple strings we can just store the email as "client"
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function placeOrder(order) {
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), order);
    return { id: docRef.id, ...order };
}

export async function updateOrderStatus(orderId, status) {
    await setDoc(doc(db, ORDERS_COLLECTION, orderId), { status }, { merge: true });
}

export async function updateFoodItem(id, data) {
    await setDoc(doc(db, FOOD_COLLECTION, id), data, { merge: true });
}


// --- Users ---
//(We might just stick to Auth for login, but store roles in a 'users' collection)
export async function getUserRole(email) {
    const q = query(collection(db, USERS_COLLECTION), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data().role;
    }
    return 'client'; // Default role
}

export async function getUsers() {
    const querySnapshot = await getDocs(collection(db, USERS_COLLECTION));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateUserRole(uid, newRole) {
    await setDoc(doc(db, USERS_COLLECTION, uid), { role: newRole }, { merge: true });
}

export async function deleteUser(uid) {
    await deleteDoc(doc(db, USERS_COLLECTION, uid));
}

// --- Seeding (One Time Use) ---
export async function seedDatabase(defaultItems) {
    const currentItems = await getFoodItems();
    if (currentItems.length > 0) {
        console.log("Database already has items. Skipping seed.");
        return;
    }

    console.log("Seeding database...");
    for (const item of defaultItems) {
        await addFoodItem(item);
    }
    console.log("Seeding complete!");
}

// Expose for console use
window.seedDatabase = seedDatabase;
