import ContentPanel from '../components/ContentPanel'
import { pages } from '../data/apiData'

export default function ProductsPage() {
  return <ContentPanel data={pages['products']} />
}
