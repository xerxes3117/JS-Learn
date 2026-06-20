const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const demoRoot = __dirname;
const learningSrcRoot = path.resolve(demoRoot, '../src');
const demoNodeModules = path.resolve(demoRoot, 'node_modules');

const defaultConfig = getDefaultConfig(demoRoot);

/**
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [learningSrcRoot],
  resolver: {
    disableHierarchicalLookup: true,
    nodeModulesPaths: [demoNodeModules],
  },
};

module.exports = mergeConfig(defaultConfig, config);
