import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import axios from "axios";
import auth from "../Firebase/Firebase.config";


 export const AuthContext =createContext(null);

const Authprovider = ({children}) => {
    const [user,setuser] = useState("muna");
    
    const [loading, setloading] = useState(true);
    
const googleProvider = new GoogleAuthProvider();






    const createuser =(email,password)=>{
        setloading(true);
        return createUserWithEmailAndPassword(auth,email,password);
       
    }
     // update user profile
     const updateuserprofile = (name, image,email) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image,
            email: email,
          })
          
    }

    const signin =(email,password)=>{
        setloading(true);
        return signInWithEmailAndPassword(auth,email,password)
       
    }
    
    const logout = () => {
        setloading(true);
        return signOut(auth);
    }

    const signinwithgoogle = () =>{

        setloading(true);
        return signInWithPopup(auth, googleProvider);
    }

   useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
        console.log('user in the auth state changed', currentUser);
         setuser(currentUser);
        //  const userlogged ={ email: currentUser?.email};
         console.log(user);
         setloading(false);
        //  if(currentUser){
          
        //   axios.post('https://assignment-11-server-site-phi.vercel.app/jwt',userlogged,{withCredentials:true})
        //    .then((res)=>{
        //        console.log(res.data);
               
        //    })
        //    .catch(error => {
        //        console.error('Error:', error);
        //      });
        //     // toast.success("Successfully logged in google.")
        //     // navigate(location?.state ? location.state : '/');
        // } else{
        //     axios.post("https://assignment-11-server-site-phi.vercel.app/logout",userlogged,{withCredentials:true})
        //     .then((res)=>{
        //         console.log(res.data);
        //     })
        //     .catch((err)=>{
        //         console.log(err);
        //     })
        // }
         });
        
       
    // });
    return () => {
        unSubscribe();
    }
      
    
   
   },[]);
   
  
    const Authinfo = {
        
        createuser,
         user,
         updateuserprofile,
        
        loading,
        signin,
         logout,
         signinwithgoogle
    }
    return (
        <AuthContext.Provider value={Authinfo}>
           {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;