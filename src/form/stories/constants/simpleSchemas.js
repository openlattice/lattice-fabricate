import { SEX, STATES, YES_NO } from './enums';

export const schema = {
  type: 'object',
  properties: {
    personSection: {
      type: 'object',
      title: 'Personal Information',
      properties: {
        firstName: {
          type: 'string',
          title: 'First name',
        },
        middleName: {
          type: 'string',
          title: 'Middle name'
        },
        lastName: {
          type: 'string',
          title: 'Last name',
        },
        dob: {
          type: 'string',
          format: 'date',
          title: 'Date of Birth',
        },
        sex: {
          type: 'string',
          title: 'Sex',
          enum: SEX
        },
        phone: {
          type: 'string',
          title: 'Phone #',
        },
        ssn: {
          type: 'string',
          title: 'Social Security #',
        },
      },
      required: [
        'firstName',
        'lastName',
        'sex',
        'dob'
      ],
    },
    mailingAddress: {
      type: 'object',
      title: 'Mailing Address',
      properties: {
        residentOfState: {
          type: 'boolean',
          title: 'Is the client a resident of the state?',
          enum: [
            true,
            false
          ],
          enumNames: YES_NO
        },
        homeless: {
          type: 'string',
          title: 'Is the client homeless?',
          enum: YES_NO
        },
        street: {
          type: 'string',
          title: 'Address',
        },
        city: {
          type: 'string',
          title: 'City',
        },
        state: {
          type: 'string',
          title: 'State/Province',
          enum: STATES
        },
        country: {
          type: 'string',
          title: 'Country',
          default: 'United States of America'
        },
        zip: {
          type: 'string',
          title: 'Zip code',
        },
        mailingAddressId: {
          type: 'string',
        }
      },
    },
    billingAddress: {
      type: 'object',
      title: 'Billing Address',
      properties: {
        sameAsMailing: {
          type: 'boolean',
          title: 'Check if same as mailing',
          default: false
        },
        billingStreet: {
          type: 'string',
          title: 'Address',
        },
        billingCity: {
          type: 'string',
          title: 'City',
        },
        billingState: {
          type: 'string',
          title: 'State/Province',
          enum: STATES
        },
        billingCountry: {
          type: 'string',
          title: 'Country',
          default: 'United States of America'
        },
        billingZip: {
          type: 'string',
          title: 'Zip code',
        },
        billingAddressId: {
          type: 'string'
        }
      }
    }
  }
};

export const uiSchema = {
  personSection: {
    classNames: 'column-span-12 grid-container',
    firstName: {
      classNames: 'column-span-4'
    },
    middleName: {
      classNames: 'column-span-4'
    },
    lastName: {
      classNames: 'column-span-4'
    },
    dob: {
      classNames: 'column-span-4',
      'ui:widget': 'DateWidget',
    },
    sex: {
      classNames: 'column-span-4'
    },
    phone: {
      classNames: 'column-span-4'
    },
    ssn: {
      classNames: 'column-span-4'
    },
  },
  mailingAddress: {
    classNames: 'column-span-12 grid-container',
    residentOfState: {
      'ui:widget': 'radio',
      'ui:options': {
        row: true
      },
      classNames: 'column-span-6'
    },
    homeless: {
      classNames: 'column-span-6',
      'ui:widget': 'radio',
      'ui:options': {
        row: true
      },
    },
    street: {
      classNames: 'column-span-8'
    },
    city: {
      classNames: 'column-span-4'
    },
    state: {
      classNames: 'column-span-4'
    },
    country: {
      classNames: 'column-span-4'
    },
    zip: {
      classNames: 'column-span-4'
    },
    mailingAddressId: {
      'ui:widget': 'hidden'
    }
  },
  billingAddress: {
    classNames: 'column-span-12 grid-container',
    sameAsMailing: {
      classNames: 'column-span-12'
    },
    billingStreet: {
      classNames: 'column-span-8'
    },
    billingCity: {
      classNames: 'column-span-4'
    },
    billingState: {
      classNames: 'column-span-4'
    },
    billingCountry: {
      classNames: 'column-span-4'
    },
    billingZip: {
      classNames: 'column-span-4'
    },
    billingAddressId: {
      'ui:widget': 'hidden'
    }
  }
};
