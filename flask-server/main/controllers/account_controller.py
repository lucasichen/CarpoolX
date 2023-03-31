from main.model.firebase_auth import FirebaseAuth

class AccountController:
    def __init__(self, firebase_cred_file_path):
        self.firebase_auth = FirebaseAuth(firebase_cred_file_path)
        self.firebase_auth.init_firebase_app()

    def create_account(self, email, password):
        try:
            user = self.firebase_auth.create_user(email, password)
            return {'success': True, 'message': 'User created successfully!'}
        except Exception as e:
            return {'success': False, 'error': str(e)}
