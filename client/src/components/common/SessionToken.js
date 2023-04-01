import * as Keychain from 'react-native-keychain';

class SessionToken {
    static async getToken(name) {
        try {
            const credentials = await Keychain.getGenericPassword(name);
            if (!credentials) {console.log('no token');return null}
            console.log('token retrieved');
            return credentials.password;
        } catch (error) {
            console.log('error', error);
        }
        
    }
    
    static async setToken(name,token) {
        await Keychain.setGenericPassword(name, token);
        console.log('token set');
    }
    
    static async clearToken() {
        await Keychain.resetGenericPassword();
    }
}

export default SessionToken;