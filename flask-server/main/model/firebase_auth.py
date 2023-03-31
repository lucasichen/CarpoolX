import firebase_admin
from firebase_admin import credentials, auth

class FirebaseAuth:
    def __init__(self, firebase_cred_file_path):
        self.firebase_cred_file_path = firebase_cred_file_path
        self.firebase_app = None

    def init_firebase_app(self):
        cred = credentials.Certificate(self.firebase_cred_file_path)
        firebase_admin.initialize_app(cred)
        self.firebase_app = firebase_admin.get_app()

    def create_user(self, email, password):
        user = auth.create_user(
            email=email,
            password=password,
        )
        return user

    def get_user(self, uid):
        user = auth.get_user(uid)
        return user

    def update_user(self, uid, **kwargs):
        auth.update_user(uid, **kwargs)

    def delete_user(self, uid):
        auth.delete_user(uid)

    def verify_id_token(self, id_token):
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
