export const initialState = {
  notes: [
    {
      _id: 'n123',
      title: 'My Note 1',
      content:
        'Lorem Ipsum and bla bla. Lorem Ipsum and bla bla. Lorem Ipsum and bla bla. Lorem Ipsum and bla bla.Lorem Ipsum and bla bla. Lorem Ipsum and bla bla.Lorem Ipsum and bla bla.Lorem Ipsum and bla bla.Lorem Ipsum and bla bla.Lorem Ipsum and bla bla.Lorem Ipsum and bla bla.Lorem Ipsum and bla bla. Lorem Ipsum and bla bla. Lorem Ipsum and bla bla. Lorem Ipsum and bla bla.Lorem Ipsum and bla bla.Lorem Ipsum and bla bla. ',
      color: '#ff2e63',
      pinned: true,
      user: {
        userId: 'u123',
      },
    },
    {
      _id: 'n124',
      title: 'My Note 2',
      content: 'Lorem Ipsum and bla bla 2.',
      color: '#00b8a9',
      pinned: false,
      user: {
        userId: 'u123',
      },
    },
    {
      _id: 'n125',
      title: 'My Note 3',
      content: 'Lorem Ipsum and bla bla 3.',
      color: '#3490de',
      pinned: false,
      user: {
        userId: 'u123',
      },
    },
    {
      _id: 'n126',
      title: 'My Note 4',
      content: 'Lorem Ipsum and bla bla 4.',
      color: '#f9ed69',
      pinned: false,
      user: {
        userId: 'u123',
      },
    },
    {
      _id: 'n127',
      title: 'My Note 5',
      content: 'Lorem Ipsum and bla bla 5.',
      color: '#ff2e63',
      pinned: true,
      user: {
        userId: 'u123',
      },
    },
  ],
  profile: {
    userId: 'u123',
    name: 'James Bucky Barns',
  },
  temporaryData: null,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return state
    case 'ADD_NOTES':
      return { ...state, notes: [...state.notes, action.payload] }
    case 'DELETE_NOTES':
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload._id),
      }
    case 'SET_TEMPORARY_DATA':
      return { ...state, temporaryData: action.payload }
    default:
      break
  }
  return state
}
