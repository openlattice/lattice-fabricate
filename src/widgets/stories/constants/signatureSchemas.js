/* eslint-disable max-len */
const text = [
  'Metallica',
  'Metallica is an American heavy metal band. The band was formed in 1981 in Los Angeles by vocalist/guitarist James Hetfield and drummer Lars Ulrich, and has been based in San Francisco for most of its career. The band\'s fast tempos, instrumentals and aggressive musicianship made them one of the founding "big four" bands of thrash metal, alongside Megadeth, Anthrax and Slayer. Metallica\'s current lineup comprises founding members and primary songwriters Hetfield and Ulrich, longtime lead guitarist Kirk Hammett and bassist Robert Trujillo. Guitarist Dave Mustaine (who went on to form Megadeth after being fired from the band) and bassists Ron McGovney, Cliff Burton (who died in a bus accident in Sweden in 1986) and Jason Newsted are former members of the band.',
  'Metallica has released ten studio albums, four live albums, a cover album, five extended plays, 37 singles and 39 music videos. The band has won nine Grammy Awards from 23 nominations, and its last six studio albums (beginning with Metallica) have consecutively debuted at number one on the Billboard 200. Metallica ranks as one of the most commercially successful bands of all time, having sold over 125 million albums worldwide as of 2018. Metallica has been listed as one of the greatest artists of all time by magazines such as Rolling Stone, which ranked them at no. 61 on its 100 Greatest Artists of All Time list. As of 2017, Metallica is the third best-selling music artist since Nielsen SoundScan began tracking sales in 1991, selling a total of 58 million albums in the United States.',
  'Albums',
  'Kill \'Em All (1983)',
  'Ride the Lightning (1984)',
  'Master of Puppets (1986)',
  '...And Justice for All (1988)',
  'Metallica (1991)',
  'Load (1996)',
  'Reload (1997)',
  'St. Anger (2003)',
  'Death Magnetic (2008)',
  'Hardwired... to Self-Destruct (2016)',
];
/* eslint-enable */

const dataSchema = {
  properties: {
    page1Section1: {
      properties: {
        text1: {
          default: text[1],
          title: text[0],
          type: 'string',
        },
        text2: {
          default: text[2],
          type: 'string',
        },
        text3: {
          title: 'Albums',
          type: 'string',
        },
        text4: {
          default: text[3],
          type: 'string',
        },
        text5: {
          default: text[4],
          type: 'string',
        },
        text6: {
          default: text[5],
          type: 'string',
        },
        text7: {
          default: text[6],
          type: 'string',
        },
        text8: {
          default: text[7],
          type: 'string',
        },
        text9: {
          default: text[8],
          type: 'string',
        },
        text10: {
          default: text[9],
          type: 'string',
        },
        text11: {
          default: text[10],
          type: 'string',
        },
        text12: {
          default: text[11],
          type: 'string',
        },
        text13: {
          default: text[12],
          type: 'string',
        },
        text14: {
          default: text[13],
          type: 'string',
        },
      },
      title: '',
      type: 'object',
    },
    page1Section2: {
      properties: {
        signature: {
          title: 'Signature',
          type: 'string',
        },
      },
      title: '',
      type: 'object',
    },
  },
  title: 'Signature',
  type: 'object',
};

const uiSchema = {
  page1Section1: {
    classNames: 'column-span-12',
    text1: {
      classNames: 'column-span-12',
      'ui:field': 'ParagraphField',
    },
    text2: {
      classNames: 'column-span-12',
      'ui:field': 'ParagraphField',
    },
    text3: {
      classNames: 'column-span-12',
      'ui:field': 'ParagraphField',
    },
    text4: {
      'ui:field': 'BulletField',
    },
    text5: {
      'ui:field': 'BulletField',
    },
    text6: {
      'ui:field': 'BulletField',
    },
    text7: {
      'ui:field': 'BulletField',
    },
    text8: {
      'ui:field': 'BulletField',
    },
    text9: {
      'ui:field': 'BulletField',
    },
    text10: {
      'ui:field': 'BulletField',
    },
    text11: {
      'ui:field': 'BulletField',
    },
    text12: {
      'ui:field': 'BulletField',
    },
    text13: {
      'ui:field': 'BulletField',
    },
    text14: {
      'ui:field': 'BulletField',
    },
  },
  page1Section2: {
    classNames: 'column-span-12',
    signature: {
      classNames: 'column-span-12',
      'ui:widget': 'SignatureWidget',
    },
  },
};

export {
  dataSchema,
  uiSchema,
};
