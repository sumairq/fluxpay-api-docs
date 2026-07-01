import ContentPanel from '../components/ContentPanel'
import { pages } from '../data/apiData'

export default function CustomersPage() {
  return <ContentPanel data={pages['customers']} />
}
