import CustomerTable from '@/components/Homepage/CustomerTable'
import { EmptyIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const data = useSelector((state: RootState) => state.customerList.customerList);
    const navigate = useNavigate();

  return (
      <div className='flex'>
          <div className='py-6 px-2 lg:px-6 grow'>
              <Card className='w-full'>
                  <CardContent className='overflow-x-hidden px-0 lg:px-2'>
                      {
                          data.length === 0 ? <div className='w-full'>
                              <div className='flex flex-col justify-center items-center'>
                                <EmptyIcon />
                                <p className='text-lg font-bold mb-4'>No Customer data</p>
                                <Button className='w-fit' variant={'default'} onClick={()=> navigate('/bill-generator')}>Generate Bill</Button>
                                  
                              </div>
                          </div> : <CustomerTable />
                      }
                    
                  </CardContent>
              </Card>
          </div>
    </div>
  )
}

export default Home