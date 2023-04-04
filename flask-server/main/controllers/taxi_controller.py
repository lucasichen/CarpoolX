from main.model.firebase_controller import FirebaseDatabase

class TaxiController:
    """
    Takes care of taxi information related operations
    """

    def __init__(self):
        self.firebase_db = FirebaseDatabase()
    
    def taxi_information(self, taxi_id):
        """
        Gets the taxi information
        """
        try:
            taxi = self.firebase_db.get_taxi(taxi_id)
            return taxi if taxi["success"] else {"success": False, "error": taxi["error"]}
        except Exception as e:
            return {"success": False, "error": "can't get taxi information - "+str(e)}
        
