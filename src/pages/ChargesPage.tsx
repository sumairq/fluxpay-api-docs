import ContentPanel from '../components/ContentPanel'
import { pages } from '../data/apiData'

export default function ChargesPage() {
  return <ContentPanel data={pages['charges']} />
}
