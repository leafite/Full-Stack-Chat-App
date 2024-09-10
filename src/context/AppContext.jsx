import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const navigate = useNavigate();
    const [userData, setuserData] = useState(null);
    const [chatData, setchatData] = useState(null);

    const loadUserData = async (uid) => {
        try {
            const userRef = doc(db, 'users', uid);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data();
            setuserData(userData);
            if(userData.avatar && userData.name) {
                navigate('/chat');
            }
            else {
                navigate('/profile');
            }
            await updateDoc(userRef,{
                lastSeen:Date.now()
            })
            setInterval( async()=> {
                if(auth.chatUser){
                    await updateDoc(userRef,{
                    lastSeen:Date.now()
                    })
                }
            }, 60000);
        } catch (error) {
            
        }
    }

    const value = {
        userData,setuserData,
        chatData,setchatData,
        loadUserData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider