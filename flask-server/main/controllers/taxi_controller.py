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
            resp = self.firebase_db.get_taxi(str(taxi_id))
            print(resp)
            return resp if resp["success"] else {"success": False, "error": resp["error"]}
        except Exception as e:
            return {"success": False, "error": "can't get taxi information - "+str(e)}
        
