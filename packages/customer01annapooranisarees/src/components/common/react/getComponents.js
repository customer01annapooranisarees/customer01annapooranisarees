import { useAppState } from '@components/common/context/app';
import { get } from '@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/get';

/* eslint-disable global-require */
const { resolve } = require('path');
const { CONSTANTS } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/helpers');

export function getComponents() {
  const componentsPath = get(useAppState(), 'componentsPath');
  if (!componentsPath) {
    return {};
  } else {
    return require(resolve(
      CONSTANTS.ROOTPATH,
      '.customer01annapooranisarees/build/',
      componentsPath
    ));
  }
}
