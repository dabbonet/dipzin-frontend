'use client'
import router from 'next/router';
import { createContext, useContext, useState } from 'react';
import isPaid from '../lib/auth'
import { useAuth } from '../lib/auth'; // Add this line

const DialogContext = createContext(null);


export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  
  const hideDialog = () => {
    setDialog(null);
    setTitle('');
    setIsDismissible(false);
  };

  const [dialog, setDialog] = useState(null);
  const [isDismissible, setIsDismissible] = useState(false);
  const [title, setTitle] = useState('');
  const { user } = useAuth();

  const DIALOG_ENUM = {
    ACCESS: 'ACCESS',
    UPGRADE_AD: 'UPGRADE_AD',
    INVITE: 'INVITE',
  };

  const showDialog = (dialogType, dialogTitle = '', dismissible = false) => {
    setDialog(dialogType);
    setTitle(dialogTitle);
    setIsDismissible(dismissible);
  };

  const navigateToRoute = ({link}) => {
    if(user){
      if(isPaid){
        router.push(link);
        return;
      }
      showDialog(DIALOG_ENUM.UPGRADE_AD, title);
      setTimeout(() => {
        router.push(link);
      },5000);
    }else{
      showDialog(DIALOG_ENUM.ACCESS, title, false);
    }
  };

  return (
    <DialogContext.Provider
      value={{
        DIALOG_ENUM,
        dialog,
        setTitle,
        isDismissible,
        showDialog,
        hideDialog,
        navigateToRoute
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);


  // const showDialog = (dialogType, dialogTitle?, dismissible = false) => {
  //   setDialog(dialogType);
  //   setTitle(dialogTitle);
  //   setIsDismissible(dismissible);
  // };
  
  // const navigateToRoute = ({link}) => {
  //   if(user){
  //     if(isPaid){
  //       router.push(link)
  //       return
  //     }
  //     showDialog('UPGRADE_AD', title)
  //     setTimeout(() => {
  //        router.push(link) 
  //     },5000);
  //   }else{
  //   showDialog('ACCESS', title, false);
  //   }
  // };

  // const DIALOG_ENUM = {
  //   ACCESS: 'ACCESS',
  //   UPGRADE_AD: 'UPGRADE_AD',
  //   INVITE: 'INVITE',
  // };

  // return (
  //   <DialogContext.Provider
  //     value={{
  //       DIALOG_ENUM,
  //       setTitle,
  //       isDismissible
  //     }}
  //   >
  //     {children}
  //   </DialogContext.Provider>
  // );
// };

// export const useDialog = () => useContext(DialogContext);
