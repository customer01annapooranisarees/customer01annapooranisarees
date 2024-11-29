import React from 'react';
import Script from '@components/common/Script';
import { useAppState } from '@components/common/context/app';
import { get } from '@customer01annapooranisarees/annapoorani/src/lib/util/get';

export default function BundleJS() {
  const src = get(useAppState(), 'bundleJs');
  return <Script src={src} isAsync={false} />;
}
