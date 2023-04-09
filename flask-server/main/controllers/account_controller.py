from main.model.firebase_controller import FirebaseAuth, FirebaseDatabase

### comment: need to send success and error messages to the client
class AccountController:
    """
    Takes care of all the account related operations: create account and login
    """

    def __init__(self):
        self.firebase_auth = FirebaseAuth()
        self.firebase_db = FirebaseDatabase()

    def create_account(self, name, email, password):
        """
        Creates a new user in Firebase Auth and users collection using the email and password provided
        """
        try:
            # Check if user already exists in users collection
            existing_user = self.firebase_db.user_exists(email)

            if existing_user:
                return {"success": True, "message": "User already exists!"}
            else:
                # Create user in Firebase Auth
                uid = self.firebase_auth.create_user(email, password)
                # Create new user document in users collection
                self.firebase_db.create_user(uid, name, email, password)
            return {"success": True, "message": "User created successfully!"}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def login(self, email, password):
        """
        Logs in a user using the email and password provided
        """
        try:
            print("user:",email," has logged in with password:", password)
            # Check if user already exists in users collection
            response = self.firebase_auth.sign_in(email, password)
            return response if response["success"] else {"success": False, "error": response["error"]}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def get_user(self, id_token):
        """
        Gets the user details from the Firebase Auth
        """
        try:
            response = self.firebase_auth.get_account_info(id_token)
            uid = response["data"]["users"][0]["localId"]
            user = self.firebase_db.get_user(uid)
            return user if user["success"] else {"success": False, "error": user["error"]}
        except Exception as e:
            return {"success": False, "error": "can't get user account - "+str(e)}
    
    def get_uid(self, id_token):
        """
        Gets the user details from the Firebase Auth
        """
        try:
            response = self.firebase_auth.get_account_info(id_token)
            uid = response["data"]["users"][0]["localId"]
            return uid if response["success"] else {"success": False, "error": "can't get user account"}
        except Exception as e:
            return {"success": False, "error": "can't get user account - "+str(e)}

    def refresh(self, refresh_token):
        """
        Refreshes the id token
        """
        try:
            response = self.firebase_auth.refresh(refresh_token)
            return response if response["success"] else {"success": False, "error": response["error"]}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def update_user(self, id_token, name, age):
        """
        Updates the user details in the Firebase Auth
        """
        try:
            response = self.firebase_auth.get_account_info(id_token)
            uid = response["data"]["users"][0]["localId"]
            user = self.firebase_db.update_user(uid, name, age)
            return user if user["success"] else {"success": False, "error": user["error"]}
        except Exception as e:
            return {"success": False, "error": "can't update user account - "+str(e)}
        
    def delete_user(self, id_token):
        """
        Deletes the user from the Firebase Auth
        """
        try:
            print('requesting to delete user with id_token:', id_token)
            response = self.firebase_auth.get_account_info(id_token)
            uid = response["data"]["users"][0]["localId"]
            auth_response = self.firebase_auth.delete_user(id_token)
            database_response = self.firebase_db.delete_user(uid)
            data = {'success':{'auth': auth_response, 'database': database_response}}
            return data if data["success"] else {"success": False, "error": data["error"]}
        except Exception as e:
            return {"success": False, "error": "can't delete user account - "+str(e)}

    def verify_user(self, email):
        """
        Verifiess a user exists from the Firebase
        """
        try:
            # Check if user already exists in users collection
            existing_user = self.firebase_db.user_exists(email)
            if existing_user:
                return {"success": True, "message": "User verified successfully!"}
            else : 
                return {"sucess": False, "message": "User doesn't exist"}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def report_user(self, email):
        """
        Reports the user to the Firebase Auth
        """
        try:
            print('requesting to report user with email:', email)
            response = self.firebase_db.report_user(email)
            return response if response["success"] else {"success": False, "error": response["error"]}
        except Exception as e:
            return {"success": False, "error": "can't report user account - "+str(e)}

    def get_name_email(self, uid):
        """
        Gets the user details from the Firebase Auth
        """
        try:
            user = self.firebase_db.get_user(uid)
            print('user:', user)
            return user if user["success"] else {"success": False, "error": user["error"]}
        except Exception as e:
            return {"success": False, "error": "can't get user account - "+str(e)}
 