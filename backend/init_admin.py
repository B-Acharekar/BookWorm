import firebase_admin
from firebase_admin import credentials, auth, firestore
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

# Initialize Firebase Admin
cred_path = Path(__file__).resolve().parent / "bookworm_firebase_admin.json"
if not cred_path.exists():
    print(f"❌ Error: {cred_path} not found")
    exit(1)

if not firebase_admin._apps:
    cred = credentials.Certificate(str(cred_path))
    firebase_admin.initialize_app(cred)

db = firestore.client()

def initialize_admin():
    email = "admin@bookworm.com"
    password = "bookworm@321"
    
    print(f"🔄 Initializing admin user: {email}...")
    
    try:
        # 1. Create User in Firebase Auth
        try:
            user = auth.get_user_by_email(email)
            print(f"✅ User already exists (UID: {user.uid})")
        except auth.UserNotFoundError:
            user = auth.create_user(
                email=email,
                password=password,
                display_name="System Administrator"
            )
            print(f"✨ Created new user (UID: {user.uid})")
        
        # 2. Set Role in Firestore
        db.collection("users").document(user.uid).set({
            "email": email,
            "role": "admin",
            "displayName": "System Administrator",
            "updatedAt": firestore.SERVER_TIMESTAMP
        }, merge=True)
        
        print(f"👑 Admin role assigned in Firestore for UID: {user.uid}")
        print("\n🚀 Setup Complete!")
        
    except Exception as e:
        print(f"❌ Error during initialization: {str(e)}")

if __name__ == "__main__":
    initialize_admin()
