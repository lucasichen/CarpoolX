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
        user = self.auth.create_user_with_email_and_password(
            email=email, password=password
        )
        return user["localId"]

    ### comment: need to clean up the error messages
    def sign_in(self, email, password):
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
        try:
            user = self.auth.get_account_info(id_token)
            return {"success": True, "data": user}
        except Exception as e:
            error_message = e
            return {"success": False, "error": "can't get account" + error_message}
    
    def refresh(self, refresh_token):
        try:
            user = self.auth.refresh(refresh_token)
            return {"success": True, "data": user}
        except pyrebase.exceptions.HTTPError as e:
            error_message = e.args[1].get("error", {}).get("message", "")
            return {"success": False, "error": error_message}


class FirebaseDatabase(FirebaseInit):
    """
    Class extending FirebaseInit for Firebase Database operations
    """

    def __init__(self):
        super().__init__()
        self.db = self.pyrebase.database()

    def create_user(self, uid, name, email, password):
        user_ref = (
            self.db.child("user").child(uid).set({"name": name,"email": email, "password": password})
        )
        print(user_ref)

    def user_exists(self, email):
        try:
            users = self.db.child("user").get()
            for user in users.each():
                if user.val().get("email") == email:
                    return True
            return False
        except Exception as e:
            return False
    
    def get_user(self, uid):
        try:
            user = self.db.child("user").child(uid).get()
            return {"success": True, "data": user.val()}
        except Exception as e:
            return {"success": False, "error": str(e)}
        
