import ContentPanel from '../components/ContentPanel'
import { pages } from '../data/apiData'

export default function CheckoutSessionsPage() {
  return <ContentPanel data={pages['checkout-sessions']} />
}
