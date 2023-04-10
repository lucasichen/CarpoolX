from main.model.firebase_controller import FirebaseDatabase

class RideshareController:
    """
    Takes care of all the operations regarding requesting and joining rides
    """

    def __init__(self):
        self.firebase_db = FirebaseDatabase()

    def create_ride(self, uid, pickup, dest, capacity):
        """
        Creates a ride offer to store in the database.
        """
        print("Creating ride offer...")
        try:
            response = self.firebase_db.gen_ride_id()
            if response["success"]:
                ride_id = response["data"]
                print("Ride ID: ", ride_id)
                # get taxi id  from last two characters of ride id int
                taxi_id = int(str(ride_id)[-2:])
                print("Taxi ID: ", taxi_id)
                self.firebase_db.create_ride(uid, ride_id, taxi_id, pickup, dest, capacity)
                return {"success": True, "message": "Ride offer created successfully.", "data": ride_id}
            else:
                return {"success": False, "error": response["error"]}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def create_private_event(self, date, location, attendees, emails):
        """
        Creates a event offer to store in the database.
        """
        try:
            response = self.firebase_db.gen_event_id()
            if response["success"]:
                event_id = response["data"]
                self.firebase_db.create_private_event(event_id, location, attendees, date, emails)
                return {"success": True, "message": "Event created successfully.", "data": event_id}
            else:
                return {"success": False, "error":response["error"]}    
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def get_rides(self, destloc):
        """
        Gets all the rides that arrive at destination
        """
        try:
            resp = self.firebase_db.get_ride(str(destloc))
            if resp["rides"]:
                return {"success": True, "resp": resp}
            else:
                return {"success": False, "resp": resp}
        except Exception as e:
            return {"success": False, "error": "can't get available rides - "+str(e)}

    def rate_user(self, name, rating):
        """
        Rates a user
        """
        try:
            resp = self.firebase_db.rate_user(name, rating)
            print(resp)
            return {"success": True, "resp": resp}
        except Exception as e:
            return {"success": False, "error": "can't rate user - "+str(e)}
