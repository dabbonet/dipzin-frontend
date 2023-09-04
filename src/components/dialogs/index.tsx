'use client'
import { useDialog } from '@/context/useDialog';
import AccessDialog from './AccessDialog';
// import InviteDialog from './InviteDialog';
// import UpgradeAdDialog from './UpgradeAdDialog';
import { AnimatePresence } from 'framer-motion';

const Dialogs = () => {
  const { dialog, DIALOG_ENUM } = useDialog();

  const RenderDialog = () => {
    switch (dialog) {
      case DIALOG_ENUM?.ACCESS:
        return <AccessDialog />;
      // case DIALOG_ENUM?.INVITE:
      //   return <InviteDialog />;
      // case DIALOG_ENUM?.UPGRADE_AD:
      //   return <UpgradeAdDialog />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <RenderDialog/>
    </AnimatePresence>
  );
}

export default Dialogs;
