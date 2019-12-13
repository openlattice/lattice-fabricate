const page1Schema = {
  type: 'object',
  title: 'OpenLattice Questionnaire',
  properties: {
    section1: {
      type: 'object',
      title: 'About',
      properties: {
        name: {
          type: 'string',
          title: 'Name'
        },
        occupation: {
          type: 'string',
          title: 'Occupation'
        }
      },
      required: ['name']
    }
  }
};

const page2Schema = {
  type: 'object',
  title: 'OpenLattice Questionnaire',
  properties: {
    section2: {
      type: 'object',
      title: 'Creativity',
      properties: {
        magicHat: {
          type: 'string',
          title: 'If you could pull anything out of a magic hat, what would it be and why?'
        }
      },
      required: ['magicHat']
    }
  }
};

const page3Schema = {
  definitions: {
    pet: {
      type: 'object',
      properties: {
        petType: {
          type: 'string',
          title: 'Type',
          enum: ['Bird', 'Cat', 'Dog', 'Fish', 'Other']
        },
        petName: {
          type: 'string',
          title: 'Name of Pet',
        },
      }
    }
  },
  type: 'object',
  title: 'OpenLattice Questionnaire',
  properties: {
    section3: {
      type: 'object',
      title: 'My Favorites',
      properties: {
        movie: {
          type: 'string',
          title: 'Movie'
        },
        fruit: {
          type: 'string',
          title: 'Fruit',
          enum: ['Tangerine', 'Orange']
        },
      },
      required: ['movie']
    },
    section4: {
      type: 'array',
      title: 'Pets',
      items: {
        $ref: '#/definitions/pet'
      },
      default: [{}]
    }
  }
};

const page1UiSchema = {
  section1: {
    classNames: 'column-span-12 grid-container',
    name: {
      classNames: 'column-span-12'
    },
    occupation: {
      classNames: 'column-span-12'
    }
  }
};

const page2UiSchema = {
  section2: {
    classNames: 'column-span-12 grid-container',
    magicHat: {
      classNames: 'column-span-12',
      'ui:widget': 'textarea'
    }
  }
};

const page3UiSchema = {
  section3: {
    classNames: 'column-span-12 grid-container',
    movie: {
      classNames: 'column-span-12'
    },
    fruit: {
      classNames: 'column-span-12',
      'ui:widget': 'radio'
    }
  },
  section4: {
    classNames: 'column-span-12',
    items: {
      classNames: 'grid-container',
      petType: {
        classNames: 'column-span-6'
      },
      petName: {
        classNames: 'column-span-6'
      },
    }
  }
};

const schemas = [
  page1Schema,
  page2Schema,
  page3Schema,
];

const uiSchemas = [
  page1UiSchema,
  page2UiSchema,
  page3UiSchema,
];

export {
  schemas,
  uiSchemas
};
