module.exports = {
  setupFilesAfterEnv: ['jest-enzyme'],
  testEnvironment: 'enzyme',
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'jsx', 'css'],
  testEnvironmentOptions: {
    enzymeAdapter: 'react16',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  rootDir: './../../',
  collectCoverageFrom: [
    '**/components/*.jsx',
  ],
};
