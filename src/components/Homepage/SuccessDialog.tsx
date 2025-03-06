import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import DownloadDialog from './DownloadDialog'
import { CustomerFormData } from './BillGeneratorForm'

interface SuccessProp {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: CustomerFormData
}

const SuccessDialog: React.FC<SuccessProp> = ({ open, setOpen, data }) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>

  <AlertDialogContent className='flex flex-col gap-10'>
    <AlertDialogHeader>
      <AlertDialogTitle>Bill Generated Successfully</AlertDialogTitle>
      <AlertDialogDescription>
        Your bill generated Successfully 
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <DownloadDialog data={data} />
                  <AlertDialogAction className='bg-white border border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white'>
                      Continue
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default SuccessDialog