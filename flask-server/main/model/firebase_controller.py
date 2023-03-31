import firebase_admin
from firebase_admin import auth, db, credentials
import os

class FirebaseInit:
    def __init__(self):
        credential_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)),"serviceAccountKey.json")
        cred = credentials.Certificate(credential_file_path)
        firebase_admin.initialize_app(cred)

class FirebaseAuth:
    def __init__(self):
        self.app = firebase_admin.get_app()

    def create_user(self, email, password):
        user = auth.create_user(
            email=email,
            password=password,
            app=self.app
        )
        return user.uid

class FirebaseDatabase:
    def __init__(self):
        self.app = firebase_admin.get_app()
        self.db = db.reference(app=self.app)

    def create_user(self, uid, email, name):
        user_ref = self.db.child('users').child(uid)
        user_data = {
            'email': email,
            'name': name
        }
        user_ref.set(user_data, app=self.app)

    def get_document_by_field(self, collection_name, field_name, field_value):
        """
        Retrieves a document from the specified collection based on a specific field value.
        """
        docs = self.db.child(collection_name).order_by_child(field_name).equal_to(field_value).get()
        for doc in docs:
            return docs[doc]
        return None
    
    def add_document(self, collection_name, data):
        """
        Adds a new document to the specified collection.
        """
        new_document_ref = self.db.child(collection_name).push(data)
        return new_document_ref.key
