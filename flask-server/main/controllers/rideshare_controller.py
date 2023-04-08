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
        try:
            response = self.firebase_db.gen_ride_id()

            if response["success"]:
                ride_id = response["data"]
                self.firebase_db.create_ride(ride_id, pickup, dest, capacity)
                return {"success": True, "message": "Ride offer created successfully.", "data": ride_id}
            else:
                return {"success": False, "error": response["error"]}
        except Exception as e:
            return {"success": False, "error": str(e)}
    

