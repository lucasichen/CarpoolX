from main.model.firebase_controller import FirebaseInit, FirebaseAuth, FirebaseDatabase

class AccountController:
    def __init__(self):
        self.firebase_init = FirebaseInit()
        self.firebase_auth = FirebaseAuth()
        # self.firebase_db = FirebaseDatabase()

        

    def create_account(self, email, password):
        # try:
            # Create user in Firebase Auth
            user = self.firebase_auth.create_user(email, password)

            # Check if user already exists in users collection
            # existing_user = self.firebase_db.get_document_by_field('users', 'email', email)

            # if existing_user:
            #     return {'success': True, 'message': 'User created successfully!'}
            # else:
            #     # Create new user document in users collection
            #     new_user = {
            #         'uid': user.uid,
            #         'email': email,
            #     }
            #     self.firebase_db.add_document('users', new_user)
            return {'success': True, 'message': 'User created successfully!'}
        # except Exception as e:
        #     return {'success': False, 'error': str(e)}

    # def login(self, email, password):
    #     try:
    #         # Sign in user with Firebase Auth
    #         user = self.firebase_auth.sign_in_user(email, password)

    #         # Get user document from users collection
    #         user_doc = self.firebase_db.get_document_by_field('users', 'uid', user.uid)

    #         if user_doc:
    #             return {'success': True, 'user': user_doc}
    #         else:
    #             return {'success': False, 'error': 'User document not found.'}
    #     except Exception as e:
    #         return {'success': False, 'error': str(e)}
