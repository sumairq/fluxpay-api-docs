import ContentPanel from '../components/ContentPanel'
import { pages } from '../data/apiData'

export default function PaymentIntentsPage() {
  return <ContentPanel data={pages['payment-intents']} />
}
