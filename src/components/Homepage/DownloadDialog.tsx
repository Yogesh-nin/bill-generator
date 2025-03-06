import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import BillPdf from './BillPdf';
import { Download, DownloadIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { CustomerFormData } from './BillGeneratorForm';
  
const DownloadDialog: React.FC<{ data: CustomerFormData, onlyIcon?: boolean}> = ({ data, onlyIcon=false }) => {
  return (
      <Dialog>
          {
              onlyIcon ? <DialogTrigger><Download size={16} /></DialogTrigger> : <DialogTrigger><Button variant={'destructive'}>Download Invoice <DownloadIcon size={16} /></Button> </DialogTrigger> 
          }
          <DialogTrigger>
      
    </DialogTrigger>
    <DialogContent className='!w-[1000px]'>
      <DialogHeader className='flex'>
                  <DialogTitle className="text-center">Invoice</DialogTitle>
            </DialogHeader>
            
            <BillPdf data={data} />
    </DialogContent>
  </Dialog>
  )
}

export default DownloadDialog