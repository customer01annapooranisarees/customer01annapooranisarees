import React from 'react';
import { useAppState } from '@components/common/context/app';
import { get } from '@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/get';
import Link from './Link';

export default function BundleCSS() {
  const src = get(useAppState(), 'bundleCss');
  if (!src) {
    return null;
  } else {
    return <Link rel="stylesheet" href={src} />;
  }
}
