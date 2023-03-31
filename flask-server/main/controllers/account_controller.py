from main.model.firebase_controller import FirebaseAuth, FirebaseDatabase

class AccountController:
    def __init__(self):
        self.firebase_auth = FirebaseAuth()
        self.firebase_db = FirebaseDatabase()

    def create_account(self, email, password):
        try:
            # Check if user already exists in users collection
            existing_user = self.firebase_db.user_exists(email)

            if existing_user:
                return {'success': True, 'message': 'User already exists!'}
            else:
                 # Create user in Firebase Auth
                user = self.firebase_auth.create_user(email, password)
                # Create new user document in users collection
                self.firebase_db.create_user(user, email, password)
            return {'success': True, 'message': 'User created successfully!'}
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def login(self, email, password):
        try:
            print(email, password)
            # Check if user already exists in users collection
            response = self.firebase_auth.sign_in(email, password)
            if response['success']:
                return {'success': True, 'message': 'User logged in successfully!'}
            else:
                return {'success': False, 'error': response['error']}
        except Exception as e:
            return {'success': False, 'error': str(e)}

