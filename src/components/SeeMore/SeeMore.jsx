import './SeeMore.css'
import { Link } from 'react-router-dom'

export const SeeMore = (props) => (
      <Link className="seeMore" style={{ display: props.contentLength>128 ? 'block' : 'none' }} to={`/note/${props.noteId}`}>...see more</Link>
  )