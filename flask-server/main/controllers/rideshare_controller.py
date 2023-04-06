from main.model.firebase_controller import FirebaseDatabase

class RideshareController:
    """
    Takes care of all the operations regarding requesting and joining rides
    """

    def __init__(self):
        self.firebase_db = FirebaseDatabase()

    def create_ride(self, pickup, dest, capacity):
        """
        Creates a ride offer to store in the database.
        """
        pass

    
