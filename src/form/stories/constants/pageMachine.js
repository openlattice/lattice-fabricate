import { Machine } from 'xstate';

function isRestricted(context) {
  return (context.role === 'restricted');
}

// eslint-disable-next-line new-cap
const pageMachine = Machine(
  {
    id: 'page',
    initial: 'page1',
    context: {
      role: 'unrestricted'
    },
    states: {
      page1: {
        on: { NEXT: 'page2' }
      },
      page2: {
        on: {
          '': {
            target: 'page3',
            cond: 'isRestricted'
          },
          NEXT: 'page3',
          PREV: 'page1'
        }
      },
      page3: {
        on: { NEXT: 'review', PREV: 'page2' }
      },
      review: {
        on: { PREV: 'page3' }
      },
    },
  },
  {
    guards: {
      isRestricted
    }
  }
);

const machineOptions = { context: { role: 'unrestricted' } };

export {
  machineOptions,
  pageMachine
};
