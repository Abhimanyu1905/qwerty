# Chicken World 🍗

Chicken World is a comprehensive web application for managing a food ordering system. It connects Clients, Shopkeepers, and Admins through a seamless interface powered by Firebase.

## 🌟 Features

### 👤 Client
- **Browse Menu**: View a variety of delicious food items.
- **Place Orders**: Add items to the cart and place orders seamlessly.
- **Order Tracking**: Track the status of your orders in real-time.
- **User Authentication**: Secure Sign-up and Login functionality.

### 🏪 Shopkeeper
- **Order Management**: View incoming orders instantly.
- **Update Status**: Change order status (e.g., Cooking, Ready, Delivered) to keep clients informed.
- **Dashboard**: specialized dashboard for managing daily operations.

### 🛡️ Admin
- **User Management**: Manage user roles and permissions.
- **Menu Management**: Add, update, or remove items from the menu.
- **System Overview**: Monitor overall system activity.

## 🛠️ Technology Stack

- **Frontend**: HTML5, JavaScript (ES6+)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (via CDN) for modern, responsive design.
- **Icons**: [Lucide Icons](https://lucide.dev/) for beautiful, consistent iconography.
- **Backend**: [Google Firebase](https://firebase.google.com/) (Firestore) for real-time database and authentication.

## 🚀 Setup & Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Abhimanyu1905/qwerty.git
    cd CHICKEN--main
    ```

2.  **Firebase Configuration**
    - The project uses a `firebase-init.js` file to handle Firebase connections.
    - Ensure you have a valid Firebase project set up.
    - If needed, update the configuration in `firebase-init.js` with your own Firebase project credentials.

3.  **Run the Application**
    - Simply open `index.html` in your web browser or use a local development server (e.g., Live Server in VS Code) for the best experience.

## 📂 Project Structure

- `index.html`: Landing page and Login.
- `client.html`: Main interface for customers.
- `shopkeeper.html`: Dashboard for shopkeepers.
- `admin.html`: Administrative control panel.
- `firebase-init.js`: Firebase initialization and helper functions.
- `script.js`: Core application logic.

## 📝 Notes on Backend

- **Firebase Integration**: The project replaces local storage with Firestore for data persistence.
- **Data Flow**: Writes are asynchronous, while reads often utilize a local cache for performance.
- **Auth**: Currently uses a custom role-based auth system stored in Firestore.

---
*Enjoy the Chicken World experience!* 🍟🍔
