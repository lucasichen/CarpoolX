import pyrebase
import os
import json


class FirebaseInit:
    """
    Initializing class for Firebase classes
    """

    def __init__(self):
        pyrebase_config = os.path.join(
            os.path.dirname(os.path.abspath(__file__)), "serviceAccountKey.json"
        )
        with open(pyrebase_config) as f:
            config = json.load(f)
        self.pyrebase = pyrebase.initialize_app(config)


class FirebaseAuth(FirebaseInit):
    """
    Class extending FirebaseInit for Firebase Authentication operations
    """

    def __init__(self):
        super().__init__()
        self.auth = self.pyrebase.auth()

    def create_user(self, email, password):
        """
        Create a new user in Firebase Authentication
        """
        user = self.auth.create_user_with_email_and_password(
            email=email, password=password
        )
        return user["localId"]

    ### comment: need to clean up the error messages
    def sign_in(self, email, password):
        """
        Sign in a user using email and password
        """
        try:
            user = self.auth.sign_in_with_email_and_password(
                email=email, password=password
            )
            return {"success": True, "data": user}
        except pyrebase.exceptions.HTTPError as e:
            error_message = e.args[1].get("error", {}).get("message", "")
            if (
                error_message == "INVALID_PASSWORD"
                or error_message == "EMAIL_NOT_FOUND"
            ):
                return {"success": False, "error": "Invalid email or password"}
            else:
                return {"success": False, "error": error_message}

    def get_account_info(self, id_token):
        """
        Get the user details from Firebase Authentication
        """
        try:
            user_info = self.auth.get_account_info(id_token)
            return {"success": True, "data": user_info}
        except Exception as e:
            return {"success": False, "error": "can't get account" + e}
    
    def refresh(self, refresh_token):
        """
        Refreshes the id token
        """
        try:
            user = self.auth.refresh(refresh_token)
            return {"success": True, "data": user}
        except pyrebase.exceptions.HTTPError as e:
            error_message = e.args[1].get("error", {}).get("message", "")
            return {"success": False, "error": error_message}
        
    def delete_user(self, id_token):
        """
        Deletes the user account
        """
        try:
            data = self.auth.delete_user_account(id_token)
            return {"success": True, "data": data}
        except Exception as e:
            return {"success": False, "error": "can't delete account" +e}


class FirebaseDatabase(FirebaseInit):
    """
    Class extending FirebaseInit for Firebase Database operations
    """

    def __init__(self):
        super().__init__()
        self.db = self.pyrebase.database()

    def create_user(self, uid, name, email, password):
        """
        Create a new user in the database
        """
        user_ref = (
            self.db.child("user").child(uid).set({"name": name,"email": email, "password": password, "age": 0})
        )
        print(user_ref)

    def create_ride(self, uid, ride_id, taxi_id, pickup, dest, capacity):
        """
        Create a ride offer in the database
        """
        print(pickup, dest)
        ride_data = {
            "taxi_id": taxi_id,
            "pickup": pickup,
            "dest": dest,
            "capacity": capacity,
            "user_id": uid,
        }
        taxi_data = {
            "dest": dest,
            "capacity": capacity,
            "passenger_ids": [uid],
        }
        print(ride_data, taxi_data)
        try:
            ride_offer = (
                self.db.child("rides").child(ride_id).set(ride_data)
            )
            print(ride_offer)
            taxi_info = {
                self.db.child("taxi").child(taxi_id).set(taxi_data)
            }
            print(taxi_info)
            return {"success": True, "data": {'ride_offer': ride_offer, 'taxi_data': taxi_info}}
        except Exception as e:
            return {"success": False, "error": str(e)}
        
    def user_exists(self, email):
        """
        Check if user exists in the database
        """
        try:
            users = self.db.child("user").get()
            for user in users.each():
                if user.val().get("email") == email:
                    return True
            return False
        except Exception as e:
            return False
        
    def get_ride(self, destloc):
        """
        Get all rides arriving at destloc
        """
        availablerides = {"rides": []}
        try:
            rides = self.db.child("rides").get()
            for ride in rides.each():
                if ride.val() == None:
                    continue
                if ride.val()["dest"] == destloc:
                    taxiId = ride.val()["taxi_id"]
                    print(taxiId)
                    taxidata = self.db.child("taxi").child(taxiId).child("passenger_ids").get()
                    total_capacity = self.db.child("taxi").child(taxiId).child("capacity").get()
                    print(taxidata.val(), total_capacity.val())
                    if (taxidata.val() == None):
                        continue
                    if (total_capacity.val() == None):
                        continue
                    curr = len(taxidata.val())
                    tot_capacity = int(total_capacity.val())
                    if curr < tot_capacity:    
                        availablerides["rides"].append(taxiId)
            return availablerides
        except Exception as e:
            print('ereerrr')
            return {"error": str(e)}
        
    def add_user(self, uid, taxi_id):
        """
        Add user to a taxi
        """
        try:
            taxi = self.db.child("taxi").child(taxi_id).child("passenger_ids").get()
            if taxi.val() == None:
                pass
            print(taxi.val())
            taxi = taxi.val()
            taxi.append(uid)
            print(taxi)
            response = self.db.child("taxi").child(taxi_id).update({"passenger_ids": taxi})
            return {"success": True, "data": response}
        except Exception as e:
            return {"success": False, "error": str(e)}
        
    def get_user(self, uid):
        """
        Get user's data from the database
        """
        try:
            user = self.db.child("user").child(uid).get()
            return {"success": True, "data": user.val()}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def update_user(self, uid, name, age):
        """
        Update user's name and age in the database
        """
        try:
            response = self.db.child("user").child(uid).update({"name": name, "age": age})
            return {"success": True, "data": response}
        except Exception as e:
            return {"success": False, "error": str(e)}
        
    def delete_user(self, uid):
        """
        Delete user's data from the database
        """
        try:
            response = self.db.child("user").child(uid).remove()
            return {"success": True, "data": response}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def get_taxi(self, taxi_id):
        """
        Get taxi's data from the database
        """
        try:
            print(taxi_id)
            taxi = self.db.child("taxi").child(taxi_id).get()
            print(taxi)
            return {"success": True, "data": taxi.val()}
        except Exception as e:
            return {"success": False, "error": str(e)}
        
    def get_passengers(self, taxi_id):
        """
        Get taxi's passengers
        """
        try:
            usernames = []
            print(taxi_id)
            taxidata = self.db.child("taxi").child(taxi_id).child("passenger_ids").get()
            if taxidata == None:
                return {"success": True, "data": usernames}
            print(taxidata.val())
            for user in taxidata.val():
                user_data = self.db.child("user").child(user).get()
                print(user_data.val())
                usernames.append(user_data.val()["name"])

            return {"success": True, "data": usernames}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def gen_ride_id(self):
        """
        Helper functions to generate ride id
        """
        ride_id = 1
        try:
            try:
                rides = self.db.child("rides").get()
            except Exception as e:
                return {"success": True, "data": ride_id}
            if rides.each() == None:
                return {"success": True, "data": ride_id}
            count = len(rides.each())
            return {"success": True, "data": count}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def create_private_event(self, event_id, location, attendees, date, emails):
        """
        Create a new event in the database
        """
        event_data = {
            "location": location,
            "attendees": attendees,
            "emails": emails,
            "date": date,
        }
        print(event_data)
        try:
            ride_offer = (
                self.db.child("event").child(event_id).set(event_data)
            )
            print(ride_offer)
            return {"success": True, "data": {'Event': ride_offer}}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def gen_event_id(self):
        """
        Helper functions to generate event id
        """
        event_id = 1
        try:
            try:
                events = self.db.child("event").get()
            except Exception as e:
                return {"success": True, "data": event_id}
            if events.each() == None:
                return {"success": True, "data": event_id}
            count = len(events.each())
            return {"success": True, "data": count}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def report_user(self, email):
        """
        Report a user for bad behaviour
        """
        try:
            users = self.db.child("user").get()
            for user in users.each():
                if user.val().get("email") == email:
                    uid = user.key()
                    break
            print("reporting: ", uid)
            report = self.db.child("reports").child(uid).set({"email": email})
            return {"success": True, "data": report}
        except Exception as e:
            return {"success": False, "error": str(e)}

