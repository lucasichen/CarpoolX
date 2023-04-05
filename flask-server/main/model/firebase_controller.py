import pyrebase
import os
import json


class FirebaseInit:
    """
    Initializing class for Firebase classes
    """

    def __init__(self):
        pyrebase_config = os.path.join(
            os.path.dirname(os.path.abspath(__file__)), "serviceAccountKey.json"
        )
        with open(pyrebase_config) as f:
            config = json.load(f)
        self.pyrebase = pyrebase.initialize_app(config)


class FirebaseAuth(FirebaseInit):
    """
    Class extending FirebaseInit for Firebase Authentication operations
    """

    def __init__(self):
        super().__init__()
        self.auth = self.pyrebase.auth()

    def create_user(self, email, password):
        """
        Create a new user in Firebase Authentication
        """
        user = self.auth.create_user_with_email_and_password(
            email=email, password=password
        )
        return user["localId"]

    ### comment: need to clean up the error messages
    def sign_in(self, email, password):
        """
        Sign in a user using email and password
        """
        try:
            user = self.auth.sign_in_with_email_and_password(
                email=email, password=password
            )
            return {"success": True, "data": user}
        except pyrebase.exceptions.HTTPError as e:
            error_message = e.args[1].get("error", {}).get("message", "")
            if (
                error_message == "INVALID_PASSWORD"
                or error_message == "EMAIL_NOT_FOUND"
            ):
                return {"success": False, "error": "Invalid email or password"}
            else:
                return {"success": False, "error": error_message}

    def get_account_info(self, id_token):
        """
        Get the user details from Firebase Authentication
        """
        try:
            user_info = self.auth.get_account_info(id_token)
            return {"success": True, "data": user_info}
        except Exception as e:
            return {"success": False, "error": "can't get account" + e}
    
    def refresh(self, refresh_token):
        """
        Refreshes the id token
        """
        try:
            user = self.auth.refresh(refresh_token)
            return {"success": True, "data": user}
        except pyrebase.exceptions.HTTPError as e:
            error_message = e.args[1].get("error", {}).get("message", "")
            return {"success": False, "error": error_message}
        
    def delete_user(self, id_token):
        """
        Deletes the user account
        """
        try:
            data = self.auth.delete_user_account(id_token)
            return {"success": True, "data": data}
        except Exception as e:
            return {"success": False, "error": "can't delete account" +e}


class FirebaseDatabase(FirebaseInit):
    """
    Class extending FirebaseInit for Firebase Database operations
    """

    def __init__(self):
        super().__init__()
        self.db = self.pyrebase.database()

    def create_user(self, uid, name, email, password):
        """
        Create a new user in the database
        """
        user_ref = (
            self.db.child("user").child(uid).set({"name": name,"email": email, "password": password, "age": 0})
        )
        print(user_ref)

    def create_ride(self, pickup, dest, capacity):
        """
        Create a ride offer in the database
        """
        ride_offer = (
            self.db.child("rides").set({"pickup": pickup, "dest": dest, "capacity": capacity})
        )
        print(ride_offer)
        
    def user_exists(self, email):
        """
        Check if user exists in the database
        """
        try:
            users = self.db.child("user").get()
            for user in users.each():
                if user.val().get("email") == email:
                    return True
            return False
        except Exception as e:
            return False
    
    def get_user(self, uid):
        """
        Get user's data from the database
        """
        try:
            user = self.db.child("user").child(uid).get()
            return {"success": True, "data": user.val()}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def update_user(self, uid, name, age):
        """
        Update user's name and age in the database
        """
        try:
            response = self.db.child("user").child(uid).update({"name": name, "age": age})
            return {"success": True, "data": response}
        except Exception as e:
            return {"success": False, "error": str(e)}
        
    def delete_user(self, uid):
        """
        Delete user's data from the database
        """
        try:
            response = self.db.child("user").child(uid).remove()
            return {"success": True, "data": response}
        except Exception as e:
            return {"success": False, "error": str(e)}
        
