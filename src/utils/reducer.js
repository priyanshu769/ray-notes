export const initialState = {
  notes: [
    {
      _id: 'n123',
      title: 'Note Example',
      content:
        'Your note will look like this. Go create your first Note',
      color: '#ffffff',
      pinned: false,
      user: {
        userId: 'u123',
      },
    }
  ],
  profile: {
    userId: 'u123',
    name: 'James Bucky Barns',
  },
  loggedInToken: null,
  temporaryData: null,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return {...state, profile: action.payload}
      case 'SET_NOTES':
        return { ...state, notes: action.payload }
        case 'ADD_NOTE':
          return { ...state, notes: [...state.notes, action.payload] }
          case 'DELETE_NOTE':
            return {
              ...state,
              notes: state.notes.filter((note) => note._id !== action.payload._id),
            }
            case 'EDIT_NOTE':
              return {
                ...state,
                notes: state.notes.map(note => note._id === action.payload._id ? {...note, ...action.payload} : note)
              }
              case 'SET_TEMPORARY_DATA':
                return { ...state, temporaryData: action.payload }
                case 'SET_LOGGEDIN_TOKEN':
                  return { ...state, loggedInToken: action.payload }
    default:
      break
  }
  return state
}
