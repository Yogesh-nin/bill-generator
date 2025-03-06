import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import BillGeneratorForm from '@/components/Homepage/BillGeneratorForm'

const BillGenerator = () => {
  return (
      <div>
          <div className='grow py-4 px-4'>
          <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className='text-xl'>Generate Bill</CardTitle>
      </CardHeader>
      <CardContent className='px-6'>
                      <BillGeneratorForm />
                  </CardContent>

    </Card>
          </div>
    </div>
  )
}

export default BillGenerator