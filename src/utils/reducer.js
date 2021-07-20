export const initialState = {
  notes: [
    {
      _id: 'n123',
      title: 'My Note 1',
      content: 'Lorem Ipsum and bla bla.',
    },
    {
      _id: 'n124',
      title: 'My Note 2',
      content: 'Lorem Ipsum and bla bla 2.',
    },
    {
      _id: 'n125',
      title: 'My Note 3',
      content: 'Lorem Ipsum and bla bla 3.',
    },
    {
      _id: 'n126',
      title: 'My Note 4',
      content: 'Lorem Ipsum and bla bla 4.',
    },
    {
      _id: 'n127',
      title: 'My Note 5',
      content: 'Lorem Ipsum and bla bla 5.',
    },
  ],
  profile: {
    name: 'James Bucky Barns',
  },
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
    default:
      break
  }
  return state
}
